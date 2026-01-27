import { useState, useCallback } from 'react';
import api from '../../utils/api';

export const useLogCompare = () => {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const compareSessions = useCallback(async (project, sessionA, sessionB) => {
    if (!project || !sessionA || !sessionB) {
      setComparison(null);
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append('project', project);
      params.append('sessionA', sessionA);
      params.append('sessionB', sessionB);

      const response = await api.get(`/logs/compare?${params.toString()}`);

      if (response.data.success) {
        setComparison(response.data.data);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error comparing sessions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearComparison = useCallback(() => {
    setComparison(null);
  }, []);

  return { comparison, loading, error, compareSessions, clearComparison };
};