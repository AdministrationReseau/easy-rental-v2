import { Money } from './Money';

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: string;
  description: string;
  cost: Money;
  scheduledDate: Date;
  completedDate?: Date;
  performedBy: string;
  status: string;
  createdAt: Date;
}

export interface MaintenanceRecordMethods {
  schedule(date: Date): Promise<void>;
  complete(completedDate: Date): Promise<void>;
}

export type MaintenanceRecordWithMethods = MaintenanceRecord & MaintenanceRecordMethods;
