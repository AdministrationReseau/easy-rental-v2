import { Money } from './Money';

export interface Payment {
  id: string;
  bookingId: string;
  amount: Money;
  method: string; // PaymentMethod
  status: string; // PaymentStatus
  transactionId: string;
  processedAt: Date;
}

export interface PaymentService {
  getPayment(id: string): Promise<Payment>;
  createPayment(payment: Partial<Payment>): Promise<Payment>;
  updatePayment(id: string, data: Partial<Payment>): Promise<Payment>;
  deletePayment(id: string): Promise<boolean>;
  processPayment(bookingId: string, amount: Money, method: string): Promise<Payment>;
  refundPayment(paymentId: string): Promise<boolean>;
  verifyPayment(transactionId: string): Promise<boolean>;
  getPaymentsByBooking(bookingId: string): Promise<Payment[]>;
  getPaymentsByClient(clientId: string): Promise<Payment[]>;
  getPaymentsByAgency(agencyId: string, startDate?: Date, endDate?: Date): Promise<Payment[]>;
  // generatePaymentReceipt(paymentId: string): Promise<any>;
  calculateTotalRevenue(agencyId: string, startDate: Date, endDate: Date): Promise<Money>;
}
