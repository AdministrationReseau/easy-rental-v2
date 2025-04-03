import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routePermissions } from './config/roles';

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	// Vérifier si c'est une route protégée
	const isProtectedRoute = routePermissions.some(p =>
		path === p.path || path.startsWith(`${p.path}/`)
	);

	if (isProtectedRoute) {
		// Récupérer le token ou une info d'authentification
		const token = request.cookies.get('authToken')?.value;

		if (!token) {
			// Rediriger vers la page de connexion si non authentifié
			const url = new URL('/login', request.url);
			url.searchParams.set('callbackUrl', encodeURI(request.nextUrl.pathname));
			return NextResponse.redirect(url);
		}

		// Vous pourriez vérifier plus en détail les permissions ici
		// avec un service de décodage de JWT par exemple
	}

	return NextResponse.next();
}

// Configurer les chemins sur lesquels le middleware s'applique
export const config = {
	matcher: ['/dashboard/:path*'],
};