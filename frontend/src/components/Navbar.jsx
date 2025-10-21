import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navLinks = [
    { type: 'scroll', id: 'hero', label: 'Home' },
    { type: 'scroll', id: 'sejarah', label: 'Sejarah' },
    { type: 'scroll', id: 'tenaga-pendidik', label: 'Tenaga Pendidik' },
    { type: 'link', path: '/dokumentasi', label: 'Dokumentasi Kegiatan' },
    { type: 'link', path: '/prestasi', label: 'Prestasi' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logorpl.png" 
              alt="RPL Logo" 
              className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-lg text-dark-grey leading-tight">RPL SMKN 1 Cimahi</h1>
              <p className="text-xs text-gray-500">Rekayasa Perangkat Lunak</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              link.type === 'scroll' ? (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative font-medium text-dark-grey hover:text-rpl-blue transition-all duration-300 group px-2 py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-rpl-blue to-rpl-orange transition-all duration-300 group-hover:w-full"></span>
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-medium transition-all duration-300 group px-2 py-1 ${
                    location.pathname === link.path
                      ? 'text-rpl-orange'
                      : 'text-dark-grey hover:text-rpl-blue'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-rpl-blue to-rpl-orange transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  link.type === 'scroll' ? (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="block w-full text-left px-4 py-2 rounded-lg text-dark-grey hover:bg-gray-100 transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-colors duration-300 ${
                        location.pathname === link.path
                          ? 'bg-gradient-to-r from-rpl-blue to-rpl-orange text-white'
                          : 'text-dark-grey hover:bg-gray-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
