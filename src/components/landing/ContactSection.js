import React from 'react';
import { Mail, MessageSquare, Github } from 'lucide-react';
import ContactForm from '../ContactForm';

function ContactSection({ t, lang }) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-gray-600 text-lg mt-4 font-medium">
            {t.contact.subtitle}
          </p>
        </div>

        <ContactForm lang={lang} />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <a href="mailto:contact@devstudio.tech" className="bg-white border border-gray-100 p-6 rounded-2xl hover:scale-105 duration-300 block shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-gray-900 font-bold mb-2">{t.contact.email}</h3>
            <span className="text-gray-500 text-sm">contact@devstudio.tech</span>
          </a>

          <a href="https://t.me/devstudio" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 p-6 rounded-2xl hover:scale-105 duration-300 block shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-gray-900 font-bold mb-2">{t.contact.telegram}</h3>
            <span className="text-gray-500 text-sm">@devstudio</span>
          </a>

          <a href="https://github.com/devstudio" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 p-6 rounded-2xl hover:scale-105 duration-300 block shadow-lg hover:shadow-xl hover:border-emerald-200 transition-all">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
              <Github className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-gray-900 font-bold mb-2">{t.contact.github}</h3>
            <span className="text-gray-500 text-sm">github.com/devstudio</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
