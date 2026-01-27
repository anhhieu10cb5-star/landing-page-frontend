import React, { useRef, useEffect } from 'react';
import LogFilters from '../components/logs/LogFilters';
import LogDetail from '../components/logs/LogDetail';
import { useLogStats } from '../hooks/logs/useLogStats';
import { useLogProjects } from '../hooks/logs/useLogProjects';
import { useLogSessions } from '../hooks/logs/useLogSessions';
import { useLogs } from '../hooks/logs/useLogs';
import { useLogClaude } from '../hooks/logs/useLogClaude';
import { useLogWebSocket } from '../hooks/logs/useLogWebSocket';
import { useLogActions } from '../hooks/logs/useLogActions';
import '../styles/logs/index.css';

const LogDashboard = () => {
  const [selectedProject, setSelectedProject] = React.useState('');
  const [selectedFeature, setSelectedFeature] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('');
  const [selectedSession, setSelectedSession] = React.useState('');
  const [selectedLog, setSelectedLog] = React.useState(null);
  const [anomaliesExpanded, setAnomaliesExpanded] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  
  const terminalRef = useRef(null);
  const { copyToClipboard } = useLogActions();

  const { stats, loading: statsLoading, refetch: refetchStats } = useLogStats();
  const { projects, loading: projectsLoading } = useLogProjects();
  const { sessions, loading: sessionsLoading } = useLogSessions(selectedProject);
  const { logs, loading: logsLoading, refetch: refetchLogs } = useLogs({
    project: selectedProject,
    feature: selectedFeature,
    level: selectedLevel,
    sessionId: selectedSession
  });
  const { claudeData, loading: claudeLoading, refetch: refetchClaude } = useLogClaude({
    project: selectedProject,
    feature: selectedFeature,
    sessionId: selectedSession
  });

  useLogWebSocket({
    project: selectedProject,
    feature: selectedFeature,
    onNewLog: () => {
      refetchLogs();
      refetchStats();
      refetchClaude();
    }
  });

  // Auto scroll to bottom khi có log mới
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const features = React.useMemo(() => {
    const featureSet = new Set(logs.map(log => log.feature));
    return Array.from(featureSet);
  }, [logs]);

  const handleProjectChange = (project) => {
    setSelectedProject(project);
    setSelectedFeature('');
    setSelectedSession('');
  };

  const handleCopyAll = async () => {
    if (!claudeData?.formatted) return;
    const success = await copyToClipboard(claudeData.formatted);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Format log line giống terminal
  const formatLogLine = (log, index) => {
    const time = new Date(log.clientTime).toLocaleTimeString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const gap = log.sinceLastEvent || 0;
    let marker = '  ';
    let markerClass = '';
    
    if (log.level === 'error') { marker = '❌'; markerClass = 'error'; }
    else if (log.level === 'warn') { marker = '⚠️'; markerClass = 'warn'; }
    else if (gap > 1000) { marker = '🐌'; markerClass = 'slow'; }
    else if (gap < 2 && index > 0 && gap > 0) { marker = '⚡'; markerClass = 'race'; }

    const gapStr = gap > 0 ? `+${gap}ms` : '';
    
    return { time, marker, markerClass, gapStr, log };
  };

  const anomalies = claudeData?.anomalies || [];

  return (
    <div className="log-terminal-dashboard">
      {/* Header */}
      <div className="log-terminal-header">
        <div className="log-terminal-title">
          <span className="log-terminal-icon">🔍</span>
          <span>GnodLogger</span>
          <span className="log-terminal-stats">
            {stats?.overview?.totalLogs || 0} logs | {stats?.overview?.totalErrors || 0} errors
          </span>
        </div>
      </div>

      {/* Filters */}
      <LogFilters
        projects={projects}
        features={features}
        sessions={sessions}
        selectedProject={selectedProject}
        selectedFeature={selectedFeature}
        selectedLevel={selectedLevel}
        selectedSession={selectedSession}
        onProjectChange={handleProjectChange}
        onFeatureChange={setSelectedFeature}
        onLevelChange={setSelectedLevel}
        onSessionChange={setSelectedSession}
        loading={projectsLoading || sessionsLoading}
      />

      {/* Terminal Window */}
      <div className="log-terminal-container">
        <div className="log-terminal-toolbar">
          <span className="log-terminal-tab">
            <span className="log-terminal-tab-icon">📟</span>
            TERMINAL
          </span>
          <span className="log-terminal-info">
            {logs.length} logs {selectedSession && `• Session: ${selectedSession.substring(0, 8)}...`}
          </span>
        </div>
        
        <div className="log-terminal-body" ref={terminalRef}>
          {logsLoading ? (
            <div className="log-terminal-loading">Loading...</div>
          ) : logs.length === 0 ? (
            <div className="log-terminal-empty">
              <span className="log-terminal-prompt">$</span> No logs found. Select a project to start.
            </div>
          ) : (
            logs.slice().reverse().map((log, index) => {
              const { time, marker, markerClass, gapStr } = formatLogLine(log, index);
              return (
                <div 
                  key={log._id} 
                  className={`log-terminal-line ${markerClass}`}
                  onClick={() => setSelectedLog(log)}
                >
                  <span className="log-terminal-time">[{time}]</span>
                  <span className="log-terminal-marker">{marker}</span>
                  <span className="log-terminal-seq">#{log.sequence}</span>
                  <span className="log-terminal-gap">{gapStr.padStart(8)}</span>
                  <span className="log-terminal-feature">{log.feature?.toUpperCase()}</span>
                  <span className="log-terminal-event">{log.event}</span>
                  <span className="log-terminal-data">
                    {log.data && Object.keys(log.data).length > 0 
                      ? Object.entries(log.data).map(([k,v]) => `${k}=${typeof v === 'object' ? JSON.stringify(v) : v}`).join(' ')
                      : ''
                    }
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Claude Format Output */}
      <div className="log-claude-container">
        <div className="log-claude-toolbar">
          <span className="log-claude-tab">
            <span className="log-claude-tab-icon">📋</span>
            CLAUDE FORMAT
          </span>
          <button 
            className={`log-claude-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopyAll}
            disabled={!claudeData?.formatted}
          >
            {copied ? '✅ Copied!' : '📋 Copy All'}
          </button>
        </div>
        
        <div className="log-claude-body">
          {claudeLoading ? (
            <div className="log-claude-loading">Generating...</div>
          ) : !claudeData?.formatted ? (
            <div className="log-claude-empty">Select a project to generate Claude format</div>
          ) : (
            <pre className="log-claude-output">{claudeData.formatted}</pre>
          )}
        </div>
      </div>

      {/* Anomalies Bar */}
      {anomalies.length > 0 && (
        <div className={`log-anomalies-bar ${anomaliesExpanded ? 'expanded' : ''}`}>
          <div 
            className="log-anomalies-header"
            onClick={() => setAnomaliesExpanded(!anomaliesExpanded)}
          >
            <span className="log-anomalies-title">
              ⚠️ Anomalies Detected ({anomalies.length})
            </span>
            <span className="log-anomalies-toggle">
              {anomaliesExpanded ? '▼' : '▶'}
            </span>
          </div>
          {anomaliesExpanded && (
            <div className="log-anomalies-content">
              {anomalies.map((anomaly, index) => (
                <div key={index} className={`log-anomaly-item ${anomaly.severity}`}>
                  <span className="log-anomaly-type">{anomaly.type}</span>
                  <span className="log-anomaly-message">{anomaly.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Log Detail Modal */}
      {selectedLog && (
        <LogDetail
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
};

export default LogDashboard;