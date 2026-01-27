import React from 'react';
import { formatTime, formatData } from '../../utils/logs/logFormatter';
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
    const result = await bookmarkLog(log._id, !bookmarked);
    if (result?.success) {
      setBookmarked(!bookmarked);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
          <div className="log-detail__section">
            <h4>Basic Info</h4>
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
                <span>{log.sessionId}</span>
              </div>
            </div>
          </div>

          <div className="log-detail__section">
            <h4>Timing</h4>
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
                </span>
              </div>
            </div>
          </div>

          {log.source && (
            <div className="log-detail__section">
              <h4>Source & Target</h4>
              <div className="log-detail__grid">
                <div className="log-detail__field">
                  <label>Source</label>
                  <span>{log.source}</span>
                </div>
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

          <div className="log-detail__section">
            <h4>Data</h4>
            <pre className="log-detail__data">
              {JSON.stringify(log.data, null, 2) || 'No data'}
            </pre>
          </div>

          {log.stackTrace && (
            <div className="log-detail__section">
              <h4>Stack Trace</h4>
              <pre className="log-detail__stack">{log.stackTrace}</pre>
            </div>
          )}

          {log.deviceInfo && (
            <div className="log-detail__section">
              <h4>Device Info</h4>
              <div className="log-detail__grid">
                {Object.entries(log.deviceInfo).map(([key, value]) => (
                  <div className="log-detail__field" key={key}>
                    <label>{key}</label>
                    <span>{value}</span>
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
