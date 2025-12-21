// src/components/landing/FAQSection.js
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQSection({ t }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 inline-block px-6 py-3 rounded-2xl section-title">
            {t.faq.title}
          </h2>
          <br />
          <p className="text-gray-300 text-lg mt-6 font-semibold inline-block px-6 py-3 rounded-xl section-subtitle">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {t.faq.questions.map((item, index) => (
            <div 
              key={index}
              className="group bg-black/80 rounded-2xl border-2 border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Question */}
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex justify-between items-center p-8 text-left hover:bg-black/60 transition-colors"
              >
                <span className="text-xl font-bold text-white pr-6 leading-relaxed">{item.q}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-primary flex-shrink-0 transition-all duration-300 ${
                    openFAQ === index ? 'rotate-180 text-primary/80' : ''
                  }`}
                />
              </button>
              
              {/* Answer */}
              <div 
                className={`overflow-hidden transition-all duration-500 ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 text-gray-300 text-lg leading-relaxed border-t border-primary/10 pt-6">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;