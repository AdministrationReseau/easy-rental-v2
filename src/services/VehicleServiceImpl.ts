import {
    VehicleService,
    Vehicle as VehicleInterfaceType,
    SchedulingData,
    ReviewData,
    AgencyBasicData
} from '@/types/classes/Vehicle'; // Original interfaces
import { MaintenanceRecord } from '@/types/classes/MaintenanceRecord';
import { Review as ReviewClassType } from '@/types/classes/Review';
import { VehicleStatus } from '@/types/enums/VehicleStatus';
import {
    VehicleProps,
    VehicleFunctionalities,
    VehicleService,
    // ReviewData,
    // AgencyBasicData,
    // SchedulingData
    // FilterVehicleProps, // Not directly used by VehicleServiceImpl but good to note it's now in classes/Vehicle.ts
} from '@/types/classes/Vehicle';
// import {Money} from "@/types/classes/Money"; // Updated import path

// Helper to transform raw vehicle data from JSON to VehicleProps
function transformRawVehicleToVehicleProps(raw: any): VehicleProps {
    const featuresArray = raw.features || [];

    // Fonction d'extraction du nombre de passagers, utilise la valeur explicite si disponible
    const extractPassengerCount = (feats: string[], passengerValue?: number): number => {
        if (passengerValue !== undefined) return passengerValue;

        for (const feature of feats) {
            const match = feature.match(/(\d+)\s*places?/i);
            if (match && match[1]) return parseInt(match[1], 10);
        }
        return 2; // Valeur par défaut si rien n'est trouvé
    };

    // Fonction de transformation des fonctionnalités. Maintenant, utilise les fonctionnalités pré-définies si disponibles
    const transformFeaturesToFonctionnalities = (feats: string[], existingFuncs?: VehicleFunctionalities): VehicleFunctionalities => {
        // Si les fonctionnalités sont déjà définies dans le JSON, les utiliser directement
        if (existingFuncs) return existingFuncs;

        // Sinon, inférer à partir des fonctionnalités
        const funcs: VehicleFunctionalities = {
            air_condition: false, usb_input: false, seat_belt: true, audio_input: false,
            child_seat: false, bluetooth: false, sleeping_bed: false, onboard_computer: false,
            gps: false, luggage: false, water: false, additional_covers: false,
        };

        (feats || []).forEach(feature => {
            const lowerFeature = feature.toLowerCase();
            if (lowerFeature.includes('gps')) funcs.gps = true;
            else if (lowerFeature.includes('climatisation') || lowerFeature.includes('air condition')) funcs.air_condition = true;
            else if (lowerFeature.includes('bluetooth')) funcs.bluetooth = true;
            else if (lowerFeature.includes('usb')) funcs.usb_input = true;
            // Add more mappings as needed based on actual feature strings
        });
        return funcs;
    };

    // Génère une description si elle n'est pas fournie
    const generateDescription = (brand: string, model: string, year: number, feats: string[]): string => {
        if (raw.description) return raw.description; // Utiliser la description si elle existe

        if (feats.length > 0) {
            return `This ${year} ${brand} ${model} comes with features like: ${feats.slice(0, 3).join(', ')}${feats.length > 3 ? ' and more' : ''}.`;
        }
        return `A reliable ${year} ${brand} ${model}.`;
    };

    // Utilise 'brand' si disponible, sinon revient à 'make' pour la rétrocompatibilité
    const brand = raw.brand || raw.make || 'N/A';
    const model = raw.model || 'N/A';
    const year = raw.year || new Date().getFullYear();

    // Conversion des statuts string en enum VehicleStatus si nécessaire
    const normalizeStatus = (status: string | VehicleStatus): VehicleStatus => {
        if (typeof status === 'string') {
            switch (status.toUpperCase()) {
                case 'AVAILABLE': return VehicleStatus.AVAILABLE;
                case 'MAINTENANCE': return VehicleStatus.MAINTENANCE;
                case 'RENTED': return VehicleStatus.RENTED;
                default: return VehicleStatus.BLOCKED;
            }
        }
        return status || VehicleStatus.BLOCKED;
    };

    // Création de l'objet VehicleProps à partir des données brutes
    return {
        id: raw.id,
        agencyId: raw.agencyId,
        brand: brand,
        model: model,
        year: year,
        category: raw.category || 'N/A',
        plateNumber: raw.plateNumber || 'N/A',
        vin: raw.vin,
        features: featuresArray,
        fonctionnalities: transformFeaturesToFonctionnalities(featuresArray, raw.fonctionnalities),
        status: normalizeStatus(raw.status),
        available: normalizeStatus(raw.status) === VehicleStatus.AVAILABLE,
        mileage: raw.mileage || 0,
        dailyRate: raw.dailyRate ? { amount: raw.dailyRate.amount, currency: raw.dailyRate.currency } : { amount: 0, currency: 'XAF' },
        pricePerDay: raw.dailyRate?.amount || 0,
        images: raw.images || (raw.imageUrl ? [raw.imageUrl] : ['/images/vehicles/placeholder.png']),
        description: generateDescription(brand, model, year, featuresArray),
        rating: raw.rating || 0,
        passenger: extractPassengerCount(featuresArray, raw.passenger),
        engine: raw.engine || {
            type: 'Petrol',
            horsepower: undefined,
            capacity: undefined,
        },
        transmission: raw.transmission || 'Manual',
        color: raw.color,
        fuelEfficiency: raw.fuelEfficiency,
        documents: raw.documents,
        registration: raw.registration,
        owner: raw.owner,
        serviceHistory: raw.serviceHistory || [],
        insurance: raw.insurance,
        driverRequired: raw.driverRequired !== undefined ? raw.driverRequired : false,
        // reviews, agency, scheduling will be populated by their respective methods
    };
}

export class VehicleServiceImpl implements VehicleService {

    async getVehicleById(id: string): Promise<VehicleProps | null> {
        try {
            const response = await fetch('/data/vehicles.json');
            if (!response.ok) throw new Error(`HTTP error fetching vehicles.json! status: ${response.status}`);
            const rawVehicles: any[] = await response.json();
            const rawVehicle = rawVehicles.find(v => v.id === id);
            if (!rawVehicle) return null;

            return transformRawVehicleToVehicleProps(rawVehicle);
        } catch (error) {
            console.error('Error fetching vehicle by ID:', error);
            return null;
        }
    }

    async getAllVehicles(): Promise<VehicleProps[]> {
        try {
            const response = await fetch('/data/vehicles.json');
            if (!response.ok) throw new Error(`HTTP error fetching vehicles.json! status: ${response.status}`);
            const rawVehicles: any[] = await response.json();

            return rawVehicles.map(vehicle => transformRawVehicleToVehicleProps(vehicle));
        } catch (error) {
            console.error('Error fetching all vehicles:', error);
            return [];
        }
    }

    async getVehiclesByAgency(agencyId: string): Promise<VehicleProps[]> {
        try {
            const allVehicles = await this.getAllVehicles();
            return allVehicles.filter(v => v.agencyId === agencyId);
        } catch (error) {
            console.error('Error getting vehicles by agency:', error);
            return [];
        }
    }

    async getVehiclesByCategory(category: string): Promise<VehicleProps[]> {
        try {
            const allVehicles = await this.getAllVehicles();
            return allVehicles.filter(v => v.category.toLowerCase() === category.toLowerCase());
        } catch (error) {
            console.error('Error getting vehicles by category:', error);
            return [];
        }
    }

    async createVehicle(vehicleData: Partial<Omit<VehicleProps, 'id'|'available'|'pricePerDay'|'images'|'fonctionnalities'|'status'|'dailyRate'>>): Promise<VehicleProps | null> {
        // This would require a backend API in a real application
        console.warn('Create vehicle operation would require a backend API');
        return null;
    }

    async updateVehicle(id: string, vehicleData: Partial<Omit<VehicleProps, 'id'|'available'|'pricePerDay'|'images'|'fonctionnalities'|'status'|'dailyRate'>>): Promise<VehicleProps | null> {
        // This would require a backend API in a real application
        console.warn('Update vehicle operation would require a backend API');
        return null;
    }

    async deleteVehicle(id: string): Promise<boolean> {
        // This would require a backend API in a real application
        console.warn('Delete vehicle operation would require a backend API');
        return false;
    }

    async updateVehicleStatus(id: string, status: VehicleStatus): Promise<VehicleProps | null> {
        // This would require a backend API in a real application
        console.warn('Update vehicle status operation would require a backend API');
        return null;
    }

    async updateMileage(id: string, mileage: number): Promise<VehicleProps | null> {
        // This would require a backend API in a real application
        console.warn('Update mileage operation would require a backend API');
        return null;
    }

    async searchVehicles(filters: any): Promise<VehicleProps[]> {
        try {
            const allVehicles = await this.getAllVehicles();

            return allVehicles.filter(vehicle => {
                let matches = true;

                if (filters.category && filters.category.length > 0) {
                    matches = matches && filters.category.includes(vehicle.category);
                }

                if (filters.passenger && filters.passenger > 0) {
                    matches = matches && (vehicle.passenger || 0) >= filters.passenger;
                }

                if (filters.priceRange && filters.priceRange.length === 2) {
                    const [min, max] = filters.priceRange;
                    matches = matches && vehicle.pricePerDay >= min && vehicle.pricePerDay <= max;
                }

                // Add more filter criteria as needed

                return matches;
            });

        } catch (error) {
            console.error('Error searching vehicles:', error);
            return [];
        }
    }

    async getVehicleAvailability(id: string, startDate: Date, endDate: Date): Promise<boolean> {
        // In a real implementation, this would check against reservations/bookings
        return true; // Placeholder implementation
    }

    async getVehicleMaintenanceHistory(vehicleId: string): Promise<MaintenanceRecord[]> {
        // Would fetch from maintenance records API/endpoint in a real implementation
        return []; // Placeholder implementation
    }

    async scheduleVehicleMaintenance(vehicleId: string, maintenance: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> {
        // Would create a maintenance record via API in a real implementation
        throw new Error('Not implemented');
    }

    async calculateRentalPrice(vehicleId: string, startDate: Date, endDate: Date): Promise<number> {
        try {
            const vehicle = await this.getVehicleById(vehicleId);
            if (!vehicle) throw new Error('Vehicle not found');

            const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            if (days <= 0) throw new Error('End date must be after start date');

            return days * vehicle.pricePerDay;
        } catch (error) {
            console.error('Error calculating rental price:', error);
            return 0;
        }
    }

    async getVehicleReviews(vehicleId: string): Promise<ReviewData[]> {
        // Would fetch from reviews API/endpoint in a real implementation
        return []; // Placeholder implementation
    }

    async getVehicleSchedule(vehicleId: string): Promise<SchedulingData | null> {
        // Would fetch from scheduling API/endpoint in a real implementation
        return null; // Placeholder implementation
    }

    async getVehicleAgency(vehicleId: string): Promise<AgencyBasicData | null> {
        // Would fetch from agency API/endpoint in a real implementation
        return null; // Placeholder implementation
    }
}

export const vehicleService = new VehicleServiceImpl();

