import React from 'react';
import { formatTime } from '../../utils/logs/logFormatter';
import { useLogActions } from '../../hooks/logs/useLogActions';

const LogDetail = ({ log, onClose }) => {
  const { copyToClipboard, bookmarkLog } = useLogActions();
  const [copied, setCopied] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(log.isBookmarked || false);

  const handleCopy = async () => {
    const text = JSON.stringify(log, null, 2);
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = async () => {
    const result = await bookmarkLog(log._id || log.id, !bookmarked);
    if (result?.success) {
      setBookmarked(!bookmarked);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Extract context from data
  const context = log.data?.context || {};
  const dataWithoutContext = { ...log.data };
  delete dataWithoutContext.context;

  // Helper functions for context display
  const getBatteryIcon = (level, charging) => {
    if (charging) return '🔌';
    if (level >= 80) return '🔋';
    if (level >= 50) return '🔋';
    if (level >= 20) return '🪫';
    return '🪫';
  };

  const getNetworkIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'wifi': return '📶';
      case 'cellular': return '📱';
      case '4g': return '📱';
      case '5g': return '📱';
      case 'ethernet': return '🔌';
      case 'none': return '❌';
      default: return '🌐';
    }
  };

  const getAppStateIcon = (state) => {
    switch (state?.toLowerCase()) {
      case 'foreground':
      case 'active': return '🟢';
      case 'background': return '🟡';
      case 'inactive': return '🟠';
      default: return '⚪';
    }
  };

  const formatMemory = (mb) => {
    if (!mb) return 'N/A';
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
    return `${mb} MB`;
  };

  const hasContext = Object.keys(context).length > 0;

  return (
    <div className="log-detail-overlay" onClick={handleBackdropClick}>
      <div className="log-detail">
        <div className="log-detail__header">
          <h3 className="log-detail__title">
            <span className={`log-detail__level log-detail__level--${log.level}`}>
              {log.level.toUpperCase()}
            </span>
            {log.event}
          </h3>
          <div className="log-detail__actions">
            <button
              className={`log-detail__btn ${bookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              {bookmarked ? '⭐' : '☆'}
            </button>
            <button
              className="log-detail__btn"
              onClick={handleCopy}
              title="Copy JSON"
            >
              {copied ? '✅' : '📋'}
            </button>
            <button
              className="log-detail__btn log-detail__btn--close"
              onClick={onClose}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="log-detail__body">
          {/* Context Panel - NEW */}
          {hasContext && (
            <div className="log-detail__section log-detail__context">
              <h4>📊 Context Snapshot</h4>
              <div className="log-detail__context-grid">
                {/* Screen */}
                {context.screen && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">📱</span>
                    <div className="log-detail__context-info">
                      <label>Screen</label>
                      <span>{context.screen}</span>
                    </div>
                  </div>
                )}

                {/* App State */}
                {context.app_state && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">{getAppStateIcon(context.app_state)}</span>
                    <div className="log-detail__context-info">
                      <label>App State</label>
                      <span className={`app-state app-state--${context.app_state}`}>
                        {context.app_state}
                      </span>
                    </div>
                  </div>
                )}

                {/* Battery */}
                {context.battery_level !== undefined && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">
                      {getBatteryIcon(context.battery_level, context.battery_charging)}
                    </span>
                    <div className="log-detail__context-info">
                      <label>Battery</label>
                      <span className={context.battery_level < 20 ? 'text-danger' : ''}>
                        {context.battery_level}%
                        {context.battery_charging && ' ⚡'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Network */}
                {context.network_type && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">{getNetworkIcon(context.network_type)}</span>
                    <div className="log-detail__context-info">
                      <label>Network</label>
                      <span className={context.network_connected === false ? 'text-danger' : ''}>
                        {context.network_type}
                        {context.network_connected === false && ' (offline)'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Memory */}
                {(context.memory_used_mb || context.memory_rss_mb) && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">💾</span>
                    <div className="log-detail__context-info">
                      <label>Memory</label>
                      <span>
                        {formatMemory(context.memory_used_mb || context.memory_rss_mb)}
                        {context.memory_total_mb && ` / ${formatMemory(context.memory_total_mb)}`}
                      </span>
                    </div>
                  </div>
                )}

                {/* CPU (for server logs) */}
                {context.cpu_percent !== undefined && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">⚡</span>
                    <div className="log-detail__context-info">
                      <label>CPU</label>
                      <span className={context.cpu_percent > 80 ? 'text-danger' : ''}>
                        {context.cpu_percent}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Load Average (for server logs) */}
                {context.load_avg_1m && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">📈</span>
                    <div className="log-detail__context-info">
                      <label>Load Avg</label>
                      <span>{context.load_avg_1m} / {context.load_avg_5m} / {context.load_avg_15m}</span>
                    </div>
                  </div>
                )}

                {/* Disk (for server logs) */}
                {context.disk_percent !== undefined && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">💿</span>
                    <div className="log-detail__context-info">
                      <label>Disk</label>
                      <span className={context.disk_percent > 90 ? 'text-danger' : ''}>
                        {context.disk_percent}% used
                        {context.disk_free_gb && ` (${context.disk_free_gb} GB free)`}
                      </span>
                    </div>
                  </div>
                )}

                {/* URL/Pathname (for web logs) */}
                {context.pathname && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">🔗</span>
                    <div className="log-detail__context-info">
                      <label>URL</label>
                      <span title={context.url}>{context.pathname}</span>
                    </div>
                  </div>
                )}

                {/* Viewport (for web/mobile) */}
                {context.viewport_width && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">📐</span>
                    <div className="log-detail__context-info">
                      <label>Viewport</label>
                      <span>{context.viewport_width} × {context.viewport_height}</span>
                    </div>
                  </div>
                )}

                {/* Operation (for server logs) */}
                {context.operation && context.operation !== 'Unknown' && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">⚙️</span>
                    <div className="log-detail__context-info">
                      <label>Operation</label>
                      <span>{context.operation}</span>
                    </div>
                  </div>
                )}

                {/* Uptime (for server logs) */}
                {context.uptime_seconds && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">⏱️</span>
                    <div className="log-detail__context-info">
                      <label>Uptime</label>
                      <span>{Math.round(context.uptime_seconds / 60)}m</span>
                    </div>
                  </div>
                )}

                {/* Thread Count (for server logs) */}
                {context.thread_count && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">🧵</span>
                    <div className="log-detail__context-info">
                      <label>Threads</label>
                      <span>{context.thread_count}</span>
                    </div>
                  </div>
                )}

                {/* Online status (for web) */}
                {context.online !== undefined && (
                  <div className="log-detail__context-card">
                    <span className="log-detail__context-icon">{context.online ? '🟢' : '🔴'}</span>
                    <div className="log-detail__context-info">
                      <label>Online</label>
                      <span>{context.online ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Custom context fields */}
              {Object.keys(context).filter(k => 
                !['screen', 'app_state', 'battery_level', 'battery_charging', 'network_type', 
                  'network_connected', 'memory_used_mb', 'memory_rss_mb', 'memory_total_mb',
                  'cpu_percent', 'load_avg_1m', 'load_avg_5m', 'load_avg_15m', 'disk_percent',
                  'disk_free_gb', 'pathname', 'url', 'viewport_width', 'viewport_height',
                  'operation', 'uptime_seconds', 'thread_count', 'online', 'timestamp_local',
                  'memory_heap_used_mb', 'memory_heap_total_mb', 'memory_external_mb',
                  'heap_size_limit_mb', 'heap_used_percent', 'cpu_user_ms', 'cpu_system_ms',
                  'os_free_memory_mb', 'os_free_memory_percent', 'active_handles', 'active_requests',
                  'pid', 'network_details', 'memory_percent', 'memory_vms_mb', 'system_cpu_percent',
                  'system_memory_available_mb', 'system_memory_percent', 'connections', 'open_files',
                  'network_downlink', 'network_rtt'
                ].includes(k)
              ).length > 0 && (
                <div className="log-detail__context-custom">
                  <h5>Custom Context</h5>
                  <div className="log-detail__grid">
                    {Object.entries(context)
                      .filter(([k]) => !['screen', 'app_state', 'battery_level', 'battery_charging', 
                        'network_type', 'network_connected', 'memory_used_mb', 'memory_rss_mb',
                        'memory_total_mb', 'timestamp_local', 'cpu_percent', 'load_avg_1m',
                        'load_avg_5m', 'load_avg_15m', 'disk_percent', 'disk_free_gb', 'pathname',
                        'url', 'viewport_width', 'viewport_height', 'operation', 'uptime_seconds',
                        'thread_count', 'online', 'memory_heap_used_mb', 'memory_heap_total_mb',
                        'memory_external_mb', 'heap_size_limit_mb', 'heap_used_percent',
                        'cpu_user_ms', 'cpu_system_ms', 'os_free_memory_mb', 'os_free_memory_percent',
                        'active_handles', 'active_requests', 'pid', 'network_details', 'memory_percent',
                        'memory_vms_mb', 'system_cpu_percent', 'system_memory_available_mb',
                        'system_memory_percent', 'connections', 'open_files', 'network_downlink',
                        'network_rtt'
                      ].includes(k))
                      .map(([key, value]) => (
                        <div className="log-detail__field" key={key}>
                          <label>{key}</label>
                          <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Basic Info */}
          <div className="log-detail__section">
            <h4>📋 Basic Info</h4>
            <div className="log-detail__grid">
              <div className="log-detail__field">
                <label>Project</label>
                <span>{log.project}</span>
              </div>
              <div className="log-detail__field">
                <label>Feature</label>
                <span>{log.feature}</span>
              </div>
              <div className="log-detail__field">
                <label>Event</label>
                <span>{log.event}</span>
              </div>
              <div className="log-detail__field">
                <label>Level</label>
                <span className={`log-detail__level-badge log-detail__level-badge--${log.level}`}>
                  {log.level}
                </span>
              </div>
              <div className="log-detail__field">
                <label>Sequence</label>
                <span>#{log.sequence}</span>
              </div>
              <div className="log-detail__field">
                <label>Session</label>
                <span title={log.sessionId}>{log.sessionId?.substring(0, 8)}...</span>
              </div>
            </div>
          </div>

          {/* Timing */}
          <div className="log-detail__section">
            <h4>⏱️ Timing</h4>
            <div className="log-detail__grid">
              <div className="log-detail__field">
                <label>Client Time</label>
                <span>{formatTime(log.clientTime)}</span>
              </div>
              <div className="log-detail__field">
                <label>Since Session Start</label>
                <span>{log.sinceSessionStart}ms</span>
              </div>
              <div className="log-detail__field">
                <label>Since Last Event</label>
                <span className={log.sinceLastEvent > 1000 ? 'text-warning' : ''}>
                  {log.sinceLastEvent}ms
                  {log.sinceLastEvent > 1000 && ' 🐌'}
                  {log.sinceLastEvent < 2 && log.sinceLastEvent > 0 && ' ⚡'}
                </span>
              </div>
            </div>
          </div>

          {/* Source & Target */}
          {(log.source || log.target || log.action) && (
            <div className="log-detail__section">
              <h4>🎯 Source & Target</h4>
              <div className="log-detail__grid">
                {log.source && (
                  <div className="log-detail__field">
                    <label>Source</label>
                    <span>{log.source}</span>
                  </div>
                )}
                {log.target && (
                  <div className="log-detail__field">
                    <label>Target</label>
                    <span>{log.target}</span>
                  </div>
                )}
                {log.action && (
                  <div className="log-detail__field">
                    <label>Action</label>
                    <span>{log.action}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Data (without context) */}
          <div className="log-detail__section">
            <h4>📦 Data</h4>
            <pre className="log-detail__data">
              {Object.keys(dataWithoutContext).length > 0 
                ? JSON.stringify(dataWithoutContext, null, 2) 
                : 'No additional data'}
            </pre>
          </div>

          {/* Stack Trace */}
          {log.stackTrace && (
            <div className="log-detail__section">
              <h4>🔥 Stack Trace</h4>
              <pre className="log-detail__stack">{log.stackTrace}</pre>
            </div>
          )}

          {/* Device Info */}
          {log.deviceInfo && Object.keys(log.deviceInfo).length > 0 && (
            <div className="log-detail__section">
              <h4>📱 Device Info</h4>
              <div className="log-detail__grid">
                {Object.entries(log.deviceInfo).map(([key, value]) => (
                  <div className="log-detail__field" key={key}>
                    <label>{key.replace(/_/g, ' ')}</label>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogDetail;