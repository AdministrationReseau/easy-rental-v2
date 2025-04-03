import usersData from '../../../public/data/users.json';
import vehiclesData from '../../../public/data/vehicles.json';

// Types
interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	createdAt: string;
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
		return usersData.find(user => user.email === email);
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