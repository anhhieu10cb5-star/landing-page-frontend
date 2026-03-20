import React from 'react';
import { ArrowLeft } from 'lucide-react';

const TrackingHeader = ({ projectCode }) => (
  <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between">
      <button onClick={() => window.location.href = '/'} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition font-medium">
        <ArrowLeft className="w-5 h-5" />
        <span>Quay lại danh sách</span>
      </button>
    </div>
  </div>
);

export default TrackingHeader;
