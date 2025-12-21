// src/components/landing/ContactSection.js
import React from 'react';
import { Mail, MessageSquare, Github } from 'lucide-react';
import ContactForm from '../ContactForm';

function ContactSection({ t, lang }) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 inline-block px-6 py-3 rounded-2xl section-title">
            {t.contact.title}
          </h2>
          <br />
          <p className="text-gray-300 text-lg mt-6 font-semibold inline-block px-6 py-3 rounded-xl section-subtitle">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm lang={lang} />

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Email */}
          <a
            href="mailto:your@email.com"
            className="card-dark p-6 rounded-xl hover:scale-105 duration-300 block"
          >
            <Mail className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-white font-semibold mb-2">{t.contact.email}</h3>
            <span className="text-gray-400 hover:text-primary transition break-all">
              {t.contact.emailPlaceholder}
            </span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="card-dark p-6 rounded-xl hover:scale-105 duration-300 block"
          >
            <MessageSquare className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-white font-semibold mb-2">{t.contact.telegram}</h3>
            <span className="text-gray-400 hover:text-primary transition break-all">
              {t.contact.telegramPlaceholder}
            </span>
          </a>

          {/* Github */}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="card-dark p-6 rounded-xl hover:scale-105 duration-300 block"
          >
            <Github className="w-8 h-8 text-primary mb-3" />
            <h3 className="text-white font-semibold mb-2">{t.contact.github}</h3>
            <span className="text-gray-400 hover:text-primary transition break-all">
              {t.contact.githubPlaceholder}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;