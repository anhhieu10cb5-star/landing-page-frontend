// src/components/common/Navbar.js
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
    { path: '/contact', label: t.nav.contact }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname === path) return true;
    return false;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 border-primary/30 shadow-lg shadow-primary/10' 
        : 'bg-black/80 border-primary/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-white">DevStudio</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switch */}
            <button 
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="flex items-center space-x-1 text-gray-300 hover:text-primary transition"
            >
              <Globe className="w-5 h-5" />
              <span>{lang === 'vi' ? 'EN' : 'VI'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Project Tracker Bar */}
      <div className="w-full border-t border-primary/20 bg-black/90 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-primary text-sm font-semibold whitespace-nowrap flex items-center gap-2">
            <span className="text-lg">📊</span>
            {t.hero.tracker.label}
          </span>
          <form onSubmit={handleProjectCodeSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              placeholder={t.hero.tracker.placeholder}
              className="bg-black/80 border border-primary/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary text-sm flex-1 sm:w-64 placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="bg-primary text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition text-sm whitespace-nowrap"
            >
              {t.hero.tracker.button}
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-primary/20">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full text-left px-4 py-3 ${
                isActive(item.path)
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-300 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button 
            onClick={() => {
              setLang(lang === 'vi' ? 'en' : 'vi');
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-primary/10 hover:text-primary"
          >
            🌐 {lang === 'vi' ? 'English' : 'Tiếng Việt'}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;