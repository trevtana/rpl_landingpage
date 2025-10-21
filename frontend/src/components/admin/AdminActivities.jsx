import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Calendar, MapPin, Tag, FileText } from 'lucide-react';
import { activityAPI } from '../../services/api';
import ActivityForm from './ActivityForm';

const AdminActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');

  const categories = ['Semua', 'Lomba', 'Kegiatan Jurusan', 'Kunjungan Industri', 'Kegiatan Sekolah'];

  useEffect(() => {
    fetchActivities();
  }, [filterCategory, searchTerm]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterCategory !== 'Semua') params.category = filterCategory;
      if (searchTerm) params.search = searchTerm;
      
      const response = await activityAPI.getAll(params);
      setActivities(response.data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      alert('Gagal memuat data kegiatan');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) return;

    try {
      await activityAPI.delete(id);
      alert('Kegiatan berhasil dihapus');
      fetchActivities();
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Gagal menghapus kegiatan');
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingActivity(null);
  };

  const handleSuccess = () => {
    fetchActivities();
    handleCloseForm();
  };

  return (
    <div>
      {/* Header Actions */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-dark-grey">Dokumentasi Kegiatan</h2>
          <p className="text-gray-600">Kelola dokumentasi kegiatan RPL</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-rpl-blue text-white rounded-lg hover:bg-rpl-blue/90 shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Kegiatan</span>
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
              placeholder="Cari kegiatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rpl-blue"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-rpl-blue to-rpl-orange text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activities List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rpl-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Tidak ada kegiatan ditemukan</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex gap-4">
                {/* Image */}
                {activity.image && (
                  <img
                    src={activity.image_url || `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${activity.image}`}
                    alt={activity.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-grey mb-2">{activity.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{activity.description}</p>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4 text-rpl-blue" />
                      <span>{activity.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-rpl-orange" />
                      <span>{new Date(activity.date).toLocaleDateString('id-ID')}</span>
                    </div>
                    {activity.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span>{activity.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
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
        <ActivityForm
          activity={editingActivity}
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default AdminActivities;
