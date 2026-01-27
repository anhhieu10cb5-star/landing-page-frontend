import { useEffect, useRef, useCallback } from 'react';

export const useLogWebSocket = ({ project, feature, onNewLog }) => {
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
    const url = `${wsUrl}/ws/logs?type=admin&project=${project || ''}`;

    try {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'log') {
            // Check filters
            if (project && data.data.project !== project) return;
            if (feature && data.data.feature !== feature) return;

            if (onNewLog) {
              onNewLog(data.data);
            }
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected, reconnecting in 3s...');
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      };

      wsRef.current.onerror = (err) => {
        console.error('WebSocket error:', err);
      };
    } catch (err) {
      console.error('Error creating WebSocket:', err);
    }
  }, [project, feature, onNewLog]);

  // Update filters
  const updateFilters = useCallback((newProject, newFeature) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'filter',
        project: newProject,
        feature: newFeature
      }));
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  useEffect(() => {
    updateFilters(project, feature);
  }, [project, feature, updateFilters]);

  return { updateFilters };
};