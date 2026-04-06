import { useState, useEffect, useCallback } from 'react';
import { flightApi } from '../services/flightApi';

export function useFlights() {
  const [flights, setFlights] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = useCallback(async () => {
    try {
      setLoading(true);
      const [flightsData, summaryData] = await Promise.all([
        flightApi.getAll(),
        flightApi.getSummary(),
      ]);
      setFlights(flightsData);
      setSummary(summaryData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (flightNumber, status, reason) => {
    await flightApi.updateStatus(flightNumber, status, reason);
    await fetchFlights(); // refresh
  }, [fetchFlights]);

  useEffect(() => {
    fetchFlights();
    // Auto-refresh every 30 seconds to simulate real-time ops
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, [fetchFlights]);

  return { flights, summary, loading, error, refetch: fetchFlights, updateStatus };
}
