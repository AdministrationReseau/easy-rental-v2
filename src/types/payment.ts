export interface Payment {
    method: 'CARD' | 'MOBILE';
    // Pour les paiements par carte
    cardNumber?: string;
    expiryMonth?: string;
    expiryYear?: string;
    cvc?: string;
    cardName?: string;

    // Pour les paiements mobile
    phoneNumber?: string;
    operatorCode?: string;
}

export interface PaymentRequest {
    // Informations de transaction
    transaction_amount: number;
    transaction_currency: string;
    transaction_method: string;
    transaction_reference: string;

    // Informations du payeur
    payer_reference: string;
    payer_name: string;
    payer_phone_number: string;
    payer_lang: string;
    payer_email: string;

    // Informations du service
    service_reference: string;
    service_name: string;
    service_description: string;
    service_quantity: number;

    // Opérateur (pour paiement mobile)
    operator_code?: string;
}

export interface PaymentResponse {
    id: string;
    status: PaymentStatus;
    message: string;
    transaction_id: string;
    created_at: string;
    updated_at: string;
    confirmation_code?: string;
    redirect_url?: string;
    amount: number;
    currency: string;
}

export type PaymentStatus =
    'PENDING' |
    'PROCESSING' |
    'COMPLETED' |
    'FAILED' |
    'CANCELLED' |
    'REFUNDED' |
    'PENDING_CONFIRMATION';

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    features: string[];
    billingCycle: 'monthly' | 'yearly';
    description?: string;
    isPopular?: boolean;
    discount?: number;
}

export interface Subscription {
    id: string;
    organizationId: string;
    planId: string;
    status: 'active' | 'inactive' | 'cancelled' | 'pending';
    startDate: string;
    endDate: string;
    transactionId: string;
    renewalDate?: string;
    cancelledAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentMethod {
    id: string;
    userId: string;
    type: 'CARD' | 'MOBILE';
    isDefault: boolean;
    // Carte
    cardLast4?: string;
    cardBrand?: string;
    cardExpMonth?: string;
    cardExpYear?: string;
    cardholderName?: string;
    // Mobile
    phoneNumber?: string;
    operatorName?: string;
    createdAt: string;
}

export interface PaymentHistory {
    id: string;
    userId: string;
    organizationId?: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    method: 'CARD' | 'MOBILE';
    transactionId: string;
    description: string;
    metadata?: Record<string, string>;
    createdAt: string;
}
