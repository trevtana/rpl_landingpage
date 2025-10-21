import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Users, Rocket, ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-rpl-blue via-navy-blue to-navy-blue">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-40"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-rpl-orange rounded-full opacity-30"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full opacity-50"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >

          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <motion.img
              src="/logorpl.png"
              alt="RPL Logo"
              className="w-32 h-32 md:w-40 md:h-40 object-contain filter drop-shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-rpl-orange drop-shadow-lg">Rekayasa </span>
            <span className="text-rpl-orange drop-shadow-lg">Perangkat </span>
            <span className="text-white drop-shadow-lg">Lunak</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-3xl text-white mb-6 font-semibold"
          >
            SMK Negeri 1 Cimahi
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Membentuk generasi unggul di bidang perangkat lunak dan teknologi.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              to="/dokumentasi"
              className="group px-8 py-4 bg-rpl-blue text-white font-medium rounded-lg hover:bg-rpl-blue/90 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Lihat Dokumentasi Kegiatan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/prestasi"
              className="group px-8 py-4 bg-white text-rpl-blue font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center gap-2"
            >
              Prestasi Kami
              <Rocket className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
            >
              <Code2 className="w-12 h-12 text-white mx-auto mb-2" />
              <p className="text-white/80 text-sm">Coding Expert</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
            >
              <Users className="w-12 h-12 text-white mx-auto mb-2" />
              <p className="text-white/80 text-sm">Kolaborasi Tim</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
            >
              <Rocket className="w-12 h-12 text-white mx-auto mb-2" />
              <p className="text-white/80 text-sm">Inovasi Digital</p>
            </motion.div>
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/60 cursor-pointer"
            onClick={() => document.getElementById('sejarah')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
