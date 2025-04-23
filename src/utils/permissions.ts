// src/utils/permissions.ts
export type UserRole = 'admin' | 'user' | 'guest';

export interface RoutePermission {
	path: string;
	allowedRoles: UserRole[];
}

export const routePermissions: RoutePermission[] = [
	{ path: '/profile', allowedRoles: ['admin', 'user'] },
	{ path: '/admin', allowedRoles: ['admin'] },
	{ path: '/vehicles/manage', allowedRoles: ['admin'] },
	{ path: '/users', allowedRoles: ['admin'] },
	// Routes publiques (non listées ici) sont accessibles à tous
];

// Fonction d'aide pour vérifier les autorisations
export function hasPermission(path: string, role: UserRole | null): boolean {
	// Les routes non protégées sont accessibles à tous
	const permission = routePermissions.find(p =>
		path === p.path || path.startsWith(`${p.path}/`)
	);

	if (!permission) return true;
	if (!role) return false;

	return permission.allowedRoles.includes(role);
}