'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from "@/types/auth";
import AuthContext from "@/context/AuthContext";
import { loginUser, registerUser, logoutUser, getCurrentUser, checkSession as apiCheckSession, refreshToken } from '@/services/authService';

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Vérifie si l'utilisateur est déjà connecté au chargement
        const checkAuth = async () => {
            setIsLoading(true);

            try {
                const userData = await getCurrentUser();
                if (userData) {
                    setUser(userData);
                }
            } catch (e) {
                console.error('Failed to check authentication', e);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Connexion utilisateur
    const login = async (email: string, password: string, role: UserRole = 'user') => {
        setIsLoading(true);
        setError(null);

        try {
            const userData = await loginUser(email, password, role);
            setUser(userData);

            // Conserver les préférences utilisateur
            localStorage.setItem('user_preferences', JSON.stringify({
                theme: localStorage.getItem('theme') || 'light',
                language: localStorage.getItem('lng') || 'fr',
                role: userData.role
            }));

            return userData;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Une erreur est survenue';
            setError(errorMessage);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    // Inscription utilisateur
    const register = async (
        name: string,
        email: string,
        password: string,
        role: UserRole = 'user',
        username?: string,
        phoneNumber?: string
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const userData = await registerUser(name, email, password, role, username, phoneNumber);
            setUser(userData);

            // Conserver les préférences utilisateur
            localStorage.setItem('user_preferences', JSON.stringify({
                theme: 'light',
                language: 'fr',
                role: userData.role
            }));

            return userData;
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Une erreur est survenue';
            setError(errorMessage);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    // Déconnexion utilisateur
    const logout = async () => {
        setIsLoading(true);

        try {
            await logoutUser();
            setUser(null);

            // Conserver uniquement les préférences de thème et de langue
            const theme = localStorage.getItem('theme');
            const lng = localStorage.getItem('lng');

            localStorage.clear();

            if (theme) localStorage.setItem('theme', theme);
            if (lng) localStorage.setItem('lng', lng);

            router.push('/');
        } catch (e) {
            console.error('Logout error', e);
        } finally {
            setIsLoading(false);
        }
    };

    // Vérification de session
    const checkSession = async (): Promise<boolean> => {
        try {
            const isValid = await apiCheckSession();

            if (!isValid && user) {
                setUser(null);
                return false;
            }

            return isValid;
        } catch (e) {
            console.error('Session check error', e);
            return false;
        }
    };

    // Rafraîchissement de session
    const refreshSession = async (): Promise<void> => {
        try {
            const success = await refreshToken();

            if (!success && user) {
                setUser(null);
                router.push('/signin');
            }
        } catch (e) {
            console.error('Session refresh error', e);
        }
    };

    // Effacer les erreurs
    const clearError = () => {
        setError(null);
    };

    // Valeur du contexte
    const contextValue = {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        checkSession,
        refreshSession,
        clearError
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
