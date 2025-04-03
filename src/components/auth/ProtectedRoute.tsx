// 'use client';
//
// import { useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useAuth } from '@/providers/AuthProvider';
// import { hasPermission } from '@/config/roles';
//
// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
// 	const { isAuthenticated, user, loading } = useAuth();
// 	const router = useRouter();
// 	const pathname = usePathname();
//
// 	useEffect(() => {
// 		if (!loading) {
// 			// Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
// 			if (!isAuthenticated && pathname?.startsWith('/dashboard')) {
// 				router.push('/login');
// 				return;
// 			}
//
// 			// Vérifier les permissions basées sur le rôle
// 			if (user && pathname && !hasPermission(pathname, user.role)) {
// 				router.push('/403'); // Page d'accès refusé
// 				return;
// 			}
// 		}
// 	}, [isAuthenticated, user, loading, pathname, router]);
//
// 	// Afficher un état de chargement pendant la vérification
// 	if (loading) {
// 		return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
// 	}
//
// 	return <>{children}</>;
// }