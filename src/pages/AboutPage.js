// src/pages/AboutPage.js
import React, { useState } from 'react';
import { translations } from '../utils/translations';
import AnimatedBackground from '../components/common/AnimatedBackground';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AboutSection from '../components/landing/AboutSection';

function AboutPage() {
  const [lang, setLang] = useState('vi');
  const t = translations[lang];

  const scrollToSection = (id) => {
    if (id === 'contact') {
      window.location.href = '/contact';
    } else {
      window.location.href = `/#${id}`;
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
        
        {/* Add padding for navbar */}
        <div className="pt-32">
          <AboutSection t={t} scrollToSection={scrollToSection} />
        </div>
        
        <Footer lang={lang} scrollToSection={scrollToSection} />
      </div>
    </div>
  );
}

export default AboutPage;