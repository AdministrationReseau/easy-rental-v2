// // src/providers/AuthProvider.tsx
// 'use client';
//
// import { useEffect, useState, ReactNode } from 'react';
// import { useRouter } from 'next/navigation';
// import { User } from "@/types/auth"
// import { AuthContext } from "@/context/AuthContext"
// import { loginUser, registerUser } from '@/services/authService';
//
// export function AuthProvider({ children }: { children: ReactNode }) {
// 	const [user, setUser] = useState<User | null>(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);
// 	const router = useRouter();
//
// 	useEffect(() => {
// 		// Check if user is already logged in
// 		const checkAuth = () => {
// 			setIsLoading(true);
// 			const userData = localStorage.getItem('user');
// 			if (userData) {
// 				try {
// 					setUser(JSON.parse(userData));
// 				} catch (e) {
// 					console.error('Failed to parse user data', e);
// 					localStorage.removeItem('user');
// 				}
// 			}
// 			setIsLoading(false);
// 		};
//
// 		checkAuth();
// 	}, []);
//
// 	const login = async (email: string, password: string) => {
// 		setIsLoading(true);
// 		setError(null);
// 		try {
// 			const userData = await loginUser(email, password);
// 			setUser(userData);
// 			localStorage.setItem('user', JSON.stringify(userData));
// 		} catch (e) {
// 			setError((e as Error).message);
// 			throw e;
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};
//
// 	const register = async (name: string, email: string, password: string) => {
// 		setIsLoading(true);
// 		setError(null);
// 		try {
// 			// Pass password to registerUser function to fix the unused parameter warning
// 			const userData = await registerUser(name, email, password);
// 			setUser(userData);
// 			localStorage.setItem('user', JSON.stringify(userData));
// 		} catch (e) {
// 			setError((e as Error).message);
// 			throw e;
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};
//
// 	const logout = () => {
// 		setUser(null);
// 		localStorage.removeItem('user');
// 		router.push('/');
// 	};
//
// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				user,
// 				isAuthenticated: !!user,
// 				login,
// 				register,
// 				logout,
// 				isLoading,
// 				error
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// }

// src/providers/AuthProvider.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole, AuthContextType } from "@/types/auth";
import { AuthContext } from "@/context/AuthContext";
import { loginUser, registerUser } from '@/services/authService';

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		// Check if user is already logged in
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

	const login = async (email: string, password: string, role: UserRole = 'user') => {
		setIsLoading(true);
		setError(null);
		try {
			const userData = await loginUser(email, password);
			setUser(userData);
			localStorage.setItem('user', JSON.stringify(userData));
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Une erreur est survenue');
			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (name: string, email: string, password: string, role: UserRole = 'user') => {
		setIsLoading(true);
		setError(null);
		try {
			const userData = await registerUser(name, email, password, role);
			setUser(userData);
			localStorage.setItem('user', JSON.stringify(userData));
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Une erreur est survenue');
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

	const contextValue: AuthContextType = {
		user,
		isAuthenticated: !!user,
		login,
		register,
		logout,
		isLoading,
		error
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
}