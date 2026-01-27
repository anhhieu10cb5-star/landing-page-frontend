import React from 'react';
import { formatRelativeTime, formatGap, formatData } from '../../utils/logs/logFormatter';
import { getMarker } from '../../utils/logs/logColors';

const LogTimeline = ({ logs, loading, onLogClick }) => {
  if (loading) {
    return (
      <div className="log-timeline log-timeline--loading">
        <div className="log-timeline__spinner"></div>
        <p>Loading timeline...</p>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="log-timeline log-timeline--empty">
        <div className="log-timeline__empty-icon">📈</div>
        <p>No logs to display</p>
        <span>Select a project and session to view timeline</span>
      </div>
    );
  }

  const firstTime = new Date(logs[logs.length - 1].clientTime).getTime();
  const lastTime = new Date(logs[0].clientTime).getTime();
  const totalDuration = lastTime - firstTime;

  // Group logs by feature để hiển thị lanes
  const features = [...new Set(logs.map(l => l.feature))];

  return (
    <div className="log-timeline">
      <div className="log-timeline__header">
        <h3>📈 Timeline View</h3>
        <span className="log-timeline__duration">
          Total duration: {formatRelativeTime(totalDuration)}
        </span>
      </div>

      <div className="log-timeline__legend">
        {features.map(feature => (
          <span key={feature} className="log-timeline__legend-item">
            <span className={`log-timeline__legend-dot log-timeline__legend-dot--${feature.toLowerCase()}`}></span>
            {feature}
          </span>
        ))}
      </div>

      <div className="log-timeline__container">
        <div className="log-timeline__track">
          {logs.map((log, index) => {
            const diff = new Date(log.clientTime).getTime() - firstTime;
            const position = totalDuration > 0 ? (diff / totalDuration) * 100 : 0;
            const gap = log.sinceLastEvent || 0;
            const marker = getMarker(log, gap, index);

            return (
              <div
                key={log._id}
                className={`log-timeline__event log-timeline__event--${log.level} ${marker.className}`}
                style={{ left: `${position}%` }}
                onClick={() => onLogClick(log)}
                title={`#${log.sequence} ${log.event} (${formatRelativeTime(diff)})`}
              >
                <div className="log-timeline__event-marker">
                  {marker.icon}
                </div>
                <div className="log-timeline__event-tooltip">
                  <div className="log-timeline__event-header">
                    <span className="log-timeline__event-seq">#{log.sequence}</span>
                    <span className="log-timeline__event-time">{formatRelativeTime(diff)}</span>
                  </div>
                  <div className="log-timeline__event-feature">{log.feature}</div>
                  <div className="log-timeline__event-name">{log.event}</div>
                  {gap > 0 && (
                    <div className={`log-timeline__event-gap ${gap > 1000 ? 'slow' : ''}`}>
                      Gap: {formatGap(gap)}
                    </div>
                  )}
                  {Object.keys(log.data || {}).length > 0 && (
                    <div className="log-timeline__event-data">
                      {formatData(log.data, 80)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="log-timeline__axis">
          <span className="log-timeline__axis-start">0ms</span>
          <span className="log-timeline__axis-mid">{formatRelativeTime(totalDuration / 2)}</span>
          <span className="log-timeline__axis-end">{formatRelativeTime(totalDuration)}</span>
        </div>
      </div>

      <div className="log-timeline__list">
        {logs.map((log, index) => {
          const diff = new Date(log.clientTime).getTime() - firstTime;
          const gap = log.sinceLastEvent || 0;
          const marker = getMarker(log, gap, index);

          return (
            <div
              key={log._id}
              className={`log-timeline__item log-timeline__item--${log.level} ${marker.className}`}
              onClick={() => onLogClick(log)}
            >
              <div className="log-timeline__item-marker">{marker.icon}</div>
              <div className="log-timeline__item-time">{formatRelativeTime(diff)}</div>
              <div className="log-timeline__item-gap">{formatGap(gap)}</div>
              <div className="log-timeline__item-feature">{log.feature}</div>
              <div className="log-timeline__item-event">{log.event}</div>
              <div className="log-timeline__item-data">{formatData(log.data, 40)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogTimeline;