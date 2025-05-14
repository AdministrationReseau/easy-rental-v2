// src/hooks/auth/useAuth.ts
import { useAuthContext } from '@/context/AuthContext';

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 */
export function useAuth() {
    return useAuthContext();
}
