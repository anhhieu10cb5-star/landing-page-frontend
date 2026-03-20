import React from 'react';
import { Code, Mail, MessageSquare, Github, ArrowRight } from 'lucide-react';

function Footer({ lang, scrollToSection }) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-8 pb-4 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DevStudio</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {lang === 'vi' 
                ? 'Phát triển ứng dụng chuyên nghiệp cho doanh nghiệp toàn cầu. Mobile App, Website, Backend API.' 
                : 'Professional app development for global businesses. Mobile Apps, Websites, Backend APIs.'}
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-blue-600 text-sm font-semibold">
                {lang === 'vi' ? 'Đang nhận dự án mới' : 'Available for new projects'}
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3 rounded"></div>
              {lang === 'vi' ? 'Dịch vụ' : 'Services'}
            </h3>
            <ul className="space-y-3">
              {[
                'Mobile App Development',
                'Website & Web App',
                'Backend API',
                'E-Commerce Solutions',
                'Landing Page'
              ].map((service, i) => (
                <li key={i}>
                  <a href="#services" className="text-gray-600 hover:text-blue-600 transition text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3 rounded"></div>
              {lang === 'vi' ? 'Liên kết' : 'Quick Links'}
            </h3>
            <ul className="space-y-3">
              {[
                { text: 'Portfolio', id: 'portfolio' },
                { text: lang === 'vi' ? 'Bảng giá' : 'Pricing', id: 'pricing' },
                { text: 'FAQ', id: 'faq' },
                { text: lang === 'vi' ? 'Liên hệ' : 'Contact', id: 'contact' }
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-600 hover:text-blue-600 transition text-sm flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    {link.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3 rounded"></div>
              {lang === 'vi' ? 'Liên hệ' : 'Get in Touch'}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contact@devstudio.tech" className="text-gray-600 hover:text-blue-600 transition text-sm flex items-center group">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="group-hover:translate-x-1 transition-transform">contact@devstudio.tech</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/devstudio" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition text-sm flex items-center group">
                  <MessageSquare className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="group-hover:translate-x-1 transition-transform">@devstudio</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/devstudio" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition text-sm flex items-center group">
                  <Github className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="group-hover:translate-x-1 transition-transform">github.com/devstudio</span>
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="https://github.com/devstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all hover:scale-110 shadow-sm">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:contact@devstudio.tech" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all hover:scale-110 shadow-sm">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://t.me/devstudio" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all hover:scale-110 shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2025 DevStudio. {lang === 'vi' ? 'Mọi quyền được bảo lưu.' : 'All rights reserved.'}
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              <button className="text-gray-500 hover:text-blue-600 transition">
                {lang === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
              </button>
              <button className="text-gray-500 hover:text-blue-600 transition">
                {lang === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-3">
          <p className="text-gray-400 text-xs">
            {lang === 'vi' 
              ? '🌍 Phục vụ khách hàng toàn cầu - Việt Nam, USA, Europe, Asia' 
              : '🌍 Serving clients worldwide - Vietnam, USA, Europe, Asia'}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
