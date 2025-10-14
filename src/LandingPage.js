// src/LandingPage.js - NO BACKDROP BLUR VERSION
import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Globe, Smartphone, Server, Mail, Github, MessageSquare, ExternalLink, CheckCircle, Star, ArrowRight, Check, ChevronDown } from 'lucide-react';
import ContactForm from './components/ContactForm';

function LandingPage() {
  const [lang, setLang] = useState('vi');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [projectCode, setProjectCode] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

 const handleProjectCodeSubmit = (e) => {
  e.preventDefault();
  if (projectCode.trim()) {
    window.location.href = `/track/${projectCode.trim().toUpperCase()}`;
  }
};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const fullText = lang === 'vi' ? 'Chuyên viên Mobile & Web' : 'Mobile & Web Specialist';
    let currentIndex = 0;
    setDisplayedText('');
    setIsTypingComplete(false);
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [lang]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const content = {
    vi: {
      nav: {
        services: 'Dịch vụ',
        portfolio: 'Portfolio',
        pricing: 'Bảng giá',
        faq: 'FAQ',
        contact: 'Liên hệ'
      },
      hero: {
        title: 'Full-Stack Developer',
        subtitle: 'Chuyên viên Mobile & Web',
        description: 'Phát triển mọi loại ứng dụng: Mobile App (Flutter), Website, Web App (React/Next.js), Backend API (Node.js), Landing Page, E-Commerce. Không làm game.',
        btnSwitch: 'Switch to English',
        btnCTA: 'Bắt đầu dự án',
        btnPortfolio: 'Xem Portfolio'
      },
      services: {
        title: 'Dịch Vụ Phát Triển Phần Mềm',
        subtitle: 'Tất cả các loại ứng dụng (trừ game) - Từ ý tưởng đến sản phẩm hoàn chỉnh',
        mobile: {
          title: 'Mobile App (Flutter)',
          desc: 'Ứng dụng di động iOS & Android từ một codebase duy nhất. Performance mượt mà như native app, tiết kiệm thời gian và chi phí phát triển.'
        },
        web: {
          title: 'Website & Web App',
          desc: 'Website/Web app hiện đại với React/Next.js. SEO-friendly, tốc độ nhanh, responsive hoàn hảo mọi thiết bị. Admin panel, dashboard, portal.'
        },
        backend: {
          title: 'Backend & API',
          desc: 'RESTful API với Node.js/Express. Scalable, bảo mật cao, có documentation đầy đủ. Tích hợp database, cloud services, payment gateway.'
        },
        landing: {
          title: 'Landing Page & E-Commerce',
          desc: 'Landing page conversion cao, web shop, cửa hàng online. Tối ưu cho marketing, SEO, tích hợp thanh toán, quản lý đơn hàng.'
        }
      },
      portfolio: {
        title: 'Portfolio',
        subtitle: 'Một số dự án đã hoàn thành cho khách hàng trong và ngoài nước',
        viewProject: 'Xem chi tiết',
        projects: [
          {
            title: 'E-Commerce Mobile App',
            desc: 'Ứng dụng mua sắm online với 50K+ downloads. Tích hợp thanh toán, chat real-time, push notifications.',
            tech: ['Flutter', 'Firebase', 'Stripe', 'Node.js'],
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
          },
          {
            title: 'SaaS Dashboard B2B',
            desc: 'Dashboard quản lý doanh nghiệp với analytics real-time, role-based access, data visualization.',
            tech: ['Next.js', 'React', 'Chart.js', 'PostgreSQL'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
          },
          {
            title: 'Restaurant Booking System',
            desc: 'Hệ thống đặt bàn nhà hàng toàn diện. QR menu, online booking, payment processing, kitchen display.',
            tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'
          },
          {
            title: 'Fitness Tracking App',
            desc: 'App theo dõi tập luyện và dinh dưỡng. Workout plans, calorie tracking, progress charts.',
            tech: ['Flutter', 'Dart', 'Firebase', 'ML Kit'],
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop'
          },
          {
            title: 'Real Estate Platform',
            desc: 'Nền tảng mua bán bất động sản. Advanced search, Google Maps integration, virtual tours.',
            tech: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop'
          },
          {
            title: 'Learning Management System',
            desc: 'LMS cho giáo dục online. Video streaming, quizzes, progress tracking, certificates.',
            tech: ['Next.js', 'Express', 'MySQL', 'AWS'],
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop'
          }
        ]
      },
      pricing: {
        title: 'Bảng Giá',
        subtitle: 'Gói dịch vụ linh hoạt phù hợp với mọi ngân sách',
        currency: 'đ',
        contact: 'Liên hệ',
        perProject: '/dự án',
        plans: [
          {
            name: 'Landing Page',
            price: '5-10 triệu',
            description: 'Phù hợp cho startup, doanh nghiệp nhỏ',
            gradient: 'from-pink-900/50 via-purple-900/50 to-indigo-900/50',
            iconBg: 'from-pink-500 to-purple-600',
            features: [
              'Giao diện hiển thị tốt mọi thiết bị',
              '3-5 mục nội dung',
              'Form liên hệ',
              'Tối ưu Google tìm kiếm cơ bản',
              'Thời gian: 3-5 ngày',
              'Hỗ trợ 1 tháng'
            ]
          },
          {
            name: 'Website/Web App',
            price: '15-50 triệu',
            description: 'Phù hợp cho doanh nghiệp vừa và lớn',
            gradient: 'from-cyan-900/50 via-blue-900/50 to-purple-900/50',
            iconBg: 'from-cyan-500 to-blue-600',
            features: [
              'Giao diện hiển thị hoàn hảo mọi màn hình',
              'Trang quản trị riêng',
              'Kết nối cơ sở dữ liệu',
              'Xây dựng hệ thống API',
              'Thời gian: 5-10 ngày',
              'Hỗ trợ 3 tháng',
              'Tối ưu Google tìm kiếm nâng cao',
              'Tích hợp công cụ thống kê'
            ]
          },
          {
            name: 'Mobile App',
            price: '30-100 triệu',
            description: 'Ứng dụng iOS & Android chuyên nghiệp',
            gradient: 'from-emerald-900/50 via-teal-900/50 to-cyan-900/50',
            iconBg: 'from-emerald-500 to-teal-600',
            features: [
              'Chạy trên cả iOS & Android',
              'Hệ thống API riêng',
              'Cơ sở dữ liệu',
              'Thông báo đẩy',
              'Mua hàng trong ứng dụng',
              'Thời gian: 10-20 ngày',
              'Hỗ trợ 6 tháng',
              'Đưa lên App Store & CH Play'
            ]
          }
        ]
      },
      faq: {
        title: 'Câu hỏi thường gặp',
        subtitle: 'Những thắc mắc phổ biến từ khách hàng',
        questions: [
          {
            q: 'Thời gian hoàn thành dự án là bao lâu?',
            a: 'Mình làm rất nhanh! Landing page: 3-5 ngày, Website/Web App: 5-10 ngày, Mobile App: 10-20 ngày tùy độ phức tạp. Với kinh nghiệm và quy trình tối ưu, mình có thể deliver code chất lượng cao trong thời gian ngắn. Khi cả hai bên đồng ý làm, mình sẽ cấp cho bạn một mã dự án. Mình sẽ cập nhật tiến độ dự án vào cuối mỗi ngày, bạn có thể xem bằng cách nhập mã dự án ở đầu trang.'
          },
          {
            q: 'Hình thức thanh toán như thế nào?',
            a: 'Thường chia làm 3 đợt: 30% khi bắt đầu, 40% khi hoàn thành 50% công việc, 30% còn lại khi bàn giao. Có thể linh hoạt theo thỏa thuận.'
          },
          {
            q: 'Có hỗ trợ sau khi bàn giao không?',
            a: 'Có! Mình hỗ trợ fix bugs miễn phí trong 1-6 tháng tùy gói. Ngoài ra có thể ký hợp đồng maintenance dài hạn nếu cần.'
          },
          {
            q: 'Source code có được bàn giao không?',
            a: 'Có, sau khi thanh toán đầy đủ, bạn sẽ nhận toàn bộ source code, tài liệu hướng dẫn, và quyền sở hữu hoàn toàn.'
          },
          {
            q: 'Có làm việc với khách nước ngoài không?',
            a: 'Có! Mình có kinh nghiệm làm việc với khách quốc tế, giao tiếp tiếng Anh tốt, sử dụng các công cụ như Slack, Jira, Trello.'
          },
          {
            q: 'Công nghệ nào được sử dụng?',
            a: 'Frontend: React, Next.js, Flutter. Backend: Node.js, Express. Database: MongoDB, PostgreSQL, Firebase. Cloud: AWS, Vercel, Netlify.'
          }
        ]
      },
      about: {
        title: 'Tại sao chọn tôi?',
        subtitle: 'Cam kết chất lượng và chuyên nghiệp',
        features: [
          '✅ Làm được: Mobile App chạy trên cả iOS & Android (Flutter), Website, Web App, Backend, Landing Page, Web Shop/E-Commerce',
          '❌ Không làm: Game development',
          '💻 Code sạch đẹp, dễ bảo trì và mở rộng trong tương lai',
          '📞 Giao tiếp nhanh, báo cáo tiến độ hàng ngày',
          '⏰ Đúng deadline, đảm bảo chất lượng cao',
          '🛠️ Hỗ trợ sau khi bàn giao, fix bugs miễn phí trong thời gian bảo hành'
        ]
      },
      contact: {
        title: 'Liên hệ ngay',
        subtitle: 'Sẵn sàng bắt đầu dự án của bạn',
        email: 'Email',
        telegram: 'Telegram',
        github: 'GitHub',
        emailPlaceholder: 'your@email.com',
        telegramPlaceholder: '@yourusername',
        githubPlaceholder: 'github.com/yourusername'
      },
      footer: {
        copyright: '© 2025 DevStudio. Sẵn sàng nhận dự án freelance toàn cầu.',
        availability: '🟢 Đang nhận dự án mới'
      }
    },
    en: {
      nav: {
        services: 'Services',
        portfolio: 'Portfolio',
        pricing: 'Pricing',
        faq: 'FAQ',
        contact: 'Contact'
      },
      hero: {
        title: 'Full-Stack Developer',
        subtitle: 'Mobile & Web Specialist',
        description: 'Building all types of applications: Mobile Apps (Flutter), Websites, Web Apps (React/Next.js), Backend APIs (Node.js), Landing Pages, E-Commerce. No game development.',
        btnSwitch: 'Chuyển sang Tiếng Việt',
        btnCTA: 'Start Project',
        btnPortfolio: 'View Portfolio'
      },
      services: {
        title: 'Software Development Services',
        subtitle: 'All types of applications (except games) - From concept to production',
        mobile: {
          title: 'Mobile App (Flutter)',
          desc: 'iOS & Android apps from a single codebase. Smooth native-like performance, saving development time and costs.'
        },
        web: {
          title: 'Website & Web App',
          desc: 'Modern websites/web apps with React/Next.js. SEO-friendly, fast loading, fully responsive. Admin panels, dashboards, portals.'
        },
        backend: {
          title: 'Backend & API',
          desc: 'RESTful APIs with Node.js/Express. Scalable, highly secure, fully documented. Database integration, cloud services, payment gateways.'
        },
        landing: {
          title: 'Landing Page & E-Commerce',
          desc: 'High-conversion landing pages, web shops, online stores. Marketing optimized, SEO-ready, payment integration, order management.'
        }
      },
      portfolio: {
        title: 'Portfolio',
        subtitle: 'Some completed projects for domestic and international clients',
        viewProject: 'View Details',
        projects: [
          {
            title: 'E-Commerce Mobile App',
            desc: 'Online shopping app with 50K+ downloads. Payment integration, real-time chat, push notifications.',
            tech: ['Flutter', 'Firebase', 'Stripe', 'Node.js'],
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
          },
          {
            title: 'SaaS Dashboard B2B',
            desc: 'Business management dashboard with real-time analytics, role-based access, data visualization.',
            tech: ['Next.js', 'React', 'Chart.js', 'PostgreSQL'],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
          },
          {
            title: 'Restaurant Booking System',
            desc: 'Comprehensive restaurant reservation system. QR menu, online booking, payment processing, kitchen display.',
            tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop'
          },
          {
            title: 'Fitness Tracking App',
            desc: 'Workout and nutrition tracking app. Workout plans, calorie tracking, progress charts.',
            tech: ['Flutter', 'Dart', 'Firebase', 'ML Kit'],
            image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop'
          },
          {
            title: 'Real Estate Platform',
            desc: 'Property buying/selling platform. Advanced search, Google Maps integration, virtual tours.',
            tech: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop'
          },
          {
            title: 'Learning Management System',
            desc: 'LMS for online education. Video streaming, quizzes, progress tracking, certificates.',
            tech: ['Next.js', 'Express', 'MySQL', 'AWS'],
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop'
          }
        ]
      },
      pricing: {
        title: 'Pricing',
        subtitle: 'Flexible packages to fit every budget',
        currency: '$',
        contact: 'Contact',
        perProject: '/project',
        plans: [
          {
            name: 'Landing Page',
            price: '$500-1,000',
            description: 'Perfect for startups and small businesses',
            gradient: 'from-pink-900/50 via-purple-900/50 to-indigo-900/50',
            iconBg: 'from-pink-500 to-purple-600',
            features: [
              'Responsive design',
              '3-5 sections',
              'Contact form',
              'Basic SEO',
              'Timeline: 3-5 days',
              '1 month support'
            ]
          },
          {
            name: 'Website/Web App',
            price: '$2,000-5,000',
            description: 'Ideal for medium to large businesses',
            gradient: 'from-cyan-900/50 via-blue-900/50 to-purple-900/50',
            iconBg: 'from-cyan-500 to-blue-600',
            features: [
              'Full responsive',
              'Admin panel',
              'Database integration',
              'API development',
              'Timeline: 5-10 days',
              '3 months support',
              'Advanced SEO',
              'Analytics integration'
            ]
          },
          {
            name: 'Mobile App',
            price: '$5,000-15,000',
            description: 'Professional iOS & Android applications',
            gradient: 'from-emerald-900/50 via-teal-900/50 to-cyan-900/50',
            iconBg: 'from-emerald-500 to-teal-600',
            features: [
              'Cross-platform (Flutter)',
              'Backend API',
              'Database',
              'Push notifications',
              'In-app purchases',
              'Timeline: 10-20 days',
              '6 months support',
              'Store deployment'
            ]
          }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Common questions from clients',
        questions: [
          {
            q: 'How long does it take to complete a project?',
            a: 'I work very fast! Landing page: 3-5 days, Website/Web App: 5-10 days, Mobile App: 10-20 days depending on complexity. With experience and optimized workflow, I can deliver high-quality code quickly. When we agree to work together, I will provide you with a project code. I update project progress at the end of each day, and you can track it by entering your project code at the top of the page.'
          },
          {
            q: 'What are the payment terms?',
            a: 'Usually split into 3 milestones: 30% at start, 40% at 50% completion, 30% on delivery. Can be flexible based on agreement.'
          },
          {
            q: 'Do you provide post-launch support?',
            a: 'Yes! I provide free bug fixes for 1-6 months depending on the package. Long-term maintenance contracts are also available.'
          },
          {
            q: 'Will I receive the source code?',
            a: 'Yes, after full payment, you will receive all source code, documentation, and complete ownership rights.'
          },
          {
            q: 'Do you work with international clients?',
            a: 'Yes! I have experience working with international clients, good English communication, and use tools like Slack, Jira, Trello.'
          },
          {
            q: 'What technologies do you use?',
            a: 'Frontend: React, Next.js, Flutter. Backend: Node.js, Express. Database: MongoDB, PostgreSQL, Firebase. Cloud: AWS, Vercel, Netlify.'
          }
        ]
      },
      about: {
        title: 'Why Choose Me?',
        subtitle: 'Commitment to quality and professionalism',
        features: [
          '✅ I Build: Mobile Apps (Flutter), Websites, Web Apps, Backend, Landing Pages, E-Commerce',
          '❌ I Don\'t Build: Games',
          '💻 Clean code, easy to maintain and scale',
          '📞 Fast communication, weekly progress reports',
          '⏰ On-time delivery, high quality guaranteed',
          '🛠️ Post-launch support, free bug fixes during warranty period'
        ]
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Ready to start your project',
        email: 'Email',
        telegram: 'Telegram',
        github: 'GitHub',
        emailPlaceholder: 'your@email.com',
        telegramPlaceholder: '@yourusername',
        githubPlaceholder: 'github.com/yourusername'
      },
      footer: {
        copyright: '© 2025 DevStudio. Available for freelance projects worldwide.',
        availability: '🟢 Currently accepting new projects'
      }
    }
  };

  const t = content[lang];

return (
  <div className="relative" style={{ zIndex: 10 }}>
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 border-cyan-500/30 shadow-lg shadow-cyan-500/10' : 'bg-slate-900/80 border-cyan-500/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">DevStudio</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-cyan-400 transition">{t.nav.services}</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-cyan-400 transition">{t.nav.portfolio}</button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-cyan-400 transition">{t.nav.pricing}</button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-300 hover:text-cyan-400 transition">{t.nav.faq}</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-cyan-400 transition">{t.nav.contact}</button>
              
              <button 
                onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
                className="flex items-center space-x-1 text-gray-300 hover:text-cyan-400 transition"
              >
                <Globe className="w-5 h-5" />
                <span>{lang === 'vi' ? 'EN' : 'VI'}</span>
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Project Tracker Bar */}
        <div className="w-full border-t border-cyan-500/20 bg-slate-900/90 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-cyan-300 text-sm font-semibold whitespace-nowrap flex items-center gap-2">
              <span className="text-lg">📊</span>
              {lang === 'vi' ? 'Xem tiến độ dự án của bạn' : 'Track Your Project Progress'}
            </span>
            <form onSubmit={handleProjectCodeSubmit} className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
                placeholder={lang === 'vi' ? 'Nhập mã dự án...' : 'Enter project code...'}
                className="bg-slate-800/80 border border-cyan-500/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-400 text-sm flex-1 sm:w-64 placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition text-sm whitespace-nowrap"
              >
                {lang === 'vi' ? 'Xem' : 'View'}
              </button>
            </form>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-cyan-500/20">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700">{t.nav.services}</button>
            <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700">{t.nav.portfolio}</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700">{t.nav.pricing}</button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700">{t.nav.faq}</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700">{t.nav.contact}</button>
            <button 
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700"
            >
              🌐 {lang === 'vi' ? 'English' : 'Tiếng Việt'}
            </button>
          </div>
        )}
      </nav>
      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-[70vh] flex items-center">
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight animate-fade-in" style={{
            textShadow: '0 0 30px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 1), 0 0 60px rgba(0, 0, 0, 0.7)',
            animation: 'fadeInDown 0.8s ease-out'
          }}>
            {t.hero.title}
            <br />
            <span className="text-white inline-block mt-2 font-black relative min-h-[80px]" style={{
              textShadow: '0 4px 8px rgba(0, 0, 0, 1), 0 8px 16px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)'
            }}>
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-1 h-12 md:h-16 bg-cyan-400 ml-1 animate-pulse align-middle"></span>
              )}
            </span>
          </h1>
          
          <style jsx>{`
            @keyframes fadeInDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          
          <div className="mb-8 max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl text-white font-bold leading-relaxed px-4 py-4 rounded-2xl inline-block" style={{
              textShadow: '0 4px 12px rgba(0, 0, 0, 1), 0 0 30px rgba(0, 0, 0, 0.8)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>
              {t.hero.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-5xl mx-auto">
            {[
              { icon: '📱', text: 'Mobile App (Flutter)', bg: 'from-pink-600/80 to-purple-600/80' },
              { icon: '🌐', text: 'Website/Web App', bg: 'from-blue-600/80 to-cyan-600/80' },
              { icon: '⚙️', text: 'Backend API', bg: 'from-green-600/80 to-emerald-600/80' },
              { icon: '🛒', text: 'E-Commerce', bg: 'from-orange-600/80 to-yellow-600/80' },
              { icon: '🎨', text: 'Landing Page', bg: 'from-purple-600/80 to-indigo-600/80' },
              { icon: '☁️', text: 'Cloud Deploy', bg: 'from-cyan-600/80 to-teal-600/80' }
            ].map((service, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-r ${service.bg} border-2 border-white/30 rounded-full px-5 py-2.5 flex items-center space-x-2.5 hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50`}
              >
                <span className="text-xl">{service.icon}</span>
                <span className="text-white text-sm font-bold whitespace-nowrap drop-shadow-lg">{service.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 hover:scale-105 overflow-hidden shadow-2xl shadow-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 text-xl">{t.hero.btnCTA}</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="bg-slate-800/90 border-2 border-cyan-400/60 text-cyan-200 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-cyan-500/30 hover:border-cyan-300 transition-all hover:scale-105 shadow-xl shadow-black/50"
            >
              <span className="text-xl">{t.hero.btnPortfolio}</span>
            </button>
          </div>

          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="inline-flex items-center space-x-3 bg-slate-800/90 border border-cyan-500/40 text-cyan-200 px-7 py-3.5 rounded-xl hover:bg-slate-800 hover:border-cyan-400/70 transition-all hover:scale-105 shadow-lg font-semibold"
          >
            <Globe className="w-6 h-6" />
            <span>{t.hero.btnSwitch}</span>
          </button>

          <div className="mt-16 animate-bounce">
            <div className="inline-flex flex-col items-center space-y-2">
              <span className="text-cyan-300/80 text-sm font-medium drop-shadow-lg">Scroll Down</span>
              <ChevronDown className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-4">
            <h2 className="text-4xl font-bold text-white text-center inline-block px-8 py-4 rounded-2xl" style={{
              textShadow: '0 0 40px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 1)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              border: '2px solid rgba(34, 211, 238, 0.3)'
            }}>{t.services.title}</h2>
          </div>
          <div className="flex justify-center mb-12">
            <p className="text-gray-300 text-center px-6 py-3 rounded-xl inline-block" style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>{t.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, data: t.services.mobile },
              { icon: Code, data: t.services.web },
              { icon: Server, data: t.services.backend },
              { icon: Globe, data: t.services.landing }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-slate-800/80 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition group hover:scale-105 duration-300"
              >
                <service.icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-semibold text-white mb-3">{service.data.title}</h3>
                <p className="text-gray-400 text-sm">{service.data.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-4">
            <h2 className="text-4xl font-bold text-white text-center inline-block px-8 py-4 rounded-2xl" style={{
              textShadow: '0 0 40px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 1)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              border: '2px solid rgba(34, 211, 238, 0.3)'
            }}>{t.portfolio.title}</h2>
          </div>
          <div className="flex justify-center mb-12">
            <p className="text-gray-300 text-center max-w-2xl px-6 py-3 rounded-xl inline-block" style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>{t.portfolio.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.portfolio.projects.map((project, index) => (
              <div 
                key={index}
                className="bg-slate-800/80 rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition group hover:scale-105 duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition text-sm">
                    <span>{t.portfolio.viewProject}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-4">
            <h2 className="text-4xl font-bold text-white text-center inline-block px-8 py-4 rounded-2xl" style={{
              textShadow: '0 0 40px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 1)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              border: '2px solid rgba(34, 211, 238, 0.3)'
            }}>{t.pricing.title}</h2>
          </div>
          <div className="flex justify-center mb-16">
            <p className="text-gray-300 text-center px-6 py-3 rounded-xl inline-block" style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>{t.pricing.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.pricing.plans.map((plan, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${plan.iconBg} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500`}></div>
                
                <div className={`relative bg-gradient-to-br ${plan.gradient} p-8 rounded-2xl border-2 border-white/10 hover:border-white/30 transition-all duration-500 h-full flex flex-col hover:scale-105 hover:shadow-2xl`}>
                  
                  <div className="relative z-10 flex-grow">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {plan.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-6">
                      {plan.description}
                    </p>
                    
                    <div className="mb-8">
                      <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.iconBg}`}>
                        {plan.price}
                      </span>
                      <span className="text-sm block mt-2 text-gray-300">
                        {t.pricing.perProject}
                      </span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-gradient-to-br ${plan.iconBg} shadow-lg`}>
                            <Check className="w-4 h-4 text-white font-bold" />
                          </div>
                          <span className="text-sm leading-relaxed text-white font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => scrollToSection('contact')}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 relative overflow-hidden bg-gradient-to-r ${plan.iconBg} text-white shadow-lg hover:shadow-2xl hover:scale-105 mt-auto`}
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

          <div className="mt-16 text-center">
            <p className="text-gray-300 text-sm mb-4 inline-block px-6 py-3 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>
              💡 Giá có thể thay đổi tùy độ phức tạp của dự án
            </p>
            <br />
            <p className="text-cyan-300 font-semibold inline-block px-6 py-3 rounded-xl mt-2" style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
              border: '1px solid rgba(34, 211, 238, 0.3)'
            }}>
              Liên hệ để được tư vấn chi tiết và báo giá chính xác nhất!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 inline-block px-6 py-3 rounded-2xl" style={{
              textShadow: '0 0 40px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 1), 0 8px 32px rgba(0, 0, 0, 0.8)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              border: '2px solid rgba(34, 211, 238, 0.3)'
            }}>
              {t.faq.title}
            </h2>
            <br />
            <p className="text-gray-300 text-lg mt-6 font-semibold inline-block px-6 py-3 rounded-xl" style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {t.faq.questions.map((item, index) => (
              <div 
                key={index}
                className="group bg-slate-800/80 rounded-2xl border-2 border-cyan-500/20 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex justify-between items-center p-8 text-left hover:bg-slate-800/60 transition-colors"
                >
                  <span className="text-xl font-bold text-white pr-6 leading-relaxed">{item.q}</span>
                  <ChevronDown 
                    className={`w-6 h-6 text-cyan-400 flex-shrink-0 transition-all duration-300 ${
                      openFAQ === index ? 'rotate-180 text-cyan-300' : ''
                    }`}
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8 text-gray-300 text-lg leading-relaxed border-t border-cyan-500/10 pt-6">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 inline-block px-6 py-3 rounded-2xl" style={{
              textShadow: '0 0 40px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 1), 0 8px 32px rgba(0, 0, 0, 0.8)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              border: '2px solid rgba(34, 211, 238, 0.3)'
            }}>
              {t.about.title}
            </h2>
            <br />
            <p className="text-gray-300 text-lg mt-6 font-semibold inline-block px-6 py-3 rounded-xl" style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>
              {t.about.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {t.about.features.map((feature, index) => {
              const isPositive = feature.startsWith('✅');
              const isNegative = feature.startsWith('❌');
              
              return (
                <div 
                  key={index} 
                  className={`group relative bg-gradient-to-br p-8 rounded-2xl border-2 transition-all duration-500 hover:scale-105 ${
                    isPositive 
                      ? 'from-emerald-900/40 via-green-900/40 to-teal-900/40 border-emerald-500/40 hover:border-emerald-400/70 hover:shadow-2xl hover:shadow-emerald-500/30' 
                      : isNegative
                      ? 'from-red-900/40 via-pink-900/40 to-rose-900/40 border-red-500/40 hover:border-red-400/70 hover:shadow-2xl hover:shadow-red-500/30'
                      : 'from-cyan-900/40 via-blue-900/40 to-indigo-900/40 border-cyan-500/40 hover:border-cyan-400/70 hover:shadow-2xl hover:shadow-cyan-500/30'
                  }`}
                >
                  <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 ${
                    isPositive 
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                      : isNegative
                      ? 'bg-gradient-to-r from-red-500 to-pink-500'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                  }`}></div>

                  <div className="relative flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      isPositive 
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/50' 
                        : isNegative
                        ? 'bg-gradient-to-br from-red-500 to-pink-600 shadow-lg shadow-red-500/50'
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50'
                    }`}>
                      {isPositive ? (
                        <CheckCircle className="w-7 h-7 text-white" />
                      ) : isNegative ? (
                        <X className="w-7 h-7 text-white" />
                      ) : (
                        <CheckCircle className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <span className="text-white text-xl leading-relaxed font-semibold flex-1">
                      {feature}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-16 py-6 rounded-2xl font-bold text-xl transition-all flex items-center justify-center space-x-3 hover:scale-105 overflow-hidden shadow-2xl shadow-cyan-500/50 mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">{lang === 'vi' ? 'Bắt đầu dự án ngay' : 'Start Your Project Now'}</span>
              <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 inline-block px-6 py-3 rounded-2xl" style={{
              textShadow: '0 0 40px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 1), 0 8px 32px rgba(0, 0, 0, 0.8)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              border: '2px solid rgba(34, 211, 238, 0.3)'
            }}>
              {t.contact.title}
            </h2>
            <br />
            <p className="text-gray-300 text-lg mt-6 font-semibold inline-block px-6 py-3 rounded-xl" style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7)',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.85))',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}>
              {t.contact.subtitle}
            </p>
          </div>

          <ContactForm lang={lang} />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-slate-800/80 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition hover:scale-105 duration-300">
              <Mail className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">{t.contact.email}</h3>
              <a href="mailto:your@email.com" className="text-gray-400 hover:text-cyan-400 break-all">
                {t.contact.emailPlaceholder}
              </a>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition hover:scale-105 duration-300">
              <MessageSquare className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">{t.contact.telegram}</h3>
              <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">
                {t.contact.telegramPlaceholder}
              </a>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition hover:scale-105 duration-300">
              <Github className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">{t.contact.github}</h3>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 break-all">
                {t.contact.githubPlaceholder}
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-slate-900/95 border-t border-cyan-500/20 pt-8 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-8 h-8 text-cyan-400" />
                <span className="text-2xl font-bold text-white">DevStudio</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {lang === 'vi' 
                  ? 'Phát triển ứng dụng chuyên nghiệp cho doanh nghiệp toàn cầu. Mobile App, Website, Backend API.' 
                  : 'Professional app development for global businesses. Mobile Apps, Websites, Backend APIs.'}
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-semibold">
                  {lang === 'vi' ? 'Đang nhận dự án mới' : 'Available for new projects'}
                </span>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <div className="w-1 h-6 bg-cyan-500 mr-3 rounded"></div>
                {lang === 'vi' ? 'Dịch vụ' : 'Services'}
              </h3>
              <ul className="space-y-3">
                {[
                  lang === 'vi' ? 'Mobile App Development' : 'Mobile App Development',
                  lang === 'vi' ? 'Website & Web App' : 'Website & Web App',
                  lang === 'vi' ? 'Backend API' : 'Backend API',
                  lang === 'vi' ? 'E-Commerce Solutions' : 'E-Commerce Solutions',
                  lang === 'vi' ? 'Landing Page' : 'Landing Page'
                ].map((service, i) => (
                  <li key={i}>
                    <a href="#services" className="text-gray-400 hover:text-cyan-400 transition text-sm flex items-center group">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <div className="w-1 h-6 bg-cyan-500 mr-3 rounded"></div>
                {lang === 'vi' ? 'Liên kết' : 'Quick Links'}
              </h3>
              <ul className="space-y-3">
                {[
                  { text: lang === 'vi' ? 'Portfolio' : 'Portfolio', id: 'portfolio' },
                  { text: lang === 'vi' ? 'Bảng giá' : 'Pricing', id: 'pricing' },
                  { text: lang === 'vi' ? 'FAQ' : 'FAQ', id: 'faq' },
                  { text: lang === 'vi' ? 'Liên hệ' : 'Contact', id: 'contact' }
                ].map((link, i) => (
                  <li key={i}>
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-cyan-400 transition text-sm flex items-center group"
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
              <h3 className="text-white font-bold text-lg mb-4 flex items-center">
                <div className="w-1 h-6 bg-cyan-500 mr-3 rounded"></div>
                {lang === 'vi' ? 'Liên hệ' : 'Get in Touch'}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:your@email.com" className="text-gray-400 hover:text-cyan-400 transition text-sm flex items-center group">
                    <Mail className="w-5 h-5 mr-3 text-cyan-400" />
                    <span className="group-hover:translate-x-1 transition-transform">your@email.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition text-sm flex items-center group">
                    <MessageSquare className="w-5 h-5 mr-3 text-cyan-400" />
                    <span className="group-hover:translate-x-1 transition-transform">@yourusername</span>
                  </a>
                </li>
                <li>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition text-sm flex items-center group">
                    <Github className="w-5 h-5 mr-3 text-cyan-400" />
                    <span className="group-hover:translate-x-1 transition-transform">github.com/yourusername</span>
                  </a>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex space-x-4 mt-6">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500 transition-all hover:scale-110">
                  <Github className="w-5 h-5" />
                </a>
                <a href="mailto:your@email.com" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500 transition-all hover:scale-110">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500 transition-all hover:scale-110">
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-cyan-500/20 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 DevStudio. {lang === 'vi' ? 'Mọi quyền được bảo lưu.' : 'All rights reserved.'}
              </p>
              
              <div className="flex items-center space-x-6 text-sm">
                <button className="text-gray-400 hover:text-cyan-400 transition">
                  {lang === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
                </button>
                <button className="text-gray-400 hover:text-cyan-400 transition">
                  {lang === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-3">
            <p className="text-gray-500 text-xs">
              {lang === 'vi' 
                ? '🌍 Phục vụ khách hàng toàn cầu - Việt Nam, USA, Europe, Asia' 
                : '🌍 Serving clients worldwide - Vietnam, USA, Europe, Asia'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;