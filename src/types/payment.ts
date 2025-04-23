
export interface Payment {
    method: string;
    cardNumber?: string;
    expiryMonth?: string;
    expiryYear?: string;
    cvc?: string;
    cardName?: string;
    transactionAmount?: number;
    transactionCurrency?: string;
    phoneNumber?: string;
    operatorCode?: string;
}