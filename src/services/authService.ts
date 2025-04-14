// // src/services/authService.ts
// import { User, UserRole } from '@/types/auth';
// // You may need to import your API client here
// // import { userApi } from '@/lib/api/mock-api';
//
// export async function loginUser(email: string, password: string): Promise<User> {
// 	try {
// 		// For a real implementation, you would use your API client
// 		// const response = await userApi.login(email, password);
// 		// if (!response) throw new Error('Invalid email or password');
// 		// return response;
//
// 		// Mock implementation
// 		await new Promise(resolve => setTimeout(resolve, 800));
//
// 		// Verify email and password
// 		if (email === 'admin@example.com' && password === 'password') {
// 			return {
// 				id: '1',
// 				name: 'Admin User',
// 				email: 'admin@example.com',
// 				role: 'admin'
// 			};
// 		} else if (email === 'user@example.com' && password === 'password') {
// 			return {
// 				id: '2',
// 				name: 'Regular User',
// 				email: 'user@example.com',
// 				role: 'user'
// 			};
// 		} else {
// 			throw new Error('Adresse email ou mot de passe incorrect');
// 		}
// 	} catch (error) {
// 		console.error('Login error:', error);
// 		throw error instanceof Error
// 			? error
// 			: new Error('Une erreur est survenue lors de la connexion');
// 	}
// }
//
// export async function registerUser(
// 	name: string,
// 	email: string,
// 	password: string,
// 	role: UserRole = 'user'
// ): Promise<User> {
// 	try {
// 		// For a real implementation, you would use your API client
// 		// const response = await userApi.register({ name, email, password, role });
// 		// return response;
//
// 		// Mock implementation
// 		await new Promise(resolve => setTimeout(resolve, 800));
//
// 		// Validate password
// 		if (!password || password.length < 6) {
// 			throw new Error('Le mot de passe doit contenir au moins 6 caractères');
// 		}
//
// 		// Check if email already exists
// 		if (email === 'admin@example.com' || email === 'user@example.com') {
// 			throw new Error('Cette adresse email est déjà utilisée');
// 		}
//
// 		// Create mock user
// 		return {
// 			id: Math.random().toString(36).substring(2, 9), // Generate a random ID
// 			name,
// 			email,
// 			role
// 		};
// 	} catch (error) {
// 		console.error('Registration error:', error);
// 		throw error instanceof Error
// 			? error
// 			: new Error('Une erreur est survenue lors de l\'inscription');
// 	}
// }

// src/services/authService.ts
import { User, UserRole } from '@/types/auth';
// You may need to import your API client here
// import { userApi } from '@/lib/api/mock-api';

export async function loginUser(
	email: string,
	password: string,
	role: UserRole = 'user'
): Promise<User> {
	try {
		// For a real implementation, you would use your API client
		// const response = await userApi.login(email, password, role);
		// if (!response) throw new Error('Invalid email or password');
		// return response;

		// Mock implementation
		await new Promise(resolve => setTimeout(resolve, 800));

		// Verify email and password
		if (email === 'admin@example.com' && password === 'password') {
			// Even if user selects a different role, enforce the correct role if credentials match
			return {
				id: '1',
				name: 'Admin User',
				email: 'admin@example.com',
				role: 'admin'
			};
		} else if (email === 'user@example.com' && password === 'password') {
			return {
				id: '2',
				name: 'Regular User',
				email: 'user@example.com',
				role: 'user'
			};
		} else if (email === 'guest@example.com' && password === 'password') {
			return {
				id: '3',
				name: 'Guest User',
				email: 'guest@example.com',
				role: 'guest'
			};
		} else {
			// Only for demo purposes - allow login with any email if role is guest
			if (role === 'guest') {
				return {
					id: Math.random().toString(36).substring(2, 9),
					name: 'Guest',
					email,
					role: 'guest'
				};
			}
			throw new Error('Adresse email ou mot de passe incorrect');
		}
	} catch (error) {
		console.error('Login error:', error);
		throw error instanceof Error
			? error
			: new Error('Une erreur est survenue lors de la connexion');
	}
}

export async function registerUser(
	name: string,
	email: string,
	password: string,
	role: UserRole = 'user'
): Promise<User> {
	try {
		// For a real implementation, you would use your API client
		// const response = await userApi.register({ name, email, password, role });
		// return response;

		// Mock implementation
		await new Promise(resolve => setTimeout(resolve, 800));

		// Validate password
		if (!password || password.length < 6) {
			throw new Error('Le mot de passe doit contenir au moins 6 caractères');
		}

		// Check if email already exists
		if (email === 'admin@example.com' || email === 'user@example.com' || email === 'guest@example.com') {
			throw new Error('Cette adresse email est déjà utilisée');
		}

		// Create mock user
		return {
			id: Math.random().toString(36).substring(2, 9), // Generate a random ID
			name,
			email,
			role
		};
	} catch (error) {
		console.error('Registration error:', error);
		throw error instanceof Error
			? error
			: new Error('Une erreur est survenue lors de l\'inscription');
	}
}