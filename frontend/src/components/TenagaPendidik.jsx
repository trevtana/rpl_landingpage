import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, Mail, Award, BookOpen } from 'lucide-react';

const TenagaPendidik = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teachers = [
    {
      id: 1,
      name: "Agus Rahmawan, ST,M.Pd",
      position: "Kepala Program RPL",
      image: "/Agus Rahmawan.jpg",
      isHead: true
    },
    {
      id: 2,
      name: "Siti Maryam, S.Kom, M.Kom",
      position: "Kepala Bengkel",
      image: "/Siti Maryam.jpg"
    },
    {
      id: 3,
      name: "Yuli Pamungkas, SP",
      position: "Tenaga Pendidik",
      image: "/Yuli Pamungkas.jpg"
    },
    {
      id: 4,
      name: "Agus Suratna, S.Pd",
      position: "Tenaga Pendidik",
      image: "/Agus Suratna.jpg"
    },
    {
      id: 5,
      name: "Chandra Hardiawan, S.Pd, M.T.",
      position: "Tenaga Pendidik",
      image: "/Chandra Hardiawan.jpg"
    },
    {
      id: 6,
      name: "Indra Yusiana, S.T",
      position: "Tenaga Pendidik",
      image: "/Indra Yusiana.jpg"
    },
    {
      id: 7,
      name: "Taufik Hidayat, S.Tr.T",
      position: "Tenaga Pendidik",
      image: "/Taufik Hidayat.jpg"
    },
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="tenaga-pendidik" ref={ref} className="py-24 bg-white relative overflow-hidden">

      <div className="absolute top-0 right-0 w-96 h-96 bg-rpl-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rpl-orange/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-dark-grey">Tenaga </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rpl-blue to-rpl-orange">Pendidik</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tim pengajar profesional dan berpengalaman di bidang teknologi dengan komitmen tinggi dalam mendidik generasi digital
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-6"
        >
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              className="relative group w-full sm:w-64 md:w-72"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col p-8">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
                      teacher.isHead
                        ? 'bg-rpl-blue'
                        : index % 2 === 0
                        ? 'bg-rpl-blue'
                        : 'bg-rpl-orange'
                    }`}></div>
                    
                    <div className="relative">
                      <div className={`w-40 h-40 rounded-full p-1.5 ${
                        teacher.isHead
                          ? 'bg-gradient-to-br from-rpl-blue via-purple-400 to-rpl-orange'
                          : index % 2 === 0
                          ? 'bg-gradient-to-br from-rpl-blue to-cyan-400'
                          : 'bg-gradient-to-br from-rpl-orange to-yellow-400'
                      }`}>
                        <div className="w-full h-full rounded-full bg-white p-1">
                          {teacher.image ? (
                            <img
                              src={teacher.image}
                              alt={teacher.name}
                              className="w-full h-full rounded-full object-cover object-top shadow-lg"
                            />
                          ) : (
                            <div className={`w-full h-full rounded-full flex items-center justify-center ${
                              teacher.isHead
                                ? 'bg-rpl-blue'
                                : index % 2 === 0
                                ? 'bg-rpl-blue'
                                : 'bg-rpl-orange'
                            }`}>
                              <User className="w-16 h-16 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {teacher.isHead && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 whitespace-nowrap">
                          <Award className="w-3 h-3" />
                          Kepala Program
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-xl text-dark-grey mb-1">
                      {teacher.name}
                    </h3>
                    <p className={`text-sm font-semibold uppercase tracking-wide ${
                      teacher.isHead ? 'text-rpl-blue' : 'text-gray-500'
                    }`}>
                      {teacher.position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TenagaPendidik;
