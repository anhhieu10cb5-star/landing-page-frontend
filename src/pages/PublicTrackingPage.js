// src/pages/PublicTrackingPage.js
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Circle, ArrowLeft, Calendar, DollarSign, Code as CodeIcon, FileText, ExternalLink, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

const PublicTrackingPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  const projectCode = window.location.pathname.split('/track/')[1];

  useEffect(() => {
    fetchProject();
  }, []);

  // Update allImages when project loads
  useEffect(() => {
    if (project?.screenshots) {
      setAllImages(project.screenshots);
    }
  }, [project]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://main-landing-page-backend-production.up.railway.app/api/projects/track/${projectCode}`);
      const data = await response.json();

      if (data.success) {
        setProject(data.data);
      } else {
        setError('Không tìm thấy dự án với mã này');
      }
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Lightbox functions
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, allImages.length]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
      case 'in progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'on-hold':
      case 'on hold':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMilestoneIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'in-progress':
      case 'in progress':
        return <Clock className="w-6 h-6 text-blue-400" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatStatus = (status) => {
    const statusMap = {
      'in-progress': 'Đang thực hiện',
      'on-hold': 'Tạm dừng',
      'pending': 'Chờ xử lý',
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy'
    };
    return statusMap[status.toLowerCase()] || status;
  };

  const formatProjectType = (type) => {
    const typeMap = {
      'website': 'Website',
      'mobile-app': 'Mobile App',
      'web-app': 'Web App',
      'ecommerce': 'E-Commerce',
      'landing-page': 'Landing Page',
      'backend': 'Backend API'
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-red-500/30 p-8 text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ExternalLink className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Không tìm thấy dự án</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <p className="text-sm text-gray-500 mb-6">Mã dự án: <span className="text-cyan-400 font-mono">{projectCode}</span></p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  if (!project) return null;

  // Group screenshots by date
  const screenshotsByDate = project.screenshots && project.screenshots.length > 0
    ? Object.entries(
        project.screenshots.reduce((groups, img) => {
          const date = img.uploadedAt 
            ? new Date(img.uploadedAt).toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'Không rõ ngày';
          if (!groups[date]) groups[date] = [];
          groups[date].push(img);
          return groups;
        }, {})
      ).sort((a, b) => {
        const dateA = new Date(a[1][0]?.uploadedAt || 0);
        const dateB = new Date(b[1][0]?.uploadedAt || 0);
        return dateB - dateA;
      })
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Lightbox */}
      {lightboxOpen && allImages.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:text-cyan-400 transition z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white text-lg font-medium">
            {currentImageIndex + 1} / {allImages.length}
          </div>

          {/* Previous button */}
          {allImages.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Main image */}
          <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center">
            <img
              src={allImages[currentImageIndex]?.url}
              alt={allImages[currentImageIndex]?.name || 'Screenshot'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          {/* Next button */}
          {allImages.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image name */}
          {allImages[currentImageIndex]?.name && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
              {allImages[currentImageIndex].name}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Quay về trang chủ</span>
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-400">Mã dự án</p>
              <p className="text-lg font-bold text-cyan-400 font-mono">{project.projectCode}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Project Header */}
        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">{project.title || project.projectName}</h1>
              <p className="text-gray-400 text-lg">{project.description}</p>
            </div>
            <div className={`${getStatusColor(project.status)} px-4 py-2 rounded-full text-white font-semibold text-sm`}>
              {formatStatus(project.status)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">Tiến độ hoàn thành</span>
              <span className="text-2xl font-black text-cyan-400">{project.progress || 0}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-500 rounded-full"
                style={{ width: `${project.progress || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-cyan-500/20">
            <div>
              <p className="text-sm text-gray-400 mb-1">Khách hàng</p>
              <p className="text-lg font-semibold text-white">{project.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Email liên hệ</p>
              <p className="text-lg font-semibold text-cyan-400">{project.clientEmail}</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Timeline */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Milestones */}
            {project.milestones && project.milestones.length > 0 && (
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full mr-3"></div>
                  Các mốc quan trọng
                </h2>
                
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getMilestoneIcon(milestone.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{milestone.title || milestone.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">{milestone.description}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className={`px-2 py-1 rounded ${
                            milestone.status.toLowerCase() === 'completed' 
                              ? 'bg-green-500/20 text-green-400' 
                              : milestone.status.toLowerCase() === 'in-progress' || milestone.status.toLowerCase() === 'in progress'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {formatStatus(milestone.status)}
                          </span>
                          {milestone.dueDate && (
                            <span className="text-gray-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(milestone.dueDate)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Updates */}
            {project.dailyUpdates && project.dailyUpdates.length > 0 && (
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full mr-3"></div>
                  Cập nhật hàng ngày
                </h2>
                
                <div className="space-y-3">
                  {project.dailyUpdates
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 10)
                    .map((update, index) => (
                      <div 
                        key={index}
                        className="flex items-start space-x-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700"
                      >
                        <div className="flex-shrink-0 w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-white leading-relaxed">{update.update || update.content}</p>
                          <p className="text-xs text-gray-500 mt-2">{formatDate(update.date)}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Project Details */}
          <div className="space-y-6">
            
            {/* Overview Card */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-cyan-400" />
                Tổng quan dự án
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Ngày bắt đầu</p>
                  <p className="text-white font-semibold">{formatDate(project.startDate)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-1">Ngày dự kiến hoàn thành</p>
                  <p className="text-white font-semibold">{formatDate(project.estimatedEndDate || project.endDate)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-1">Loại dự án</p>
                  <p className="text-white font-semibold">{formatProjectType(project.projectType || project.type)}</p>
                </div>
                
                {project.budget && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Ngân sách</p>
                    <p className="text-white font-semibold flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {project.budget.toLocaleString('vi-VN')} VNĐ
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <CodeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                  Công nghệ sử dụng
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-cyan-500/10 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {project.notes && (
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6">
                <h3 className="text-lg font-bold text-white mb-3">Ghi chú</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{project.notes}</p>
              </div>
            )}
          </div>

        </div>

        {/* Screenshots - Full Width Section Below */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-8 bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <div className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-purple-600 rounded-full mr-3"></div>
              <Image className="w-6 h-6 mr-2 text-indigo-400" />
              Hình ảnh tiến độ
              <span className="ml-3 text-sm font-normal text-gray-400 bg-slate-800 px-3 py-1 rounded-full">
                {project.screenshots.length} ảnh
              </span>
            </h2>
            
            <div className="space-y-12">
              {(() => {
                let imgCounter = 0;
                return screenshotsByDate.map(([date, images]) => {
                  const startIndex = imgCounter;
                  imgCounter += images.length;
                  
                  return (
                    <div key={date} className="border-l-4 border-indigo-500 pl-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        <span className="text-xl font-semibold text-white">{date}</span>
                        <span className="text-sm text-gray-400 bg-slate-800 px-3 py-1 rounded-full">{images.length} ảnh</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            onClick={() => openLightbox(startIndex + imgIndex)}
                            className="cursor-pointer group"
                          >
                            <div className="relative overflow-hidden rounded-xl border-2 border-slate-700 hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                              <img 
                                src={img.url} 
                                alt={img.name || `Screenshot ${imgIndex + 1}`}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                <span className="text-white font-medium flex items-center space-x-2 bg-cyan-500 px-5 py-2.5 rounded-lg shadow-lg">
                                  <ExternalLink className="w-5 h-5" />
                                  <span>Xem ảnh lớn</span>
                                </span>
                              </div>
                            </div>
                            {img.name && (
                              <p className="text-sm text-gray-400 mt-2 truncate">{img.name}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Trang này được cập nhật tự động. Nếu có thắc mắc, vui lòng liên hệ qua email: <span className="text-cyan-400">{project.clientEmail}</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default PublicTrackingPage;