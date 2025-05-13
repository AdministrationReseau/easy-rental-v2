import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { refreshToken } from '@/services/authService';

// Créer une instance axios avec les paramètres de base
const api: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Intercepteur de requête pour ajouter le token d'authentification
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Intercepteur de réponse pour gérer les erreurs d'authentification
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Si l'erreur est 401 (Unauthorized) et que ce n'est pas déjà une tentative de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Tenter de rafraîchir le token
                const refreshSuccessful = await refreshToken();

                if (refreshSuccessful && originalRequest) {
                    // Mettre à jour le token dans la requête originale
                    const token = localStorage.getItem('auth_token');

                    if (token && originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }

                    // Réessayer la requête originale
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);

                // Rediriger vers la page de connexion en cas d'échec
                window.location.href = '/signin';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
