import React from 'react';
import { useLogActions } from '../../hooks/logs/useLogActions';

const LogClaudeOutput = ({ formatted, loading }) => {
  const { copyToClipboard } = useLogActions();
  const [copied, setCopied] = React.useState(false);
  const textareaRef = React.useRef(null);

  const handleCopyAll = async () => {
    if (!formatted) return;

    const success = await copyToClipboard(formatted);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelectAll = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
    }
  };

  return (
    <div className="log-claude">
      <div className="log-claude__header">
        <h3>📋 Claude Format</h3>
        <div className="log-claude__actions">
          <button
            className="log-claude__btn"
            onClick={handleSelectAll}
            title="Select All"
            disabled={!formatted || loading}
          >
            🔘 Select
          </button>
          <button
            className={`log-claude__btn log-claude__btn--copy ${copied ? 'copied' : ''}`}
            onClick={handleCopyAll}
            title="Copy to Clipboard"
            disabled={!formatted || loading}
          >
            {copied ? '✅ Copied!' : '📋 Copy All'}
          </button>
        </div>
      </div>

      <div className="log-claude__body">
        {loading ? (
          <div className="log-claude__loading">
            <div className="log-claude__spinner"></div>
            <p>Formatting for Claude...</p>
          </div>
        ) : !formatted ? (
          <div className="log-claude__empty">
            <p>Select a project to generate Claude format</p>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            className="log-claude__output"
            value={formatted}
            readOnly
            spellCheck={false}
          />
        )}
      </div>

      <div className="log-claude__footer">
        <div className="log-claude__tip">
          💡 <strong>Tip:</strong> Click "Copy All" then paste directly to Claude for instant bug analysis
        </div>
      </div>
    </div>
  );
};

export default LogClaudeOutput;