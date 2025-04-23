import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { businessActorId } = req.body;

    if (!businessActorId) {
      return res.status(400).json({ error: 'Business Actor ID is required' });
    }

    // Appel à l'API de paiement externe pour créer l'application
    const response = await fetch('https://gateway.yowyob.com/payment-service/applications/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez ici les headers d'authentification si nécessaire
      },
      body: JSON.stringify(
        {
          "name": "string",
          "description": "string",
          "businessactor_id": businessActorId, //"3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "success_url": "http://wuBXbTjxfsJ\\Xr",
          "cancel_url": "https://#3PB%Jg4hGcf8^P5TS#\"1Q3",
          "failed_url": "https://v W/mLz?QZ(;A",
          "callback_url": "http://db7Z:;M*K#=ng;B;=sg)Kf(xs6#\\r6$*7# s-yO&L3s*:Kx}7xF2%RKP"
        }
      ),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de la création de l\'application');
    }

    const data = await response.json();
    
    return res.status(200).json({
      applicationId: data.data.id,

    });
  } catch (error) {
    console.error('Error creating application:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la création de l\'application' 
    });
  }
}