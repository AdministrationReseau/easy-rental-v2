'use client';
import { Download, FileText, XCircle } from 'lucide-react';
import Image from 'next/image';

// Simulation des données de réservation
const bookingDetails = {
    id: "XYZ-12345",
    vehicleName: "Tesla Model 3",
    vehicleImage: "/images/tesla-model3.png",
    pickupDate: "25 Décembre 2023, 10:00",
    dropoffDate: "30 Décembre 2023, 18:00",
    location: "Aéroport de Paris-CDG",
    totalPrice: "600.00€",
    status: "Confirmée",
    cancellationCost: "150.00€"
};

export default function BookingDetailPage({ params }: { params: { bookingId: string } }) {
  // Utilisez params.bookingId pour fetcher les données de la réservation
  const booking = bookingDetails;
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Détails de la réservation</h1>
              <p className="text-gray-500 dark:text-gray-400">Référence : {booking.id}</p>
            </div>
            <span className="mt-2 sm:mt-0 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-sm font-semibold rounded-full">{booking.status}</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Image src={booking.vehicleImage} alt={booking.vehicleName} width={400} height={300} className="rounded-lg object-cover" />
            </div>
            <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{booking.vehicleName}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                    <div><strong>Prise en charge:</strong><br/>{booking.pickupDate}</div>
                    <div><strong>Retour:</strong><br/>{booking.dropoffDate}</div>
                    <div><strong>Lieu:</strong><br/>{booking.location}</div>
                    <div><strong>Montant payé:</strong><br/><span className="font-bold text-xl">{booking.totalPrice}</span></div>
                </div>
            </div>
          </div>
          
          <div className="border-t dark:border-gray-700 mt-8 pt-8">
            <h3 className="text-xl font-bold mb-4">Documents</h3>
            <div className="space-y-3">
                 <button className="w-full text-left flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/50 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900">
                    <Download className="text-blue-500" />
                    <span>Télécharger le document de réservation (PDF)</span>
                 </button>
                 <a href="/vehicle/3" className="w-full text-left flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FileText />
                    <span>Consulter les documents du véhicule</span>
                 </a>
            </div>
          </div>

          <div className="border-t dark:border-gray-700 mt-8 pt-8 text-center">
             <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Zone de danger</h3>
             <p className="text-gray-600 dark:text-gray-300 my-2">L'annulation de cette réservation entraînera des frais.</p>
             <button className="mt-2 bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto">
                <XCircle />
                Annuler la réservation (Coût: {booking.cancellationCost})
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}