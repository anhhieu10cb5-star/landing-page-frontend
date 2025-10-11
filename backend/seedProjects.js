// backend/seedProjects.js
// Script để tạo mock data cho projects
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./src/models/Project');

const MONGODB_URI = process.env.MONGODB_URI;

const mockProjects = [
  {
    projectCode: 'COFFEE2025',
    clientName: 'Nguyễn Văn Minh',
    clientEmail: 'nguyenvanminh@gmail.com',
    projectType: 'website',
    title: 'Website Bán Hàng - Coffee Shop',
    description: 'Website bán cà phê online với tích hợp thanh toán, quản lý đơn hàng, và blog chia sẻ kiến thức về cà phê.',
    status: 'in-progress',
    progress: 60,
    startDate: new Date('2025-09-15'),
    estimatedEndDate: new Date('2025-11-15'),
    budget: 25000000,
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    notes: 'Client muốn UI hiện đại, trẻ trung. Ưu tiên mobile-first design.',
    milestones: [
      {
        title: 'Thiết kế UI/UX',
        description: 'Hoàn thành wireframe và mockup',
        status: 'completed',
        completedAt: new Date('2025-09-24')
      },
      {
        title: 'Phát triển Frontend',
        description: 'Code giao diện người dùng với React',
        status: 'completed',
        completedAt: new Date('2025-10-09')
      },
      {
        title: 'Phát triển Backend & Database',
        description: 'API, database schema, authentication',
        status: 'in-progress',
        completedAt: null
      },
      {
        title: 'Testing & Deployment',
        description: 'Kiểm thử và deploy lên production',
        status: 'pending',
        completedAt: null
      }
    ],
    dailyUpdates: [
      {
        date: new Date('2025-10-08'),
        update: 'Hoàn thành trang Product Listing với filter và search',
        progress: 50
      },
      {
        date: new Date('2025-10-09'),
        update: 'Tích hợp Shopping Cart và Checkout flow',
        progress: 55
      },
      {
        date: new Date('2025-10-10'),
        update: 'Code API endpoints cho Products và Orders',
        progress: 60
      },
      {
        date: new Date('2025-10-11'),
        update: 'Đang làm Authentication với JWT và User Profile',
        progress: 60
      }
    ]
  },
  {
    projectCode: 'SPA2025',
    clientName: 'Trần Thị Mai',
    clientEmail: 'tranthimai.spa@gmail.com',
    projectType: 'mobile-app',
    title: 'Mobile App - Đặt Lịch Spa',
    description: 'Ứng dụng mobile (iOS & Android) cho spa, cho phép khách hàng đặt lịch, xem dịch vụ, thanh toán online và tích điểm thành viên.',
    status: 'completed',
    progress: 100,
    startDate: new Date('2025-07-01'),
    estimatedEndDate: new Date('2025-10-01'),
    actualEndDate: new Date('2025-09-28'),
    budget: 55000000,
    technologies: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'MongoDB', 'VNPay'],
    notes: 'Dự án hoàn thành đúng hạn. Client rất hài lòng!',
    milestones: [
      {
        title: 'Phân tích yêu cầu & Thiết kế',
        description: 'Gathering requirements, wireframes, UI design',
        status: 'completed',
        completedAt: new Date('2025-07-14')
      },
      {
        title: 'Phát triển Frontend (Flutter)',
        description: 'Code UI/UX với Flutter framework',
        status: 'completed',
        completedAt: new Date('2025-08-13')
      },
      {
        title: 'Backend API & Database',
        description: 'Node.js API, MongoDB, payment gateway integration',
        status: 'completed',
        completedAt: new Date('2025-08-28')
      },
      {
        title: 'Testing & QA',
        description: 'Unit testing, integration testing, UAT',
        status: 'completed',
        completedAt: new Date('2025-09-14')
      },
      {
        title: 'Deploy lên Store',
        description: 'Publish to App Store & Google Play',
        status: 'completed',
        completedAt: new Date('2025-09-28')
      }
    ],
    dailyUpdates: [
      {
        date: new Date('2025-09-25'),
        update: 'Đã submit app lên App Store và Google Play để review',
        progress: 95
      },
      {
        date: new Date('2025-09-27'),
        update: 'App được approve bởi cả 2 stores',
        progress: 98
      },
      {
        date: new Date('2025-09-28'),
        update: 'App đã live trên cả iOS và Android! 🎉',
        progress: 100
      }
    ]
  },
  {
    projectCode: 'EDTECH2025',
    clientName: 'Lê Hoàng Nam',
    clientEmail: 'lehoangnam.startup@gmail.com',
    projectType: 'landing-page',
    title: 'Landing Page - Startup EdTech',
    description: 'Landing page cho startup giáo dục công nghệ, giới thiệu khóa học, đăng ký trial, tích hợp email marketing.',
    status: 'pending',
    progress: 0,
    startDate: new Date('2025-10-20'),
    estimatedEndDate: new Date('2025-11-10'),
    budget: 8000000,
    technologies: ['React', 'Tailwind CSS', 'EmailJS', 'Vercel'],
    notes: 'Dự án mới, chưa bắt đầu. Kick-off meeting ngày 21/10.',
    milestones: [
      {
        title: 'Kick-off Meeting & Brief',
        description: 'Họp với client để xác định requirements',
        status: 'pending',
        completedAt: null
      },
      {
        title: 'Thiết kế UI/UX',
        description: 'Wireframe và design mockup',
        status: 'pending',
        completedAt: null
      },
      {
        title: 'Development',
        description: 'Code landing page với React + Tailwind',
        status: 'pending',
        completedAt: null
      },
      {
        title: 'Deploy & Handover',
        description: 'Deploy lên hosting và bàn giao cho client',
        status: 'pending',
        completedAt: null
      }
    ],
    dailyUpdates: []
  },
  {
    projectCode: 'RESTAURANT2025',
    clientName: 'Phạm Minh Quân',
    clientEmail: 'phamminhquan.food@gmail.com',
    projectType: 'web-app',
    title: 'Web App - Quản Lý Nhà Hàng',
    description: 'Hệ thống quản lý nhà hàng: đặt bàn online, menu điện tử, quản lý order, báo cáo doanh thu, quản lý nhân viên.',
    status: 'in-progress',
    progress: 45,
    startDate: new Date('2025-09-01'),
    estimatedEndDate: new Date('2025-11-30'),
    budget: 42000000,
    technologies: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Socket.io'],
    notes: 'Hệ thống phức tạp, cần real-time updates. Đang trong giai đoạn phát triển backend.',
    milestones: [
      {
        title: 'Phân tích & Thiết kế Database',
        description: 'ER diagram, database schema design',
        status: 'completed',
        completedAt: new Date('2025-09-09')
      },
      {
        title: 'UI/UX Design',
        description: 'Design giao diện admin và customer-facing',
        status: 'completed',
        completedAt: new Date('2025-09-24')
      },
      {
        title: 'Backend Development',
        description: 'API endpoints, authentication, authorization',
        status: 'in-progress',
        completedAt: null
      },
      {
        title: 'Frontend Development',
        description: 'Admin panel và customer interface',
        status: 'pending',
        completedAt: null
      },
      {
        title: 'Testing & Deployment',
        description: 'Testing, bug fixes, deploy',
        status: 'pending',
        completedAt: null
      }
    ],
    dailyUpdates: [
      {
        date: new Date('2025-10-09'),
        update: 'Hoàn thành API cho Menu Management (CRUD operations)',
        progress: 40
      },
      {
        date: new Date('2025-10-10'),
        update: 'Code API cho Table Reservation và Order Processing',
        progress: 43
      },
      {
        date: new Date('2025-10-11'),
        update: 'Đang làm Payment Integration với VNPay',
        progress: 45
      }
    ]
  }
];

async function seedProjects() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Xóa tất cả projects cũ (nếu có)
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Thêm mock projects
    const createdProjects = await Project.insertMany(mockProjects);
    console.log(`✅ Created ${createdProjects.length} mock projects`);

    // In ra tracking codes
    console.log('\n📋 PROJECT CODES:');
    createdProjects.forEach(project => {
      const statusEmoji = {
        'pending': '🟡',
        'in-progress': '🔵',
        'completed': '🟢',
        'review': '🟠',
        'cancelled': '🔴'
      };
      console.log(`   ${statusEmoji[project.status]} ${project.title}`);
      console.log(`      Code: ${project.projectCode} | Progress: ${project.progress}%`);
    });

    console.log('\n✨ Seed completed successfully!');
    console.log('\n🔗 Test tracking at: http://localhost:3001');
    console.log('   Try codes: COFFEE2025, SPA2025, EDTECH2025, RESTAURANT2025\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();