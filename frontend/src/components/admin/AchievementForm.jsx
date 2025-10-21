import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Trophy, User, Award, Calendar } from 'lucide-react';
import { achievementAPI } from '../../services/api';

const AchievementForm = ({ achievement, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    participant: '',
    level: 'Nasional',
    rank: '',
    year: new Date().getFullYear(),
    date: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const levels = ['Nasional', 'Provinsi', 'Kabupaten/Kota', 'Sekolah'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (achievement) {
      setFormData({
        title: achievement.title || '',
        participant: achievement.participant || '',
        level: achievement.level || 'Nasional',
        rank: achievement.rank || '',
        year: achievement.year || currentYear,
        date: achievement.date || '',
        description: achievement.description || '',
      });
      if (achievement.image) {
        setImagePreview(achievement.image_url || `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${achievement.image}`);
      }
    }
  }, [achievement]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('participant', formData.participant);
      data.append('level', formData.level);
      data.append('rank', formData.rank);
      data.append('year', formData.year);
      data.append('date', formData.date);
      data.append('description', formData.description);
      if (imageFile) {
        data.append('image', imageFile);
      }

      if (achievement) {
        await achievementAPI.update(achievement.id, data);
        alert('Prestasi berhasil diupdate');
      } else {
        await achievementAPI.create(data);
        alert('Prestasi berhasil ditambahkan');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving achievement:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan prestasi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark-grey">
            {achievement ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Trophy className="w-4 h-4 inline mr-1" />
              Nama Prestasi *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
              placeholder="Contoh: Juara 1 Lomba Programming Nasional"
            />
          </div>

          {/* Participant */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Peserta *
            </label>
            <input
              type="text"
              name="participant"
              value={formData.participant}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
              placeholder="Nama siswa atau tim"
            />
          </div>

          {/* Level & Rank */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tingkat *
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Award className="w-4 h-4 inline mr-1" />
                Peringkat
              </label>
              <input
                type="text"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
                placeholder="Juara 1, 2, 3, dll"
              />
            </div>
          </div>

          {/* Year & Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tahun *
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
              placeholder="Deskripsikan prestasi secara singkat..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              Foto Prestasi
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
            />
            <p className="text-xs text-gray-500 mt-1">Max 2MB (JPG, PNG, GIF)</p>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-rpl-blue to-rpl-orange text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : achievement ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AchievementForm;
