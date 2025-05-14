import { createContext, useContext } from 'react';
import { AuthContextType, User, UserRole } from '@/types/models/auth';

// Create the auth context with null default values
const defaultContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: async () => {
        throw new Error('AuthContext not initialized');
    },
    register: async () => {
        throw new Error('AuthContext not initialized');
    },
    logout: async () => {
        throw new Error('AuthContext not initialized');
    },
    checkSession: async () => {
        throw new Error('AuthContext not initialized');
        return false;
    },
    refreshSession: async () => {
        throw new Error('AuthContext not initialized');
    },
    clearError: () => {
        throw new Error('AuthContext not initialized');
    }
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

// Custom hook to use the auth context
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }

    return context;
};

// Utility functions for authorization
export const hasRole = (user: User | null, roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;

    if (Array.isArray(roles)) {
        return roles.includes(user.role);
    }

    return user.role === roles;
};

export const isOrganizationMember = (user: User | null): boolean => {
    if (!user) return false;
    return !!user.organization;
};

export default AuthContext;
