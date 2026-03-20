import React from 'react';

function DeviceMockups() {
  return (
    <div className="relative w-[750px] h-[600px] flex items-end justify-center">
      {/* Tablet - trái */}
      <div className="absolute left-0 bottom-5 transform -rotate-12 z-10">
        <div className="w-[300px] h-[405px] bg-gray-900 rounded-3xl p-4 shadow-2xl border border-gray-700">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl overflow-hidden">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/40 rounded"></div>
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-white/40 rounded mb-1.5 w-24"></div>
                  <div className="h-2 bg-white/20 rounded w-16"></div>
                </div>
                <div className="w-9 h-9 bg-orange-400 rounded-full"></div>
              </div>
              
              {/* Stats cards */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 h-16 bg-white/15 rounded-xl p-3">
                  <div className="text-[10px] text-white/60">Doanh thu</div>
                  <div className="text-sm text-white font-bold">$12,530</div>
                </div>
                <div className="flex-1 h-16 bg-white/15 rounded-xl p-3">
                  <div className="text-[10px] text-white/60">Đơn hàng</div>
                  <div className="text-sm text-white font-bold">+285</div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-28 bg-white/10 rounded-xl p-3 mb-4">
                <div className="flex items-end justify-between h-full gap-1.5">
                  <div className="w-6 h-8 bg-orange-400 rounded-t"></div>
                  <div className="w-6 h-14 bg-pink-400 rounded-t"></div>
                  <div className="w-6 h-11 bg-purple-400 rounded-t"></div>
                  <div className="w-6 h-20 bg-blue-400 rounded-t"></div>
                  <div className="w-6 h-12 bg-cyan-400 rounded-t"></div>
                  <div className="w-6 h-16 bg-green-400 rounded-t"></div>
                  <div className="w-6 h-10 bg-yellow-400 rounded-t"></div>
                </div>
              </div>
              
              {/* List items */}
              <div className="space-y-3">
                <div className="h-11 bg-white/10 rounded-lg flex items-center px-3 gap-3">
                  <div className="w-6 h-6 bg-green-400 rounded-full"></div>
                  <div className="flex-1 h-2 bg-white/30 rounded"></div>
                </div>
                <div className="h-11 bg-white/10 rounded-lg flex items-center px-3 gap-3">
                  <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                  <div className="flex-1 h-2 bg-white/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Monitor - giữa */}
      <div className="relative z-20 mb-0">
        <div className="w-[450px] h-[285px] bg-gray-900 rounded-xl p-3 shadow-2xl border border-gray-700">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden">
            <div className="p-4 h-full">
              {/* Browser header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 h-5 bg-gray-700 rounded-full px-3 flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                  <div className="h-2 bg-gray-600 rounded flex-1"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex gap-3 h-[195px]">
                {/* Sidebar */}
                <div className="w-20 bg-blue-600/30 rounded-lg p-2">
                  <div className="w-9 h-9 bg-blue-500 rounded-lg mx-auto mb-3"></div>
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-blue-500 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/40 rounded"></div>
                    </div>
                    <div className="w-full h-8 bg-white/10 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/20 rounded"></div>
                    </div>
                    <div className="w-full h-8 bg-white/10 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/20 rounded"></div>
                    </div>
                    <div className="w-full h-8 bg-white/10 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 space-y-3">
                  {/* Stats row */}
                  <div className="flex gap-2">
                    <div className="flex-1 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-3">
                      <div className="text-[9px] text-white/80">Revenue</div>
                      <div className="text-base text-white font-bold">$45,231</div>
                      <div className="text-[8px] text-green-300">+12.5%</div>
                    </div>
                    <div className="flex-1 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3">
                      <div className="text-[9px] text-white/80">Users</div>
                      <div className="text-base text-white font-bold">2,543</div>
                      <div className="text-[8px] text-green-300">+8.2%</div>
                    </div>
                    <div className="flex-1 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
                      <div className="text-[9px] text-white/80">Orders</div>
                      <div className="text-base text-white font-bold">1,832</div>
                      <div className="text-[8px] text-green-300">+5.7%</div>
                    </div>
                  </div>
                  
                  {/* Chart */}
                  <div className="h-24 bg-white/5 rounded-lg p-3">
                    <div className="flex items-end justify-between h-full">
                      <div className="w-7 h-5 bg-blue-400/60 rounded-t"></div>
                      <div className="w-7 h-12 bg-blue-500/70 rounded-t"></div>
                      <div className="w-7 h-8 bg-blue-400/60 rounded-t"></div>
                      <div className="w-7 h-14 bg-blue-600/80 rounded-t"></div>
                      <div className="w-7 h-7 bg-blue-400/60 rounded-t"></div>
                      <div className="w-7 h-13 bg-blue-500/70 rounded-t"></div>
                      <div className="w-7 h-10 bg-blue-400/60 rounded-t"></div>
                      <div className="w-7 h-16 bg-cyan-500 rounded-t"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stand */}
        <div className="w-24 h-8 bg-gradient-to-b from-gray-700 to-gray-800 mx-auto rounded-b-lg"></div>
        <div className="w-40 h-4 bg-gray-800 mx-auto rounded-full shadow-lg"></div>
      </div>

      {/* Smartphone - phải */}
      <div className="absolute right-0 bottom-5 transform rotate-12 z-30">
        <div className="w-[150px] h-[300px] bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl border border-gray-700">
          {/* Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-10"></div>
          <div className="w-full h-full bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500 rounded-[2rem] overflow-hidden">
            <div className="p-3 pt-8">
              {/* Status bar */}
              <div className="flex justify-between items-center mb-3 px-1">
                <div className="text-[8px] text-white/80">9:41</div>
                <div className="flex gap-1">
                  <div className="w-3 h-2 bg-white/60 rounded-sm"></div>
                  <div className="w-3 h-2 bg-white/60 rounded-sm"></div>
                  <div className="w-5 h-2.5 bg-white/60 rounded-sm"></div>
                </div>
              </div>
              
              {/* Profile */}
              <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <div className="w-10 h-10 bg-white/40 rounded-full"></div>
              </div>
              <div className="h-2.5 bg-white/40 rounded w-20 mx-auto mb-1"></div>
              <div className="h-2 bg-white/20 rounded w-14 mx-auto mb-5"></div>
              
              {/* Menu items */}
              <div className="space-y-2.5">
                <div className="h-12 bg-white/15 rounded-xl flex items-center px-3 gap-3">
                  <div className="w-7 h-7 bg-blue-400/50 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white/60 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-white/40 rounded w-16 mb-1"></div>
                    <div className="h-1.5 bg-white/20 rounded w-12"></div>
                  </div>
                </div>
                <div className="h-12 bg-white/15 rounded-xl flex items-center px-3 gap-3">
                  <div className="w-7 h-7 bg-purple-400/50 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white/60 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-white/40 rounded w-14 mb-1"></div>
                    <div className="h-1.5 bg-white/20 rounded w-10"></div>
                  </div>
                </div>
                <div className="h-12 bg-orange-500/70 rounded-xl flex items-center justify-center">
                  <div className="h-2.5 bg-white/80 rounded w-16"></div>
                </div>
              </div>
              
              {/* Bottom nav */}
              <div className="absolute bottom-4 left-3 right-3 h-10 bg-white/10 rounded-full flex items-center justify-around px-4">
                <div className="w-5 h-5 bg-white/50 rounded-full"></div>
                <div className="w-5 h-5 bg-white/25 rounded-full"></div>
                <div className="w-5 h-5 bg-white/25 rounded-full"></div>
                <div className="w-5 h-5 bg-white/25 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceMockups;
