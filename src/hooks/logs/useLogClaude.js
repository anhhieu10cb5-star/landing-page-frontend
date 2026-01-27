import { useState, useEffect, useCallback } from 'react';
import api from '../../utils/api';

export const useLogClaude = ({ project, feature, sessionId, traceId, limit = 200 }) => {
  const [claudeData, setClaudeData] = useState({
    formatted: '',
    anomalies: [],
    raw: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClaudeFormat = useCallback(async () => {
    if (!project) {
      setClaudeData({ formatted: '', anomalies: [], raw: [] });
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append('project', project);
      if (feature) params.append('feature', feature);
      if (sessionId) params.append('sessionId', sessionId);
      if (traceId) params.append('traceId', traceId);
      params.append('limit', limit);

      const response = await api.get(`/logs/claude?${params.toString()}`);

      if (response.data.success) {
        setClaudeData(response.data.data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching Claude format:', err);
    } finally {
      setLoading(false);
    }
  }, [project, feature, sessionId, traceId, limit]);

  useEffect(() => {
    fetchClaudeFormat();
  }, [fetchClaudeFormat]);

  return { claudeData, loading, error, refetch: fetchClaudeFormat };
};