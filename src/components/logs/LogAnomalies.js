import React from 'react';
import { formatAnomaly } from '../../utils/logs/logFormatter';

const LogAnomalies = ({ anomalies, loading }) => {
  if (loading) {
    return (
      <div className="log-anomalies log-anomalies--loading">
        <div className="log-anomalies__header">
          <h3>⚠️ Anomalies</h3>
        </div>
        <div className="log-anomalies__loading">Analyzing...</div>
      </div>
    );
  }

  const errorCount = anomalies.filter(a => a.severity === 'error').length;
  const warningCount = anomalies.filter(a => a.severity === 'warning').length;

  return (
    <div className={`log-anomalies ${anomalies.length > 0 ? 'log-anomalies--has-issues' : ''}`}>
      <div className="log-anomalies__header">
        <h3>⚠️ Anomalies Detected</h3>
        {anomalies.length > 0 && (
          <div className="log-anomalies__counts">
            {errorCount > 0 && (
              <span className="log-anomalies__count log-anomalies__count--error">
                ❌ {errorCount}
              </span>
            )}
            {warningCount > 0 && (
              <span className="log-anomalies__count log-anomalies__count--warning">
                ⚠️ {warningCount}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="log-anomalies__body">
        {anomalies.length === 0 ? (
          <div className="log-anomalies__empty">
            <span className="log-anomalies__empty-icon">✅</span>
            <p>No anomalies detected</p>
          </div>
        ) : (
          <div className="log-anomalies__list">
            {anomalies.map((anomaly, index) => (
              <div
                key={index}
                className={`log-anomalies__item log-anomalies__item--${anomaly.severity}`}
              >
                <div className="log-anomalies__item-header">
                  <span className={`log-anomalies__item-type log-anomalies__item-type--${anomaly.type.toLowerCase()}`}>
                    {anomaly.type}
                  </span>
                  {anomaly.sequence && (
                    <span className="log-anomalies__item-seq">#{anomaly.sequence}</span>
                  )}
                </div>

                <div className="log-anomalies__item-message">
                  {anomaly.message}
                </div>

                {anomaly.events && anomaly.events.length > 0 && (
                  <div className="log-anomalies__item-events">
                    {anomaly.events.map((evt, i) => (
                      <span key={i} className="log-anomalies__item-event">
                        #{evt.seq} {evt.event}
                        {evt.source && <small> ({evt.source})</small>}
                      </span>
                    ))}
                  </div>
                )}

                {anomaly.target && (
                  <div className="log-anomalies__item-target">
                    Target: <code>{anomaly.target}</code>
                  </div>
                )}

                {anomaly.stackTrace && (
                  <details className="log-anomalies__item-stack">
                    <summary>Stack Trace</summary>
                    <pre>{anomaly.stackTrace}</pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogAnomalies;