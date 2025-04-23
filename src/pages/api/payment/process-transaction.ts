// pages/api/payment/process-transaction.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Received request:', req.body);
  try {
    const {
      api_key,
      transaction_amount,
      currency,
      description,
      organizationId,
      method,
      phoneNumber,
      operatorCode,
    } = req.body;

    if (!api_key || !transaction_amount || !currency || !method) {
      return res.status(400).json({ error: 'Missing required payment information' });
    }

    if (method === 'mobile' && (!phoneNumber || !operatorCode)) {
      return res.status(400).json({ error: 'Missing required mobile payment information' });
    }

    

    // Appel à l'API de paiement externe pour traiter la transaction
    const response = await fetch(`https://gateway.yowyob.com/payment-service/${api_key}/payin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "transaction_amount": transaction_amount,
          "transaction_currency": "XAF",
          "transaction_method": "MOBILE",
          "transaction_reference": "string",
          "payer_reference": "string",
          "payer_name": organizationId,
          "payer_phone_number": phoneNumber,
          "payer_lang": "string",
          "payer_email": "string",
          "service_reference": "string",
          "service_name": "string",
          "service_description": description,
          "service_quantity": 0
        }
      ),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors du traitement du paiement');
    }

    const data = await response.json();
    
    // Pour le paiement mobile, on peut avoir besoin d'un processus de validation supplémentaire
    if (method === 'mobile' && data.data.status === 'pending_confirmation') {
      return res.status(200).json({
        transactionId: data.data.id,
        status: data.data.status,
        confirmationCode: data.data.confirmation_code,
        // Autres informations pour le processus de confirmation
      });
    }
    
    return res.status(200).json({
      transactionId: data.data.id,
      status: data.data.status,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors du traitement du paiement' 
    });
  }
}