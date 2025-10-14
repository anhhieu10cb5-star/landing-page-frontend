// src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, FolderKanban, LogOut, 
  Mail, CheckCircle, Clock, TrendingUp
} from 'lucide-react';
import { getApiUrl, API_ENDPOINTS } from '../config';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    repliedMessages: 0,
    totalProjects: 0
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
      console.log('🔄 Fetching dashboard data...');
      
      const statsResponse = await fetch(getApiUrl(API_ENDPOINTS.MESSAGE_STATS), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!statsResponse.ok) {
        console.error('❌ Failed to fetch stats:', statsResponse.status);
        setStats({
          totalMessages: 0,
          newMessages: 0,
          repliedMessages: 0,
          totalProjects: 0
        });
        setRecentMessages([]);
        setLoading(false);
        return;
      }

      const statsData = await statsResponse.json();
      console.log('✅ Stats data:', statsData);
      
      setStats({
        totalMessages: statsData.data.total || 0,
        newMessages: statsData.data.new || 0,
        repliedMessages: statsData.data.replied || 0,
        totalProjects: 0
      });
      
      const messagesResponse = await fetch(getApiUrl(API_ENDPOINTS.MESSAGES) + '?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!messagesResponse.ok) {
        console.error('❌ Failed to fetch messages:', messagesResponse.status);
        setRecentMessages([]);
        setLoading(false);
        return;
      }

      const messagesData = await messagesResponse.json();
      console.log('✅ Messages data:', messagesData);

      setRecentMessages(messagesData.data || []);
      setLoading(false);

    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
      setStats({
        totalMessages: 0,
        newMessages: 0,
        repliedMessages: 0,
        totalProjects: 0
      });
      setRecentMessages([]);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );

  const MessageCard = ({ message }) => {
    const statusColors = {
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      read: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      replied: 'bg-green-500/20 text-green-400 border-green-500/50'
    };

    const statusText = {
      new: 'Mới',
      read: 'Đã xem',
      replied: 'Đã trả lời'
    };

    return (
      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition cursor-pointer"
           onClick={() => navigate('/admin/messages')}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{message.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-medium">{message.name}</p>
              <p className="text-gray-400 text-sm">{message.email}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded text-xs border ${statusColors[message.status] || statusColors.new}`}>
            {statusText[message.status] || 'Mới'}
          </span>
        </div>
        <p className="text-gray-300 text-sm line-clamp-2">{message.message}</p>
        <p className="text-gray-500 text-xs mt-2">
          {new Date(message.createdAt).toLocaleString('vi-VN')}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="w-64 bg-slate-900/95 backdrop-blur-sm border-r border-cyan-500/20 p-6 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-white text-xl font-bold">DevStudio</h1>
          </div>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>

        {adminData && (
          <div className="mb-8 pb-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{adminData.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-white font-medium">{adminData.name}</p>
                <p className="text-gray-400 text-xs">{adminData.role}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/admin/messages')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-slate-800 hover:text-white transition"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Tin nhắn</span>
          </button>
          <button
            onClick={() => navigate('/admin/projects')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-slate-800 hover:text-white transition"
          >
            <FolderKanban className="w-5 h-5" />
            <span>Dự án</span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Tổng quan hệ thống</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Mail}
              title="Tổng tin nhắn"
              value={stats.totalMessages}
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={Clock}
              title="Tin nhắn mới"
              value={stats.newMessages}
              color="from-yellow-500 to-orange-600"
              trend="+12%"
            />
            <StatCard
              icon={CheckCircle}
              title="Đã trả lời"
              value={stats.repliedMessages}
              color="from-green-500 to-emerald-600"
            />
            <StatCard
              icon={FolderKanban}
              title="Dự án"
              value={stats.totalProjects}
              color="from-purple-500 to-pink-600"
            />
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Tin nhắn gần đây</h2>
              <button
                onClick={() => navigate('/admin/messages')}
                className="text-cyan-400 hover:text-cyan-300 text-sm"
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
                <div className="text-center py-8 text-gray-400">
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