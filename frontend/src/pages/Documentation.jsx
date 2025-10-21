import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Calendar, MapPin, X } from 'lucide-react';
import { activityAPI } from '../services/api';

const Documentation = () => {
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState(null);
  const [documentations, setDocumentations] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = ['Semua', 'Lomba', 'Kegiatan Jurusan', 'Kunjungan Industri', 'Kegiatan Sekolah'];

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await activityAPI.getAll();
      setDocumentations(response.data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocs = selectedFilter === 'Semua' 
    ? documentations 
    : documentations.filter(doc => doc.category === selectedFilter);

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
          <h1 className="text-4xl md:text-5xl font-bold text-dark-grey mb-4">
            Dokumentasi Kegiatan
          </h1>
          <p className="text-lg text-dark-grey">
            Momen-momen berharga dalam perjalanan pembelajaran kami
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-rpl-blue text-white shadow-lg'
                  : 'bg-white text-dark-grey hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Loading / Empty / Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rpl-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat dokumentasi...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Tidak ada dokumentasi ditemukan</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredDocs.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-rpl-blue to-rpl-orange overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(doc)}
                  >
                    {doc.image ? (
                      <img 
                        src={doc.image_url || `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${doc.image}`}
                        alt={doc.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Camera className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-rpl-blue/10 text-rpl-blue text-xs font-medium rounded-full mb-3">
                      {doc.category}
                    </span>
                    
                    <h3 className="font-semibold text-dark-grey mb-2">
                      {doc.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {doc.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(doc.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      {doc.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{doc.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Modal for selected image */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 md:h-96 bg-gradient-to-br from-rpl-blue to-rpl-orange">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  {selectedImage.image ? (
                    <img 
                      src={selectedImage.image_url || `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${selectedImage.image}`}
                      alt={selectedImage.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-24 h-24 text-white/50" />
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <span className="inline-block px-3 py-1 bg-rpl-blue/10 text-rpl-blue text-sm font-medium rounded-full mb-4">
                    {selectedImage.category}
                  </span>
                  
                  <h2 className="text-2xl font-bold text-dark-grey mb-4">
                    {selectedImage.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    {selectedImage.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedImage.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    {selectedImage.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedImage.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Documentation;
