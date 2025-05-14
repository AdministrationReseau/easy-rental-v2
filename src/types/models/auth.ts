import { ReactNode } from 'react';

export type UserRole = 'admin' | 'user' | 'guest' | 'staff';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phoneNumber?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    organization?: {
        id: string;
        name: string;
        role: 'owner' | 'admin' | 'staff';
    };
}


export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string, role?: UserRole) => Promise<User>;
    register: (
        name: string,
        email: string,
        password: string,
        role?: UserRole,
        username?: string,
        phoneNumber?: string
    ) => Promise<User>;
    logout: () => Promise<void>;
    checkSession: () => Promise<boolean>;
    refreshSession: () => Promise<void>;
    clearError: () => void;
}

export interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    role?: UserRole;
}

export interface LoginResponse {
    user: User;
    token: string;
    refreshToken?: string;
    expiresIn: number;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    username?: string;
    phoneNumber?: string;
}

export interface RegisterResponse {
    user: User;
    token?: string;
    message: string;
}

export interface Organization {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    country?: string;
    description?: string;
    businessActorId: string;
    plan: {
        id: string;
        name: string;
        price: number;
        features: string[];
        billingCycle: 'monthly' | 'yearly';
    };
    subscription: {
        id: string;
        status: 'active' | 'inactive' | 'suspended' | 'pending';
        startDate: string;
        endDate: string;
        transactionId: string;
    };
}
