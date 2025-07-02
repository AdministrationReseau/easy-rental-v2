// app/booking/page.tsx
"use client";

import { useState } from 'react';
import { User, CreditCard, CheckCircle, Car } from 'lucide-react';

// Composants pour chaque étape (définis dans le même fichier pour la simplicité)
const Step1_BillingInfo = ({ nextStep }: { nextStep: () => void }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Informations de facturation</h2>
    <form className="space-y-4">
      <input type="text" placeholder="Nom complet" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" defaultValue="John Doe (pré-rempli)" />
      <input type="tel" placeholder="Numéro de téléphone" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
      <input type="text" placeholder="Ville de résidence" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
      <button onClick={nextStep} type="button" className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">Suivant</button>
    </form>
  </div>
);

const Step2_Options = ({ nextStep, prevStep, setHasDriver, hasDriver }: { nextStep: () => void, prevStep: () => void, setHasDriver: (h: boolean) => void, hasDriver: boolean }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Options supplémentaires</h2>
    <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
      <label className="flex items-center justify-between cursor-pointer">
        <span className="font-semibold">Ajouter un chauffeur (+150€)</span>
        <input type="checkbox" className="sr-only peer" checked={hasDriver} onChange={(e) => setHasDriver(e.target.checked)} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </div>
    <div className="flex justify-between mt-6">
      <button onClick={prevStep} type="button" className="bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold hover:bg-gray-400">Précédent</button>
      <button onClick={nextStep} type="button" className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">Suivant</button>
    </div>
  </div>
);

const Step3_Payment = ({ nextStep, prevStep }: { nextStep: () => void, prevStep: () => void }) => (
   <div>
    <h2 className="text-2xl font-bold mb-4">Paiement</h2>
     <div className="space-y-4">
        <div className="p-3 border rounded-lg dark:border-gray-600 flex justify-between items-center">
            <span>**** **** **** 4242 (par défaut)</span>
            <button className="text-blue-500 text-sm">Changer</button>
        </div>
        {/* Un vrai formulaire de paiement (ex: Stripe Elements) serait ici */}
        <div className="text-center text-sm text-gray-500 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
            Zone de formulaire de paiement sécurisé.
        </div>
     </div>
    <div className="flex justify-between mt-6">
      <button onClick={prevStep} type="button" className="bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold hover:bg-gray-400">Précédent</button>
      <button onClick={nextStep} type="button" className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">Valider le paiement</button>
    </div>
  </div>
);

const Step4_FinalSummary = ({ prevStep }: { prevStep: () => void }) => (
   <div>
    <h2 className="text-2xl font-bold mb-4">Récapitulatif final</h2>
    <div className="p-4 border rounded-lg dark:border-gray-600 space-y-3">
        <p><strong>Véhicule:</strong> Tesla Model 3</p>
        <p><strong>Dates:</strong> 25/12/2023 - 30/12/2023</p>
        <p><strong>Locataire:</strong> John Doe</p>
        <p><strong>Options:</strong> Avec chauffeur</p>
        <p><strong>Paiement:</strong> Visa **** 4242</p>
        <p className="text-xl font-bold mt-2"><strong>Total:</strong> 600.00€</p>
    </div>
    <div className="mt-6 space-y-3">
        <label className="flex items-center">
            <input type="checkbox" className="mr-2"/> J'accepte les conditions générales de location.
        </label>
        <label className="flex items-center">
            <input type="checkbox" className="mr-2"/> J'ai lu la politique d'annulation.
        </label>
    </div>
    <div className="flex justify-between mt-6">
      <button onClick={prevStep} type="button" className="bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold hover:bg-gray-400">Précédent</button>
      <a href="/booking-process/finish" className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 text-center">Effectuer la location</a>
    </div>
  </div>
);

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [hasDriver, setHasDriver] = useState(true);

  const basePrice = 450; // 5 jours * 90€
  const driverFee = 150;
  const totalPrice = basePrice + (hasDriver ? driverFee : 0);

  const steps = [
    { number: 1, name: "Infos", icon: <User /> },
    { number: 2, name: "Options", icon: <Car /> },
    { number: 3, name: "Paiement", icon: <CreditCard /> },
    { number: 4, name: "Confirmation", icon: <CheckCircle /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
        
        {/* Colonne gauche : Résumé */}
        <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800/50 p-8">
            <h2 className="text-2xl font-bold mb-2">Votre réservation</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Tesla Model 3</p>
            <div className="space-y-2 text-sm">
                <p><strong>Prise en charge:</strong> 25/12/2023</p>
                <p><strong>Retour:</strong> 30/12/2023</p>
            </div>
            <div className="border-t dark:border-gray-700 my-6"></div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Prix de base (5 jours)</span> <span>{basePrice}€</span></div>
                {hasDriver && <div className="flex justify-between"><span>Option chauffeur</span> <span>{driverFee}€</span></div>}
            </div>
             <div className="border-t dark:border-gray-700 my-6"></div>
             <div className="flex justify-between font-bold text-2xl">
                <span>Total à payer</span>
                <span>{totalPrice.toFixed(2)}€</span>
             </div>
        </div>

        {/* Colonne droite : Étapes */}
        <div className="w-full md:w-2/3 p-8">
            {/* Indicateur d'étapes */}
            <div className="flex items-center justify-between mb-8">
                {steps.map((s, index) => (
                    <>
                        <div key={s.number} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                                {s.icon}
                            </div>
                            <p className="text-xs mt-1">{s.name}</p>
                        </div>
                        {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${step > s.number ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>}
                    </>
                ))}
            </div>

            {/* Contenu de l'étape */}
            {step === 1 && <Step1_BillingInfo nextStep={() => setStep(2)} />}
            {step === 2 && <Step2_Options nextStep={() => setStep(3)} prevStep={() => setStep(1)} setHasDriver={setHasDriver} hasDriver={hasDriver} />}
            {step === 3 && <Step3_Payment nextStep={() => setStep(4)} prevStep={() => setStep(2)} />}
            {step === 4 && <Step4_FinalSummary prevStep={() => setStep(3)} />}
        </div>
      </div>
    </div>
  );
}