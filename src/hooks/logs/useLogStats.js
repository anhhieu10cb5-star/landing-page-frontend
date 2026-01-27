import { useState, useEffect, useCallback } from 'react';
import api from '../../utils/api';

export const useLogStats = () => {
  const [stats, setStats] = useState({
    overview: {
      totalLogs: 0,
      totalErrors: 0,
      totalProjects: 0,
      totalSessions: 0
    },
    byProject: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/logs/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching log stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};s