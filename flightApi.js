import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.error || error.message || 'API error';
    console.error('[API Error]', message);
    return Promise.reject(new Error(message));
  }
);

export const flightApi = {
  getAll: () => api.get('/flights'),
  getByNumber: (flightNumber) => api.get(`/flights/${flightNumber}`),
  create: (flight) => api.post('/flights', flight),
  updateStatus: (flightNumber, status, reason) =>
    api.patch(`/flights/${flightNumber}/status`, null, { params: { status, reason } }),
  getSummary: () => api.get('/flights/summary'),
  getByWindow: (start, end) =>
    api.get('/flights/window', { params: { start: start.toISOString(), end: end.toISOString() } }),
};
