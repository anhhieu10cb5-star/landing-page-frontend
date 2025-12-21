// src/pages/HomePage.js
import React, { useState } from 'react';
import { translations } from '../utils/translations';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/landing/HeroSection';
import ServicesSection from '../components/landing/ServicesSection';

function HomePage() {
  const [lang, setLang] = useState('vi');
  const t = translations[lang];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          t={t} 
          scrollToSection={scrollToSection} 
        />
        
        <HeroSection 
          lang={lang} 
          setLang={setLang} 
          t={t} 
          scrollToSection={scrollToSection} 
        />
        
        <ServicesSection t={t} />
        
        <Footer lang={lang} scrollToSection={scrollToSection} />
      </div>
    </div>
  );
}

export default HomePage;