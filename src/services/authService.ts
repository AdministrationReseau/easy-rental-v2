import { User, UserRole, LoginResponse, RegisterResponse } from '@/types/auth';
import axios from 'axios';

const API_URL = '/api';

/**
 * Enregistre un nouvel utilisateur
 */
export async function registerUser(
    name: string,
    email: string,
    password: string,
    role: UserRole = 'user',
    username?: string,
    phoneNumber?: string
): Promise<User> {
    try {
        const response = await axios.post<RegisterResponse>(`${API_URL}/auth-service/auth/register`, {
            name,
            email,
            password,
            role,
            username: username || email.split('@')[0],
            phoneNumber
        });

        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }

        return response.data.user;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new Error(error.response.data.message || 'Cette adresse email est déjà utilisée');
            }
            throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
        }
        throw error instanceof Error
            ? error
            : new Error('Une erreur est survenue lors de l\'inscription');
    }
}

/**
 * Connecte un utilisateur
 */
export async function loginUser(
    email: string,
    password: string,
    role: UserRole = 'user'
): Promise<User> {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/auth-service/auth/login`, {
            email,
            password,
            role
        });

        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);

            if (response.data.refreshToken) {
                localStorage.setItem('refresh_token', response.data.refreshToken);
            }
        }

        return response.data.user;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new Error('Adresse email ou mot de passe incorrect');
            }
            throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
        }
        throw error instanceof Error
            ? error
            : new Error('Une erreur est survenue lors de la connexion');
    }
}

/**
 * Déconnecte l'utilisateur
 */
export async function logoutUser(): Promise<void> {
    const token = localStorage.getItem('auth_token');

    try {
        if (token) {
            // Correction de l'URL: ajout du segment 'auth-service'
            await axios.post(`${API_URL}/auth-service/auth/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
    }
}

/**
 * Récupère les informations de l'utilisateur connecté
 */
export async function getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        return null;
    }

    try {
        const response = await axios.get<User>(`${API_URL}/auth-service/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);

        if (axios.isAxiosError(error) && error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
        }

        return null;
    }
}

/**
 * Vérifie si la session est valide
 */
export async function checkSession(): Promise<boolean> {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        return false;
    }

    try {
        await axios.get(`${API_URL}/auth-service/auth/validate`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return true;
    } catch (error) {
        console.error('Session validation error:', error);

        if (axios.isAxiosError(error) && error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
        }

        return false;
    }
}

/**
 * Rafraîchit le token d'authentification
 */
export async function refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        return false;
    }

    try {
        const response = await axios.post<{ token: string; refreshToken?: string }>(`${API_URL}/auth-service/auth/refresh`, {
            refreshToken
        });

        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);

            if (response.data.refreshToken) {
                localStorage.setItem('refresh_token', response.data.refreshToken);
            }

            return true;
        }

        return false;
    } catch (error) {
        console.error('Token refresh error:', error);

        if (axios.isAxiosError(error) && error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
        }

        return false;
    }
}
