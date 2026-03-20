import React from 'react';
import { ArrowRight } from 'lucide-react';

function HeroContent({ t, scrollToSection }) {
  return (
    <div className="relative z-10 text-left max-w-2xl">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-8">
        <span className="text-white">Thiết Kế </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
          Web
        </span>
        <span className="text-white"> & </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
          Ứng Dụng
        </span>
        <br />
        <span className="text-white">Chuyên Nghiệp</span>
      </h1>
      <p className="text-xl md:text-2xl text-blue-100/90 mb-10 leading-relaxed italic">
        Giải pháp số tối ưu cho doanh nghiệp của bạn.
      </p>
      <div className="flex flex-col sm:flex-row gap-5">
        <button 
          onClick={() => window.location.href = '/contact'} 
          className="group bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center space-x-3 hover:scale-105 shadow-xl border border-red-400"
        >
          <span>Nhận Tư Vấn</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <button 
          onClick={() => scrollToSection('portfolio')} 
          className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/10 transition-all hover:scale-105"
        >
          Xem Dự Án
        </button>
      </div>
    </div>
  );
}

export default HeroContent;
