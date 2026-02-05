import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const stored = localStorage.getItem('auth');
  if (stored) {
    const { accessToken } = JSON.parse(stored) as { accessToken: string };
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(client(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const stored = localStorage.getItem('auth');
        if (!stored) throw new Error('No auth data');

        const { refreshToken } = JSON.parse(stored) as { refreshToken: string };
        const { data } = await axios.post('/api/auth/refresh', { refreshToken });

        const newAuth = { accessToken: data.accessToken, refreshToken: data.refreshToken };
        localStorage.setItem('auth', JSON.stringify(newAuth));

        pendingRequests.forEach((cb) => cb(data.accessToken));
        pendingRequests = [];

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return client(originalRequest);
      } catch {
        localStorage.removeItem('auth');
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default client;
