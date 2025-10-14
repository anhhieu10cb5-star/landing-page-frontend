// src/pages/AdminProjectForm.js
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Save, Calendar } from 'lucide-react';

const AdminProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [projectId, setProjectId] = useState(null);

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

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/edit/')) {
      const id = path.split('/edit/')[1];
      setProjectId(id);
      setIsEdit(true);
      loadProjectData(id);
    }
  }, []);

  const loadProjectData = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://main-landing-page-backend-production.up.railway.app/api/projects/${id}`, {
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
      }
    } catch (error) {
      console.error('Error loading project:', error);
      alert('❌ Lỗi khi tải dữ liệu dự án!');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        milestones: milestones.filter(m => m.name.trim() !== '')
      };

      const url = isEdit 
        ? `https://main-landing-page-backend-production.up.railway.app/api/projects/${projectId}`
        : 'https://main-landing-page-backend-production.up.railway.app/api/projects';
      
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          <p className="text-white text-xl mt-4">Đang tải dữ liệu dự án...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => window.location.href = '/admin/projects'}
              className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại danh sách</span>
            </button>
            <h1 className="text-4xl font-bold">
              {isEdit ? 'Sửa dự án' : 'Tạo dự án mới'}
            </h1>
            {isEdit && (
              <p className="text-gray-400 mt-2">Mã dự án: #{formData.projectCode}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
            <h2 className="text-2xl font-bold mb-6">Thông tin cơ bản</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Mã dự án *
                </label>
                <input
                  type="text"
                  name="projectCode"
                  value={formData.projectCode}
                  onChange={handleInputChange}
                  disabled={isEdit}
                  placeholder="VD: COFFEE2025"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
                {isEdit && (
                  <p className="text-xs text-gray-500 mt-1">Mã dự án không thể thay đổi</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Tên dự án *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="VD: Coffee Shop Mobile App"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Mô tả dự án
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả chi tiết về dự án..."
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
            <h2 className="text-2xl font-bold mb-6">Thông tin khách hàng</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Tên khách hàng *
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  placeholder="client@example.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  placeholder="0901234567"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
            <h2 className="text-2xl font-bold mb-6">Chi tiết dự án</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Loại dự án
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
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
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Tiến độ (%)
                </label>
                <input
                  type="number"
                  name="progress"
                  value={formData.progress}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Ngân sách (VNĐ)
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="50000000"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Ngày bắt đầu *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Ngày kết thúc *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
            <h2 className="text-2xl font-bold mb-6">Công nghệ sử dụng</h2>
            
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                placeholder="VD: React, Node.js, MongoDB..."
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Thêm</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-cyan-500/10 text-cyan-300 rounded-lg border border-cyan-500/30 flex items-center space-x-2"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Milestones</h2>
              <button
                type="button"
                onClick={addMilestone}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Thêm Milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-cyan-400">Milestone #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeMilestone(index)}
                      className="text-red-400 hover:text-red-300 transition"
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
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <textarea
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                        placeholder="Mô tả milestone"
                        rows="2"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
                      ></textarea>
                    </div>

                    <div>
                      <select
                        value={milestone.status}
                        onChange={(e) => updateMilestone(index, 'status', e.target.value)}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
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
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {milestones.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  Chưa có milestone nào. Bấm "Thêm Milestone" để thêm.
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
            <h2 className="text-2xl font-bold mb-6">Ghi chú</h2>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Ghi chú thêm về dự án..."
              rows="4"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.location.href = '/admin/projects'}
              className="px-8 py-3 bg-slate-800 text-gray-300 rounded-lg font-semibold hover:bg-slate-700 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
    </div>
  );
};

export default AdminProjectForm;