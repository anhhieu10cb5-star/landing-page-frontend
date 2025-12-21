// src/components/landing/PortfolioSection.js
import React from 'react';
import { ExternalLink } from 'lucide-react';

function PortfolioSection({ t }) {
  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex justify-center mb-4">
          <h2 className="text-4xl font-bold text-white text-center inline-block px-8 py-4 rounded-2xl section-title">
            {t.portfolio.title}
          </h2>
        </div>
        
        {/* Subtitle */}
        <div className="flex justify-center mb-12">
          <p className="text-gray-300 text-center max-w-2xl px-6 py-3 rounded-xl inline-block section-subtitle">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.portfolio.projects.map((project, index) => (
            <div 
              key={index}
              className="card-dark rounded-xl overflow-hidden group hover:scale-105 duration-300"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* View Button */}
                <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition text-sm group/btn">
                  <span>{t.portfolio.viewProject}</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;