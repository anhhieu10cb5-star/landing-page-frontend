import React from 'react';
import LogHeader from '../components/logs/LogHeader';
import LogFilters from '../components/logs/LogFilters';
import LogTable from '../components/logs/LogTable';
import LogAnomalies from '../components/logs/LogAnomalies';
import LogClaudeOutput from '../components/logs/LogClaudeOutput';
import LogTimeline from '../components/logs/LogTimeline';
import LogSessionCompare from '../components/logs/LogSessionCompare';
import LogDetail from '../components/logs/LogDetail';
import { useLogStats } from '../hooks/logs/useLogStats';
import { useLogProjects } from '../hooks/logs/useLogProjects';
import { useLogSessions } from '../hooks/logs/useLogSessions';
import { useLogs } from '../hooks/logs/useLogs';
import { useLogClaude } from '../hooks/logs/useLogClaude';
import { useLogWebSocket } from '../hooks/logs/useLogWebSocket';
import '../styles/LogDashboard.css';

const LogDashboard = () => {
  // State cho filters
  const [selectedProject, setSelectedProject] = React.useState('');
  const [selectedFeature, setSelectedFeature] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('');
  const [selectedSession, setSelectedSession] = React.useState('');
  const [viewMode, setViewMode] = React.useState('table'); // table, timeline, compare
  const [selectedLog, setSelectedLog] = React.useState(null);
  const [compareSession, setCompareSession] = React.useState('');

  // Hooks fetch data
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

  // WebSocket realtime
  useLogWebSocket({
    project: selectedProject,
    feature: selectedFeature,
    onNewLog: () => {
      refetchLogs();
      refetchStats();
      refetchClaude();
    }
  });

  // Get features từ logs hiện tại
  const features = React.useMemo(() => {
    const featureSet = new Set(logs.map(log => log.feature));
    return Array.from(featureSet);
  }, [logs]);

  // Handlers
  const handleProjectChange = (project) => {
    setSelectedProject(project);
    setSelectedFeature('');
    setSelectedSession('');
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
  };

  const handleCloseDetail = () => {
    setSelectedLog(null);
  };

  return (
    <div className="log-dashboard">
      <LogHeader 
        stats={stats} 
        loading={statsLoading}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

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

      <div className="log-dashboard__content">
        <div className="log-dashboard__main">
          {viewMode === 'table' && (
            <LogTable
              logs={logs}
              loading={logsLoading}
              onLogClick={handleLogClick}
            />
          )}

          {viewMode === 'timeline' && (
            <LogTimeline
              logs={logs}
              loading={logsLoading}
              onLogClick={handleLogClick}
            />
          )}

          {viewMode === 'compare' && (
            <LogSessionCompare
              project={selectedProject}
              sessionA={selectedSession}
              sessionB={compareSession}
              sessions={sessions}
              onSessionBChange={setCompareSession}
            />
          )}
        </div>

        <div className="log-dashboard__sidebar">
          <LogAnomalies 
            anomalies={claudeData?.anomalies || []}
            loading={claudeLoading}
          />

          <LogClaudeOutput
            formatted={claudeData?.formatted || ''}
            loading={claudeLoading}
          />
        </div>
      </div>

      {selectedLog && (
        <LogDetail
          log={selectedLog}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default LogDashboard;