import React from 'react';
import { Shield, Award, HeartHandshake, Palette, Clock, Headphones } from 'lucide-react';

function ServicesSection() {
  const whyChooseUs = [
    { icon: Shield, title: 'Bảo Mật Tuyệt Đối', desc: 'Mã nguồn được bảo vệ, dữ liệu khách hàng được mã hóa và bảo mật theo tiêu chuẩn quốc tế.' },
    { icon: Award, title: 'Uy Tín Hàng Đầu', desc: 'Đã hoàn thành hàng trăm dự án với đánh giá 5 sao từ khách hàng trong và ngoài nước.' },
    { icon: Palette, title: 'Thiết Kế Chuyên Nghiệp', desc: 'Giao diện hiện đại, thẩm mỹ cao, tối ưu trải nghiệm người dùng trên mọi thiết bị.' },
    { icon: HeartHandshake, title: 'Tư Vấn Tận Tình', desc: 'Đội ngũ tư vấn nhiệt tình, lắng nghe và đưa ra giải pháp phù hợp nhất cho bạn.' },
    { icon: Clock, title: 'Đúng Tiến Độ', desc: 'Cam kết bàn giao đúng hạn, cập nhật tiến độ minh bạch qua hệ thống tracking.' },
    { icon: Headphones, title: 'Hỗ Trợ 24/7', desc: 'Luôn sẵn sàng hỗ trợ kỹ thuật, bảo trì và nâng cấp sau khi bàn giao sản phẩm.' }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold text-gray-900">Tại Sao Chọn Chúng Tôi?</h2>
        </div>
        
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg">Cam kết mang đến sản phẩm chất lượng và dịch vụ tốt nhất</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats bar - đổi sang xanh dương */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-white mb-2">50+</div>
              <div className="text-blue-100 font-medium">Dự Án Hoàn Thành</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">100%</div>
              <div className="text-blue-100 font-medium">Khách Hàng Hài Lòng</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">24/7</div>
              <div className="text-blue-100 font-medium">Hỗ Trợ Kỹ Thuật</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2">3+</div>
              <div className="text-blue-100 font-medium">Năm Kinh Nghiệm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
