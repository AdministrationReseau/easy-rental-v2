// src/providers/AuthProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Types
export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
}

type AuthContextType = {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
	error: string | null;
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		// Vérifier si l'utilisateur est déjà connecté
		const checkAuth = () => {
			setIsLoading(true);
			const userData = localStorage.getItem('user');
			if (userData) {
				try {
					setUser(JSON.parse(userData));
				} catch (e) {
					console.error('Failed to parse user data', e);
					localStorage.removeItem('user');
				}
			}
			setIsLoading(false);
		};

		checkAuth();
	}, []);

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		setError(null);
		try {
			// Simuler un appel API
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Vérifications fictives
			if (email === 'admin@example.com' && password === 'password') {
				const userData: User = {
					id: '1',
					name: 'Admin User',
					email: 'admin@example.com',
					role: 'admin'
				};
				setUser(userData);
				localStorage.setItem('user', JSON.stringify(userData));
			} else if (email === 'user@example.com' && password === 'password') {
				const userData: User = {
					id: '2',
					name: 'Regular User',
					email: 'user@example.com',
					role: 'user'
				};
				setUser(userData);
				localStorage.setItem('user', JSON.stringify(userData));
			} else {
				throw new Error('Invalid email or password');
			}
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (name: string, email: string, password: string) => {
		setIsLoading(true);
		setError(null);
		try {
			// Simuler un appel API
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Simuler un enregistrement réussi
			const userData: User = {
				id: '3',
				name,
				email,
				role: 'user'
			};
			setUser(userData);
			localStorage.setItem('user', JSON.stringify(userData));
		} catch (e) {
			setError((e as Error).message);
			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
		router.push('/');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				login,
				register,
				logout,
				isLoading,
				error
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

// Hook pour utiliser le contexte
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};