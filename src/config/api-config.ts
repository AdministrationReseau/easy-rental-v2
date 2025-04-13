export const API_CONFIG = {
	BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
	TIMEOUT: 10000,
	ENDPOINTS: {
		AUTH: {
			LOGIN: '/auth/login',
			REGISTER: '/auth/register',
			LOGOUT: '/auth/logout',
		},
		VEHICLES: {
			LIST: '/vehicles',
			DETAILS: (id: string) => `/vehicles/${id}`,
			CREATE: '/vehicles',
			UPDATE: (id: string) => `/vehicles/${id}`,
			DELETE: (id: string) => `/vehicles/${id}`,
		},
		USERS: {
			LIST: '/users',
			DETAILS: (id: string) => `/users/${id}`,
			CREATE: '/users',
			UPDATE: (id: string) => `/users/${id}`,
			DELETE: (id: string) => `/users/${id}`,
		},
	},
};