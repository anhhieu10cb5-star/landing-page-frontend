// src/components/landing/HeroSection.js
import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight, ChevronDown } from 'lucide-react';

function HeroSection({ lang, setLang, t, scrollToSection }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = t.hero.subtitle;
    let currentIndex = 0;
    setDisplayedText('');
    setIsTypingComplete(false);
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [lang, t.hero.subtitle]);

  const services = [
    { icon: '📱', text: 'Mobile App (Flutter)' },
    { icon: '🌐', text: 'Website/Web App' },
    { icon: '⚙️', text: 'Backend API' },
    { icon: '🛒', text: 'E-Commerce' },
    { icon: '🎨', text: 'Landing Page' },
    { icon: '☁️', text: 'Cloud Deploy' }
  ];

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight hero-title">
          {t.hero.title}
          <br />
          <span className="text-primary inline-block mt-2 font-black relative min-h-[80px]">
            {displayedText}
            {!isTypingComplete && (
              <span className="inline-block w-1 h-12 md:h-16 bg-primary ml-1 animate-pulse align-middle"></span>
            )}
          </span>
        </h1>
        
        {/* Description */}
        <div className="mb-8 max-w-4xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl text-white font-bold leading-relaxed px-4 py-4 rounded-2xl inline-block bg-black/90 border border-primary/20">
            {t.hero.description}
          </p>
        </div>

        {/* Service Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-primary/20 border-2 border-primary/40 rounded-full px-5 py-2.5 flex items-center space-x-2.5 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <span className="text-xl">{service.icon}</span>
              <span className="text-white text-sm font-bold whitespace-nowrap">{service.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
          {/* Primary Button - Bắt đầu dự án */}
        <button 
          onClick={() => scrollToSection('contact')}
          className="group relative bg-black/90 border-2 border-primary/60 text-primary px-12 py-5 rounded-2xl font-bold text-lg hover:bg-primary/10 hover:border-primary transition-all flex items-center justify-center space-x-3 hover:scale-105 shadow-xl"
        >
            <span className="relative z-10 text-xl">{t.hero.btnCTA}</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
          
          {/* Secondary Button - Xem Portfolio */}
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="bg-black/90 border-2 border-primary/60 text-primary px-12 py-5 rounded-2xl font-bold text-lg hover:bg-primary/10 hover:border-primary transition-all hover:scale-105 shadow-xl"
          >
            <span className="text-xl">{t.hero.btnPortfolio}</span>
          </button>
        </div>

        {/* Language Switch */}
        <button
          onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
          className="inline-flex items-center space-x-3 bg-black/90 border border-primary/40 text-primary px-7 py-3.5 rounded-xl hover:bg-black hover:border-primary/70 transition-all hover:scale-105 shadow-lg font-semibold"
        >
          <Globe className="w-6 h-6" />
          <span>{t.hero.btnSwitch}</span>
        </button>

        {/* Scroll Down Indicator */}
        <div className="mt-16 animate-bounce">
          <div className="inline-flex flex-col items-center space-y-2">
            <span className="text-primary/80 text-sm font-medium">Scroll Down</span>
            <ChevronDown className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;