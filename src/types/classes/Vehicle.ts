import { Money } from './Money';
import { VehicleStatus } from '../enums/VehicleStatus';
import { MaintenanceRecord } from "@/types/classes/MaintenanceRecord";
// Removed imports for Review, Agency, Schedule as their basic data shapes will be defined here
// For full class interactions, services will import the full classes/interfaces from their respective files.

// --- Content from src/types/models/vehicle.ts ---

// Minimal interfaces for related data, used within VehicleProps
// These define the shape of related data when included directly in VehicleProps
export interface ReviewData {
    id?: number | string;
    reviewer_name: string;
    reviewer_id?: number | string;
    comment: string;
    rating: number;
    date?: Date | string;
}

export interface AgencyBasicData {
    id: string;
    name?: string;
}

export interface SchedulingData {
    days_off?: { start: string | Date; end: string | Date }[];
    scheduled_ranges?: { start: string | Date; end: string | Date }[];
}

export interface VehicleFunctionalities {
    air_condition: boolean;
    usb_input: boolean;
    seat_belt: boolean;
    audio_input: boolean;
    child_seat: boolean;
    bluetooth: boolean;
    sleeping_bed: boolean;
    onboard_computer: boolean;
    gps: boolean;
    luggage: boolean;
    water: boolean;
    additional_covers: boolean;
}

export interface VehicleEngine {
    type?: string;
    horsepower?: number;
    capacity?: number;
}

export interface VehicleFuelEfficiency {
    city?: string;
    highway?: string;
}

export interface VehicleDocuments {
    registration_certificate?: string;
    technical_inspection?: string;
    insurance?: string; // This was 'insurance_document' in my previous plan, reverting to 'insurance' as per old CarProps
    tax_sticker?: string[];
}

export interface VehicleRegistration {
    state?: string;
    expiry?: Date | string; // Allowed string for easier data load
}

export interface VehicleOwner {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
}

export interface VehicleServiceHistoryItem {
    date?: Date | string;
    service_type?: string;
    mileage?: number;
    provider?: string;
    notes?: string; // Added notes from my previous plan, seems useful
}

export interface VehicleInsurance {
    provider?: string;
    policy_number?: string;
    expiry?: Date | string;
}

// This interface is primarily for UI components.
// It will be constructed by VehicleServiceImpl from raw data + old CarProps fields.
export interface VehicleProps {
    id: string;
    agencyId?: string;
    brand: string;
    model: string;
    year: number;
    category: string; // Use 'category' from new data, maps to 'type' from old.

    status: VehicleStatus | "AVAILABLE" | "MAINTENANCE" | "RENTED" | "UNKNOWN"; // Allow string literals for flexibility if VehicleStatus enum is strict
    available: boolean;

    mileage?: number;
    dailyRate: { // From new data structure
        amount: number;
        currency: string;
    };
    pricePerDay: number; // Derived from dailyRate.amount, for easier UI use (like old CarProps)

    images: string[];

    features?: string[]; // Raw features from new data
    fonctionnalities: VehicleFunctionalities; // Transformed from 'features', matches old CarProps structure

    description: string; // From old CarProps
    rating?: number;
    passenger?: number;
    vin?: string;
    plateNumber?: string; // From new data (was license_plate in old CarProps)

    engine: VehicleEngine; // Matched old CarProps structure
    transmission: string; // From old CarProps
    color?: string;
    fuelEfficiency?: VehicleFuelEfficiency;

    documents?: VehicleDocuments;
    registration?: VehicleRegistration;
    owner?: VehicleOwner;
    serviceHistory?: VehicleServiceHistoryItem[];
    insurance?: VehicleInsurance;

    reviews?: ReviewData[]; // Populated by service
    agency?: AgencyBasicData; // Populated by service
    scheduling?: SchedulingData; // Populated by service

    driverRequired?: boolean;

    // UI interaction props - typically added by the component using the data
    favorite?: boolean;
    onLike?: (id: string) => void;
    onDislike?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

// Props for filtering vehicles, used by UI and service
export interface FilterVehicleProps {
    category?: string[];
    passenger?: number | null;
    priceRange?: [number, number];
    // Add other filters as needed: brand, year, etc.
}

// Props for components listing vehicles
export interface VehicleListProps {
    vehicles: VehicleProps[];
}

// Props for a vehicle creation/editing modal
export interface VehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (vehicleData: Partial<VehicleProps>) => void;
    initialData?: VehicleProps | null;
    title: string;
}

// --- Original content from src/types/classes/Vehicle.ts ---

// This 'Vehicle' interface represents the expected raw structure from the backend/new vehicles.json
export interface Vehicle { // Renaming this to RawVehicle to avoid conflict with Vehicle class name later
  id: string;
  agencyId: string;
  make: string; // Will be mapped to 'brand' in VehicleProps
  model: string;
  year: number;
  plateNumber: string;
  vin: string;
  category: string;
  features: string[];
  status: VehicleStatus; // Enum
  mileage: number;
  dailyRate: Money; // { amount: number, currency: string }
  imageUrl?: string; // New data has imageUrl, VehicleProps will have images: string[]
}

export interface VehicleMethods {
  updateStatus(status: VehicleStatus): Promise<void>;
  updateMileage(newMileage: number): Promise<void>;
  scheduleMaintenance(date: Date, description: string): Promise<void>;
  isAvailable(startDate: Date, endDate: Date): Promise<boolean>;
  calculateRentalCost(days: number): Money;
}

export interface VehicleService {
  getVehicleById(id: string): Promise<VehicleProps | null>; // Service should return VehicleProps
  getAllVehicles(): Promise<VehicleProps[]>; // Service should return VehicleProps[]

  // createVehicle needs to accept data that can form VehicleProps, but returns VehicleProps
  createVehicle(vehicleData: Partial<Omit<VehicleProps, 'id'|'available'|'pricePerDay'|'images'|'fonctionnalities'|'status'|'dailyRate'>>): Promise<VehicleProps | null>;
  updateVehicle(id: string, vehicleData: Partial<Omit<VehicleProps, 'id'|'available'|'pricePerDay'|'images'|'fonctionnalities'|'status'|'dailyRate'>>): Promise<VehicleProps | null>;
  deleteVehicle(id: string): Promise<boolean>;

  updateVehicleStatus(id: string, status: VehicleStatus): Promise<VehicleProps | null>; // Should return updated VehicleProps
  updateMileage(id: string, mileage: number): Promise<VehicleProps | null>; // Should return updated VehicleProps

  getVehiclesByAgency(agencyId: string): Promise<VehicleProps[]>;
  getVehiclesByCategory(category: string): Promise<VehicleProps[]>;

  searchVehicles(filters: FilterVehicleProps): Promise<VehicleProps[]>; // Use new FilterVehicleProps

  getVehicleAvailability(id: string, startDate: Date, endDate: Date): Promise<boolean>; // This might involve Schedule service

  getVehicleMaintenanceHistory(vehicleId: string): Promise<MaintenanceRecord[]>;
  scheduleVehicleMaintenance(vehicleId: string, maintenance: Partial<MaintenanceRecord>): Promise<MaintenanceRecord>;
  calculateRentalPrice(vehicleId: string, startDate: Date, endDate: Date): Promise<number>;

  // Added based on VehicleProps needs and service-oriented approach
  getVehicleReviews(vehicleId: string): Promise<ReviewData[]>;
  // addReviewToVehicle(vehicleId: string, reviewData: Omit<ReviewData, 'id' | 'date'>): Promise<ReviewData | null>;

  getVehicleSchedule(vehicleId: string): Promise<SchedulingData | null>;
  // updateVehicleSchedule(vehicleId: string, scheduleData: SchedulingData): Promise<SchedulingData | null>;

  getVehicleAgency(vehicleId: string): Promise<AgencyBasicData | null>;
}
