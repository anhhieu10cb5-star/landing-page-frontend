import React, { useState, useEffect, useRef } from 'react';

const images = [
  '/images/screen-1.jpg',
  '/images/screen-2.jpg',
  '/images/screen-3.jpg',
  '/images/screen-4.jpg',
  '/images/screen-5.jpg',
];

function ShowcaseSection2() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imgVisible, setImgVisible] = useState(true);
  const [vidIndex, setVidIndex] = useState(0);
  const [vidShow, setVidShow] = useState(true);
  const v1 = useRef(null);
  const v2 = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setImgVisible(false);
      setTimeout(() => {
        setCurrentImage(p => (p + 1) % images.length);
        setTimeout(() => setImgVisible(true), 80);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  function onV1End() {
    setVidShow(false);
    setTimeout(() => {
      setVidIndex(1);
      setTimeout(() => {
        setVidShow(true);
        setTimeout(() => {
          if (v2.current) { v2.current.currentTime = 0; v2.current.play().catch(() => {}); }
        }, 50);
      }, 100);
    }, 400);
  }

  function onV2Time() {
    if (v2.current && v2.current.currentTime >= 10) {
      v2.current.pause();
      setVidShow(false);
      setTimeout(() => {
        setVidIndex(0);
        setTimeout(() => {
          setVidShow(true);
          setTimeout(() => {
            if (v1.current) { v1.current.currentTime = 0; v1.current.play().catch(() => {}); }
          }, 50);
        }, 100);
      }, 400);
    }
  }

  return (
    <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <style>{`
        @keyframes rvIn2 { from { clip-path: inset(50% 50% 50% 50% round 12px); } to { clip-path: inset(0 0 0 0 round 12px); } }
        @keyframes rvOut2 { from { clip-path: inset(0 0 0 0 round 12px); } to { clip-path: inset(50% 50% 50% 50% round 12px); } }
      `}</style>
      <div className="max-w-screen-xl mx-auto">
        <div className="relative flex flex-col items-center">
          {/* TV Screen */}
          <div className="relative rounded-[2.5rem] p-6 lg:p-10" style={{
            background: 'linear-gradient(135deg, #0a1628 0%, #0f2847 30%, #0c1a33 60%, #091420 100%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15), 0 0 0 4px rgba(40,50,70,0.9), 0 0 0 8px rgba(25,35,55,0.7)',
            border: '2px solid rgba(80,100,140,0.3)',
          }}>
            {/* Camera dot */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-center justify-center mt-4">
              <div className="w-full lg:w-3/5" style={{
                animation: vidShow ? 'rvIn2 0.4s ease-out forwards' : 'rvOut2 0.3s ease-in forwards',
              }}>
                {vidIndex === 0 && (
                  <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <video ref={v1} className="w-full h-full object-cover" autoPlay muted playsInline onEnded={onV1End} src="/videos/map-manager.mp4" />
                  </div>
                )}
                {vidIndex === 1 && (
                  <div className="rounded-xl overflow-hidden mx-auto" style={{ aspectRatio: '9/19', maxHeight: '600px' }}>
                    <video ref={v2} className="w-full h-full object-cover" muted playsInline onTimeUpdate={onV2Time} src="/videos/video-ship-manager.mp4" />
                  </div>
                )}
              </div>

              <div className="w-full lg:w-2/5 flex justify-center">
                <div style={{ position: 'relative', aspectRatio: '9/19', maxHeight: '600px' }}>
                  {images.map((src, i) => (
                    <img key={i} src={src} alt="App screenshot" className="rounded-xl" style={{
                      position: i === 0 ? 'relative' : 'absolute',
                      top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
                      opacity: i === currentImage && imgVisible ? 1 : 0,
                      transform: i === currentImage && imgVisible ? 'scale(1)' : 'scale(0.85)',
                      transition: 'opacity 0.35s ease, transform 0.35s ease',
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TV Stand */}
          <div className="relative -mt-1 flex flex-col items-center">
            <div style={{
              width: '80px',
              height: '35px',
              background: 'linear-gradient(180deg, #2a3a50 0%, #1a2535 100%)',
              borderRadius: '0 0 8px 8px',
            }} />
            <div style={{
              width: '200px',
              height: '12px',
              background: 'linear-gradient(180deg, #3a4a60 0%, #2a3a50 50%, #1a2535 100%)',
              borderRadius: '0 0 50% 50% / 0 0 100% 100%',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShowcaseSection2;
