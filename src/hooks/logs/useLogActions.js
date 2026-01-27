import { useState, useCallback } from 'react';
import api from '../../utils/api';

export const useLogActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  }, []);

  // Bookmark log
  const bookmarkLog = useCallback(async (logId, isBookmarked, tags, notes) => {
    try {
      setLoading(true);
      const response = await api.patch(`/logs/${logId}/bookmark`, {
        isBookmarked,
        tags,
        notes
      });
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error bookmarking log:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete logs
  const deleteLogs = useCallback(async (project, sessionId, before) => {
    try {
      setLoading(true);
      const response = await api.delete('/logs', {
        data: { project, sessionId, before }
      });
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting logs:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Export logs
  const exportLogs = useCallback((logs, format = 'json') => {
    try {
      let content, filename, type;

      if (format === 'json') {
        content = JSON.stringify(logs, null, 2);
        filename = `logs_${Date.now()}.json`;
        type = 'application/json';
      } else if (format === 'csv') {
        const headers = ['sequence', 'clientTime', 'feature', 'event', 'level', 'data'];
        const rows = logs.map(log => [
          log.sequence,
          log.clientTime,
          log.feature,
          log.event,
          log.level,
          JSON.stringify(log.data)
        ]);
        content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        filename = `logs_${Date.now()}.csv`;
        type = 'text/csv';
      }

      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      return true;
    } catch (err) {
      console.error('Error exporting logs:', err);
      return false;
    }
  }, []);

  return {
    loading,
    error,
    copyToClipboard,
    bookmarkLog,
    deleteLogs,
    exportLogs
  };
};