import { Instagram, Youtube, Mail, MapPin, Phone, Code2, ExternalLink, Heart, Globe, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/rpl.stmnpbdg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
    { icon: Youtube, href: 'https://youtu.be/4DueLyPCJ8g?si=5tpKT9CqT_d9PutA', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: Globe, href: 'https://www.smkn1-cmi.sch.id/', label: 'Website', color: 'hover:bg-rpl-blue' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dokumentasi', path: '/dokumentasi' },
    { name: 'Prestasi', path: '/prestasi' }
  ];

  return (
    <footer className="bg-gradient-to-b from-navy-blue to-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Gradient divider */}
      <div className="h-1 bg-gradient-to-r from-rpl-blue via-purple-500 to-rpl-orange"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About RPL */}
          <div className="lg:col-span-1">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src="/logorpl.png" 
                alt="RPL Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">RPL SMKN 1 Cimahi</h3>
                <p className="text-sm text-gray-400">Rekayasa Perangkat Lunak</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span>Est. 2002</span>
              <span className="text-rpl-orange">•</span>
              <span>18+ Years</span>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4 
              className="text-lg font-semibold mb-6 text-rpl-blue"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Tautan Cepat
            </motion.h4>
            <motion.ul 
              className="space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-rpl-orange transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-0.5 bg-rpl-orange transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h4 
              className="text-lg font-semibold mb-6 text-rpl-blue"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Kontak Kami
            </motion.h4>
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 bg-rpl-blue/10 rounded-lg flex items-center justify-center group-hover:bg-rpl-blue/20 transition-colors">
                  <MapPin className="w-4 h-4 text-rpl-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    Jl. Mahar Martanegara No.48
                  </p>
                  <p className="text-sm text-gray-400">
                    Cimahi, Jawa Barat 40521
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 bg-rpl-blue/10 rounded-lg flex items-center justify-center group-hover:bg-rpl-blue/20 transition-colors">
                  <Phone className="w-4 h-4 text-rpl-blue" />
                </div>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">(022) 6629683</p>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
              </div>
            </motion.div>
          </div>

          {/* Social Media */}
          <div>
            <motion.h4 
              className="text-lg font-semibold mb-6 text-rpl-blue"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ikuti Kami
            </motion.h4>
            <motion.div 
              className="flex gap-3 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
            
            {/* Additional social info */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <span className="text-pink-500">Instagram:</span> @rpl.stmnpbdg
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© 2025 RPL SMKN 1 Cimahi</span>
              <span className="text-rpl-orange">•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Developed by</span>
              <span className="font-semibold bg-gradient-to-r from-rpl-blue to-rpl-orange bg-clip-text text-transparent">
                Arkan Ardiansyah - RPL STMNPBDG 50 (21)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
