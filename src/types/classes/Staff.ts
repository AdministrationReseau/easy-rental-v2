import { StaffStatus } from '../enums/StaffStatus';
import { Money } from './Money';
import { WorkingHours } from './WorkingHours';
import {Schedule} from "@/types/classes/Schedule";

export interface Staff {
  id: string;
  organizationId: string;
  agencyId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  position: string;
  department: string;
  status: StaffStatus;
  hourlyRate: Money;
  workingHours: WorkingHours;
  hireDate: Date;
}

export interface StaffService {
  getStaff(id: string): Promise<Staff>;
  createStaff(staff: Partial<Staff>): Promise<Staff>;
  updateStaff(id: string, data: Partial<Staff>): Promise<Staff>;
  deleteStaff(id: string): Promise<boolean>;
  updateStaffStatus(id: string, status: StaffStatus): Promise<Staff>;
  getStaffByAgency(agencyId: string): Promise<Staff[]>;
  getStaffByDepartment(agencyId: string, department: string): Promise<Staff[]>;
  getStaffAvailability(id: string, startDate: Date, endDate: Date): Promise<boolean>;
  getStaffSchedule(staffId: string, startDate: Date, endDate: Date): Promise<Schedule[]>;
  assignShift(staffId: string, startTime: Date, endTime: Date): Promise<boolean>;
  calculateStaffPayroll(agencyId: string, startDate: Date, endDate: Date): Promise<Money>;
  findAvailableStaff(agencyId: string, startDate: Date, endDate: Date, department?: string): Promise<Staff[]>;
  updateWorkingHours(staffId: string, workingHours: WorkingHours): Promise<Staff>;
  // generateStaffPerformanceReport(agencyId: string, startDate: Date, endDate: Date): Promise<any>;
  processLeaveRequest(staffId: string, startDate: Date, endDate: Date, reason: string): Promise<boolean>;
  // getStaffShiftHistory(staffId: string, startDate: Date, endDate: Date): Promise<any[]>;
}
