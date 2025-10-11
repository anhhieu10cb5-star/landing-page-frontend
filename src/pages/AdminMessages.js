// src/pages/AdminMessages.js - WITH REPLY FEATURE
import React, { useState, useEffect } from 'react';
import { Mail, Search, Filter, Trash2, CheckCircle, Clock, AlertCircle, X, Send } from 'lucide-react';

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

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      console.log('🔑 Token:', token);
      
      const response = await fetch('http://localhost:5000/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Data received:', data);
      
      if (data.success) {
        console.log('✅ Setting messages:', data.data);
        setMessages(data.data);
      }
    } catch (error) {
      console.error('❌ Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(msg => msg.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredMessages(filtered);
  };

  const openReplyModal = (message) => {
    setSelectedMessage(message);
    setReplyText('');
    setReplyModal(true);
  };

  const closeReplyModal = () => {
    setReplyModal(false);
    setSelectedMessage(null);
    setReplyText('');
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      alert('Vui lòng nhập nội dung reply!');
      return;
    }

    try {
      setSending(true);
      const token = localStorage.getItem('adminToken');
      
      // Gọi route POST /:id/reply thay vì PUT /:id
      const response = await fetch(`http://localhost:5000/api/messages/${selectedMessage._id}/reply`, {
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
        closeReplyModal();
        fetchMessages(); // Reload messages
      } else {
        alert('❌ Có lỗi xảy ra: ' + data.message);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('❌ Lỗi kết nối server!');
    } finally {
      setSending(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa tin nhắn này?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
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
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'read':
        return <Mail className="w-5 h-5 text-yellow-400" />;
      case 'replied':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'read':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'replied':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Mail className="w-10 h-10 mr-3 text-cyan-400" />
            Quản lý tin nhắn
          </h1>
          <p className="text-gray-400">Xem và trả lời tin nhắn từ khách hàng</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Tổng tin nhắn</p>
                <p className="text-3xl font-bold text-white">{messages.length}</p>
              </div>
              <Mail className="w-10 h-10 text-cyan-400" />
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Tin mới</p>
                <p className="text-3xl font-bold text-white">
                  {messages.filter(m => m.status.toLowerCase() === 'new').length}
                </p>
              </div>
              <Clock className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Đã đọc</p>
                <p className="text-3xl font-bold text-white">
                  {messages.filter(m => m.status.toLowerCase() === 'read').length}
                </p>
              </div>
              <Mail className="w-10 h-10 text-yellow-400" />
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Đã trả lời</p>
                <p className="text-3xl font-bold text-white">
                  {messages.filter(m => m.status.toLowerCase() === 'replied').length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email, tiêu đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
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
            <div className="text-center py-12 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Không có tin nhắn nào</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(message.status)}
                      <h3 className="text-xl font-semibold text-white">{message.subject}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="font-semibold text-cyan-400">{message.name}</span>
                      <span>{message.email}</span>
                      <span>{formatDate(message.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">{message.message}</p>

                {/* Reply Content (if replied) */}
                {message.reply && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-green-400 font-semibold mb-2">✅ Đã trả lời:</p>
                    <p className="text-gray-300 leading-relaxed">{message.reply}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => openReplyModal(message)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>{message.status.toLowerCase() === 'replied' ? 'Reply lại' : 'Reply'}</span>
                  </button>

                  <button
                    onClick={() => deleteMessage(message._id)}
                    className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-500/30 transition border border-red-500/30"
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 rounded-2xl border border-cyan-500/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-slate-900 border-b border-cyan-500/30 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Send className="w-6 h-6 mr-3 text-cyan-400" />
                  Trả lời tin nhắn
                </h2>
                <button
                  onClick={closeReplyModal}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Original Message */}
                <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <p className="text-sm text-gray-400 mb-2">Tin nhắn gốc:</p>
                  <p className="text-white font-semibold mb-1">Từ: {selectedMessage.name} ({selectedMessage.email})</p>
                  <p className="text-gray-300 mb-2"><strong>Tiêu đề:</strong> {selectedMessage.subject}</p>
                  <p className="text-gray-300">{selectedMessage.message}</p>
                </div>

                {/* Reply Textarea */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">Nội dung reply:</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Nhập nội dung trả lời tại đây..."
                    rows="8"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
                  ></textarea>
                  <p className="text-sm text-gray-400 mt-2">
                    {replyText.length} ký tự
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={closeReplyModal}
                    className="px-6 py-3 bg-slate-800 text-gray-300 rounded-lg font-semibold hover:bg-slate-700 transition"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={sendReply}
                    disabled={sending || !replyText.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
    </div>
  );
};

export default AdminMessages;