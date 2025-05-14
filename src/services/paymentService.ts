import api from '@/lib/api';
import { Payment } from '@/types/models/payment';

interface PaymentResponse {
    transactionId: string;
    status: string;
    message: string;
    redirectUrl?: string;
    confirmationCode?: string;
}

interface SubscriptionResponse {
    id: string;
    organizationId: string;
    planId: string;
    transactionId: string;
    startDate: string;
    endDate: string;
    status: string;
}

/**
 * Service pour gérer les paiements et abonnements
 */
export class PaymentService {
    /**
     * Formater un numéro de téléphone au format international
     */
    private static formatPhoneNumber(phoneNumber: string): string {
        // Supprimer tous les caractères non numériques
        let formattedNumber = phoneNumber.replace(/\D/g, '');

        // Ajouter l'indicatif du pays si absent
        if (!formattedNumber.startsWith('237')) {
            if (formattedNumber.startsWith('6') || formattedNumber.startsWith('7')) {
                formattedNumber = '237' + formattedNumber;
            }
        }

        // Ajouter le signe '+' au début
        return '+' + formattedNumber;
    }

    /**
     * Traiter un paiement pour un abonnement d'organisation
     */
    static async processPayment(
        planId: string,
        amount: number,
        payerInfo: {
            name: string;
            email: string;
            phoneNumber: string;
        },
        paymentDetails: Payment
    ): Promise<PaymentResponse> {
        try {
            // Créer la requête de paiement au format spécifié
            const requestData = {
                // Informations du payeur
                payer_email: payerInfo.email,
                payer_name: payerInfo.name,
                payer_phone_number: this.formatPhoneNumber(paymentDetails.phoneNumber || payerInfo.phoneNumber),
                payer_reference: `user-${Date.now()}`,
                payer_lang: "french",

                // Informations du service (depuis les variables d'environnement)
                service_description: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_DESC || "test post",
                service_reference: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_REF || "7c85bea3",
                service_name: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_NAME || "test",
                service_quantity: parseInt(process.env.NEXT_PUBLIC_PAYMENT_SERVICE_QUANTITY || "1"),

                // Informations de la transaction
                transaction_amount: amount,
                transaction_currency: process.env.NEXT_PUBLIC_PAYMENT_CURRENCY || "XAF",
                transaction_method: process.env.NEXT_PUBLIC_PAYMENT_METHOD || "MOBILE",
                transaction_reference: ""
            };

            // Envoyer la requête au backend qui communiquera avec le service de paiement
            const response = await api.post<PaymentResponse>('/payments/process', requestData);

            return response.data;
        } catch (error) {
            console.error('Payment processing error:', error);
            throw new Error('Une erreur est survenue lors du traitement du paiement');
        }
    }

    /**
     * Traiter un paiement directement avec l'API de paiement (via notre API backend)
     */
    static async processDirectPayment(paymentData: {
        amount: number;
        payerName: string;
        payerEmail: string;
        payerPhone: string;
        method: 'MOBILE' | 'CARD';
        phoneNumber?: string;
        operatorCode?: string;
        description?: string;
    }): Promise<PaymentResponse> {
        try {
            // Créer la requête de paiement au format spécifié
            const requestData = {
                payer_email: paymentData.payerEmail,
                payer_name: paymentData.payerName,
                payer_phone_number: this.formatPhoneNumber(paymentData.phoneNumber || paymentData.payerPhone),
                payer_reference: `user-${Date.now()}`,
                payer_lang: "french",

                service_description: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_DESC || "test post",
                service_reference: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_REF || "7c85bea3",
                service_name: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_NAME || "test",
                service_quantity: parseInt(process.env.NEXT_PUBLIC_PAYMENT_SERVICE_QUANTITY || "1"),

                transaction_amount: paymentData.amount,
                transaction_currency: process.env.NEXT_PUBLIC_PAYMENT_CURRENCY || "XAF",
                transaction_method: paymentData.method,
                transaction_reference: "",

                // Informations supplémentaires pour paiement mobile
                operator_code: paymentData.operatorCode
            };

            // Envoyer la requête au backend
            const response = await api.post<PaymentResponse>('/payments/direct', requestData);

            return response.data;
        } catch (error) {
            console.error('Direct payment processing error:', error);
            throw new Error('Une erreur est survenue lors du traitement du paiement');
        }
    }

    /**
     * Créer un abonnement pour une organisation
     */
    static async createSubscription(
        organizationId: string,
        planId: string,
        transactionId: string
    ): Promise<SubscriptionResponse> {
        try {
            const response = await api.post<SubscriptionResponse>('/subscriptions', {
                organizationId,
                planId,
                transactionId,
                startDate: new Date().toISOString()
            });

            return response.data;
        } catch (error) {
            console.error('Subscription creation error:', error);
            throw new Error('Une erreur est survenue lors de la création de l\'abonnement');
        }
    }

    /**
     * Vérifier le statut d'un paiement
     */
    static async checkPaymentStatus(transactionId: string): Promise<{ status: string; message: string }> {
        try {
            const response = await api.get<{ status: string; message: string }>(`/payments/${transactionId}/status`);
            return response.data;
        } catch (error) {
            console.error('Payment status check error:', error);
            return { status: 'ERROR', message: 'Erreur lors de la vérification du statut du paiement' };
        }
    }

    /**
     * Obtenir les plans d'abonnement disponibles
     */
    static async getSubscriptionPlans() {
        try {
            const response = await api.get('/subscriptions/plans');
            return response.data;
        } catch (error) {
            console.error('Error fetching subscription plans:', error);
            throw new Error('Impossible de récupérer les plans d\'abonnement');
        }
    }

    /**
     * Obtenir les informations d'abonnement d'une organisation
     */
    static async getOrganizationSubscription(organizationId: string) {
        try {
            const response = await api.get(`/organizations/${organizationId}/subscription`);
            return response.data;
        } catch (error) {
            console.error('Error fetching organization subscription:', error);
            throw new Error('Impossible de récupérer les informations d\'abonnement');
        }
    }
}
