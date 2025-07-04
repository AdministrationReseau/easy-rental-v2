import { DriverStatus } from '../enums/DriverStatus';
import { Money } from './Money';
import { WorkingHours } from './WorkingHours';
import {Schedule} from "@/types/classes/Schedule";

export interface Driver {
  id: string;
  agencyId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiry: Date;
  status: DriverStatus;
  hourlyRate: Money;
  workingHours: WorkingHours;
  hireDate: Date;
  experience: number;
}

export interface DriverService {
  getDriver(id: string): Promise<Driver>;
  createDriver(driver: Partial<Driver>): Promise<Driver>;
  updateDriver(id: string, data: Partial<Driver>): Promise<Driver>;
  deleteDriver(id: string): Promise<boolean>;
  updateDriverStatus(id: string, status: DriverStatus): Promise<Driver>;
  getDriversByAgency(agencyId: string): Promise<Driver[]>;
  getDriverAvailability(id: string, startDate: Date, endDate: Date): Promise<boolean>;
  getDriverSchedule(driverId: string, startDate: Date, endDate: Date): Promise<Schedule[]>;
  renewDriverLicense(driverId: string, expiryDate: Date, licenseNumber?: string): Promise<Driver>;
  calculateDriverEarnings(driverId: string, startDate: Date, endDate: Date): Promise<number>;
  findAvailableDrivers(agencyId: string, startDate: Date, endDate: Date): Promise<Driver[]>;
  assignDriverToBooking(driverId: string, bookingId: string): Promise<boolean>;
}
