// pages/subscription.tsx
"use client";
import { useState } from 'react';
import router from 'next/router';
import Head from 'next/head';
import SubscriptionPlan from '@/components/subscription/subscriptionPlan';
// import PaymentForm from '../components/PaymentForm.tsx';
// import LoadingSpinner from '../components/ui/LoadingSpinner.tsx';
import React from 'react';
import PaymentForm from '@/components/payment/PaymentForm';
import { Payment } from '@/types/payment';

// Types pour notre application
type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
};

type Organization = {
  id: string;
  name: string;
  businessActorId: string;
  email: string;
};

const plans: Plan[] = [
  {
    id: 'basic-monthly',
    name: 'Basique',
    price: 49,
    features: ['Accès à 5 utilisateurs', 'Support par email', 'Fonctionnalités de base'],
    billingCycle: 'monthly',
  },
  {
    id: 'pro-monthly',
    name: 'Professionnel',
    price: 99,
    features: ['Accès à 20 utilisateurs', 'Support prioritaire', 'Fonctionnalités avancées', 'API accès'],
    billingCycle: 'monthly',
  },
  {
    id: 'enterprise-monthly',
    name: 'Entreprise',
    price: 199,
    features: ['Utilisateurs illimités', 'Support dédié 24/7', 'Toutes les fonctionnalités', 'Personnalisation avancée'],
    billingCycle: 'monthly',
  },
];

export default function SubscriptionPage() {
//   const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState({
    applicationId: '',
    apiKey: '',
    transactionId: '',
  });

  // Fonction pour gérer la sélection d'un plan
  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentStep(2);
  };

  // Fonction pour gérer la soumission des infos de l'organisation
  const handleOrganizationSubmit = async (orgData: Organization) => {
    setIsLoading(true);
    setError(null);
    setOrganization(orgData);

    try {
      // Étape 1: Création de l'application avec le business actor ID
      const appResponse = await fetch('/api/payment/create-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessActorId: orgData.businessActorId }),
      });

      if (!appResponse.ok) throw new Error('Erreur lors de la création de l\'application');
      const appData = await appResponse.json();
      console.log('Application créée:', appData); // Ligne de débogage
      // Étape 2: Génération de la clé d'API
      const keyResponse = await fetch('/api/payment/generate-api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: appData.applicationId }),
      });

      if (!keyResponse.ok) throw new Error('Erreur lors de la génération de la clé API');
      const keyData = await keyResponse.json();

      setPaymentData({
        applicationId: appData.applicationId,
        apiKey: keyData.apiKey,
        transactionId: '',
      });

      setCurrentStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour traiter le paiement
  const processPayment = async (paymentDetails: Payment) => {
    setIsLoading(true);
    setError(null);

    try {
      // Étape 3: Utilisation de la clé d'API pour effectuer une transaction
      const paymentResponse = await fetch('/api/payment/process-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: paymentData.apiKey,
          amount: selectedPlan?.price,
          currency: 'XAF',
          description: `Abonnement ${selectedPlan?.name} pour ${organization?.name}`,
          organizationId: organization?.id,
          ...paymentDetails
        }),
      });

      if (!paymentResponse.ok) throw new Error('Erreur lors du traitement du paiement');
      const transactionData = await paymentResponse.json();

      setPaymentData(prev => ({ ...prev, transactionId: transactionData.transactionId }));
      setCurrentStep(4); // Confirmation
      
      // Enregistrer l'abonnement dans votre base de données
      await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: organization?.id,
          planId: selectedPlan?.id,
          transactionId: transactionData.transactionId,
          startDate: new Date().toISOString(),
          status: 'active'
        }),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de paiement');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour rediriger vers le tableau de bord après souscription
  const redirectToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Souscription | Votre Plateforme</title>
      </Head>

      <main className="max-w-6xl mx-auto py-12 px-4">
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* <LoadingSpinner /> */}
          </div>
        )}

        <h1 className="text-3xl font-bold text-center mb-8">Souscription à la plateforme</h1>
        
        {/* Indicateur d'étapes */}
        <div className="mb-10">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {['Choisir un plan', 'Informations', 'Paiement', 'Confirmation'].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > idx + 1 ? 'bg-green-500' : currentStep === idx + 1 ? 'bg-blue-600' : 'bg-gray-300'
                  } text-white font-medium`}
                >
                  {currentStep > idx + 1 ? '✓' : idx + 1}
                </div>
                <span className="text-sm mt-2">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Étape 1: Sélection du plan */}
        {currentStep === 1 && (
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <SubscriptionPlan
                key={plan.id}
                plan={plan}
                onSelect={() => handlePlanSelect(plan)}
              />
            ))}
          </div>
        )}

        {/* Étape 2: Informations de l'organisation */}
        {currentStep === 2 && (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Informations de l&apos;organisation</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const orgData = {
              id: formData.get('id') as string,
              name: formData.get('name') as string,
              businessActorId: formData.get('businessActorId') as string,
              email: formData.get('email') as string,
              };
              handleOrganizationSubmit(orgData);
            }}>
              <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nom de l&apos;organisation</label>
              <input
                type="text"
                name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Business Actor ID</label>
                <input
                  type="text"
                  name="businessActorId"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <input type="hidden" name="id" value={`org-${Date.now()}`} />
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Continuer
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Étape 3: Formulaire de paiement */}
        {currentStep === 3 && (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Paiement</h2>
            <div className="mb-6 p-4 bg-gray-100 rounded-md">
              <p className="font-medium">{selectedPlan?.name}</p>
              <p className="text-lg font-bold">{selectedPlan?.price} XAF / {selectedPlan?.billingCycle === 'monthly' ? 'mois' : 'an'}</p>
            </div>
            
             <PaymentForm onSubmit={processPayment} /> 
            
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Retour
              </button>
            </div>
          </div>
        )}

        {/* Étape 4: Confirmation */}
        {currentStep === 4 && (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Paiement réussi !</h2>
            <p className="text-gray-600 mb-6">Votre souscription a été activée avec succès.</p>
            
            <div className="mb-6 text-left">
              <p className="mb-2"><span className="font-medium">Organisation:</span> {organization?.name}</p>
              <p className="mb-2"><span className="font-medium">Plan:</span> {selectedPlan?.name}</p>
              <p className="mb-2"><span className="font-medium">Montant:</span> {selectedPlan?.price} €</p>
              <p className="mb-2"><span className="font-medium">Transaction ID:</span> {paymentData.transactionId}</p>
            </div>
            
            <button
              onClick={redirectToDashboard}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Accéder au tableau de bord
            </button>
          </div>
        )}
      </main>
    </div>
  );
}