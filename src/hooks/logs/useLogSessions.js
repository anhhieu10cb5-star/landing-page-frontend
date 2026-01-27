import { useState, useEffect, useCallback } from 'react';
import api from '../../utils/api';

export const useLogSessions = (project) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSessions = useCallback(async () => {
    if (!project) {
      setSessions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/logs/projects/${project}/sessions`);
      if (response.data.success) {
        // Sort session mới nhất lên trên
        const sorted = response.data.data.sort((a, b) => {
          return new Date(b.lastLog) - new Date(a.lastLog);
        });
        setSessions(sorted);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  }, [project]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return { sessions, loading, error, refetch: fetchSessions };
};