import { useState, useEffect, useCallback } from 'react';
import api from '../../utils/api';

export const useLogs = ({ project, feature, level, sessionId, page = 1, limit = 100 }) => {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = useCallback(async () => {
    if (!project) {
      setLogs([]);
      setTotal(0);
      return;
    }

    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      params.append('project', project);
      if (feature) params.append('feature', feature);
      if (level) params.append('level', level);
      if (sessionId) params.append('sessionId', sessionId);
      params.append('page', page);
      params.append('limit', limit);

      const response = await api.get(`/logs?${params.toString()}`);
      
      if (response.data.success) {
        setLogs(response.data.data);
        setTotal(response.data.total);
        setTotalPages(response.data.totalPages);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  }, [project, feature, level, sessionId, page, limit]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, total, totalPages, loading, error, refetch: fetchLogs };
};
