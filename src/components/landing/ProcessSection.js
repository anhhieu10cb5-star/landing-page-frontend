import React from 'react';
import { MessageSquare, FileText, Palette, CreditCard, Code, TestTube, CheckCircle, Rocket, HeartHandshake } from 'lucide-react';

const steps = [
  { step: 1, icon: MessageSquare, title: 'Tư vấn và đánh giá sơ bộ dự án', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
  { step: 2, icon: FileText, title: 'Báo giá chi tiết và ký hợp đồng', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50' },
  { step: 3, icon: Palette, title: 'Làm demo giao diện', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
  { step: 4, icon: CreditCard, title: 'Nhận thanh toán trước 20% tổng giá của dự án', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50' },
  { step: 5, icon: Code, title: 'Tiến hành làm 50% dự án - báo cáo tiến độ hằng ngày trên website', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
  { step: 6, icon: TestTube, title: 'Cho khách kiểm thử - nhận thêm 30% tổng giá của dự án', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50' },
  { step: 7, icon: CheckCircle, title: 'Tiến hành làm hoàn thiện dự án - giao khách hàng kiểm thử', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
  { step: 8, icon: Rocket, title: 'Nhận 50% số tiền còn lại và tiến hành bàn giao dự án, mã nguồn, setup', color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50' }
];

function ProcessSection({ lang = 'vi' }) {
  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quy Trình Làm Việc</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">8 bước rõ ràng, minh bạch - Đảm bảo dự án của bạn được thực hiện chuyên nghiệp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.slice(0, 4).map((item, index) => (
            <div key={index} className={`${item.bg} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 group min-h-[180px]`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-bold mb-3 shadow-sm">
                Bước {item.step}
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-snug">{item.title}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.slice(4, 8).map((item, index) => (
            <div key={index} className={`${item.bg} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 group min-h-[180px]`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-gray-700 text-xs font-bold mb-3 shadow-sm">
                Bước {item.step}
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-snug">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* Thanh hỗ trợ - đổi sang xanh dương */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Hỗ trợ bảo hành - nâng cấp lâu dài (nếu có)</h3>
                <p className="text-blue-100">Cam kết đồng hành cùng bạn sau khi bàn giao sản phẩm</p>
              </div>
            </div>
            <a href="#contact" className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105">
              Liên Hệ Ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
