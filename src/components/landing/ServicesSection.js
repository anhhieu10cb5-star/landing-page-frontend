// src/components/landing/ServicesSection.js
import React from 'react';
import { Smartphone, Code, Server, Globe } from 'lucide-react';

function ServicesSection({ t }) {
  const services = [
    { icon: Smartphone, data: t.services.mobile },
    { icon: Code, data: t.services.web },
    { icon: Server, data: t.services.backend },
    { icon: Globe, data: t.services.landing }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex justify-center mb-4">
          <h2 className="text-4xl font-bold text-white text-center inline-block px-8 py-4 rounded-2xl section-title">
            {t.services.title}
          </h2>
        </div>
        
        {/* Subtitle */}
        <div className="flex justify-center mb-12">
          <p className="text-gray-300 text-center px-6 py-3 rounded-xl inline-block section-subtitle">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="card-dark p-6 rounded-xl hover:scale-105 duration-300"
            >
              <service.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold text-white mb-3">{service.data.title}</h3>
              <p className="text-gray-400 text-sm">{service.data.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;