import React from 'react';
import { Globe } from 'lucide-react';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import DeviceMockups from './hero/DeviceMockups';
import ServiceBar from './hero/ServiceBar';
import StatsBar from './hero/StatsBar';

function HeroSection({ lang, setLang, t, scrollToSection }) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />
      
      <div className="relative z-10 w-full pt-52 pb-20">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text - trái */}
          <div style={{ paddingLeft: '10%' }} className="flex-1">
            <HeroContent t={t} scrollToSection={scrollToSection} />
          </div>

          {/* Mockups - phải */}
          <div className="hidden lg:block flex-1 pr-8">
            <DeviceMockups />
          </div>
        </div>

        {/* Language switcher */}
        <div className="absolute top-8 right-8">
          <button 
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} 
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium">{lang === 'vi' ? 'EN' : 'VI'}</span>
          </button>
        </div>
      </div>

      {/* Service bar - nhích xuống */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 mt-4">
        <ServiceBar lang={lang} />
      </div>

      {/* Stats - nhích xuống, to hơn */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 mt-12 pb-20">
        <StatsBar lang={lang} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

export default HeroSection;
