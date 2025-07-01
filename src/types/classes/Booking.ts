import { BookingStatus } from '../enums/BookingStatus';
import { RentalType } from '../enums/RentalType';
import { Address } from './Address';
import { Money } from './Money';
import {Payment} from "@/types/classes/Payment";

export interface Booking {
  id: string;
  clientId: string;
  agencyId: string;
  vehicleId: string;
  driverId?: string; // Optionnel
  startDateTime: Date;
  endDateTime: Date;
  pickupLocation: Address;
  dropoffLocation: Address;
  rentalType: RentalType;
  totalAmount: Money;
  status: BookingStatus;
  specialRequests?: string;
}

export interface BookingMethods {
  confirm(): Promise<void>;
  cancel(reason: string): Promise<void>;
  modify(changes: Partial<Booking>): Promise<Booking>;
  calculateTotal(): Promise<Money>;
  addPayment(amount: Money, method: string): Promise<void>;
  checkAvailability(): Promise<boolean>;
}

export interface BookingService {
  getBooking(id: string): Promise<Booking>;
  createBooking(booking: Partial<Booking>): Promise<Booking>;
  updateBooking(id: string, data: Partial<Booking>): Promise<Booking>;
  deleteBooking(id: string): Promise<boolean>;
  updateBookingStatus(id: string, status: BookingStatus): Promise<Booking>;
  getBookingsByClient(clientId: string): Promise<Booking[]>;
  getBookingsByAgency(agencyId: string, filters?: BookingStatus): Promise<Booking[]>;
  getBookingsByVehicle(vehicleId: string): Promise<Booking[]>;
  getBookingsByDriver(driverId: string): Promise<Booking[]>;
  confirmBooking(id: string): Promise<Booking>;
  cancelBooking(id: string, reason: string): Promise<Booking>;
  processPayment(bookingId: string, payment: Partial<Payment>): Promise<Payment>;
  getBookingPayments(bookingId: string): Promise<Payment[]>;
  checkResourceAvailability(
    agencyId: string,
    vehicleId: string,
    driverId: string | null,
    startDate: Date,
    endDate: Date
  ): Promise<boolean>;
  autoAssignDriver(bookingId: string): Promise<string>; // Retourne l'ID du chauffeur assigné
  calculateBookingCost(
    vehicleId: string,
    driverId: string | null,
    startDate: Date,
    endDate: Date
  ): Promise<number>;
  // getBookingStatistics(
  //   agencyId: string,
  //   startDate: Date,
  //   endDate: Date
  // ): Promise<any>;
  checkBookingConflicts(
    vehicleId: string,
    driverId: string | null,
    startDate: Date,
    endDate: Date,
    excludeBookingId?: string
  ): Promise<boolean>;
  // generateBookingInvoice(bookingId: string): Promise<any>;
  sendBookingNotification(bookingId: string, notificationType: string): Promise<boolean>;
  extendBooking(bookingId: string, newEndDate: Date): Promise<Booking>;
  // processVehicleReturn(bookingId: string, finalMileage: number, condition: string): Promise<any>;
}
