import React from 'react';

const LogFilters = ({
  projects,
  features,
  sessions,
  selectedProject,
  selectedFeature,
  selectedLevel,
  selectedSession,
  onProjectChange,
  onFeatureChange,
  onLevelChange,
  onSessionChange,
  loading
}) => {
  const levels = [
    { value: '', label: 'All Levels' },
    { value: 'debug', label: '🔵 Debug' },
    { value: 'info', label: '🟢 Info' },
    { value: 'warn', label: '🟡 Warning' },
    { value: 'error', label: '🔴 Error' }
  ];

  const formatSessionLabel = (session) => {
    const time = new Date(session.lastLog).toLocaleString('vi-VN');
    const errors = session.errorCount > 0 ? ` (❌${session.errorCount})` : '';
    return `${session.sessionId.substring(0, 8)}... - ${time}${errors}`;
  };

  return (
    <div className="log-filters">
      <div className="log-filters__group">
        <label className="log-filters__label">Project</label>
        <select
          className="log-filters__select"
          value={selectedProject}
          onChange={(e) => onProjectChange(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Select Project --</option>
          {projects.map((p) => (
            <option key={p.project} value={p.project}>
              {p.project} ({p.totalLogs} logs{p.errorCount > 0 ? `, ❌${p.errorCount}` : ''})
            </option>
          ))}
        </select>
      </div>

      <div className="log-filters__group">
        <label className="log-filters__label">Feature</label>
        <select
          className="log-filters__select"
          value={selectedFeature}
          onChange={(e) => onFeatureChange(e.target.value)}
          disabled={!selectedProject || loading}
        >
          <option value="">All Features</option>
          {features.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="log-filters__group">
        <label className="log-filters__label">Level</label>
        <select
          className="log-filters__select"
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          disabled={!selectedProject || loading}
        >
          {levels.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="log-filters__group">
        <label className="log-filters__label">Session</label>
        <select
          className="log-filters__select"
          value={selectedSession}
          onChange={(e) => onSessionChange(e.target.value)}
          disabled={!selectedProject || loading}
        >
          <option value="">All Sessions</option>
          {sessions.map((s) => (
            <option key={s.sessionId} value={s.sessionId}>
              {formatSessionLabel(s)}
            </option>
          ))}
        </select>
      </div>

      <div className="log-filters__group log-filters__group--actions">
        <button
          className="log-filters__btn log-filters__btn--clear"
          onClick={() => {
            onProjectChange('');
            onFeatureChange('');
            onLevelChange('');
            onSessionChange('');
          }}
          disabled={!selectedProject}
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
};

export default LogFilters;