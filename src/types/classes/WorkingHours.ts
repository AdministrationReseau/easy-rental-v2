import { TimeSlot } from './TimeSlot';

export interface WorkingHours {
  monday?: TimeSlot;
  tuesday?: TimeSlot;
  wednesday?: TimeSlot;
  thursday?: TimeSlot;
  friday?: TimeSlot;
  saturday?: TimeSlot;
  sunday?: TimeSlot;
}

export interface BusinessHours extends WorkingHours {
  holidaySchedule?: Date[];
}

export interface WorkingHoursMethods {
  isWorkingTime(dateTime: Date): boolean;
  getAvailableSlots(date: Date): TimeSlot[];
}
