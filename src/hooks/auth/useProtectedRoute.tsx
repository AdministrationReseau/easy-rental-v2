'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from "@/hooks/auth/useAuth";
import { UserRole } from '@/types/auth';

/**
 * Hook pour protéger une route avec des exigences d'authentification et de rôle
 */
export function useProtectedRoute(requiredRole?: UserRole) {
    const { user, isAuthenticated, isLoading, checkSession } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyAccess = async () => {
            setIsChecking(true);

            // Attendre que l'état d'authentification soit chargé
            if (isLoading) {
                return;
            }

            // Vérifier si l'utilisateur est authentifié
            if (!isAuthenticated) {
                router.push(`/signin?returnUrl=${encodeURIComponent(pathname || '')}`);
                return;
            }

            // Vérifier la validité de la session
            const isSessionValid = await checkSession();
            if (!isSessionValid) {
                router.push(`/signin?returnUrl=${encodeURIComponent(pathname || '')}`);
                return;
            }

            // Vérifier le rôle si requis
            if (requiredRole && user?.role !== requiredRole) {
                router.push('/unauthorized');
                return;
            }

            setIsChecking(false);
        };

        verifyAccess();
    }, [isAuthenticated, isLoading, requiredRole, user, router, pathname, checkSession]);

    return {
        isLoading: isLoading || isChecking,
        isAuthenticated,
        user
    };
}
