import React from 'react';
import { Monitor, Smartphone, ShoppingCart, MapPin, Headphones } from 'lucide-react';

function ServiceBar({ lang }) {
  const services = [
    { 
      icon: Monitor, 
      textVi: 'Thiết Kế Website',
      textEn: 'Website Design',
      subVi: 'Chuẩn SEO & Hiện Đại',
      subEn: 'SEO & Modern'
    },
    { 
      icon: Smartphone, 
      textVi: 'Phát Triển Ứng Dụng',
      textEn: 'App Development',
      subVi: 'App iOS & Android',
      subEn: 'iOS & Android'
    },
    { 
      icon: ShoppingCart, 
      textVi: 'Giải Pháp Số',
      textEn: 'Digital Solutions',
      subVi: 'Chuyển Đổi Số',
      subEn: 'Digital Transform'
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-wrap justify-center gap-8">
      {services.map((service, index) => (
        <div key={index} className="flex items-center space-x-4 group cursor-pointer">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <service.icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {lang === 'vi' ? service.textVi : service.textEn}
            </p>
            <p className="text-sm text-gray-500">
              {lang === 'vi' ? service.subVi : service.subEn}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceBar;
