import React, { useState, useEffect } from 'react';
import { ExternalLink, X, ChevronLeft, ChevronRight, Calendar, Image } from 'lucide-react';
import TrackingHeader from './TrackingHeader';
import TrackingProjectCard from './TrackingProjectCard';

const PublicTrackingPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  const projectCode = window.location.pathname.split('/track/')[1];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://api.devstudio.tech/api/projects/track/${projectCode}`);
        const data = await res.json();
        if (data.success) setProject(data.data);
        else setError('Không tìm thấy dự án với mã này');
      } catch { setError('Có lỗi xảy ra khi tải dữ liệu'); }
      finally { setLoading(false); }
    })();
  }, []);

  useEffect(() => { if (project?.screenshots) setAllImages(project.screenshots); }, [project]);

  const openLightbox = (i) => { setCurrentImageIndex(i); setLightboxOpen(true); document.body.style.overflow = 'hidden'; };
  const closeLightbox = () => { setLightboxOpen(false); document.body.style.overflow = 'auto'; };
  const next = () => setCurrentImageIndex(p => (p + 1) % allImages.length);
  const prev = () => setCurrentImageIndex(p => (p - 1 + allImages.length) % allImages.length);

  useEffect(() => {
    const h = e => { if (!lightboxOpen) return; if (e.key === 'Escape') closeLightbox(); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
  }, [lightboxOpen, allImages.length]);

  const formatDate = (d) => {
    if (!d) return 'N/A'; const dt = new Date(d); if (isNaN(dt)) return 'N/A';
    return dt.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><ExternalLink className="w-8 h-8 text-red-500" /></div>
        <h2 className="text-xl font-bold mb-2">Không tìm thấy dự án</h2>
        <p className="text-gray-500 mb-4 text-sm">{error}</p>
        <p className="text-xs text-gray-400 mb-4">Mã: <span className="text-blue-600 font-mono font-bold">{projectCode}</span></p>
        <button onClick={() => window.location.href = '/'} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm">Quay về trang chủ</button>
      </div>
    </div>
  );

  if (!project) return null;

  const screenshotsByDate = project.screenshots?.length > 0
    ? Object.entries(
        project.screenshots.reduce((g, img) => {
          const d = img.uploadedAt ? formatDate(img.uploadedAt) : 'Không rõ ngày';
          if (!g[d]) g[d] = []; g[d].push(img); return g;
        }, {})
      ).sort((a, b) => new Date(b[1][0]?.uploadedAt || 0) - new Date(a[1][0]?.uploadedAt || 0))
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Lightbox */}
      {lightboxOpen && allImages.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-white hover:text-gray-300"><X className="w-8 h-8" /></button>
          <div className="absolute top-4 left-4 text-white text-lg font-medium">{currentImageIndex + 1} / {allImages.length}</div>
          {allImages.length > 1 && <button onClick={prev} className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"><ChevronLeft className="w-8 h-8" /></button>}
          <img src={allImages[currentImageIndex]?.url} alt="" className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" />
          {allImages.length > 1 && <button onClick={next} className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"><ChevronRight className="w-8 h-8" /></button>}
        </div>
      )}

      <TrackingHeader projectCode={projectCode} />

      <main className="w-full px-6 lg:px-10 py-8">
        <TrackingProjectCard project={project} />

        {/* Screenshots */}
        {project.screenshots?.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">
            <h2 className="font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-1 h-6 bg-indigo-500 rounded-full mr-3"></div>
              <Image className="w-5 h-5 mr-2 text-indigo-500" />
              Hình ảnh tiến độ
              <span className="ml-3 text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{project.screenshots.length} ảnh</span>
            </h2>
            <div className="space-y-8">
              {(() => {
                let c = 0;
                return screenshotsByDate.map(([date, imgs]) => {
                  const start = c; c += imgs.length;
                  return (
                    <div key={date} className="border-l-4 border-indigo-400 pl-5">
                      <div className="flex items-center space-x-2 mb-3">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        <span className="font-semibold text-gray-900">{date}</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{imgs.length} ảnh</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {imgs.map((img, j) => (
                          <div key={j} onClick={() => openLightbox(start + j)} className="cursor-pointer group">
                            <div className="relative overflow-hidden rounded-xl border border-gray-200 hover:border-blue-400 transition-all shadow-sm hover:shadow-md">
                              <img src={img.url} alt="" className="w-full object-cover max-h-[800px] group-hover:scale-105 transition-transform duration-300" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-sm font-medium bg-blue-600 px-3 py-1.5 rounded-lg">Xem ảnh</span>
                              </div>
                            </div>
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
      </main>
    </div>
  );
};

export default PublicTrackingPage;
