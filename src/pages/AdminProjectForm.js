// src/pages/AdminProjectForm.js
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, LayoutDashboard, MessageSquare, FolderKanban, LogOut, Key, Server, FileText, Eye, EyeOff, Copy, Check, Upload, X, Image, Calendar } from 'lucide-react';


const AdminProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [adminData, setAdminData] = useState(null);

  const [formData, setFormData] = useState({
    projectCode: '',
    projectName: '',
    description: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    type: 'Website',
    status: 'Pending',
    progress: 0,
    budget: '',
    startDate: '',
    endDate: '',
    technologies: [],
    notes: ''
  });

  const [milestones, setMilestones] = useState([]);
  const [newTech, setNewTech] = useState('');

  // Credentials state
  const [apiKeys, setApiKeys] = useState([]);
  const [vpsInfo, setVpsInfo] = useState({
    host: '',
    username: '',
    password: '',
    sshKey: ''
  });
  const [otherSecrets, setOtherSecrets] = useState('');
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedField, setCopiedField] = useState(null);
  
  const [screenshots, setScreenshots] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
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

    const path = window.location.pathname;
    if (path.includes('/edit')) {
      let id;
      if (path.includes('/edit/')) {
        id = path.split('/edit/')[1];
      } else if (path.endsWith('/edit')) {
        const parts = path.split('/');
        id = parts[parts.length - 2];
      }
      if (id) {
        setProjectId(id);
        setIsEdit(true);
        loadProjectData(id);
      }
    }
  }, []);

  const loadProjectData = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://api.devstudio.tech/api/projects/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        const project = data.data;
        
        const typeReverseMap = {
          'website': 'Website',
          'mobile-app': 'Mobile App',
          'web-app': 'Web App',
          'ecommerce': 'E-Commerce',
          'landing-page': 'Landing Page',
          'backend': 'Backend API'
        };

        const statusReverseMap = {
          'pending': 'Pending',
          'in-progress': 'In Progress',
          'review': 'Review',
          'completed': 'Completed',
          'cancelled': 'Cancelled',
          'on-hold': 'On Hold'
        };

        setFormData({
          projectCode: project.projectCode,
          projectName: project.title,
          description: project.description || '',
          clientName: project.clientName,
          clientEmail: project.clientEmail,
          clientPhone: project.clientPhone || '',
          type: typeReverseMap[project.projectType] || 'Website',
          status: statusReverseMap[project.status] || 'Pending',
          progress: project.progress || 0,
          budget: project.budget || '',
          startDate: project.startDate ? project.startDate.split('T')[0] : '',
          endDate: project.estimatedEndDate ? project.estimatedEndDate.split('T')[0] : '',
          technologies: project.technologies || [],
          notes: project.notes || ''
        });

        setMilestones((project.milestones || []).map(m => ({
          name: m.title,
          description: m.description || '',
          status: statusReverseMap[m.status] || 'Pending',
          dueDate: m.dueDate ? m.dueDate.split('T')[0] : ''
        })));

        // Load credentials
        if (project.credentials) {
          setApiKeys(project.credentials.apiKeys || []);
          setVpsInfo(project.credentials.vpsInfo || { host: '', username: '', password: '', sshKey: '' });
          setOtherSecrets(project.credentials.otherSecrets || '');
        }

        // Load screenshots
        if (project.screenshots) {
          setScreenshots(project.screenshots);
        }
      }
    } catch (error) {
          console.error('Error loading project:', error);
          alert('❌ Lỗi khi tải dữ liệu dự án!');
        } finally {
          setLoading(false);
        }
      };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    window.location.href = '/admin/login';
  };

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

// THÊM 2 FUNCTION NÀY NGAY ĐÂY ↓↓↓

const formatNumber = (value) => {
  if (!value) return '';
  const number = value.toString().replace(/\D/g, '');
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const handleBudgetChange = (e) => {
  const rawValue = e.target.value.replace(/\./g, '');
  setFormData(prev => ({
    ...prev,
    budget: rawValue
  }));
};

  
  
  
  
  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const addMilestone = () => {
    setMilestones([...milestones, {
      name: '',
      description: '',
      status: 'Pending',
      dueDate: ''
    }]);
  };

  const updateMilestone = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const removeMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  // API Keys functions
  const addApiKey = () => {
    setApiKeys([...apiKeys, { label: '', value: '' }]);
  };

  const updateApiKey = (index, field, value) => {
    const updated = [...apiKeys];
    updated[index][field] = value;
    setApiKeys(updated);
  };

  const removeApiKey = (index) => {
    setApiKeys(apiKeys.filter((_, i) => i !== index));
  };

  // VPS Info functions
  const handleVpsChange = (field, value) => {
    setVpsInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Copy to clipboard
  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  
  // Upload image to Bunny.net
const uploadToBunny = async (file) => {
  const STORAGE_ZONE = 'my-strorage-freelancer';
  const API_KEY = '21305570-f3c6-4fbb-9be617d80e36-b963-4888';
  const CDN_URL = 'https://devstudio-cdn.b-cdn.net';
  
  // Tạo đường dẫn: /projects/{projectCode}/{date}/{filename}
  const today = new Date().toISOString().split('T')[0]; // 2025-01-15
  const projectCode = formData.projectCode || 'TEMP';
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const filePath = `projects/${projectCode}/${today}/${fileName}`;
  
  try {
    const response = await fetch(`https://sg.storage.bunnycdn.com/${STORAGE_ZONE}/${filePath}`, {
      method: 'PUT',
      headers: {
        'AccessKey': API_KEY,
        'Content-Type': file.type
      },
      body: file
    });

    if (response.ok) {
      return `${CDN_URL}/${filePath}`;
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

const handleImageUpload = async (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  setUploading(true);
  setUploadProgress(0);

  try {
    const uploadedUrls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Validate file
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} không phải là file ảnh!`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`${file.name} quá lớn! Tối đa 10MB`);
        continue;
      }

      const url = await uploadToBunny(file);
      uploadedUrls.push({
        url,
        name: file.name,
        uploadedAt: new Date().toISOString()
      });
      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setScreenshots(prev => [...prev, ...uploadedUrls]);
    alert(`✅ Đã upload ${uploadedUrls.length} ảnh thành công!`);
  } catch (error) {
    alert('❌ Lỗi upload: ' + error.message);
  } finally {
    setUploading(false);
    setUploadProgress(0);
    e.target.value = ''; // Reset input
  }
};

const removeScreenshot = (index) => {
  setScreenshots(prev => prev.filter((_, i) => i !== index));
};
  
  
  const validateForm = () => {
    if (!formData.projectCode.trim()) {
      alert('⚠️ Vui lòng nhập mã dự án!');
      return false;
    }
    if (!formData.projectName.trim()) {
      alert('⚠️ Vui lòng nhập tên dự án!');
      return false;
    }
    if (!formData.clientName.trim()) {
      alert('⚠️ Vui lòng nhập tên khách hàng!');
      return false;
    }
    if (!formData.clientEmail.trim() || !formData.clientEmail.includes('@')) {
      alert('⚠️ Email khách hàng không hợp lệ!');
      return false;
    }
    if (!formData.startDate) {
      alert('⚠️ Vui lòng chọn ngày bắt đầu!');
      return false;
    }
    if (!formData.endDate) {
      alert('⚠️ Vui lòng chọn ngày kết thúc!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSaving(true);
      const token = localStorage.getItem('adminToken');
      
      const payload = {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : 0,
        milestones: milestones.filter(m => m.name.trim() !== ''),
        // Thêm credentials vào payload
        credentials: {
          apiKeys: apiKeys.filter(k => k.label.trim() !== '' || k.value.trim() !== ''),
          vpsInfo: vpsInfo,
          otherSecrets: otherSecrets
        },
        screenshots: screenshots
      };

      const url = isEdit 
        ? `https://api.devstudio.tech/api/projects/${projectId}`
        : 'https://api.devstudio.tech/api/projects';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ ${isEdit ? 'Cập nhật' : 'Tạo'} dự án thành công!`);
        window.location.href = '/admin/projects';
      } else {
        alert('❌ Lỗi: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('❌ Lỗi khi lưu dự án!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 text-xl mt-4">Đang tải dữ liệu dự án...</p>
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
          <a href="/admin/messages" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Tin nhắn</span>
          </a>
          <a href="/admin/projects" className="flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
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
        <div className="p-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => window.location.href = '/admin/projects'}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại danh sách</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              {isEdit ? 'Sửa dự án' : 'Tạo dự án mới'}
            </h1>
            {isEdit && (
              <p className="text-gray-500 mt-2">Mã dự án: #{formData.projectCode}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thông tin cơ bản */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Thông tin cơ bản</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mã dự án *
                  </label>
                  <input
                    type="text"
                    name="projectCode"
                    value={formData.projectCode}
                    onChange={handleInputChange}
                    disabled={isEdit}
                    placeholder="VD: COFFEE2025"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  {isEdit && (
                    <p className="text-xs text-gray-500 mt-1">Mã dự án không thể thay đổi</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên dự án *
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder="VD: Coffee Shop Mobile App"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mô tả dự án
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Mô tả chi tiết về dự án..."
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Thông tin khách hàng */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Thông tin khách hàng</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên khách hàng *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="client@example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    placeholder="0901234567"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Chi tiết dự án */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Chi tiết dự án</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loại dự án
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Website">Website</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Web App">Web App</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Backend API">Backend API</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Pending">Chờ xử lý</option>
                    <option value="In Progress">Đang thực hiện</option>
                    <option value="Review">Đang review</option>
                    <option value="Completed">Hoàn thành</option>
                    <option value="On Hold">Tạm dừng</option>
                    <option value="Cancelled">Đã hủy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tiến độ (%)
                  </label>
                  <input
                    type="number"
                    name="progress"
                    value={formData.progress}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngân sách (VNĐ)
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget ? formatNumber(formData.budget.toString()) : ''}
                    onChange={handleBudgetChange}
                    placeholder="50.000.000"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày kết thúc *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 🔐 THÔNG TIN BẢO MẬT - MỚI */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Thông tin bảo mật</h2>
                  <p className="text-sm text-red-600">⚠️ Chỉ admin mới xem được - Không hiển thị khi khách tra cứu</p>
                </div>
              </div>

              {/* API Keys */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Key className="w-4 h-4 text-orange-500" />
                    <span>API Keys</span>
                  </label>
                  <button
                    type="button"
                    onClick={addApiKey}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm API Key</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {apiKeys.map((apiKey, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <input
                        type="text"
                        value={apiKey.label}
                        onChange={(e) => updateApiKey(index, 'label', e.target.value)}
                        placeholder="Tên (VD: Payment API, Google Maps...)"
                        className="w-1/3 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      />
                      <div className="flex-1 relative">
                        <input
                          type={showPasswords[`api-${index}`] ? 'text' : 'password'}
                          value={apiKey.value}
                          onChange={(e) => updateApiKey(index, 'value', e.target.value)}
                          placeholder="API Key value..."
                          className="w-full px-3 py-2 pr-20 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-mono"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(`api-${index}`)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            {showPasswords[`api-${index}`] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(apiKey.value, `api-${index}`)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            {copiedField === `api-${index}` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeApiKey(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {apiKeys.length === 0 && (
                    <p className="text-center py-4 text-gray-500 text-sm bg-white rounded-lg border border-dashed border-gray-300">
                      Chưa có API Key nào. Bấm "Thêm API Key" để thêm.
                    </p>
                  )}
                </div>
              </div>

              {/* VPS Info */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-4">
                  <Server className="w-4 h-4 text-blue-500" />
                  <span>Thông tin VPS / Server</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Host / IP</label>
                    <input
                      type="text"
                      value={vpsInfo.host}
                      onChange={(e) => handleVpsChange('host', e.target.value)}
                      placeholder="103.xxx.xxx.xxx hoặc domain.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Username</label>
                    <input
                      type="text"
                      value={vpsInfo.username}
                      onChange={(e) => handleVpsChange('username', e.target.value)}
                      placeholder="root"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords['vps-password'] ? 'text' : 'password'}
                        value={vpsInfo.password}
                        onChange={(e) => handleVpsChange('password', e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 pr-20 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('vps-password')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords['vps-password'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(vpsInfo.password, 'vps-password')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {copiedField === 'vps-password' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">SSH Key (nếu có)</label>
                    <div className="relative">
                      <input
                        type={showPasswords['vps-ssh'] ? 'text' : 'password'}
                        value={vpsInfo.sshKey}
                        onChange={(e) => handleVpsChange('sshKey', e.target.value)}
                        placeholder="ssh-rsa AAAA..."
                        className="w-full px-3 py-2 pr-20 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('vps-ssh')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords['vps-ssh'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(vpsInfo.sshKey, 'vps-ssh')}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          {copiedField === 'vps-ssh' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Secrets */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-4">
                  <FileText className="w-4 h-4 text-purple-500" />
                  <span>Thông tin bảo mật khác</span>
                </label>
                <textarea
                  value={otherSecrets}
                  onChange={(e) => setOtherSecrets(e.target.value)}
                  placeholder="Database connection strings, tài khoản hosting, FTP, email credentials, hoặc bất kỳ thông tin bảo mật nào khác..."
                  rows="4"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
                ></textarea>
              </div>
            </div>

            {/* Công nghệ sử dụng */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Công nghệ sử dụng</h2>
              
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  placeholder="VD: React, Node.js, MongoDB..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Thêm</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 flex items-center space-x-2"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Milestones</h2>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Thêm Milestone</span>
                </button>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-blue-600">Milestone #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={milestone.name}
                          onChange={(e) => updateMilestone(index, 'name', e.target.value)}
                          placeholder="Tên milestone"
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <textarea
                          value={milestone.description}
                          onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                          placeholder="Mô tả milestone"
                          rows="2"
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        ></textarea>
                      </div>

                      <div>
                        <select
                          value={milestone.status}
                          onChange={(e) => updateMilestone(index, 'status', e.target.value)}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div>
                        <input
                          type="date"
                          value={milestone.dueDate ? milestone.dueDate.split('T')[0] : ''}
                          onChange={(e) => updateMilestone(index, 'dueDate', e.target.value)}
                          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {milestones.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Chưa có milestone nào. Bấm "Thêm Milestone" để thêm.
                  </div>
                )}
              </div>
            </div>

            
            {/* Screenshots - Upload hình ảnh */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Screenshots</h2>
                  <p className="text-sm text-gray-500">Upload hình ảnh tiến độ dự án để khách hàng xem</p>
                </div>
              </div>

              {/* Upload Area */}
              <div className="mb-4">
                <label className="block w-full cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-all">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-2">
                      {uploading ? `Đang upload... ${uploadProgress}%` : 'Kéo thả hoặc click để upload'}
                    </p>
                    <p className="text-gray-400 text-sm">PNG, JPG, GIF - Tối đa 10MB mỗi ảnh</p>
                    {uploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full transition-all" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preview uploaded images */}
              {screenshots.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(
                  screenshots.reduce((groups, img) => {
                    const date = img.uploadedAt ? new Date(img.uploadedAt).toLocaleDateString('vi-VN') : 'Không rõ ngày';
                    if (!groups[date]) groups[date] = [];
                    groups[date].push(img);
                    return groups;
                  }, {})
                )
                .sort((a, b) => {
                  const dateA = new Date(a[1][0]?.uploadedAt || 0);
                  const dateB = new Date(b[1][0]?.uploadedAt || 0);
                  return dateB - dateA;
                })
                .map(([date, images]) => (
                  <div key={date} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-700 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                        {date}
                      </h4>
                      <span className="text-sm text-gray-500">{images.length} ảnh</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {images.map((img, index) => {
                        const globalIndex = screenshots.findIndex(s => s.url === img.url);
                        return (
                          <div key={index} className="relative group">
                            <img 
                              src={img.url} 
                              alt={img.name} 
                              className="w-full h-28 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90"
                              onClick={() => window.open(img.url, '_blank')}
                            />
                            <button 
                              type="button" 
                              onClick={() => removeScreenshot(globalIndex)} 
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <p className="text-xs text-gray-500 mt-1 truncate" title={img.name}>{img.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 text-sm">Chưa có ảnh nào</p>
            )}
            </div>
            
            
            {/* Ghi chú */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Ghi chú</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Ghi chú thêm về dự án..."
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => window.location.href = '/admin/projects'}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>{isEdit ? 'Cập nhật' : 'Tạo dự án'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminProjectForm;