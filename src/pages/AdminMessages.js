// src/pages/AdminMessages.js
import React, { useState, useEffect } from 'react';
import { Mail, Search, Filter, Trash2, CheckCircle, Clock, AlertCircle, X, Send, LayoutDashboard, MessageSquare, FolderKanban, LogOut } from 'lucide-react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [replyModal, setReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
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
        setAdminData(JSON.parse(adminRaw));
      } catch (err) {
        console.error('Error parsing admin data:', err);
      }
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('https://api.devstudio.tech/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(msg => msg.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredMessages(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    window.location.href = '/admin/login';
  };

  const openReplyModal = (message) => {
    setSelectedMessage(message);
    setReplyText('');
    setSending(false);
    setReplyModal(true);
  };

  const closeReplyModal = () => {
    setReplyModal(false);
    setSelectedMessage(null);
    setReplyText('');
    setSending(false);
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      alert('Vui lòng nhập nội dung reply!');
      return;
    }

    setSending(true);

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`https://api.devstudio.tech/api/messages/${selectedMessage._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          replyText: replyText
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Reply đã được gửi thành công!');
        setSending(false);
        closeReplyModal();
        fetchMessages();
      } else {
        alert('❌ Có lỗi xảy ra: ' + data.message);
        setSending(false);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('❌ Lỗi kết nối server!');
      setSending(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa tin nhắn này?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.devstudio.tech/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        alert('✅ Đã xóa tin nhắn!');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('❌ Lỗi khi xóa tin nhắn!');
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'read':
        return <Mail className="w-5 h-5 text-yellow-600" />;
      case 'replied':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'read':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'replied':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">DevStudio</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {adminData && (
          <div className="px-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {adminData.name ? adminData.name.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {adminData.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500">{adminData.role || 'super-admin'}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="/admin/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="/admin/messages" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
            <MessageSquare className="w-5 h-5" />
            <span>Tin nhắn</span>
          </a>
          <a href="/admin/projects" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
            <FolderKanban className="w-5 h-5" />
            <span>Dự án</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <Mail className="w-8 h-8 mr-3 text-blue-600" />
              Quản lý tin nhắn
            </h1>
            <p className="text-gray-500">Xem và trả lời tin nhắn từ khách hàng</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Tổng tin nhắn</p>
                  <p className="text-3xl font-bold text-gray-800">{messages.length}</p>
                </div>
                <Mail className="w-10 h-10 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Tin mới</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {messages.filter(m => m.status.toLowerCase() === 'new').length}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Đã đọc</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {messages.filter(m => m.status.toLowerCase() === 'read').length}
                  </p>
                </div>
                <Mail className="w-10 h-10 text-yellow-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Đã trả lời</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {messages.filter(m => m.status.toLowerCase() === 'replied').length}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, email, tiêu đề..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="new">Tin mới</option>
                  <option value="read">Đã đọc</option>
                  <option value="replied">Đã trả lời</option>
                </select>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
                <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Không có tin nhắn nào</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message._id}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(message.status)}
                        <h3 className="text-xl font-semibold text-gray-800">{message.subject}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="font-semibold text-blue-600">{message.name}</span>
                        <span>{message.email}</span>
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{message.message}</p>

                  {message.reply && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-semibold mb-2">✅ Đã trả lời:</p>
                      <p className="text-gray-700 leading-relaxed">{message.reply}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => openReplyModal(message)}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>{message.status.toLowerCase() === 'replied' ? 'Reply lại' : 'Reply'}</span>
                    </button>

                    <button
                      onClick={() => deleteMessage(message._id)}
                      className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition border border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Reply Modal */}
          {replyModal && selectedMessage && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Send className="w-6 h-6 mr-3 text-blue-600" />
                    Trả lời tin nhắn
                  </h2>
                  <button
                    onClick={closeReplyModal}
                    disabled={sending}
                    className="text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Tin nhắn gốc:</p>
                    <p className="text-gray-800 font-semibold mb-1">Từ: {selectedMessage.name} ({selectedMessage.email})</p>
                    <p className="text-gray-700 mb-2"><strong>Tiêu đề:</strong> {selectedMessage.subject}</p>
                    <p className="text-gray-600">{selectedMessage.message}</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-800 font-semibold mb-2">Nội dung reply:</label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Nhập nội dung trả lời tại đây..."
                      rows="8"
                      disabled={sending}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
                    ></textarea>
                    <p className="text-sm text-gray-500 mt-2">
                      {replyText.length} ký tự
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={closeReplyModal}
                      disabled={sending}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={sendReply}
                      disabled={sending || !replyText.trim()}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
                    >
                      {sending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span>Đang gửi...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Gửi Reply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminMessages;