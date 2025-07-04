'use client';
import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Search } from 'lucide-react';

// 1. Définir les types pour plus de robustesse (bonne pratique TypeScript)
type SearchParams = {
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string; // Format YYYY-MM-DD
  endDate: string;   // Format YYYY-MM-DD
  pickupTime: string;  // Format HH:MM
  dropoffTime: string; // Format HH:MM
};

type VehicleSearchFormProps = {
  // Le composant communique le résultat de la recherche via cette fonction
  onSearch: (params: SearchParams) => void;
  // Permet de pré-remplir le formulaire si nécessaire
  initialValues?: Partial<SearchParams>;
};

// Le composant principal
export const VehicleSearchForm: React.FC<VehicleSearchFormProps> = ({ onSearch, initialValues }) => {
  
  // 2. Un état centralisé pour tous les champs du formulaire
  const [searchParams, setSearchParams] = useState<SearchParams>({
    pickupLocation: initialValues?.pickupLocation || '',
    dropoffLocation: initialValues?.dropoffLocation || '',
    startDate: initialValues?.startDate || '',
    endDate: initialValues?.endDate || '',
    pickupTime: initialValues?.pickupTime || '10:00', // Valeurs par défaut judicieuses
    dropoffTime: initialValues?.dropoffTime || '10:00',
  });

  // 3. Gestion de l'état du calendrier (tirée du premier composant)
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [calendarMode, setCalendarMode] = useState<'start' | 'end' | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // --- LOGIQUE DU CALENDRIER (optimisée depuis le composant 1) ---

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Commence le calendrier au dimanche précédent le 1er du mois
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    // Génère 6 semaines (42 jours) pour une grille constante
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    
    if (calendarMode === 'start') {
      setSearchParams(prev => ({ 
        ...prev, 
        startDate: dateString,
        // Si la date de fin est antérieure, on la réinitialise
        endDate: prev.endDate && new Date(prev.endDate) < date ? '' : prev.endDate 
      }));
      setCalendarMode('end'); // Passe automatiquement à la sélection de la date de fin
    } else if (calendarMode === 'end') {
      // Interdit de choisir une date de fin antérieure à la date de début
      if (searchParams.startDate && new Date(searchParams.startDate) > date) {
        // Optionnel: afficher une alerte à l'utilisateur
        console.warn("La date de fin ne peut pas être antérieure à la date de début.");
        return;
      }
      setSearchParams(prev => ({ ...prev, endDate: dateString }));
      setCalendarOpen(false); // Ferme le calendrier après la sélection
      setCalendarMode(null);
    }
  };

  const openCalendar = (mode: 'start' | 'end') => {
    setCalendarMode(mode);
    setCalendarOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche lancée avec les paramètres :', searchParams);
    onSearch(searchParams);
  };

  // --- PRÉPARATION DES DONNÉES POUR L'AFFICHAGE ---

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const calendarDays = generateCalendarDays(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore l'heure pour les comparaisons de dates
  const startDateObj = searchParams.startDate ? new Date(searchParams.startDate) : null;
  const endDateObj = searchParams.endDate ? new Date(searchParams.endDate) : null;


  // --- JSX : LE MEILLEUR DES DEUX MONDES ---

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-6 sm:p-8 justify-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Trouvez le véhicule parfait
      </h2>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Section Lieux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lieu de prise en charge
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="pickupLocation"
                value={searchParams.pickupLocation}
                onChange={(e) => setSearchParams(p => ({ ...p, pickupLocation: e.target.value }))}
                placeholder="Ex: Yaoundé, Musée National"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lieu de dépôt (si différent)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="dropoffLocation"
                value={searchParams.dropoffLocation}
                onChange={(e) => setSearchParams(p => ({ ...p, dropoffLocation: e.target.value }))}
                placeholder="Lieu de prise en charge"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Section Dates & Heures (regroupées pour la clarté) */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Date de début */}
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Début</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text" id="startDate" placeholder="Date de début"
                            value={searchParams.startDate ? new Date(searchParams.startDate).toLocaleDateString('fr-FR') : ''}
                            onClick={() => openCalendar('start')} readOnly
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                </div>
                {/* Heure de début */}
                <div>
                    <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heure</label>
                     <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="time" id="pickupTime"
                            value={searchParams.pickupTime}
                            onChange={(e) => setSearchParams(p => ({ ...p, pickupTime: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                </div>
                {/* Date de fin */}
                 <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fin</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text" id="endDate" placeholder="Date de fin"
                            value={searchParams.endDate ? new Date(searchParams.endDate).toLocaleDateString('fr-FR') : ''}
                            onClick={() => openCalendar('end')} readOnly
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                </div>
                {/* Heure de fin */}
                <div>
                    <label htmlFor="dropoffTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heure</label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="time" id="dropoffTime"
                            value={searchParams.dropoffTime}
                            onChange={(e) => setSearchParams(p => ({ ...p, dropoffTime: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Bouton de recherche */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform duration-200 ease-in-out hover:scale-101 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Rechercher un véhicule
          </button>
        </div>
      </form>

      {/* MODAL DU CALENDRIER (tiré du composant 1, avec style amélioré) */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setCalendarOpen(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {calendarMode === 'start' ? 'Sélectionnez la date de début' : 'Sélectionnez la date de fin'}
              </h3>
              <button onClick={() => setCalendarOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            {/* Navigation */}
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 rounded-full hover:bg-gray-100">←</button>
              <h4 className="text-lg font-medium">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h4>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 rounded-full hover:bg-gray-100">→</button>
            </div>
            {/* Grille */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 py-2">
              {['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                const isToday = date.toDateString() === today.toDateString();
                const isPast = date < today;
                const isStartDate = startDateObj && date.getTime() === startDateObj.getTime();
                const isEndDate = endDateObj && date.getTime() === endDateObj.getTime();
                const isInRange = startDateObj && endDateObj && date > startDateObj && date < endDateObj;

                const isDisabled = isPast || !isCurrentMonth;
                
                return (
                  <button key={index}
                    onClick={() => !isDisabled && handleDateSelect(date)}
                    disabled={isDisabled}
                    className={`
                      p-2 text-sm rounded-full w-10 h-10 mx-auto transition-colors duration-200
                      ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-100'}
                      ${isToday && !isStartDate && !isEndDate ? 'font-bold text-blue-600' : ''}
                      ${isInRange ? 'bg-blue-200 text-blue-800 rounded-none' : ''}
                      ${isStartDate ? 'bg-blue-600 text-white' : ''}
                      ${isEndDate ? 'bg-blue-600 text-white' : ''}
                      ${isStartDate && isEndDate ? 'bg-blue-600 text-white' : ''}
                      ${isStartDate && endDateObj ? 'rounded-r-none' : ''}
                      ${isEndDate && startDateObj ? 'rounded-l-none' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};