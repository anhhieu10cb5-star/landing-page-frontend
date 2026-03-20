import React from 'react';
import { Calendar, DollarSign, FileText, ExternalLink } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const formatStatus = (status) => {
  const m = { 'in-progress': 'Đang làm', 'on-hold': 'Tạm dừng', 'pending': 'Chờ xử lý', 'completed': 'Hoàn thành', 'cancelled': 'Đã hủy' };
  return m[status?.toLowerCase()] || status;
};

const formatProjectType = (type) => {
  const m = { 'website': 'Website', 'mobile-app': 'Mobile App', 'web-app': 'Web App', 'ecommerce': 'E-Commerce', 'landing-page': 'Landing Page', 'backend': 'Backend API' };
  return m[type] || type;
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed': return 'bg-emerald-500';
    case 'in-progress': case 'in progress': return 'bg-blue-500';
    case 'pending': return 'bg-yellow-400';
    default: return 'bg-gray-400';
  }
};

const TrackingProjectCard = ({ project }) => (
  <div className="space-y-0">
    {/* Blue header card */}
    <div className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-2xl font-black">{project.title || project.projectName}</h1>
          <p className="text-sm text-blue-200 font-mono">#{project.projectCode}</p>
        </div>
        <span className={`${getStatusColor(project.status)} px-3 py-1.5 rounded-full text-white font-semibold text-xs`}>
          {formatStatus(project.status)}
        </span>
      </div>
      {project.description && <p className="text-blue-100 text-sm mt-2 mb-4">{project.description}</p>}

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-blue-200">Tiến độ dự án</span>
          <span className="text-lg font-black">{project.progress || 0}%</span>
        </div>
        <div className="w-full bg-blue-900/40 rounded-full h-2.5 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${project.progress || 0}%` }}></div>
        </div>
      </div>
    </div>

    {/* Thông tin khách hàng row */}
    <div className="bg-white border border-gray-200 rounded-2xl p-5 mt-6 flex flex-wrap gap-6">
      <div className="flex-1 min-w-[200px]">
        <p className="text-xs text-gray-400 mb-0.5">Tên khách hàng</p>
        <p className="font-semibold text-gray-900">{project.clientName}</p>
      </div>
      <div className="flex-1 min-w-[200px]">
        <p className="text-xs text-gray-400 mb-0.5">Email</p>
        <p className="font-semibold text-gray-900">{project.clientEmail}</p>
      </div>
    </div>

    {/* 2 columns: left milestones/updates, right overview */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Left */}
      <div className="lg:col-span-2 space-y-6">
        {/* Milestones */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center"><span className="mr-2">📍</span> Milestones</h3>
          </div>
          {project.milestones && project.milestones.length > 0 ? (
            <div className="space-y-3">
              {project.milestones.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{m.title || m.name}</p>
                  {m.description && <p className="text-xs text-gray-500 mt-1">{m.description}</p>}
                  <div className="flex items-center space-x-2 mt-2 text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                      m.status?.toLowerCase() === 'completed' ? 'bg-emerald-100 text-emerald-700'
                      : m.status?.toLowerCase().includes('progress') ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                    }`}>{formatStatus(m.status)}</span>
                    {m.dueDate && <span className="text-gray-400"><Calendar className="w-3 h-3 inline mr-1" />{formatDate(m.dueDate)}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">Chưa có cập nhật nào</div>
          )}
        </div>

        {/* Daily Updates */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center"><span className="mr-2">📝</span> Cập nhật hàng ngày</h3>
          </div>
          {project.dailyUpdates && project.dailyUpdates.length > 0 ? (
            <div className="space-y-3">
              {project.dailyUpdates.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map((u, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800 text-sm">{u.update || u.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(u.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">Chưa có cập nhật nào</div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="font-bold text-gray-900 mb-4">Tổng quan</h3>
          <div className="space-y-4 text-sm">
            {project.budget && (
              <div>
                <p className="text-gray-400 flex items-center text-xs"><DollarSign className="w-3.5 h-3.5 mr-1" /> Ngân sách</p>
                <p className="font-bold text-gray-900 text-lg">{project.budget.toLocaleString('vi-VN')} đ</p>
              </div>
            )}
            <div>
              <p className="text-gray-400 flex items-center text-xs"><Calendar className="w-3.5 h-3.5 mr-1" /> Ngày bắt đầu</p>
              <p className="font-semibold text-gray-900">{formatDate(project.startDate)}</p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center text-xs"><Calendar className="w-3.5 h-3.5 mr-1" /> Dự kiến hoàn thành</p>
              <p className="font-semibold text-gray-900">{formatDate(project.estimatedEndDate || project.endDate)}</p>
            </div>
            <div>
              <p className="text-gray-400 flex items-center text-xs"><FileText className="w-3.5 h-3.5 mr-1" /> Loại dự án</p>
              <p className="font-semibold text-gray-900">{formatProjectType(project.projectType || project.type)}</p>
            </div>
          </div>
        </div>

        {project.notes && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-2">Ghi chú</h3>
            <p className="text-gray-500 text-sm">{project.notes}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default TrackingProjectCard;
