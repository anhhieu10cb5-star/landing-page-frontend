// src/components/landing/AboutSection.js
import React from 'react';
import { CheckCircle, X, ArrowRight } from 'lucide-react';

function AboutSection({ t, scrollToSection }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 inline-block px-6 py-3 rounded-2xl section-title">
            {t.about.title}
          </h2>
          <br />
          <p className="text-gray-300 text-lg mt-6 font-semibold inline-block px-6 py-3 rounded-xl section-subtitle">
            {t.about.subtitle}
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.about.features.map((feature, index) => {
            const isPositive = feature.startsWith('✅');
            const isNegative = feature.startsWith('❌');
            
            return (
              <div 
                key={index} 
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-500 hover:scale-105 ${
                  isPositive 
                    ? 'bg-primary/10 border-primary/40 hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/30' 
                    : isNegative
                    ? 'bg-red-500/10 border-red-500/40 hover:border-red-500/70 hover:shadow-2xl hover:shadow-red-500/30'
                    : 'bg-primary/10 border-primary/40 hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/30'
                }`}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 ${
                  isPositive 
                    ? 'bg-primary' 
                    : isNegative
                    ? 'bg-red-500'
                    : 'bg-primary'
                }`}></div>

                {/* Content */}
                <div className="relative flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    isPositive 
                      ? 'bg-primary shadow-lg shadow-primary/50' 
                      : isNegative
                      ? 'bg-red-500 shadow-lg shadow-red-500/50'
                      : 'bg-primary shadow-lg shadow-primary/50'
                  }`}>
                    {isPositive ? (
                      <CheckCircle className="w-7 h-7 text-black" />
                    ) : isNegative ? (
                      <X className="w-7 h-7 text-white" />
                    ) : (
                      <CheckCircle className="w-7 h-7 text-black" />
                    )}
                  </div>
                  <span className="text-white text-xl leading-relaxed font-semibold flex-1">
                    {feature}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button 
            onClick={() => scrollToSection('contact')}
            className="group relative bg-primary text-black px-16 py-6 rounded-2xl font-bold text-xl transition-all flex items-center justify-center space-x-3 hover:scale-105 overflow-hidden shadow-2xl shadow-primary/50 mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">{t.about.cta}</span>
            <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;