// pages/api/payment/generate-api-key.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { applicationId } = req.body;
    
    if (!applicationId) {
      return res.status(400).json({ error: 'Application ID is required' });
    }

    // Appel à l'API de paiement externe pour générer la clé API
    const response = await fetch(`https://gateway.yowyob.com/payment-service/applications/${applicationId}/keys/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la génération de la clé API');
    }

    const data = await response.json();
    
    return res.status(200).json({
      apiKey: data.data.api_Key,
    });
  } catch (error) {
    console.error('Error generating API key:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la génération de la clé API' 
    });
  }
}