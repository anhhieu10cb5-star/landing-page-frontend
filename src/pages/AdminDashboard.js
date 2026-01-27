// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, FolderKanban, LogOut, 
  Mail, CheckCircle, Clock, TrendingUp, DollarSign
} from 'lucide-react';
import { getApiUrl, API_ENDPOINTS } from '../config';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    repliedMessages: 0,
    totalProjects: 0,
    totalValue: 0 // THÊM MỚI
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminRaw = localStorage.getItem('adminData');
    
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (adminRaw && adminRaw !== 'undefined' && adminRaw !== 'null') {
      try {
        const parsed = JSON.parse(adminRaw);
        setAdminData(parsed);
      } catch (err) {
        console.error('Invalid adminData JSON:', err);
        localStorage.removeItem('adminData');
      }
    }

    fetchDashboardData(token);
  }, [navigate]);

  const fetchDashboardData = async (token) => {
    try {
      // Fetch message stats
      const statsResponse = await fetch(getApiUrl(API_ENDPOINTS.MESSAGE_STATS), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      let messageStats = { total: 0, new: 0, replied: 0 };
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        messageStats = statsData.data || messageStats;
      }

      // Fetch recent messages
      const messagesResponse = await fetch(getApiUrl(API_ENDPOINTS.MESSAGES) + '?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      let messages = [];
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        messages = messagesData.data || [];
      }

      // THÊM MỚI: Fetch projects để tính tổng giá trị
      const projectsResponse = await fetch('https://api.devstudio.tech/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      let totalProjects = 0;
      let totalValue = 0;
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        const projects = projectsData.data || [];
        totalProjects = projects.length;
        totalValue = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
      }

      setStats({
        totalMessages: messageStats.total || 0,
        newMessages: messageStats.new || 0,
        repliedMessages: messageStats.replied || 0,
        totalProjects: totalProjects,
        totalValue: totalValue // THÊM MỚI
      });

      setRecentMessages(messages);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats({ totalMessages: 0, newMessages: 0, repliedMessages: 0, totalProjects: 0, totalValue: 0 });
      setRecentMessages([]);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  // Format tiền VNĐ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const StatCard = ({ icon: Icon, title, value, color, trend, isCurrency }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
      <p className={`text-gray-800 font-bold ${isCurrency ? 'text-2xl' : 'text-3xl'}`}>
        {isCurrency ? formatCurrency(value) : value}
      </p>
    </div>
  );

  const MessageCard = ({ message }) => {
    const statusColors = {
      new: 'bg-blue-100 text-blue-700 border-blue-200',
      read: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      replied: 'bg-green-100 text-green-700 border-green-200'
    };

    const statusText = {
      new: 'Mới',
      read: 'Đã xem',
      replied: 'Đã trả lời'
    };

    return (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition cursor-pointer"
           onClick={() => navigate('/admin/messages')}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{message.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-gray-800 font-medium">{message.name}</p>
              <p className="text-gray-500 text-sm">{message.email}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded text-xs border font-medium ${statusColors[message.status] || statusColors.new}`}>
            {statusText[message.status] || 'Mới'}
          </span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{message.message}</p>
        <p className="text-gray-400 text-xs mt-2">
          {new Date(message.createdAt).toLocaleString('vi-VN')}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col shadow-sm">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-gray-800 text-xl font-bold">DevStudio</h1>
          </div>
          <p className="text-gray-500 text-sm">Admin Panel</p>
        </div>

        {adminData && (
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{adminData.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-gray-800 font-medium">{adminData.name}</p>
                <p className="text-gray-500 text-xs">{adminData.role}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/admin/messages')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Tin nhắn</span>
          </button>
          <button
            onClick={() => navigate('/admin/projects')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
          >
            <FolderKanban className="w-5 h-5" />
            <span>Dự án</span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p className="text-gray-500">Tổng quan hệ thống</p>
          </div>

          {/* THÊM 5 ô stats, bao gồm Tổng giá trị */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
              icon={Mail}
              title="Tổng tin nhắn"
              value={stats.totalMessages}
              color="bg-blue-600"
            />
            <StatCard
              icon={Clock}
              title="Tin nhắn mới"
              value={stats.newMessages}
              color="bg-orange-500"
              trend="+12%"
            />
            <StatCard
              icon={CheckCircle}
              title="Đã trả lời"
              value={stats.repliedMessages}
              color="bg-green-600"
            />
            <StatCard
              icon={FolderKanban}
              title="Dự án"
              value={stats.totalProjects}
              color="bg-purple-600"
            />
            {/* THÊM MỚI: Tổng giá trị */}
            <StatCard
              icon={DollarSign}
              title="Tổng giá trị"
              value={stats.totalValue}
              color="bg-pink-500"
              isCurrency={true}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tin nhắn gần đây</h2>
              <button
                onClick={() => navigate('/admin/messages')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Xem tất cả →
              </button>
            </div>

            <div className="space-y-4">
              {recentMessages.length > 0 ? (
                recentMessages.map(message => (
                  <MessageCard key={message._id} message={message} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Chưa có tin nhắn nào
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;