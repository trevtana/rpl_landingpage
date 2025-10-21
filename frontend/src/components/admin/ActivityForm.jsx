import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Calendar, MapPin, Tag } from 'lucide-react';
import { activityAPI } from '../../services/api';

const ActivityForm = ({ activity, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Lomba',
    date: '',
    location: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = ['Lomba', 'Kegiatan Jurusan', 'Kunjungan Industri', 'Kegiatan Sekolah'];

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title || '',
        description: activity.description || '',
        category: activity.category || 'Lomba',
        date: activity.date || '',
        location: activity.location || '',
      });
      if (activity.image) {
        setImagePreview(activity.image_url || `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${activity.image}`);
      }
    }
  }, [activity]);

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
    setErrors({});

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description || '');
      data.append('category', formData.category);
      data.append('date', formData.date);
      data.append('location', formData.location || '');
      if (imageFile) {
        data.append('image', imageFile);
      }

      // Debug: log FormData contents
      console.log('Submitting activity:', {
        title: formData.title,
        category: formData.category,
        date: formData.date,
        hasImage: !!imageFile
      });

      if (activity) {
        await activityAPI.update(activity.id, data);
        alert('Kegiatan berhasil diupdate');
      } else {
        await activityAPI.create(data);
        alert('Kegiatan berhasil ditambahkan');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving activity:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        console.error('Validation errors:', error.response.data.errors);
        
        // Show detailed error messages
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('\n');
        alert(`Kesalahan validasi:\n\n${errorMessages}`);
      } else {
        alert(error.response?.data?.message || 'Gagal menyimpan kegiatan');
      }
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
            {activity ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
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
              Judul Kegiatan *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Contoh: Lomba Programming Competition 2024"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Kategori *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category[0]}</p>
            )}
          </div>

          {/* Date & Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Tanggal *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Lokasi
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
                placeholder="Lab Komputer RPL"
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
              placeholder="Deskripsikan kegiatan secara singkat..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-1" />
              Foto Kegiatan
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
              {loading ? 'Menyimpan...' : activity ? 'Update' : 'Simpan'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ActivityForm;
