import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star, Calendar, User } from 'lucide-react';
import { achievementAPI } from '../services/api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('Semua');

  const levels = ['Semua', 'Nasional', 'Provinsi', 'Kabupaten/Kota', 'Sekolah'];

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await achievementAPI.getAll();
      setAchievements(response.data.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAchievements = selectedLevel === 'Semua'
    ? achievements
    : achievements.filter(achievement => achievement.level === selectedLevel);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Nasional': return 'from-red-500 to-red-600';
      case 'Provinsi': return 'from-blue-500 to-blue-600';
      case 'Kabupaten/Kota': return 'from-green-500 to-green-600';
      case 'Sekolah': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'Nasional': return 'bg-red-100 text-red-700';
      case 'Provinsi': return 'bg-blue-100 text-blue-700';
      case 'Kabupaten/Kota': return 'bg-green-100 text-green-700';
      case 'Sekolah': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-soft-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-dark-grey">Prestasi </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rpl-blue to-rpl-orange">RPL</span>
          </h1>
          <p className="text-lg text-dark-grey">
            Pencapaian gemilang yang membanggakan dalam berbagai kompetisi
          </p>
        </motion.div>

        {/* Level Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedLevel === level
                  ? 'bg-rpl-blue text-white shadow-md'
                  : 'bg-white text-dark-grey hover:bg-gray-100'
              }`}
            >
              {level}
            </button>
          ))}
        </motion.div>

        {/* Loading / Empty / Achievements Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rpl-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat prestasi...</p>
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Tidak ada prestasi ditemukan</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${getLevelColor(achievement.level)}`}></div>

                {/* Image/Icon */}
                <div className="relative h-48 bg-gradient-to-br from-rpl-blue to-rpl-orange overflow-hidden">
                  {achievement.image ? (
                    <img 
                      src={achievement.image_url || `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${achievement.image}`}
                      alt={achievement.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Trophy className="w-24 h-24 text-white/50" />
                    </div>
                  )}
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelBadge(achievement.level)}`}>
                      {achievement.level}
                    </span>
                  </div>

                  {/* Rank Badge */}
                  {achievement.rank && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-yellow-400 rounded-full text-xs font-bold text-yellow-900">
                        {achievement.rank}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-grey mb-2 line-clamp-2">
                    {achievement.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {achievement.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <User className="w-4 h-4 text-rpl-blue" />
                      <span>{achievement.participant}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4 text-rpl-orange" />
                      <span>{achievement.year}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-xs text-gray-500 font-medium">Prestasi {achievement.level}</span>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
