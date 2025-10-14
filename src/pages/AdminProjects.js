// src/pages/AdminProjects.js
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, MessageSquare, FolderKanban, LogOut, Search, Plus, Calendar, TrendingUp, DollarSign, Users } from 'lucide-react';

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    const adminRaw = localStorage.getItem('adminData');
    if (adminRaw && adminRaw !== 'undefined' && adminRaw !== 'null') {
      try {
        const parsed = JSON.parse(adminRaw);
        setAdminData(parsed);
      } catch (err) {
        console.error('Error parsing admin data:', err);
      }
    }

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch('https://main-landing-page-backend-production.up.railway.app/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch projects');
        setProjects([]);
        setFilteredProjects([]);
        return;
      }

      const data = await response.json();
      const projectsList = data.data || [];
      setProjects(projectsList);
      setFilteredProjects(projectsList);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      setFilteredProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = projects;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [searchTerm, statusFilter, projects]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    window.location.href = '/admin/login';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Chờ xử lý' },
      'in-progress': { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Đang làm' },
      'review': { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Đang review' },
      'completed': { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Hoàn thành' },
      'cancelled': { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Đã hủy' }
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const getProjectTypeIcon = (type) => {
    const icons = {
      'landing-page': '📄',
      'website': '🌐',
      'web-app': '💻',
      'mobile-app': '📱',
      'backend': '⚙️',
      'ecommerce': '🛒'
    };
    return icons[type] || '📦';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DevStudio</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {adminData && (
          <div className="px-6 pb-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {adminData.name ? adminData.name.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {adminData.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-400">{adminData.role || 'super-admin'}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="/admin/messages" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Tin nhắn</span>
          </a>
          <a href="/admin/projects" className="flex items-center space-x-3 px-4 py-3 bg-cyan-500/10 text-cyan-400 rounded-lg">
            <FolderKanban className="w-5 h-5" />
            <span>Dự án</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Quản lý dự án</h2>
            <p className="text-gray-400">Theo dõi và quản lý tất cả các dự án</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Tổng dự án</h3>
              <p className="text-3xl font-bold text-white">{projects.length}</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Đang làm</h3>
              <p className="text-3xl font-bold text-white">
                {projects.filter(p => p.status === 'in-progress').length}
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Hoàn thành</h3>
              <p className="text-3xl font-bold text-white">
                {projects.filter(p => p.status === 'completed').length}
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Tổng giá trị</h3>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(projects.reduce((sum, p) => sum + (p.budget || 0), 0))}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên dự án, khách hàng, hoặc mã..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="in-progress">Đang làm</option>
                <option value="review">Đang review</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>

              <button 
                onClick={() => window.location.href = '/admin/projects/new'}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 text-white rounded-lg font-semibold transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Tạo dự án mới</span>
              </button>
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-400">
              <span>Hiển thị: {filteredProjects.length} / {projects.length} dự án</span>
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
              <p className="text-gray-400 mt-4">Đang tải dự án...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
              <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Chưa có dự án</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all' ? 'Không tìm thấy dự án phù hợp' : 'Bắt đầu tạo dự án mới'}
              </p>
              <button
                onClick={() => window.location.href = '/admin/projects/new'}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50 text-white rounded-lg font-semibold transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Tạo dự án đầu tiên</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div key={project._id} className="bg-gray-800 rounded-xl border-2 border-gray-700 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden transform hover:scale-105 hover:-translate-y-1">
                  <div className="p-6 border-b border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{getProjectTypeIcon(project.projectType)}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                          <p className="text-sm text-gray-400">#{project.projectCode}</p>
                        </div>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                  </div>

                  <div className="px-6 py-4 bg-gray-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Tiến độ</span>
                      <span className="text-sm font-medium text-cyan-400">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                        <Users className="w-4 h-4" />
                        <span>Khách hàng</span>
                      </div>
                      <p className="text-white font-medium">{project.clientName}</p>
                      <p className="text-gray-400 text-sm">{project.clientEmail}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Ngân sách</span>
                      </div>
                      <p className="text-white font-medium">{formatCurrency(project.budget)}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Bắt đầu</span>
                      </div>
                      <p className="text-white font-medium">{formatDate(project.startDate)}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Kết thúc</span>
                      </div>
                      <p className="text-white font-medium">{formatDate(project.estimatedEndDate)}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-400">Milestones:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">{project.milestones.filter(m => m.status === 'completed').length} hoàn thành</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-blue-400">{project.milestones.filter(m => m.status === 'in-progress').length} đang làm</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-yellow-400">{project.milestones.filter(m => m.status === 'pending').length} chờ</span>
                      </div>
                    </div>

                    <button
                      onClick={() => window.location.href = `/admin/projects/${project._id}`}
                      className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Xem chi tiết</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminProjects;