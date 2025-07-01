import { UserStatus } from '../enums/UserStatus';
import { ContactInfo } from './ContactInfo';
import {Agency} from "@/types/classes/Agency";

export interface OrganizationSettings {
  // Ajoutez ici les paramètres spécifiques à l'organisation
  maxAgencies?: number;
  allowDriverReallocation?: boolean;
  enforceVehicleChecks?: boolean;
}

export interface Organization {
  id: string;
  name: string;
  businessLicense: string;
  subscriptionPlan: string;
  contactInfo: ContactInfo;
  settings: OrganizationSettings;
  status: UserStatus;
  createdAt: Date;
}

export interface OrganizationService {
  getOrganization(id: string): Promise<Organization>;
  createOrganization(organization: Partial<Organization>): Promise<Organization>;
  updateOrganization(id: string, data: Partial<Organization>): Promise<Organization>;
  deleteOrganization(id: string): Promise<boolean>;
  getOrganizationByName(name: string): Promise<Organization>;
  updateOrganizationSettings(id: string, settings: Partial<OrganizationSettings>): Promise<Organization>;
  getOrganizationAgencies(organizationId: string): Promise<Agency[]>;
  addAgencyToOrganization(organizationId: string, agency: Partial<Agency>): Promise<Agency>;
  // generateAnalytics(organizationId: string, startDate: Date, endDate: Date): Promise<any>;
  transferResource(resourceId: string, fromAgencyId: string, toAgencyId: string): Promise<boolean>;
}
