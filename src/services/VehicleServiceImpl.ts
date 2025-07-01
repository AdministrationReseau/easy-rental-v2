import { VehicleService, Vehicle as VehicleInterfaceType } from '@/types/classes/Vehicle'; // Original interfaces
import { MaintenanceRecord } from '@/types/classes/MaintenanceRecord';
import { Review as ReviewClassType } from '@/types/classes/Review';
import { Agency as AgencyClassType } from '@/types/classes/Agency';
import { Schedule as ScheduleClassType } from '@/types/classes/Schedule';
import { VehicleStatus } from '@/types/enums/VehicleStatus';
import {
    VehicleProps,
    VehicleFunctionalities,
    ReviewData,
    AgencyBasicData,
    SchedulingData
    // FilterVehicleProps, // Not directly used by VehicleServiceImpl but good to note it's now in classes/Vehicle.ts
} from '@/types/classes/Vehicle'; // Updated import path

// Helper to transform raw vehicle data from JSON to VehicleProps
function transformRawVehicleToVehicleProps(raw: any): VehicleProps {
    const featuresArray = raw.features || [];

    const extractPassengerCount = (feats: string[]): number => {
        for (const feature of feats) {
            const match = feature.match(/(\d+)\s*places?/i);
            if (match && match[1]) return parseInt(match[1], 10);
        }
        return raw.passenger || 2; // Default from old CarProps or a sensible default
    };

    const transformFeaturesToFonctionnalities = (feats: string[]): VehicleFunctionalities => {
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

    const generateDescription = (brand: string, model: string, year: number, feats: string[]): string => {
        if (feats.length > 0) {
            return `This ${year} ${brand} ${model} comes with features like: ${feats.slice(0, 3).join(', ')}${feats.length > 3 ? ' and more' : ''}.`;
        }
        return `A reliable ${year} ${brand} ${model}.`;
    };

    const brand = raw.make || 'N/A';
    const model = raw.model || 'N/A';
    const year = raw.year || new Date().getFullYear();

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
        fonctionnalities: transformFeaturesToFonctionnalities(featuresArray),
        status: raw.status as VehicleProps['status'] || VehicleStatus.UNKNOWN,
        available: raw.status === VehicleStatus.AVAILABLE,
        mileage: raw.mileage || 0,
        dailyRate: raw.dailyRate ? { amount: raw.dailyRate.amount, currency: raw.dailyRate.currency } : { amount: 0, currency: 'XAF' },
        pricePerDay: raw.dailyRate?.amount || 0,
        images: raw.imageUrl ? [raw.imageUrl] : (raw.images || ['/images/vehicles/placeholder.png']),
        description: raw.description || generateDescription(brand, model, year, featuresArray),
        rating: raw.rating || 0,
        passenger: extractPassengerCount(featuresArray),
        engine: {
            type: raw.engine?.type || 'Petrol',
            horsepower: raw.engine?.horsepower,
            capacity: raw.engine?.capacity,
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

            const vehicleProps = transformRawVehicleToVehicleProps(rawVehicle);

            // Optionally, fetch and attach related data here
            // vehicleProps.reviews = await this.getVehicleReviews(id);
            // vehicleProps.agency = await this.getVehicleAgency(id);
            // vehicleProps.scheduling = await this.getVehicleSchedule(id);

            return vehicleProps;
        } catch (error) {
            console.error(`Error in getVehicleById(${id}):`, error);
            return null;
        }
    }

    async getAllVehicles(): Promise<VehicleProps[]> {
        try {
            const response = await fetch('/data/vehicles.json');
            if (!response.ok) throw new Error(`HTTP error fetching vehicles.json! status: ${response.status}`);
            const rawVehicles: any[] = await response.json();

            // Potentially fetch all related data for all vehicles if needed for list view,
            // or do it on demand. For now, just transforming.
            return rawVehicles.map(transformRawVehicleToVehicleProps);
        } catch (error) {
            console.error('Error in getAllVehicles:', error);
            return [];
        }
    }

    async createVehicle(vehicleData: Partial<VehicleInterfaceType>): Promise<VehicleProps | null> {
        console.warn("Mock createVehicle called. Data is not persisted.", vehicleData);
        const newId = `veh-${Date.now()}`;
        const completeVehicleData = {
            ...vehicleData,
            id: newId,
            make: vehicleData.brand, // Assuming brand maps to make for raw data
            category: vehicleData.type, // Assuming type maps to category
            status: VehicleStatus.AVAILABLE, // Default status
            dailyRate: vehicleData.pricePerDay ? { amount: vehicleData.pricePerDay, currency: 'XAF' } : {amount: 0, currency: 'XAF'},
            imageUrl: vehicleData.images?.[0]
        };
        return transformRawVehicleToVehicleProps(completeVehicleData);
    }

    async updateVehicle(id: string, vehicleData: Partial<VehicleInterfaceType>): Promise<VehicleProps | null> {
        console.warn(`Mock updateVehicle for ${id}. Data is not persisted.`, vehicleData);
        const currentVehiclesResponse = await fetch('/data/vehicles.json');
        const currentVehicles: any[] = await currentVehiclesResponse.json();
        const existingVehicle = currentVehicles.find(v => v.id === id);
        if (!existingVehicle) return null;

        const updatedRawData = {
            ...existingVehicle,
            ...vehicleData,
            make: vehicleData.brand || existingVehicle.make,
            category: vehicleData.type || existingVehicle.category,
            dailyRate: vehicleData.pricePerDay ? { amount: vehicleData.pricePerDay, currency: existingVehicle.dailyRate?.currency || 'XAF' } : existingVehicle.dailyRate,
            imageUrl: vehicleData.images?.[0] || existingVehicle.imageUrl
        };
        return transformRawVehicleToVehicleProps(updatedRawData);
    }

    async deleteVehicle(id: string): Promise<boolean> {
        console.warn(`Mock deleteVehicle for ${id}. Data is not actually deleted.`);
        return true;
    }

    async getVehiclesByAgency(agencyId: string): Promise<VehicleProps[]> {
        const allVehicles = await this.getAllVehicles();
        return allVehicles.filter(v => v.agencyId === agencyId);
    }

    async getVehiclesByCategory(category: string): Promise<VehicleProps[]> {
        const allVehicles = await this.getAllVehicles();
        return allVehicles.filter(v => v.category === category);
    }

    async searchVehicles(filters: any): Promise<VehicleProps[]> {
        console.warn("Mock searchVehicles called with filters:", filters);
        let vehicles = await this.getAllVehicles();
        if (filters.brand) vehicles = vehicles.filter(v => v.brand.toLowerCase().includes(filters.brand.toLowerCase()));
        if (filters.model) vehicles = vehicles.filter(v => v.model.toLowerCase().includes(filters.model.toLowerCase()));
        // Add more filter logic here
        return vehicles;
    }

    async getVehicleMaintenanceHistory(vehicleId: string): Promise<MaintenanceRecord[]> {
        console.warn(`Mock getVehicleMaintenanceHistory for ${vehicleId}`);
        // Fetch from public/data/maintenanceRecords.json and filter by vehicleId
        try {
            const response = await fetch('/data/maintenanceRecords.json');
            const allRecords: MaintenanceRecord[] = await response.json();
            return allRecords.filter(record => record.vehicleId === vehicleId);
        } catch (e) {
            return [];
        }
    }

    async scheduleVehicleMaintenance(vehicleId: string, maintenance: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> {
        console.warn(`Mock scheduleVehicleMaintenance for ${vehicleId}`, maintenance);
        const newRecord: MaintenanceRecord = {
            id: `maint-${Date.now()}`,
            vehicleId: vehicleId,
            agencyId: maintenance.agencyId || "unknown-agency", // Default if not provided
            date: maintenance.date || new Date(),
            type: maintenance.type || "Routine",
            description: maintenance.description || "Scheduled maintenance",
            cost: maintenance.cost || {amount:0, currency: 'XAF'},
            status: maintenance.status || "SCHEDULED",
            provider: maintenance.provider,
            notes: maintenance.notes
        };
        return newRecord; // Does not persist
    }


    async getVehicleReviews(vehicleId: string): Promise<ReviewData[]> {
        console.warn(`Mock getVehicleReviews for ${vehicleId}`);
        try {
            const response = await fetch('/data/reviews.json');
            if (!response.ok) return [];
            const allReviews: any[] = await response.json();
            // Assuming reviews.json items have a vehicleId or bookingId that can be linked
            return allReviews
                .filter(r => r.vehicleId === vehicleId /* crude filter, adapt to your reviews.json structure */)
                .map(r => ({
                    id: r.id,
                    reviewer_name: r.clientId || "Anonymous", // Map from clientId or default
                    comment: r.comment,
                    rating: r.vehicleRating || r.rating || 0, // Prioritize vehicleRating
                    date: r.createdAt || new Date().toISOString(),
                }));
        } catch (e) {
            console.error("Error fetching mock reviews:", e);
            return [];
        }
    }

    async addReviewToVehicle(vehicleId: string, reviewData: Omit<ReviewClassType, 'id' | 'createdAt' | 'bookingId' | 'clientId' | 'serviceRating'>): Promise<ReviewData | null> {
        console.warn(`Mock addReviewToVehicle for ${vehicleId}`, reviewData);
        const newReview: ReviewData = {
            id: `rev-${Date.now()}`,
            reviewer_name: "Mock User", // Or take from reviewData if available
            comment: reviewData.comment,
            rating: reviewData.vehicleRating,
            date: new Date().toISOString()
        };
        return newReview; // Does not persist
    }

    async getVehicleSchedule(vehicleId: string): Promise<SchedulingData | null> {
        console.warn(`Mock getVehicleSchedule for ${vehicleId}`);
        // This needs to align with how schedules are stored, possibly from bookings.json
        // For now, returning a default empty schedule.
        // A real implementation might fetch bookings for the vehicle and derive days_off/scheduled_ranges.
        return { days_off: [], scheduled_ranges: [] };
    }

    async updateVehicleSchedule(vehicleId: string, scheduleData: SchedulingData): Promise<SchedulingData | null> {
        console.warn(`Mock updateVehicleSchedule for ${vehicleId}`, scheduleData);
        return scheduleData; // Does not persist
    }

    async getVehicleAgency(vehicleId: string): Promise<AgencyBasicData | null> {
        console.warn(`Mock getVehicleAgency for vehicle ${vehicleId}`);
        const vehicle = await this.getVehicleById(vehicleId); // Get the vehicle to find its agencyId
        if (!vehicle || !vehicle.agencyId) return null;
        try {
            const response = await fetch('/data/agencies.json');
            if(!response.ok) return null;
            const allAgencies: any[] = await response.json();
            const agency = allAgencies.find(a => a.id === vehicle.agencyId);
            return agency ? { id: agency.id, name: agency.name } : null;
        } catch (e) {
            console.error("Error fetching mock agency for vehicle:", e);
            return null;
        }
    }

    // Implement other methods from VehicleService interface similarly, fetching from mock JSONs
    // and transforming data to VehicleProps or other relevant model props.
    // For example:
    // updateVehicleStatus, updateMileage, getVehicleAvailability, calculateRentalPrice
    async updateVehicleStatus(id: string, status: VehicleStatus): Promise<VehicleProps | null> {
        console.warn(`Mock updateVehicleStatus for ${id} to ${status}`);
        const vehicle = await this.getVehicleById(id);
        if(vehicle) {
            vehicle.status = status;
            vehicle.available = status === VehicleStatus.AVAILABLE;
            return vehicle;
        }
        return null;
    }

    async updateMileage(id: string, mileage: number): Promise<VehicleProps | null> {
        console.warn(`Mock updateMileage for ${id} to ${mileage}`);
        const vehicle = await this.getVehicleById(id);
        if(vehicle) {
            vehicle.mileage = mileage;
            return vehicle;
        }
        return null;
    }

    async getVehicleAvailability(id: string, startDate: Date, endDate: Date): Promise<boolean> {
        console.warn(`Mock getVehicleAvailability for ${id} from ${startDate} to ${endDate}`);
        // Basic mock: assume available if status is AVAILABLE. Real logic would check schedules.
        const vehicle = await this.getVehicleById(id);
        return vehicle?.available || false;
    }

    async calculateRentalPrice(vehicleId: string, startDate: Date, endDate: Date): Promise<number> {
        console.warn(`Mock calculateRentalPrice for ${vehicleId}`);
        const vehicle = await this.getVehicleById(vehicleId);
        if (!vehicle) return 0;
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) || 1;
        return days * vehicle.pricePerDay;
    }

}

// Export an instance of the service
export const vehicleService = new VehicleServiceImpl();
