import React from 'react';
import { formatRelativeTime, formatGap, formatData } from '../../utils/logs/logFormatter';
import { getLogLevelClass, getMarker } from '../../utils/logs/logColors';

const LogRow = ({ log, index, firstTime, onClick }) => {
  const diff = new Date(log.clientTime).getTime() - firstTime;
  const gap = log.sinceLastEvent || 0;
  const marker = getMarker(log, gap, index);
  const levelClass = getLogLevelClass(log.level);

  return (
    <div
      className={`log-row ${levelClass} ${marker.className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="log-row__col log-row__col--marker">
        <span className="log-row__marker" title={marker.title}>
          {marker.icon}
        </span>
      </div>

      <div className="log-row__col log-row__col--seq">
        <span className="log-row__seq">#{log.sequence}</span>
      </div>

      <div className="log-row__col log-row__col--time">
        <span className="log-row__time">{formatRelativeTime(diff)}</span>
      </div>

      <div className="log-row__col log-row__col--gap">
        <span className={`log-row__gap ${gap > 1000 ? 'log-row__gap--slow' : ''}`}>
          {formatGap(gap)}
        </span>
      </div>

      <div className="log-row__col log-row__col--feature">
        <span className="log-row__feature">{log.feature}</span>
      </div>

      <div className="log-row__col log-row__col--event">
        <span className="log-row__event">{log.event}</span>
      </div>

      <div className="log-row__col log-row__col--data">
        <span className="log-row__data" title={JSON.stringify(log.data, null, 2)}>
          {formatData(log.data, 50)}
        </span>
      </div>
    </div>
  );
};

export default LogRow;