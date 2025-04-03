// src/hooks/auth/useProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export function useProtectedRoute(requiredRole: 'admin' | 'user' | undefined = undefined) {
	const { user, isAuthenticated, isLoading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!isLoading) {
			if (!isAuthenticated) {
				router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
			} else if (requiredRole && user?.role !== requiredRole) {
				// Rediriger si l'utilisateur n'a pas le rôle requis
				router.push('/unauthorized');
			}
		}
	}, [isAuthenticated, isLoading, requiredRole, user, router, pathname]);

	return { isLoading, isAuthenticated, user };
}