// src/utils/translations.js

export const translations = {
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
      btnPortfolio: 'Xem Portfolio',
      tracker: {
        label: 'Xem tiến độ dự án của bạn',
        placeholder: 'Nhập mã dự án...',
        button: 'Xem'
      }
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
      note: {
        priceChange: '💡 Giá có thể thay đổi tùy độ phức tạp của dự án',
        contact: 'Liên hệ để được tư vấn chi tiết và báo giá chính xác nhất!'
      },
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
      ],
      cta: 'Bắt đầu dự án ngay'
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
      availability: '🟢 Đang nhận dự án mới',
      worldwideService: '🌍 Phục vụ khách hàng toàn cầu - Việt Nam, USA, Europe, Asia',
      allRights: 'Mọi quyền được bảo lưu.',
      services: 'Dịch vụ',
      quickLinks: 'Liên kết',
      getInTouch: 'Liên hệ',
      privacyPolicy: 'Chính sách bảo mật',
      termsOfService: 'Điều khoản dịch vụ'
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
      btnPortfolio: 'View Portfolio',
      tracker: {
        label: 'Track Your Project Progress',
        placeholder: 'Enter project code...',
        button: 'View'
      }
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
      note: {
        priceChange: '💡 Prices may vary based on project complexity',
        contact: 'Contact for detailed consultation and accurate quote!'
      },
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
      ],
      cta: 'Start Your Project Now'
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
      availability: '🟢 Currently accepting new projects',
      worldwideService: '🌍 Serving clients worldwide - Vietnam, USA, Europe, Asia',
      allRights: 'All rights reserved.',
      services: 'Services',
      quickLinks: 'Quick Links',
      getInTouch: 'Get in Touch',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service'
    }
  }
};