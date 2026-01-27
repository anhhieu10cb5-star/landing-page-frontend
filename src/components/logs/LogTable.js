import React from 'react';
import LogRow from './LogRow';

const LogTable = ({ logs, loading, onLogClick }) => {
  if (loading) {
    return (
      <div className="log-table log-table--loading">
        <div className="log-table__spinner"></div>
        <p>Loading logs...</p>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="log-table log-table--empty">
        <div className="log-table__empty-icon">📭</div>
        <p>No logs found</p>
        <span>Select a project or adjust filters</span>
      </div>
    );
  }

  // Tính firstTime để hiển thị relative time
  const firstTime = new Date(logs[logs.length - 1].clientTime).getTime();

  return (
    <div className="log-table">
      <div className="log-table__header">
        <div className="log-table__col log-table__col--marker"></div>
        <div className="log-table__col log-table__col--seq">#</div>
        <div className="log-table__col log-table__col--time">Time</div>
        <div className="log-table__col log-table__col--gap">Gap</div>
        <div className="log-table__col log-table__col--feature">Feature</div>
        <div className="log-table__col log-table__col--event">Event</div>
        <div className="log-table__col log-table__col--data">Data</div>
      </div>

      <div className="log-table__body">
        {logs.map((log, index) => (
          <LogRow
            key={log._id}
            log={log}
            index={index}
            firstTime={firstTime}
            onClick={() => onLogClick(log)}
          />
        ))}
      </div>

      <div className="log-table__footer">
        <span>Showing {logs.length} logs</span>
      </div>
    </div>
  );
};

export default LogTable;