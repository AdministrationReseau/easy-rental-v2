'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { UserRole } from '@/types/models/auth';

interface RouteConfig {
    path: string;
    allowedRoles: UserRole[];
    requireAuth: boolean;
}

interface RouteGuardProps {
    children: ReactNode;
}

// Configuration des routes avec leurs exigences d'accès
const routeConfigs: RouteConfig[] = [
    // Routes publiques
    { path: '/', allowedRoles: ['admin', 'user', 'guest', 'staff'], requireAuth: false },
    { path: '/signin', allowedRoles: ['guest'], requireAuth: false },
    { path: '/signup', allowedRoles: ['guest'], requireAuth: false },
    { path: '/subscription', allowedRoles: ['guest', 'user', 'admin'], requireAuth: false },
    { path: '/about', allowedRoles: ['admin', 'user', 'guest', 'staff'], requireAuth: false },
    { path: '/contact', allowedRoles: ['admin', 'user', 'guest', 'staff'], requireAuth: false },
    { path: '/unauthorized', allowedRoles: ['admin', 'user', 'guest', 'staff'], requireAuth: false },

    // Routes client
    { path: '/', allowedRoles: ['user'], requireAuth: true },
    { path: '/vehicles', allowedRoles: ['user'], requireAuth: false },
    { path: '/bookings', allowedRoles: ['user'], requireAuth: true },
    { path: '/agencies', allowedRoles: ['user'], requireAuth: false },
    { path: '/profile', allowedRoles: ['user'], requireAuth: false },

    // Routes organisation
    { path: '/organization', allowedRoles: ['admin'], requireAuth: true },
    { path: '/organization/vehicles', allowedRoles: ['admin'], requireAuth: true },
    { path: '/organization/drivers', allowedRoles: ['admin'], requireAuth: true },
    { path: '/organization/bookings', allowedRoles: ['admin'], requireAuth: true },
    { path: '/organization/analytics', allowedRoles: ['admin'], requireAuth: true },
    { path: '/organization/profile', allowedRoles: ['admin'], requireAuth: true },
    { path: '/organization/register', allowedRoles: ['admin', 'guest'], requireAuth: false },
];

export default function RouteGuard({ children }: RouteGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, isLoading, checkSession } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyAccess = async () => {
            setIsChecking(true);

            // Attendre que l'état d'authentification soit chargé
            if (isLoading) {
                return;
            }

            // Trouver la configuration correspondante à la route actuelle
            const matchingConfig = routeConfigs.find(config => {
                if (pathname && config.path.endsWith('*')) {
                    const basePath = config.path.slice(0, -1);
                    return pathname.startsWith(basePath);
                }
                return pathname === config.path;
            });

            // Configuration par défaut si non trouvée (restreinte)
            const config = matchingConfig || {
                path: pathname || '',
                allowedRoles: ['admin', 'user'],
                requireAuth: true
            };

            // Vérifier l'authentification si requise
            if (config.requireAuth) {
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

                // Vérifier le rôle
                if (user && !config.allowedRoles.includes(user.role)) {
                    router.push('/unauthorized');
                    return;
                }
            } else if (isAuthenticated && config.allowedRoles.includes('guest') && !config.allowedRoles.includes(user?.role || 'user')) {
                // Rediriger si authentifié sur une route réservée aux invités
                if (user?.role === 'admin') {
                    router.push('/organization');
                } else {
                    router.push('/client');
                }
                return;
            }

            setIsChecking(false);
        };

        verifyAccess();
    }, [isAuthenticated, isLoading, user, router, pathname, checkSession]);

    // Afficher un indicateur de chargement pendant la vérification
    if (isLoading || isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    <p className="text-gray-600 dark:text-text-dark">Chargement...</p>
                </div>
            </div>
        );
    }

    // Rendre les enfants si toutes les vérifications sont passées
    return <>{children}</>;
}
