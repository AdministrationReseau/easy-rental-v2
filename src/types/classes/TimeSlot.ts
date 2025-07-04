export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  duration?: number; // Duration in minutes
}

export interface TimeSlotMethods {
  overlaps(other: TimeSlot): boolean;
  getDuration(): number;
}

export type TimeSlotWithMethods = TimeSlot & TimeSlotMethods;
