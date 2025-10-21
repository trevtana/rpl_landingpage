import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Trophy, Award, Calendar } from 'lucide-react';
import { achievementAPI } from '../../services/api';
import AchievementForm from './AchievementForm';

const AdminAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('Semua');

  const levels = ['Semua', 'Nasional', 'Provinsi', 'Kabupaten/Kota', 'Sekolah'];

  useEffect(() => {
    fetchAchievements();
  }, [filterLevel, searchTerm]);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterLevel !== 'Semua') params.level = filterLevel;
      if (searchTerm) params.search = searchTerm;
      
      const response = await achievementAPI.getAll(params);
      setAchievements(response.data.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      alert('Gagal memuat data prestasi');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) return;

    try {
      await achievementAPI.delete(id);
      alert('Prestasi berhasil dihapus');
      fetchAchievements();
    } catch (error) {
      console.error('Error deleting achievement:', error);
      alert('Gagal menghapus prestasi');
    }
  };

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAchievement(null);
  };

  const handleSuccess = () => {
    fetchAchievements();
    handleCloseForm();
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Nasional': return 'bg-red-100 text-red-700';
      case 'Provinsi': return 'bg-blue-100 text-blue-700';
      case 'Kabupaten/Kota': return 'bg-green-100 text-green-700';
      case 'Sekolah': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Header Actions */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-dark-grey">Prestasi</h2>
          <p className="text-gray-600">Kelola data prestasi RPL</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-rpl-blue text-white rounded-lg hover:bg-rpl-blue/90 shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Prestasi</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari prestasi atau peserta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
            />
          </div>

          {/* Level Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  filterLevel === level
                    ? 'bg-rpl-blue text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rpl-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      ) : achievements.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Tidak ada prestasi ditemukan</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex gap-4">
                {/* Image */}
                {achievement.image && (
                  <img
                    src={achievement.image_url || `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${achievement.image}`}
                    alt={achievement.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-dark-grey mb-1">{achievement.title}</h3>
                      <p className="text-gray-600 font-medium">{achievement.participant}</p>
                    </div>
                    {achievement.rank && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                        {achievement.rank}
                      </span>
                    )}
                  </div>

                  {achievement.description && (
                    <p className="text-gray-600 mb-3 line-clamp-2">{achievement.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className={`px-3 py-1 rounded-full font-medium ${getLevelColor(achievement.level)}`}>
                      {achievement.level}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{achievement.year}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(achievement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <AchievementForm
          achievement={editingAchievement}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default AdminAchievements;
