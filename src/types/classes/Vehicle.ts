import { Money } from './Money';
import { VehicleStatus } from '../enums/VehicleStatus';
import {MaintenanceRecord} from "@/types/classes/MaintenanceRecord";

export interface Vehicle {
  id: string;
  agencyId: string;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  vin: string;
  category: string;
  features: string[];
  status: VehicleStatus;
  mileage: number;
  dailyRate: Money;
}

export interface VehicleMethods {
  updateStatus(status: VehicleStatus): Promise<void>;
  updateMileage(newMileage: number): Promise<void>;
  scheduleMaintenance(date: Date, description: string): Promise<void>;
  isAvailable(startDate: Date, endDate: Date): Promise<boolean>;
  calculateRentalCost(days: number): Money;
}

export interface VehicleService {
  getVehicle(id: string): Promise<Vehicle>;
  createVehicle(vehicle: Partial<Vehicle>): Promise<Vehicle>;
  updateVehicle(id: string, data: Partial<Vehicle>): Promise<Vehicle>;
  deleteVehicle(id: string): Promise<boolean>;
  updateVehicleStatus(id: string, status: VehicleStatus): Promise<Vehicle>;
  updateMileage(id: string, mileage: number): Promise<Vehicle>;
  getVehiclesByAgency(agencyId: string): Promise<Vehicle[]>;
  getVehiclesByCategory(category: string): Promise<Vehicle[]>;
  searchVehicles(query: string): Promise<Vehicle[]>;
  getVehicleAvailability(id: string, startDate: Date, endDate: Date): Promise<boolean>;
  getMaintenanceHistory(vehicleId: string): Promise<MaintenanceRecord[]>;
  scheduleMaintenance(vehicleId: string, maintenance: Partial<MaintenanceRecord>): Promise<MaintenanceRecord>;
  calculateRentalPrice(vehicleId: string, startDate: Date, endDate: Date): Promise<number>;
}
