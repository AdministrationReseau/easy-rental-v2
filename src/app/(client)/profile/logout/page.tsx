"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';

export default function LogoutPage() {
	const { logout, isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		const handleLogout = async () => {
			if (isAuthenticated) {
				await logout();
			}
			// Redirect to home page after logout
			router.push('/');
		};

		handleLogout();
	}, [logout, router, isAuthenticated]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
				<div className="text-center">
					<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
						<svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
						</svg>
					</div>
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">Déconnexion</h2>
					<p className="mt-2 text-sm text-gray-600">
						Vous avez été déconnecté avec succès.
					</p>
					<div className="mt-8 text-center">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Redirection en cours...
                </span>
							</div>
						</div>
						<div className="mt-6">
							<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em]"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}