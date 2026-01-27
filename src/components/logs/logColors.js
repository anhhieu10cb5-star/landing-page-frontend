// Get CSS class based on log level
export const getLogLevelClass = (level) => {
  switch (level) {
    case 'error':
      return 'log-level--error';
    case 'warn':
      return 'log-level--warn';
    case 'debug':
      return 'log-level--debug';
    case 'info':
    default:
      return 'log-level--info';
  }
};

// Get marker icon and class based on anomaly detection
export const getMarker = (log, gap, index) => {
  // Error
  if (log.level === 'error') {
    return {
      icon: '❌',
      className: 'log-marker--error',
      title: 'Error'
    };
  }

  // Warning
  if (log.level === 'warn') {
    return {
      icon: '⚠️',
      className: 'log-marker--warn',
      title: 'Warning'
    };
  }

  // Slow (> 1 second gap)
  if (gap > 1000) {
    return {
      icon: '🐌',
      className: 'log-marker--slow',
      title: `Slow: ${gap}ms gap`
    };
  }

  // Race condition potential (< 2ms gap, not first log)
  if (gap < 2 && index > 0 && gap > 0) {
    return {
      icon: '⚡',
      className: 'log-marker--race',
      title: `Possible race: ${gap}ms gap`
    };
  }

  // Normal
  return {
    icon: '',
    className: '',
    title: ''
  };
};

// Get color for feature (for timeline lanes)
export const getFeatureColor = (feature) => {
  const colors = {
    webrtc: '#3b82f6',    // blue
    signaling: '#10b981', // green
    auth: '#f59e0b',      // amber
    chat: '#8b5cf6',      // purple
    state: '#ec4899',     // pink
    network: '#06b6d4',   // cyan
    ui: '#f97316',        // orange
    default: '#6b7280'    // gray
  };

  return colors[feature.toLowerCase()] || colors.default;
};

// Level colors
export const levelColors = {
  error: '#ef4444',   // red
  warn: '#f59e0b',    // amber
  info: '#3b82f6',    // blue
  debug: '#6b7280'    // gray
};

// Anomaly type colors
export const anomalyColors = {
  RACE_CONDITION: '#f59e0b',  // amber
  CONFLICT: '#ef4444',        // red
  SLOW: '#6366f1',            // indigo
  ERROR: '#ef4444'            // red
};