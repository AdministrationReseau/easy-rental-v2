
import { ReactNode } from 'react';

export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
}


export interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string, role?: UserRole) => Promise<void>;
	register: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
	error: string | null;
}

export interface AuthLayoutProps {
	children: ReactNode;
	title: string;
	subtitle: string;
}

// export interface AuthLayoutProps {
// 	children: React.ReactNode;
// 	title: string;
// 	subtitle: string;
// }