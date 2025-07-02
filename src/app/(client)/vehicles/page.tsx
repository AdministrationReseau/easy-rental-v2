'use client';
import VehiclesList from "@/components/lists/VehiclesList";
import { useTranslation } from "react-i18next";


export default function ClientVehicules() {
  const { t } = useTranslation('client');
  
  return (
    <div className="px-8">
            <h1 className="text-3xl font-bold mb-4">{t('vehicles.title')}</h1>
            <VehiclesList/>
            {/* <VehicleSearchForm onSearch={handleVehicleSearch} /> */}
            
    </div>
  
  );
}


// import React, { useState } from 'react';
// import { MapPin, Calendar, Clock, Search } from 'lucide-react';

// export const VehicleSearchPage: React.FC = () => {
//   const [searchParams, setSearchParams] = useState({
//     pickupLocation: '',
//     dropoffLocation: '',
//     startDate: '',
//     endDate: '',
//     pickupTime: '',
//     dropoffTime: ''
//   });

//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDateType, setSelectedDateType] = useState<'start' | 'end' | null>(null);
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   // Générer les jours du calendrier
//   const generateCalendarDays = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const startDate = new Date(firstDay);
//     startDate.setDate(startDate.getDate() - firstDay.getDay());
    
//     const days = [];
//     const currentDate = new Date(startDate);
    
//     for (let i = 0; i < 42; i++) {
//       days.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
    
//     return days;
//   };

//   const handleDateSelect = (date: Date) => {
//     const dateString = date.toISOString().split('T')[0];
    
//     if (selectedDateType === 'start') {
//       setSearchParams(prev => ({ ...prev, startDate: dateString }));
//       setSelectedDateType('end');
//     } else if (selectedDateType === 'end') {
//       setSearchParams(prev => ({ ...prev, endDate: dateString }));
//       setShowCalendar(false);
//       setSelectedDateType(null);
//     }
//   };

//   const openCalendar = (type: 'start' | 'end') => {
//     setSelectedDateType(type);
//     setShowCalendar(true);
//   };

//   const handleSearch = () => {
//     console.log('Paramètres de recherche:', searchParams);
//     // Ici on passerait à la page des résultats
//   };

//   const monthNames = [
//     'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
//     'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
//   ];

//   const calendarDays = generateCalendarDays(currentMonth);
//   const today = new Date();
//   const startDateObj = searchParams.startDate ? new Date(searchParams.startDate) : null;
//   const endDateObj = searchParams.endDate ? new Date(searchParams.endDate) : null;

//   return (
//     <div className="min-h-screen bg-gray-50">
   
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Titre */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Rechercher un véhicule
//           </h1>
//           <p className="text-lg text-gray-600">
//             Renseignez vos critères de recherche pour trouver le véhicule parfait
//           </p>
//         </div>

//         {/* Formulaire de recherche */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Lieu de prise en charge */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Lieu de prise en charge
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Entrez une ville ou adresse"
//                   value={searchParams.pickupLocation}
//                   onChange={(e) => setSearchParams(prev => ({ ...prev, pickupLocation: e.target.value }))}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Lieu de dépôt */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Lieu de dépôt
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Entrez une ville ou adresse"
//                   value={searchParams.dropoffLocation}
//                   onChange={(e) => setSearchParams(prev => ({ ...prev, dropoffLocation: e.target.value }))}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Date de début */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Date de début
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Sélectionner la date"
//                   value={searchParams.startDate ? new Date(searchParams.startDate).toLocaleDateString('fr-FR') : ''}
//                   onClick={() => openCalendar('start')}
//                   readOnly
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
//                 />
//               </div>
//             </div>

//             {/* Date de fin */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Date de fin
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Sélectionner la date"
//                   value={searchParams.endDate ? new Date(searchParams.endDate).toLocaleDateString('fr-FR') : ''}
//                   onClick={() => openCalendar('end')}
//                   readOnly
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
//                 />
//               </div>
//             </div>

//             {/* Heure de prise en charge */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Heure de prise en charge
//               </label>
//               <div className="relative">
//                 <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="time"
//                   value={searchParams.pickupTime}
//                   onChange={(e) => setSearchParams(prev => ({ ...prev, pickupTime: e.target.value }))}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Heure de dépôt */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Heure de dépôt
//               </label>
//               <div className="relative">
//                 <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="time"
//                   value={searchParams.dropoffTime}
//                   onChange={(e) => setSearchParams(prev => ({ ...prev, dropoffTime: e.target.value }))}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Bouton de recherche */}
//           <div className="mt-8">
//             <button
//               onClick={handleSearch}
//               className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center text-lg font-semibold"
//             >
//               <Search className="w-5 h-5 mr-2" />
//               Rechercher des véhicules
//             </button>
//           </div>
//         </div>

//         {/* Calendrier popup */}
//         {showCalendar && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {selectedDateType === 'start' ? 'Date de début' : 'Date de fin'}
//                 </h3>
//                 <button
//                   onClick={() => setShowCalendar(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Navigation du calendrier */}
//               <div className="flex justify-between items-center mb-4">
//                 <button
//                   onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
//                   className="p-2 hover:bg-gray-100 rounded"
//                 >
//                   ←
//                 </button>
//                 <h4 className="text-lg font-medium">
//                   {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
//                 </h4>
//                 <button
//                   onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
//                   className="p-2 hover:bg-gray-100 rounded"
//                 >
//                   →
//                 </button>
//               </div>

//               {/* Grille du calendrier */}
//               <div className="grid grid-cols-7 gap-1 mb-2">
//                 {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
//                   <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               <div className="grid grid-cols-7 gap-1">
//                 {calendarDays.map((date, index) => {
//                   const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
//                   const isToday = date.toDateString() === today.toDateString();
//                   const isPast = date < today;
//                   const isSelected = 
//                     (startDateObj && date.toDateString() === startDateObj.toDateString()) ||
//                     (endDateObj && date.toDateString() === endDateObj.toDateString());
//                   const isInRange = startDateObj && endDateObj && date >= startDateObj && date <= endDateObj;

//                   return (
//                     <button
//                       key={index}
//                       onClick={() => !isPast && isCurrentMonth && handleDateSelect(date)}
//                       disabled={isPast || !isCurrentMonth}
//                       className={`
//                         p-2 text-sm rounded hover:bg-blue-100 transition duration-200
//                         ${!isCurrentMonth ? 'text-gray-300' : ''}
//                         ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
//                         ${isToday ? 'bg-blue-100 font-semibold' : ''}
//                         ${isSelected ? 'bg-blue-600 text-white' : ''}
//                         ${isInRange && !isSelected ? 'bg-blue-200' : ''}
//                         ${!isPast && isCurrentMonth && !isSelected ? 'hover:bg-blue-100' : ''}
//                       `}
//                     >
//                       {date.getDate()}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// VehicleSearchForm.tsx
// Un composant React moderne, réutilisable et avec une excellente UX pour la recherche de véhicules.
