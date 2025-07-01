import { ContactInfo } from './ContactInfo';
import { Address } from './Address';
import { BusinessHours } from './WorkingHours';
import { Vehicle } from './Vehicle';
import { Driver } from './Driver';
import { Staff } from './Staff';
import { Booking } from './Booking';
import {BookingStatus} from "@/types/enums/BookingStatus";

export interface AgencySettings {
  // Paramètres spécifiques à l'agence
  defaultRentalDuration?: number;
  minimumDriverExperience?: number;
  requireDriverValidation?: boolean;
}

export interface Agency {
  id: string;
  organizationId: string;
  name: string;
  location: Address;
  contactInfo: ContactInfo;
  businessHours: BusinessHours;
  settings: AgencySettings;
  status: string;
  createdAt: Date;
}

export interface AgencyService {
  getAgency(id: string): Promise<Agency>;
  createAgency(agency: Partial<Agency>): Promise<Agency>;
  updateAgency(id: string, data: Partial<Agency>): Promise<Agency>;
  deleteAgency(id: string): Promise<boolean>;
  getAgenciesByOrganization(organizationId: string): Promise<Agency[]>;
  getAgencyVehicles(agencyId: string): Promise<Vehicle[]>;
  getAgencyDrivers(agencyId: string): Promise<Driver[]>;
  getAgencyStaff(agencyId: string): Promise<Staff[]>;
  addVehicle(agencyId: string, vehicle: Partial<Vehicle>): Promise<Vehicle>;
  addDriver(agencyId: string, driver: Partial<Driver>): Promise<Driver>;
  addStaff(agencyId: string, staff: Partial<Staff>): Promise<Staff>;
  getBookings(agencyId: string, filters?: BookingStatus): Promise<Booking[]>;
  // generateReports(agencyId: string, startDate: Date, endDate: Date, type: string): Promise<any>;
  // getAvailableResources(agencyId: string, startDate: Date, endDate: Date, type: string): Promise<any[]>;
}
