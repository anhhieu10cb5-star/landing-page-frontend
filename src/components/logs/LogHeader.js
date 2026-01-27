import React from 'react';

const LogHeader = ({ stats, loading, viewMode, onViewModeChange }) => {
  const { overview } = stats || {};

  return (
    <div className="log-header">
      <div className="log-header__title">
        <h1>🔍 Log Dashboard</h1>
        <span className="log-header__subtitle">Debug & Monitor Realtime</span>
      </div>

      <div className="log-header__stats">
        {loading ? (
          <div className="log-header__stats-loading">Loading...</div>
        ) : (
          <>
            <div className="log-header__stat">
              <span className="log-header__stat-icon">📊</span>
              <span className="log-header__stat-value">{overview?.totalLogs || 0}</span>
              <span className="log-header__stat-label">Total Logs</span>
            </div>

            <div className="log-header__stat log-header__stat--error">
              <span className="log-header__stat-icon">❌</span>
              <span className="log-header__stat-value">{overview?.totalErrors || 0}</span>
              <span className="log-header__stat-label">Errors</span>
            </div>

            <div className="log-header__stat">
              <span className="log-header__stat-icon">📱</span>
              <span className="log-header__stat-value">{overview?.totalProjects || 0}</span>
              <span className="log-header__stat-label">Projects</span>
            </div>

            <div className="log-header__stat">
              <span className="log-header__stat-icon">🔗</span>
              <span className="log-header__stat-value">{overview?.totalSessions || 0}</span>
              <span className="log-header__stat-label">Sessions</span>
            </div>
          </>
        )}
      </div>

      <div className="log-header__actions">
        <div className="log-header__view-modes">
          <button
            className={`log-header__view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => onViewModeChange('table')}
            title="Table View"
          >
            📋 Table
          </button>
          <button
            className={`log-header__view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
            onClick={() => onViewModeChange('timeline')}
            title="Timeline View"
          >
            📈 Timeline
          </button>
          <button
            className={`log-header__view-btn ${viewMode === 'compare' ? 'active' : ''}`}
            onClick={() => onViewModeChange('compare')}
            title="Compare Sessions"
          >
            🔀 Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogHeader;