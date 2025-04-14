'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { hasPermission } from '@/utils/permissions';

interface RouteGuardProps {
	children: ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { user, isAuthenticated, isLoading } = useAuth();

	useEffect(() => {
		// Skip during initial loading
		if (isLoading) return;

		// Check if the current route requires authorization
		const userRole = user?.role || null;
		const hasAccess = hasPermission(pathname || '', userRole);

		if (!hasAccess) {
			// Redirect unauthenticated users to login
			if (!isAuthenticated) {
				router.push(`/signin?returnUrl=${encodeURIComponent(pathname || '')}`);
				return;
			}

			// Redirect authenticated users without permission to dashboard or home
			router.push(userRole ? '/' : '/');
		}
	}, [pathname, user, isAuthenticated, isLoading, router]);

	// While checking authentication, show a loading state
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	// If permissions check passes, render the children
	return <>{children}</>;
}