// pages/api/subscriptions/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
// Importez ici votre client de base de données (Prisma, MongoDB, etc.)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      organizationId,
      planId,
      transactionId,
      startDate,
      status
    } = req.body;

    if (!organizationId || !planId || !transactionId || !startDate || !status) {
      return res.status(400).json({ error: 'Missing required subscription information' });
    }

    // Calcul de la date de fin en fonction du plan
    const endDate = new Date(startDate);
    // Exemple: si c'est un plan mensuel, ajouter 30 jours
    // Vous pourriez avoir une logique plus complexe basée sur le planId
    endDate.setDate(endDate.getDate() + 30);

    // Enregistrez l'abonnement dans votre base de données
    // Exemple avec Prisma:
    /*
    const subscription = await prisma.subscription.create({
      data: {
        organizationId,
        planId,
        transactionId,
        startDate,
        endDate,
        status
      }
    });
    */

    // Simulation de création d'abonnement réussie
    const subscription = {
      id: `sub-${Date.now()}`,
      organizationId,
      planId,
      transactionId,
      startDate,
      endDate: endDate.toISOString(),
      status
    };
    
    return res.status(201).json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la création de l\'abonnement' 
    });
  }
}