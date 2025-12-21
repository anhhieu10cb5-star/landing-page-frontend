// src/components/landing/PricingSection.js
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

function PricingSection({ t, scrollToSection }) {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex justify-center mb-4">
          <h2 className="text-4xl font-bold text-white text-center inline-block px-8 py-4 rounded-2xl section-title">
            {t.pricing.title}
          </h2>
        </div>
        
        {/* Subtitle */}
        <div className="flex justify-center mb-16">
          <p className="text-gray-300 text-center px-6 py-3 rounded-xl inline-block section-subtitle">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.pricing.plans.map((plan, index) => (
            <div key={index} className="group relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Card */}
              <div className="relative bg-black/80 p-8 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-500 h-full flex flex-col hover:scale-105 hover:shadow-2xl">
                <div className="relative z-10 flex-grow">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6">
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-5xl font-black text-primary">
                      {plan.price}
                    </span>
                    <span className="text-sm block mt-2 text-gray-300">
                      {t.pricing.perProject}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-primary shadow-lg shadow-primary/30">
                          <Check className="w-4 h-4 text-black font-bold" />
                        </div>
                        <span className="text-sm leading-relaxed text-white font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 relative overflow-hidden bg-primary text-black shadow-lg hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 mt-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t.pricing.contact}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-16 text-center">
          <p className="text-gray-300 text-sm mb-4 inline-block px-6 py-3 rounded-xl section-subtitle">
            {t.pricing.note.priceChange}
          </p>
          <br />
          <p className="text-primary font-semibold inline-block px-6 py-3 rounded-xl mt-2 section-subtitle">
            {t.pricing.note.contact}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;