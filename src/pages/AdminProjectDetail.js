// src/pages/AdminProjectDetail.js
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, MessageSquare, FolderKanban, LogOut, 
  ArrowLeft, Edit, Trash2, CheckCircle, Calendar, 
  DollarSign, Users, Clock, TrendingUp, Code, 
  MessageCircle, Plus, ExternalLink 
} from 'lucide-react';

function AdminProjectDetail() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
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

    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    fetchProjectDetail(id);
  }, []);

  const fetchProjectDetail = async (id) => {
    const token = localStorage.getItem('adminToken');
    
    console.log('🔍 Fetching project with ID:', id);
    
    try {
      const response = await fetch(`https://main-landing-page-backend-production.up.railway.app/api/projects/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        console.error('❌ Failed to fetch project - Status:', response.status);
        const errorData = await response.text();
        console.error('Error data:', errorData);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('✅ Project data:', data);
      setProject(data.data);
    } catch (error) {
      console.error('❌ Error fetching project:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    window.location.href = '/admin/login';
  };

  const handleEdit = () => {
    window.location.href = `/admin/projects/edit/${project._id}`;
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `⚠️ Bạn có chắc muốn xóa dự án "${project.title}"?\n\nHành động này KHÔNG THỂ hoàn tác!`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`https://main-landing-page-backend-production.up.railway.app/api/projects/${project._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Đã xóa dự án thành công!');
        window.location.href = '/admin/projects';
      } else {
        alert('❌ Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('❌ Lỗi kết nối server!');
    }
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
      <span className={`px-4 py-2 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const getMilestoneStatusColor = (status) => {
    const colors = {
      'pending': 'text-yellow-400',
      'in-progress': 'text-blue-400',
      'completed': 'text-green-400'
    };
    return colors[status] || colors.pending;
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

  const formatDateTime = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          <p className="text-gray-400 mt-4">Đang tải chi tiết dự án...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen bg-gray-900 items-center justify-center">
        <div className="text-center">
          <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Không tìm thấy dự án</h3>
          <a href="/admin/projects" className="text-cyan-400 hover:text-cyan-300">
            ← Quay lại danh sách
          </a>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-8">
            <a href="/admin/projects" className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại danh sách</span>
            </a>

            <div className="flex items-center space-x-3">
              <button 
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Chỉnh sửa</span>
              </button>
              <button 
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa</span>
              </button>
            </div>
          </div>

          {/* Project Header */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-8 border border-cyan-500/30 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
                <p className="text-gray-400 text-lg">#{project.projectCode}</p>
              </div>
              {getStatusBadge(project.status)}
            </div>
            <p className="text-gray-300 text-lg mb-6">{project.description}</p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Tiến độ dự án</span>
                <span className="text-lg font-bold text-cyan-400">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Client Info */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-cyan-400" />
                  Thông tin khách hàng
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Tên khách hàng</p>
                    <p className="text-white font-medium">{project.clientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <p className="text-white font-medium">{project.clientEmail}</p>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
                    Milestones
                  </h3>
                  <button className="flex items-center space-x-2 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Thêm</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0">
                      {index < project.milestones.length - 1 && (
                        <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-700"></div>
                      )}
                      
                      <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${
                        milestone.status === 'completed' ? 'bg-green-500 border-green-400' : 
                        milestone.status === 'in-progress' ? 'bg-blue-500 border-blue-400' : 
                        'bg-gray-700 border-gray-600'
                      }`}></div>

                      <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-900/70 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-semibold">{milestone.title}</h4>
                          <span className={`text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                            {milestone.status === 'completed' ? '✓ Hoàn thành' : 
                             milestone.status === 'in-progress' ? '⟳ Đang làm' : '○ Chờ'}
                          </span>
                        </div>
                        {milestone.description && (
                          <p className="text-gray-400 text-sm mb-2">{milestone.description}</p>
                        )}
                        {milestone.completedAt && (
                          <p className="text-green-400 text-xs">✓ Hoàn thành: {formatDate(milestone.completedAt)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Updates */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-cyan-400" />
                    Cập nhật hàng ngày
                  </h3>
                  <button className="flex items-center space-x-2 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Thêm</span>
                  </button>
                </div>

                {project.dailyUpdates.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">Chưa có cập nhật nào</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {project.dailyUpdates.slice().reverse().map((update, index) => (
                      <div key={index} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-900/70 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-gray-400 text-xs">{formatDateTime(update.date)}</p>
                          {update.progress && (
                            <span className="text-cyan-400 text-xs font-medium">{update.progress}%</span>
                          )}
                        </div>
                        <p className="text-white">{update.update}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Tổng quan</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Ngân sách</span>
                    </div>
                    <p className="text-white font-semibold text-lg">{formatCurrency(project.budget)}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Ngày bắt đầu</span>
                    </div>
                    <p className="text-white font-medium">{formatDate(project.startDate)}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Dự kiến hoàn thành</span>
                    </div>
                    <p className="text-white font-medium">{formatDate(project.estimatedEndDate)}</p>
                  </div>

                  {project.actualEndDate && (
                    <div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Hoàn thành thực tế</span>
                      </div>
                      <p className="text-green-400 font-medium">{formatDate(project.actualEndDate)}</p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <Clock className="w-4 h-4" />
                      <span>Loại dự án</span>
                    </div>
                    <p className="text-white font-medium capitalize">{project.projectType.replace('-', ' ')}</p>
                  </div>
                </div>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Công nghệ
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.notes && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-3">Ghi chú</h3>
                  <p className="text-gray-400 text-sm">{project.notes}</p>
                </div>
              )}

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-lg font-bold text-white mb-3">Link theo dõi công khai</h3>
                <a href={`/track/${project.projectCode}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-cyan-400 hover:text-cyan-300 transition-colors">
                  <span className="text-sm font-mono">/{project.projectCode}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-gray-400 text-xs mt-2">Chia sẻ link này với khách hàng để họ theo dõi tiến độ</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminProjectDetail