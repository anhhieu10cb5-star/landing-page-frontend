import React, { useState } from 'react';
import { translations } from '../utils/translations';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/landing/HeroSection';
import TechGlobeSection from '../components/landing/TechGlobeSection';
import ShowcaseSection2 from '../components/landing/ShowcaseSection2';
import ServicesSection from '../components/landing/ServicesSection';
import ProcessSection from '../components/landing/ProcessSection';

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
    <div className="relative min-h-screen bg-white">
      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} t={t} scrollToSection={scrollToSection} />
        <HeroSection lang={lang} setLang={setLang} t={t} scrollToSection={scrollToSection} />
        <TechGlobeSection />
        <ShowcaseSection2 />
        <ServicesSection />
        <ProcessSection lang={lang} />
        <Footer lang={lang} scrollToSection={scrollToSection} />
      </div>
    </div>
  );
}

export default HomePage;
