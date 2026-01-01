import React, { useState } from 'react';

// Device Frame Component
const DeviceFrame = ({ device = 'iphone-15', children, scale = 1, label }) => {
  const devices = {
    'iphone-15': {
      name: 'iPhone 15 Pro',
      width: 393,
      height: 852,
      radius: 55,
      notch: 'dynamic-island',
      bezel: 12,
    },
    'iphone-se': {
      name: 'iPhone SE',
      width: 375,
      height: 667,
      radius: 40,
      notch: 'none',
      bezel: 16,
      homeButton: true,
    },
    'samsung-s24': {
      name: 'Samsung S24',
      width: 384,
      height: 854,
      radius: 45,
      notch: 'punch-hole',
      bezel: 10,
    },
    'pixel-8': {
      name: 'Pixel 8',
      width: 380,
      height: 848,
      radius: 48,
      notch: 'punch-hole',
      bezel: 12,
    },
  };

  const d = devices[device];

  return (
    <div 
      className="relative"
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      {/* Device Label */}
      {label && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
          {label}
        </div>
      )}
      
      {/* Device outer frame */}
      <div
        className="relative bg-gradient-to-b from-gray-800 via-gray-900 to-black p-3 shadow-2xl"
        style={{
          width: d.width + 24,
          height: d.height + 24,
          borderRadius: d.radius + 8,
          boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Side buttons - Volume */}
        <div className="absolute -left-1 top-32 w-1 h-8 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-1 top-44 w-1 h-8 bg-gray-700 rounded-l-sm" />
        
        {/* Side button - Power */}
        <div className="absolute -right-1 top-36 w-1 h-16 bg-gray-700 rounded-r-sm" />

        {/* Screen area */}
        <div
          className="relative bg-black overflow-hidden"
          style={{
            width: d.width,
            height: d.height,
            borderRadius: d.radius,
          }}
        >
          {/* Dynamic Island / Notch */}
          {d.notch === 'dynamic-island' && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-gray-900 mr-8" />
            </div>
          )}
          
          {d.notch === 'punch-hole' && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border-2 border-gray-900" />
          )}

          {/* Home Button for older iPhones */}
          {d.homeButton && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-gray-700 z-50" />
          )}

          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 z-40">
            <span className="text-white text-sm font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.73v3.1c0 .4.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
              </svg>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 4h-3V2h-4v2H7v18h10V4z"/>
              </svg>
            </div>
          </div>

          {/* Screen Content */}
          <div className="absolute inset-0 pt-12 pb-6 overflow-hidden bg-gray-950">
            {children}
          </div>

          {/* Home Indicator */}
          {!d.homeButton && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full z-50" />
          )}
        </div>
      </div>
      
      {/* Device name */}
      <div className="text-center mt-4 text-gray-400 text-sm font-medium">
        {d.name}
      </div>
    </div>
  );
};

// ==================== UI PREVIEWS ====================

// 1. Chat UI - Now with user prop for different views
const ChatPreview = ({ user = 'A', messages = [], onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  
  const userInfo = {
    A: { name: 'User A', avatar: '🅰️', color: 'from-emerald-400 to-cyan-500' },
    B: { name: 'User B', avatar: '🅱️', color: 'from-purple-400 to-pink-500' },
  };
  
  const currentUser = userInfo[user];
  const otherUser = userInfo[user === 'A' ? 'B' : 'A'];

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(user, inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-950">
      <div className="bg-gray-900 px-4 py-3 flex items-center gap-3 border-b border-gray-800">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${otherUser.color} flex items-center justify-center text-lg`}>
          {otherUser.avatar}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{otherUser.name}</div>
          <div className="text-emerald-400 text-xs">Online</div>
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-3 overflow-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 text-sm mt-8">
            Bắt đầu cuộc trò chuyện...
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === user ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                msg.from === user 
                  ? 'bg-emerald-600 text-white rounded-br-md' 
                  : 'bg-gray-800 text-white rounded-bl-md'
              }`}>
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
          <input 
            type="text" 
            placeholder="Nhập tin nhắn..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
          />
          <button 
            onClick={handleSend}
            className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. E-Commerce UI
const EcommercePreview = () => (
  <div className="h-full flex flex-col bg-gray-950">
    {/* Header */}
    <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-800">
      <div className="text-white font-bold text-lg">GnodShop</div>
      <div className="flex items-center gap-3">
        <span className="text-xl">🔍</span>
        <div className="relative">
          <span className="text-xl">🛒</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-xs text-white flex items-center justify-center">3</div>
        </div>
      </div>
    </div>

    {/* Products */}
    <div className="flex-1 p-3 overflow-auto">
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: 'iPhone 15 Pro', price: '28.990.000đ', img: '📱' },
          { name: 'AirPods Pro', price: '5.990.000đ', img: '🎧' },
          { name: 'MacBook Air', price: '27.990.000đ', img: '💻' },
          { name: 'Apple Watch', price: '9.990.000đ', img: '⌚' },
        ].map((item, i) => (
          <div key={i} className="bg-gray-900 rounded-xl p-3 border border-gray-800">
            <div className="text-4xl text-center py-4">{item.img}</div>
            <div className="text-white text-sm font-medium truncate">{item.name}</div>
            <div className="text-emerald-400 text-sm font-bold mt-1">{item.price}</div>
            <button className="w-full mt-2 bg-emerald-600 text-white text-xs py-2 rounded-lg">
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Nav */}
    <div className="bg-gray-900 border-t border-gray-800 px-6 py-3 flex justify-around">
      <span className="text-emerald-400 text-xl">🏠</span>
      <span className="text-gray-500 text-xl">📦</span>
      <span className="text-gray-500 text-xl">❤️</span>
      <span className="text-gray-500 text-xl">👤</span>
    </div>
  </div>
);

// 3. Login UI
const LoginPreview = () => (
  <div className="h-full flex flex-col bg-gray-950 p-6 justify-center">
    <div className="text-center mb-8">
      <div className="text-5xl mb-4">🔐</div>
      <h2 className="text-white text-2xl font-bold">Đăng nhập</h2>
      <p className="text-gray-400 text-sm mt-2">Chào mừng bạn quay lại</p>
    </div>

    <div className="space-y-4">
      <div>
        <label className="text-gray-400 text-xs mb-1 block">Email</label>
        <input 
          type="email" 
          placeholder="your@email.com"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
        />
      </div>
      <div>
        <label className="text-gray-400 text-xs mb-1 block">Mật khẩu</label>
        <input 
          type="password" 
          placeholder="••••••••"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
        />
      </div>
      
      <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl mt-4">
        Đăng nhập
      </button>

      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-gray-800"></div>
        <span className="text-gray-500 text-xs">hoặc</span>
        <div className="flex-1 h-px bg-gray-800"></div>
      </div>

      <div className="flex justify-center gap-4">
        <button className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-xl border border-gray-800">
          G
        </button>
        <button className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-xl border border-gray-800">
          f
        </button>
        <button className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-xl border border-gray-800">
          🍎
        </button>
      </div>
    </div>

    <p className="text-center text-gray-500 text-xs mt-8">
      Chưa có tài khoản? <span className="text-emerald-400">Đăng ký</span>
    </p>
  </div>
);

// 4. Dashboard UI
const DashboardPreview = () => (
  <div className="h-full flex flex-col bg-gray-950">
    {/* Header */}
    <div className="px-4 py-3 flex items-center justify-between">
      <div>
        <div className="text-gray-400 text-xs">Xin chào,</div>
        <div className="text-white font-bold">Hiếu Nguyễn 👋</div>
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
    </div>

    {/* Balance Card */}
    <div className="mx-4 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl p-4 mt-2">
      <div className="text-white/70 text-xs">Tổng số dư</div>
      <div className="text-white text-2xl font-bold mt-1">125.500.000đ</div>
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-white/20 text-white text-xs py-2 rounded-lg">Nạp tiền</button>
        <button className="flex-1 bg-white/20 text-white text-xs py-2 rounded-lg">Chuyển</button>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-3 p-4">
      {[
        { label: 'Doanh thu', value: '52.3M', icon: '📈', color: 'text-emerald-400' },
        { label: 'Đơn hàng', value: '1,234', icon: '📦', color: 'text-cyan-400' },
        { label: 'Khách hàng', value: '856', icon: '👥', color: 'text-purple-400' },
        { label: 'Sản phẩm', value: '142', icon: '🏷️', color: 'text-orange-400' },
      ].map((stat, i) => (
        <div key={i} className="bg-gray-900 rounded-xl p-3 border border-gray-800">
          <div className="text-xl">{stat.icon}</div>
          <div className={`text-lg font-bold ${stat.color} mt-1`}>{stat.value}</div>
          <div className="text-gray-500 text-xs">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Recent */}
    <div className="flex-1 px-4">
      <div className="text-white font-semibold text-sm mb-3">Giao dịch gần đây</div>
      <div className="space-y-2">
        {[
          { name: 'Nhận tiền', amount: '+2.500.000đ', time: '2 phút trước' },
          { name: 'Thanh toán', amount: '-350.000đ', time: '1 giờ trước' },
        ].map((tx, i) => (
          <div key={i} className="bg-gray-900 rounded-xl p-3 flex items-center justify-between">
            <div>
              <div className="text-white text-sm">{tx.name}</div>
              <div className="text-gray-500 text-xs">{tx.time}</div>
            </div>
            <div className={tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}>
              {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Nav */}
    <div className="bg-gray-900 border-t border-gray-800 px-6 py-3 flex justify-around">
      <span className="text-emerald-400 text-xl">🏠</span>
      <span className="text-gray-500 text-xl">📊</span>
      <span className="text-gray-500 text-xl">💳</span>
      <span className="text-gray-500 text-xl">⚙️</span>
    </div>
  </div>
);

// 5. Social Feed UI
const SocialPreview = () => (
  <div className="h-full flex flex-col bg-gray-950">
    {/* Header */}
    <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-800">
      <div className="text-white font-bold text-lg">GnodSocial</div>
      <div className="flex items-center gap-3">
        <span className="text-xl">➕</span>
        <span className="text-xl">💬</span>
      </div>
    </div>

    {/* Stories */}
    <div className="px-4 py-3 flex gap-3 overflow-x-auto border-b border-gray-800">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5">
          <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center text-xl">➕</div>
        </div>
        <span className="text-gray-400 text-xs mt-1">Bạn</span>
      </div>
      {['😀', '🎮', '🎨', '🎵'].map((emoji, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 p-0.5">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-xl">{emoji}</div>
          </div>
          <span className="text-gray-400 text-xs mt-1">User {i+1}</span>
        </div>
      ))}
    </div>

    {/* Posts */}
    <div className="flex-1 overflow-auto">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
          <div>
            <div className="text-white font-semibold text-sm">Hiếu Dev</div>
            <div className="text-gray-500 text-xs">2 giờ trước</div>
          </div>
        </div>
        <p className="text-white text-sm mb-3">Vừa hoàn thành SDK mới cho GnodCloud! 🚀🎉</p>
        <div className="bg-gray-800 rounded-xl h-40 flex items-center justify-center text-4xl">
          🎉
        </div>
        <div className="flex items-center gap-6 mt-3 text-gray-400">
          <span className="flex items-center gap-1 text-sm">❤️ 128</span>
          <span className="flex items-center gap-1 text-sm">💬 24</span>
          <span className="flex items-center gap-1 text-sm">🔄 12</span>
        </div>
      </div>
    </div>

    {/* Bottom Nav */}
    <div className="bg-gray-900 border-t border-gray-800 px-6 py-3 flex justify-around">
      <span className="text-emerald-400 text-xl">🏠</span>
      <span className="text-gray-500 text-xl">🔍</span>
      <span className="text-gray-500 text-xl">🎬</span>
      <span className="text-gray-500 text-xl">👤</span>
    </div>
  </div>
);

// 6. Music Player UI
const MusicPreview = () => (
  <div className="h-full flex flex-col bg-gradient-to-b from-emerald-900/50 to-gray-950 p-6 justify-center items-center">
    {/* Album Art */}
    <div className="w-56 h-56 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-600 shadow-2xl flex items-center justify-center text-8xl mb-8">
      🎵
    </div>

    {/* Song Info */}
    <div className="text-center mb-6">
      <h2 className="text-white text-xl font-bold">Nhạc Hay Nhất</h2>
      <p className="text-gray-400 text-sm mt-1">GnodMusic Artist</p>
    </div>

    {/* Progress Bar */}
    <div className="w-full mb-4">
      <div className="h-1 bg-gray-800 rounded-full">
        <div className="h-1 bg-emerald-500 rounded-full w-1/3"></div>
      </div>
      <div className="flex justify-between text-gray-500 text-xs mt-1">
        <span>1:23</span>
        <span>3:45</span>
      </div>
    </div>

    {/* Controls */}
    <div className="flex items-center justify-center gap-8">
      <button className="text-gray-400 text-2xl">⏮️</button>
      <button className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-3xl text-white shadow-lg shadow-emerald-500/50">
        ▶️
      </button>
      <button className="text-gray-400 text-2xl">⏭️</button>
    </div>

    {/* Volume */}
    <div className="flex items-center gap-3 mt-8 w-full">
      <span className="text-gray-500">🔈</span>
      <div className="flex-1 h-1 bg-gray-800 rounded-full">
        <div className="h-1 bg-white rounded-full w-2/3"></div>
      </div>
      <span className="text-gray-500">🔊</span>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================

export default function DevicePreviewDemo() {
  const [selectedDevice, setSelectedDevice] = useState('iphone-15');
  const [selectedUI, setSelectedUI] = useState('chat');
  const [messages, setMessages] = useState([]);

  const deviceOptions = [
    { id: 'iphone-15', name: 'iPhone 15 Pro', icon: '📱' },
    { id: 'iphone-se', name: 'iPhone SE', icon: '📱' },
    { id: 'samsung-s24', name: 'Samsung S24', icon: '📱' },
    { id: 'pixel-8', name: 'Pixel 8', icon: '📱' },
  ];

  const uiOptions = [
    { id: 'chat', name: 'Chat App', icon: '💬', desc: 'Ứng dụng nhắn tin' },
    { id: 'ecommerce', name: 'E-Commerce', icon: '🛒', desc: 'Cửa hàng online' },
    { id: 'login', name: 'Login / Auth', icon: '🔐', desc: 'Đăng nhập & xác thực' },
    { id: 'dashboard', name: 'Dashboard', icon: '📊', desc: 'Bảng điều khiển' },
    { id: 'social', name: 'Social Feed', icon: '📱', desc: 'Mạng xã hội' },
    { id: 'music', name: 'Music Player', icon: '🎵', desc: 'Trình phát nhạc' },
  ];

  // Handle sending message from either device
  const handleSendMessage = (from, text) => {
    setMessages(prev => [...prev, { from, text, timestamp: Date.now() }]);
  };

  const renderPreview = (user = 'A') => {
    switch (selectedUI) {
      case 'chat': 
        return <ChatPreview user={user} messages={messages} onSendMessage={handleSendMessage} />;
      case 'ecommerce': return <EcommercePreview />;
      case 'login': return <LoginPreview />;
      case 'dashboard': return <DashboardPreview />;
      case 'social': return <SocialPreview />;
      case 'music': return <MusicPreview />;
      default: return <ChatPreview user={user} messages={messages} onSendMessage={handleSendMessage} />;
    }
  };

  // Check if current UI supports dual device
  const isDualDeviceUI = selectedUI === 'chat';

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Gnod<span className="text-emerald-400">Cloud</span> Studio
          </h1>
          <p className="text-gray-400">Chọn thiết bị và UI template để xem preview trực tiếp</p>
          
          {/* Live Preview Badge */}
          {isDualDeviceUI && (
            <div className="inline-flex items-center gap-2 mt-4 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Live Preview - Chat qua lại giữa 2 thiết bị
            </div>
          )}
        </div>

        <div className="flex gap-8 justify-center">
          {/* Left Panel - Options */}
          <div className="w-72 space-y-6 flex-shrink-0">
            {/* Device Selector */}
            <div className="bg-gray-900/50 rounded-2xl p-5 border border-gray-800">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>📱</span> Chọn thiết bị
              </h3>
              <div className="space-y-2">
                {deviceOptions.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedDevice === device.id
                        ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400'
                        : 'bg-gray-800/50 border-2 border-transparent text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <span className="mr-2">{device.icon}</span>
                    {device.name}
                  </button>
                ))}
              </div>
            </div>

            {/* UI Selector */}
            <div className="bg-gray-900/50 rounded-2xl p-5 border border-gray-800">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>🎨</span> Chọn UI Template
              </h3>
              <div className="space-y-2">
                {uiOptions.map((ui) => (
                  <button
                    key={ui.id}
                    onClick={() => {
                      setSelectedUI(ui.id);
                      setMessages([]); // Reset messages when switching UI
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedUI === ui.id
                        ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400'
                        : 'bg-gray-800/50 border-2 border-transparent text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{ui.icon}</span>
                      <div>
                        <div className="font-medium">{ui.name}</div>
                        <div className="text-xs text-gray-500">{ui.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deploy Button */}
            <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity">
              🚀 Deploy to Production
            </button>
          </div>

          {/* Right Panel - Device Preview */}
          <div className="flex items-start gap-8">
            {/* Device A */}
            <DeviceFrame 
              device={selectedDevice} 
              scale={1.1}
              label={isDualDeviceUI ? "User A" : null}
            >
              {renderPreview('A')}
            </DeviceFrame>

            {/* Device B - Only show for dual-device UIs */}
            {isDualDeviceUI && (
              <DeviceFrame 
                device={selectedDevice} 
                scale={1.1}
                label="User B"
              >
                {renderPreview('B')}
              </DeviceFrame>
            )}
          </div>
        </div>

        {/* Instructions for Chat */}
        {isDualDeviceUI && (
          <div className="text-center mt-8 text-gray-500 text-sm">
            💡 Gõ tin nhắn ở một thiết bị và xem nó hiện trên thiết bị kia
          </div>
        )}
      </div>
    </div>
  );
}