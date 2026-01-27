import React from 'react';
import { useLogCompare } from '../../hooks/logs/useLogCompare';
import { useLogActions } from '../../hooks/logs/useLogActions';

const LogSessionCompare = ({ project, sessionA, sessionB, sessions, onSessionBChange }) => {
  const { comparison, loading, compareSessions } = useLogCompare();
  const { copyToClipboard } = useLogActions();
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (project && sessionA && sessionB) {
      compareSessions(project, sessionA, sessionB);
    }
  }, [project, sessionA, sessionB, compareSessions]);

  const handleCopyComparison = async () => {
    if (!comparison) return;

    const text = formatComparisonForClaude(comparison);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatComparisonForClaude = (comp) => {
    const lines = [
      `=== SESSION COMPARISON ===`,
      ``,
      `Session A: ${comp.sessionA.id} (${comp.sessionA.totalEvents} events)`,
      `Session B: ${comp.sessionB.id} (${comp.sessionB.totalEvents} events)`,
      ``,
      `--- SUMMARY ---`,
      comp.summary,
      ``
    ];

    if (comp.onlyInA.length > 0) {
      lines.push(`--- ONLY IN SESSION A (${comp.onlyInA.length}) ---`);
      comp.onlyInA.forEach(e => lines.push(`  • ${e}`));
      lines.push(``);
    }

    if (comp.onlyInB.length > 0) {
      lines.push(`--- ONLY IN SESSION B (${comp.onlyInB.length}) ---`);
      comp.onlyInB.forEach(e => lines.push(`  • ${e}`));
      lines.push(``);
    }

    if (comp.orderDifferences.length > 0) {
      lines.push(`--- ORDER DIFFERENCES (${comp.orderDifferences.length}) ---`);
      comp.orderDifferences.forEach(d => {
        lines.push(`  • ${d.event}: position ${d.posA} (A) vs ${d.posB} (B)`);
      });
    }

    return lines.join('\n');
  };

  const formatSessionLabel = (session) => {
    const time = new Date(session.lastLog).toLocaleString('vi-VN');
    const errors = session.errorCount > 0 ? ` (❌${session.errorCount})` : '';
    return `${session.sessionId.substring(0, 12)}... - ${time}${errors}`;
  };

  return (
    <div className="log-compare">
      <div className="log-compare__header">
        <h3>🔀 Compare Sessions</h3>
        <p className="log-compare__desc">
          Compare two sessions to find differences (working vs broken)
        </p>
      </div>

      <div className="log-compare__selectors">
        <div className="log-compare__selector">
          <label>Session A (Current)</label>
          <div className="log-compare__session-display">
            {sessionA ? (
              <span className="log-compare__session-id">{sessionA.substring(0, 16)}...</span>
            ) : (
              <span className="log-compare__session-empty">Select from filters above</span>
            )}
          </div>
        </div>

        <div className="log-compare__vs">VS</div>

        <div className="log-compare__selector">
          <label>Session B (Compare with)</label>
          <select
            className="log-compare__select"
            value={sessionB}
            onChange={(e) => onSessionBChange(e.target.value)}
            disabled={!project || !sessionA}
          >
            <option value="">-- Select Session B --</option>
            {sessions
              .filter(s => s.sessionId !== sessionA)
              .map(s => (
                <option key={s.sessionId} value={s.sessionId}>
                  {formatSessionLabel(s)}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="log-compare__body">
        {!project || !sessionA ? (
          <div className="log-compare__empty">
            <span className="log-compare__empty-icon">🔀</span>
            <p>Select a project and Session A from filters first</p>
          </div>
        ) : !sessionB ? (
          <div className="log-compare__empty">
            <span className="log-compare__empty-icon">👆</span>
            <p>Select Session B to compare</p>
          </div>
        ) : loading ? (
          <div className="log-compare__loading">
            <div className="log-compare__spinner"></div>
            <p>Comparing sessions...</p>
          </div>
        ) : comparison ? (
          <div className="log-compare__results">
            <div className="log-compare__summary">
              <div className={`log-compare__status ${comparison.onlyInA.length === 0 && comparison.onlyInB.length === 0 ? 'success' : 'warning'}`}>
                {comparison.summary}
              </div>
            </div>

            <div className="log-compare__stats">
              <div className="log-compare__stat">
                <span className="log-compare__stat-label">Session A</span>
                <span className="log-compare__stat-value">{comparison.sessionA.totalEvents} events</span>
              </div>
              <div className="log-compare__stat">
                <span className="log-compare__stat-label">Session B</span>
                <span className="log-compare__stat-value">{comparison.sessionB.totalEvents} events</span>
              </div>
            </div>

            {comparison.onlyInA.length > 0 && (
              <div className="log-compare__section log-compare__section--warning">
                <h4>⚠️ Only in Session A ({comparison.onlyInA.length})</h4>
                <ul className="log-compare__list">
                  {comparison.onlyInA.map((event, i) => (
                    <li key={i} className="log-compare__list-item">{event}</li>
                  ))}
                </ul>
              </div>
            )}

            {comparison.onlyInB.length > 0 && (
              <div className="log-compare__section log-compare__section--info">
                <h4>ℹ️ Only in Session B ({comparison.onlyInB.length})</h4>
                <ul className="log-compare__list">
                  {comparison.onlyInB.map((event, i) => (
                    <li key={i} className="log-compare__list-item">{event}</li>
                  ))}
                </ul>
              </div>
            )}

            {comparison.orderDifferences.length > 0 && (
              <div className="log-compare__section log-compare__section--error">
                <h4>❌ Order Differences ({comparison.orderDifferences.length})</h4>
                <ul className="log-compare__list">
                  {comparison.orderDifferences.map((diff, i) => (
                    <li key={i} className="log-compare__list-item">
                      <strong>{diff.event}</strong>: position {diff.posA} (A) vs {diff.posB} (B)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="log-compare__actions">
              <button
                className={`log-compare__btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyComparison}
              >
                {copied ? '✅ Copied!' : '📋 Copy for Claude'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LogSessionCompare;