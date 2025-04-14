// src/app/unauthorized/page.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';

export default function UnauthorizedPage() {
	const { user, logout } = useAuth();

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="text-center">
						<h1 className="text-3xl font-extrabold text-gray-900 mb-6">Accès non autorisé</h1>
						<p className="text-lg text-gray-600 mb-8">
							Vous n&lsquo;avez pas les permissions nécessaires pour accéder à cette page.
						</p>

						{user ? (
							<div className="space-y-4">
								<p className="text-sm text-gray-600">
									Vous êtes connecté en tant que <span className="font-medium">{user.name}</span> avec le rôle <span className="font-medium">{user.role}</span>.
								</p>
								<div className="flex flex-col space-y-4">
									<Link
										href="/"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										Retour au tableau de bord
									</Link>
									<button
										onClick={logout}
										className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									>
										Se déconnecter
									</button>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<p className="text-sm text-gray-600">
									Veuillez vous connecter avec un compte disposant des droits nécessaires.
								</p>
								<Link
									href="/signin"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Se connecter
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}