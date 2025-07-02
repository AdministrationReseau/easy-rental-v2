'use client';
import { useTranslation } from "react-i18next";
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ReservationConfirmationPage() {
  const { t } = useTranslation('client');
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-lg text-center max-w-2xl">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Votre réservation a été effectuée avec succès !
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Un e-mail de confirmation a été envoyé à votre adresse. Vous y trouverez tous les détails de votre location.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Retour à l'accueil
          </Link>
          <Link href="/rentals/XYZ-12345" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Voir ma réservation
          </Link>
        </div>
      </div>
    </div>
  );
}