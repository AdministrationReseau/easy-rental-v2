'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Car, User, Luggage, GitBranch, Gauge, Star, FileText, ShieldCheck, Layers, GlassWater, BedDouble, Speaker, Usb, Bluetooth, Snowflake, LocateIcon, Sofa } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CarProps } from '@/types/models/car';

const  VehicleDetails = () => {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params?.id[0] : '';

    const [vehicle, setVehicle] = useState<CarProps | null>(null);
   
  
    console.log("ID: ", id);

  // Chargement des données de l'agence
    useEffect(() => {
   fetch('/data/vehicles.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && Array.isArray(data)) {
            
            const foundAgency = data.find(
              (v: CarProps) => v.id.toString() === id
            );
            setVehicle(foundAgency); // Trouve l'agence correspondant à l'ID
          } else {
            console.error('Unexpected data format:', data);
          }
        })
        .catch((error) => {
          console.error('Error loading Vehicles:', error);
        });
    }, [id]);

  return (
    <div className=" min-h-screen">
      { vehicle? (
        <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Colonne gauche : Images */}
            <div className="lg:col-span-3">
              {/* <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
                <Image src={vehicle.images[0]} alt="image principale" layout="fill" objectFit="cover" />
              </div> */}
              {/* <div className="grid grid-cols-3 gap-4"> */}
                {/* {vehicle.images.slice(1).map((img, index) => (
                  <div key={index} className="relative h-24 w-full rounded-md overflow-hidden">
                    <Image src={img} alt={`vehicule - vue ${index+2}`} layout="fill" objectFit="cover" />
                  </div>
                ))} */}

                {vehicle.images && vehicle.images.length > 0 ? (
                <>
                  <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4 shadow-md">
                    <Image src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} layout="fill" objectFit="cover" priority />
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {vehicle.images.slice(1, 5).map((img, index) => (
                      <div key={index} className="relative h-24 w-full rounded-md overflow-hidden bg-gray-900">
                        <Image src={img} alt={`${vehicle.brand} ${vehicle.model} - vue ${index + 2}`} layout="fill" objectFit="cover" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-96 w-full rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <p>Aucune image disponible</p>
                </div>
              )}
              {/* </div> */}
            </div>

            {/* Colonne droite : Informations */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{vehicle.brand} {vehicle.model}</h1>
              <div className="flex items-center gap-4 my-3 text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500" size={20} />
                  <span className="font-bold">{vehicle.rating}</span>
                  <span>({vehicle.reviews?.length} avis)</span>
                </div>
                <span>•</span>
                <span>Loué chez {vehicle.owner?.name ?? 'Propriétaire non spécifié'}</span>
              </div>

              <div className="my-6">
                <Link href="/booking-process" className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors">
                  Louer maintenant - {vehicle.pricePerDay} FCFA/jour
                </Link>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{vehicle.description}</p>

              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-2xl font-bold mb-4">Caractéristiques</h2>
                {/* <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                  <span className="flex items-center gap-2"><User size={18} /> {vehicle.fonctionnalities.seat_belt}</span>
                  <span className="flex items-center gap-2"><Luggage size={18} /> {vehicle.fonctionnalities.luggage}</span>
                  <span className="flex items-center gap-2"><GitBranch size={18} /> {vehicle.fonctionnalities.gps}</span>
                  <span className="flex items-center gap-2"><Gauge size={18} /> {vehicle.fonctionnalities.onboard_computer}</span>
                
                </div> */}
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5">
                  
                  {/* {vehicle.fonctionnalities.air_condition && (
                    <span className="flex items-center gap-3">
                      <Snowflake size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Air Conditionné</span>
                    </span>
                  )}
                  
                  {vehicle.fonctionnalities.gps && (
                    <span className="flex items-center gap-3">
                      <LocateIcon size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">GPS</span>
                    </span>
                  )}
                  
                  {vehicle.fonctionnalities.bluetooth && (
                    <span className="flex items-center gap-3">
                      <Bluetooth size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Bluetooth</span>
                    </span>
                  )}

                  {vehicle.fonctionnalities.usb_input && (
                    <span className="flex items-center gap-3">
                      <Usb size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Entrée USB</span>
                    </span>
                  )}

                  {vehicle.fonctionnalities.onboard_computer && (
                    <span className="flex items-center gap-3">
                      <Gauge size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Ordinateur de bord</span>
                    </span>
                  )}

                  {vehicle.fonctionnalities.seat_belt && (
                    <span className="flex items-center gap-3">
                      <ShieldCheck size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Ceintures de sécurité</span>
                    </span>
                  )}

                  {vehicle.fonctionnalities.audio_input && (
                    <span className="flex items-center gap-3">
                      <Speaker size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Entrée Audio</span>
                    </span>
                  )}

                  {vehicle.fonctionnalities.child_seat && (
                    <span className="flex items-center gap-3">
                      <Sofa size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Siège Enfant (ISOFIX)</span>
                    </span>
                  )}

                  {vehicle.fonctionnalities.sleeping_bed && (
                    <span className="flex items-center gap-3">
                      <BedDouble size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Espace Couchage</span>
                    </span>
                  )}

                  {vehicle.fonctionnalities.luggage && (
                    <span className="flex items-center gap-3">
                      <Luggage size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Espace Bagages</span>
                    </span>
                  )}

                  {vehicle.fonctionnalities.water && (
                    <span className="flex items-center gap-3">
                      <GlassWater size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Point d'eau</span>
                    </span>
                  )}
                  
                  {vehicle.fonctionnalities.additional_covers && (
                    <span className="flex items-center gap-3">
                      <Layers size={20} className="text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Housses additionnelles</span>
                    </span>
                  )}
                   */}
                </div>
             
              </div>
            </div>
          </div>

          {/* Sections supplémentaires */}
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Documents */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Documents du véhicule</h2>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FileText className="text-blue-500" />
                    <span>Carte Grise (consultable)</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    <ShieldCheck className="text-green-500" />
                    <span>Certificat d'assurance (consultable)</span>
                  </a>
                </div>
              </div>
              
              {/* Avis */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Avis des locataires</h2>
                <div className="space-y-6">
                  {vehicle.reviews.map((review, i) => (
                    <div key={i}>
                      <div className="flex items-center mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, starIndex) => <Star key={starIndex} size={16} className={starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'} />)}
                        </div>
                        <p className="ml-2 font-bold">{review.reviewer}</p>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Bouton "Rent Now" en bas de page */}
          <div id="rent-section" className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <h2 className="text-3xl font-bold">Prêt à prendre la route ?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 my-4">Réservez la {vehicle.brand} {vehicle.model} dès aujourd'hui.</p>
            <Link href="/booking-process" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition-colors">
              Louer maintenant
            </Link>
          </div>
        </div>
      </div>
    ):(
      <div>
        <p className='text-center text-text-light dark:text-text-dark'> Ce véhicule est introuvable</p>
      </div>
    )}
    </div>
  );
};

export default VehicleDetails;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { User, GitBranch, Gauge, Star, FileText, ShieldCheck } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import type { CarProps } from '@/types/models/car'; // Assurez-vous que ce type est correct et importé

// const VehicleDetails = () => {
//   const params = useParams();
//   const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params?.id[0] : '';

//   const [vehicle, setVehicle] = useState<CarProps | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // --- EFFET DE CHARGEMENT ET DE RECHERCHE ---
//   useEffect(() => {
//     if (!id) {
//       setError("Aucun identifiant de véhicule fourni.");
//       return;
//     }

//     const fetchAndFindVehicle = async () => {
//       setError(null);
//       setVehicle(null);

//       try {
//         const response = await fetch("/data/vehicles.json");
//         if (!response.ok) {
//           throw new Error(`Erreur HTTP: ${response.status}`);
//         }
        
//         const allVehicles: CarProps[] = await response.json();
        
//         // CORRECTION CLÉ : Chercher directement dans les données fraîchement récupérées ("allVehicles")
//         const foundVehicle = allVehicles.find(v => v.id === id);
        
//         if (foundVehicle) {
//           setVehicle(foundVehicle);
//         } else {
//           setError(`Le véhicule avec l'identifiant "${id}" est introuvable.`);
//         }
//       } catch (e: any) {
//         console.error("Erreur lors de la récupération du véhicule:", e);
//         setError("Impossible de charger les informations du véhicule.");
//       } 
//     };

//     fetchAndFindVehicle();
//   }, [id]);

//   if (error || !vehicle) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center p-4">
//         <div>
//           <h2 className="text-2xl font-bold text-red-500">Véhicule Introuvable</h2>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">{error || "Le véhicule que vous cherchez n'existe pas ou n'est plus disponible."}</p>
//           <Link href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
//             Retour à l'accueil
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // --- AFFICHAGE PRINCIPAL (quand le véhicule est trouvé) ---
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//       <div className="container mx-auto px-4 py-12">
//         <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-5">
            
//             {/* Colonne gauche : Images */}
//             <div className="lg:col-span-3 p-4">
//               {vehicle.images && vehicle.images.length > 0 ? (
//                 <>
//                   <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4 shadow-md">
//                     <Image src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} layout="fill" objectFit="cover" priority />
//                   </div>
//                   <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//                     {vehicle.images.slice(1, 5).map((img, index) => (
//                       <div key={index} className="relative h-24 w-full rounded-md overflow-hidden">
//                         <Image src={img} alt={`${vehicle.brand} ${vehicle.model} - vue ${index + 2}`} layout="fill" objectFit="cover" />
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <div className="h-96 w-full rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                   <p>Aucune image disponible</p>
//                 </div>
//               )}
//             </div>

//             {/* Colonne droite : Informations */}
//             <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800 p-6 md:p-8 flex flex-col">
//               <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white">{vehicle.brand} {vehicle.model}</h1>
//               <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">{vehicle.year} - {vehicle.type}</p>
              
//               {vehicle.reviews && vehicle.reviews.length > 0 && (
//                 <div className="flex items-center gap-2 my-4 text-gray-600 dark:text-gray-300">
//                   <Star className="text-yellow-500 fill-current" size={20} />
//                   <span className="font-bold">{(vehicle.reviews.reduce((acc, r) => acc + r.rating, 0) / vehicle.reviews.length).toFixed(1)}</span>
//                   <span>({vehicle.reviews.length} avis)</span>
//                 </div>
//               )}

//               <p className="text-gray-700 dark:text-gray-300 leading-relaxed my-4">{vehicle.description}</p>

//               <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
//                 <h2 className="text-2xl font-bold mb-4">Caractéristiques</h2>
//                 <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-gray-700 dark:text-gray-300">
//                   {/* Utilisation des champs de CarProps */}
//                   <span className="flex items-center gap-2"><User size={18} /> {vehicle.passenger} passagers</span>
//                   <span className="flex items-center gap-2"><GitBranch size={18} /> {vehicle.transmission}</span>
//                   <span className="flex items-center gap-2"><Gauge size={18} /> {vehicle.engine?.type || 'N/A'}</span>
//                 </div>
//               </div>

//               <div className="mt-auto pt-6">
//                 <Link 
//                   href={`/reservation/process?vehicleId=${vehicle.id}`} 
//                   className="w-full text-center block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors"
//                 >
//                   Louer pour {vehicle.pricePerDay}€/jour
//                 </Link>
//               </div>
//             </div>
//           </div>
          
//           {/* Section Avis (si existants) */}
//           {vehicle.reviews && vehicle.reviews.length > 0 && (
//             <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
//               <h2 className="text-2xl font-bold mb-6">Ce que les locataires en disent</h2>
//               <div className="space-y-6 max-h-96 overflow-y-auto">
//                 {vehicle.reviews.map((review, i) => (
//                   <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
//                     <div className="flex items-center mb-2">
//                       <div className="flex">
//                         {[...Array(5)].map((_, starIndex) => <Star key={starIndex} size={16} className={`fill-current ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} />)}
//                       </div>
//                       <p className="ml-3 font-bold text-gray-800 dark:text-white">{review.reviewer}</p>
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-400 italic">"{review.comment}"</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleDetails;