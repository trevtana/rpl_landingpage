import { motion } from 'framer-motion';
import { Building, Briefcase } from 'lucide-react';

const RunningText = () => {
  const partners = [
    { name: 'IAC (Institut Teknologi Dirgantara)', color: 'text-red-600' },
    { name: 'Imtech Solutions', color: 'text-green-600' },
    { name: 'JKM', color: 'text-green-500' },
    { name: 'PT. Softindotech (SC)', color: 'text-blue-600' },
    { name: 'Neuron – Make It Easy', color: 'text-purple-600' },
    { name: 'Paninti', color: 'text-orange-500' },
    { name: 'Diskominfo Kota Cimahi', color: 'text-red-500' },
    { name: 'Infinys – The True Cloud Company', color: 'text-blue-500' },
    { name: 'Nutrifood', color: 'text-blue-400' },
    { name: 'Dirgantara Indonesia (Indonesian Aerospace)', color: 'text-gray-700' }
  ];

  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-gradient-to-r from-soft-white via-white to-soft-white overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full opacity-5">
        <div className="absolute inset-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23009FE3' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%'
        }}></div>
      </div>
      
      <div className="relative">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-dark-grey mb-2">
              Telah bekerja sama dengan berbagai
            </h3>
            <p className="text-lg text-rpl-blue font-semibold">perusahaan teknologi terkemuka</p>
          </motion.div>
        </div>
        
        <div className="relative flex overflow-hidden py-8 group">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{
              x: ['0%', '-33.33%'],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 px-8 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group/item"
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${partner.color === 'text-red-600' ? 'from-red-100 to-red-200' : partner.color === 'text-green-600' ? 'from-green-100 to-green-200' : partner.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' : partner.color === 'text-orange-500' ? 'from-orange-100 to-orange-200' : 'from-gray-100 to-gray-200'} flex items-center justify-center`}>
                  <Building className={`w-6 h-6 ${partner.color}`} />
                </div>
                <span className={`text-xl font-semibold ${partner.color} group-hover/item:scale-105 transition-transform`}>
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default RunningText;
