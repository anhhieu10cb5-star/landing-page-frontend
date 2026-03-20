import React from 'react';

function StatsBar({ lang }) {
  const stats = [
    { number: '50+', labelVi: 'Dự Án Hoàn Thành', labelEn: 'Projects Done' },
    { number: '2+', labelVi: 'Năm Kinh Nghiệm', labelEn: 'Years Experience' },
    { number: '30+', labelVi: 'Khách Hàng Tin Tưởng', labelEn: 'Happy Clients' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-16 py-12">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <p className="text-5xl sm:text-6xl font-black text-white">
            {stat.number}
          </p>
          <p className="text-white/80 font-medium mt-2 text-lg">
            {lang === 'vi' ? stat.labelVi : stat.labelEn}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
