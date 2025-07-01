import { ResourceStatus } from '../enums/ResourceStatus';
import { ResourceType } from '../enums/ResourceType';

export interface Schedule {
  id: string;
  resourceId: string;
  organizationId: string;
  resourceType: ResourceType;
  bookingId: string;
  startDateTime: Date;
  endDateTime: Date;
  status: ResourceStatus;
  notes: string;
}

export interface ScheduleService {
  getSchedule(id: string): Promise<Schedule>;
  createSchedule(schedule: Partial<Schedule>): Promise<Schedule>;
  updateSchedule(id: string, data: Partial<Schedule>): Promise<Schedule>;
  deleteSchedule(id: string): Promise<boolean>;
  getSchedulesByResource(resourceId: string, resourceType: ResourceType): Promise<Schedule[]>;
  getSchedulesByAgency(agencyId: string, startDate: Date, endDate: Date): Promise<Schedule[]>;
  checkAvailability(resourceId: string, resourceType: ResourceType, startDate: Date, endDate: Date): Promise<boolean>;
  findConflicts(resourceId: string, startDate: Date, endDate: Date, excludeScheduleId?: string): Promise<Schedule[]>;
  blockTimeSlot(resourceId: string, resourceType: ResourceType, startDate: Date, endDate: Date, reason: string): Promise<Schedule>;
}
