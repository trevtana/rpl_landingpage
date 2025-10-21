import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Users, Award, Calendar, TrendingUp, Building2 } from 'lucide-react';

const SejarahJurusan = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="sejarah" ref={ref} className="py-24 bg-gradient-to-b from-white to-soft-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rpl-blue to-rpl-orange"></div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Text content */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Accent gradient line */}
            <div className="absolute -left-6 top-0 w-1 h-32 bg-gradient-to-b from-rpl-blue to-rpl-orange rounded-full"></div>
            
            <div className="pl-8 lg:pl-12">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
                variants={itemVariants}
              >
                <span className="text-dark-grey">Sejarah </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rpl-blue to-rpl-orange">Jurusan</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-dark-grey leading-relaxed mb-6"
                variants={itemVariants}
              >
                Jurusan Rekayasa Perangkat Lunak (RPL) di SMK Negeri 1 Cimahi didirikan pada tahun 2002 
                sebagai respons terhadap kebutuhan industri teknologi yang terus berkembang. Dengan visi 
                menjadi pusat unggulan pendidikan teknologi informasi di Jawa Barat, RPL SMKN 1 Cimahi 
                telah menghasilkan ribuan lulusan yang kompeten dan siap bersaing di dunia kerja.
              </motion.p>
              
              <motion.p 
                className="text-lg text-dark-grey leading-relaxed mb-8"
                variants={itemVariants}
              >
                Selama lebih dari 18 tahun, jurusan ini terus berinovasi dalam kurikulum dan metode 
                pembelajaran, menjalin kerjasama dengan berbagai perusahaan teknologi terkemuka, serta 
                meraih berbagai prestasi di tingkat regional hingga nasional.
              </motion.p>

              {/* Timeline highlights */}
              <motion.div 
                className="space-y-4 mt-8"
                variants={itemVariants}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rpl-blue/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-rpl-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-grey">2002</p>
                    <p className="text-sm text-gray-600">Tahun Berdiri RPL SMKN 1 Cimahi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rpl-orange/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-rpl-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-grey">Terus Berkembang</p>
                    <p className="text-sm text-gray-600">Inovasi Kurikulum & Metode Pembelajaran</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Image and Stats side */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Building Image */}
            <motion.div 
              className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="/gedung_rpl.jpg" 
                alt="Gedung RPL SMKN 1 Cimahi" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <p className="font-semibold">Gedung RPL SMKN 1 Cimahi</p>
                </div>
              </div>
            </motion.div>

            {/* Stats cards */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4"
              variants={containerVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rpl-blue to-blue-500 rounded-xl flex items-center justify-center mb-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-grey mb-1">1000+</h3>
                <p className="text-sm text-gray-600">Alumni Sukses</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rpl-orange to-orange-500 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-grey mb-1">23+</h3>
                <p className="text-sm text-gray-600">Tahun Berdiri</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rpl-blue to-blue-500 rounded-xl flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-grey mb-1">100+</h3>
                <p className="text-sm text-gray-600">Prestasi</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rpl-orange to-orange-500 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-grey mb-1">20+</h3>
                <p className="text-sm text-gray-600">Mitra Industri</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SejarahJurusan;
