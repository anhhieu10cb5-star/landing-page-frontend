import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, Globe } from 'lucide-react';

function Navbar({ lang, setLang, t }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectCode, setProjectCode] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProjectCodeSubmit = (e) => {
    e.preventDefault();
    if (projectCode.trim()) {
      window.location.href = `/track/${projectCode.trim().toUpperCase()}`;
    }
  };

  const navItems = [
    { path: '/', label: t.nav.services, isHome: true },
    { path: '/portfolio', label: t.nav.portfolio },
    { path: '/pricing', label: t.nav.pricing },
    { path: '/faq', label: t.nav.faq },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname === path) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Main Nav - Dark style */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-slate-900/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Code className="w-10 h-10 text-blue-400" />
              <span className="text-2xl font-bold">
                <span className="text-white">Dev</span>
                <span className="text-blue-400">Studio</span>
              </span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition text-lg font-semibold ${
                    isActive(item.path)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Language Switch */}
              <button 
                onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition text-lg font-semibold"
              >
                <Globe className="w-6 h-6" />
                <span>{lang === 'vi' ? 'EN' : 'VI'}</span>
              </button>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-lg"
              >
                {t.nav.contact}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Project Tracker Bar */}
      <div className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-gray-700 text-base font-semibold whitespace-nowrap flex items-center gap-2">
            <span className="text-xl">📊</span>
            {t.hero.tracker.label}
          </span>
          <form onSubmit={handleProjectCodeSubmit} className="flex gap-3 w-full sm:w-auto">
            <input
              type="text"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              placeholder={t.hero.tracker.placeholder}
              className="bg-white border-2 border-gray-300 text-gray-900 px-5 py-3 rounded-xl focus:outline-none focus:border-blue-500 text-base flex-1 sm:w-72 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-base whitespace-nowrap shadow-md hover:shadow-lg transition-all"
            >
              {t.hero.tracker.button}
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full text-left px-6 py-4 text-lg ${
                isActive(item.path)
                  ? 'text-white bg-slate-800'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full text-left px-6 py-4 text-lg text-red-400 hover:bg-slate-800"
          >
            {t.nav.contact}
          </Link>
          <button 
            onClick={() => {
              setLang(lang === 'vi' ? 'en' : 'vi');
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-6 py-4 text-lg text-gray-300 hover:bg-slate-800 hover:text-white"
          >
            🌐 {lang === 'vi' ? 'English' : 'Tiếng Việt'}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
