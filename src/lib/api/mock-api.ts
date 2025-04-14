import usersData from '../../../public/data/users.json';
import vehiclesData from '../../../public/data/vehicles.json';

// Types
interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	createdAt: string;
	password?: string; // Adding password as an optional field
}

interface Vehicle {
	id: string;
	brand: string;
	model: string;
	year: number;
	type: string;
	price: number;
	available: boolean;
	imageUrl: string;
}

// API fictive pour les utilisateurs
export const userApi = {
	getUsers: async (): Promise<User[]> => {
		// Simuler une latence réseau
		await new Promise(resolve => setTimeout(resolve, 500));
		return usersData;
	},

	getUserById: async (id: string): Promise<User | undefined> => {
		await new Promise(resolve => setTimeout(resolve, 300));
		return usersData.find(user => user.id === id);
	},

	login: async (email: string, password: string): Promise<User | undefined> => {
		await new Promise(resolve => setTimeout(resolve, 800));

		// In a real application, you would verify the password
		// For mock purposes, we'll assume a simple validation
		// This addresses the "password is never used" warning
		const user = usersData.find(user => user.email === email);

		// Check if user exists and simulate password verification
		// You might want to add passwords to your mock data or use a fixed test password
		if (user && password) {
			// For mock API, consider all passwords valid or check against mock passwords
			return { ...user, password: undefined }; // Return user without password for security
		}

		return undefined; // Authentication failed
	}
};

// API fictive pour les véhicules
export const vehicleApi = {
	getVehicles: async (filters?: { available?: boolean, type?: string }): Promise<Vehicle[]> => {
		await new Promise(resolve => setTimeout(resolve, 500));

		let filtered = [...vehiclesData];

		if (filters) {
			if (filters.available !== undefined) {
				filtered = filtered.filter(v => v.available === filters.available);
			}

			if (filters.type) {
				filtered = filtered.filter(v => v.type === filters.type);
			}
		}

		return filtered;
	},

	getVehicleById: async (id: string): Promise<Vehicle | undefined> => {
		await new Promise(resolve => setTimeout(resolve, 300));
		return vehiclesData.find(vehicle => vehicle.id === id);
	}
};