// Fichier : /pages/reservation/index.tsx (par exemple)
'use client';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { VehicleSearchForm } from "@/components/filters/searchVehicleForm";
import { CarCard } from "@/components/cards/CarCard";
import type { CarProps } from "@/types/models/car"; 

export default function ReservationStartPage() {
  const { t } = useTranslation('client');

  const [allVehicles, setAllVehicles] = useState<CarProps[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<CarProps[]>([]);
  
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/data/vehicles.json");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: CarProps[] = await response.json();
        setAllVehicles(data);
      } catch (e: any) {
        console.error("Erreur lors du chargement de vehicles.json:", e);
        setError("Impossible de charger les données des véhicules.");
      } finally {
        setIsLoading(false); 
      }
    };
    fetchVehicles();
  }, []); 

  const handleVehicleSearch = (params: { pickupLocation: string; startDate: string; pickupTime: string; dropoffLocation: string; endDate: string; dropoffTime: string; }) => {
    console.log("Recherche lancée depuis le parent avec :", params);
    setIsLoading(true);
    setHasSearched(true);
    setError(null);
    setTimeout(() => {
      try {
        const results = allVehicles.filter(vehicle => {
          if (!params.pickupLocation) {
            return [];
          }
          
          const searchTerm = params.pickupLocation.toLowerCase().trim();
          
          const brandMatch = vehicle.brand?.toLowerCase().includes(searchTerm) ?? false;
          const modelMatch = vehicle.model?.toLowerCase().includes(searchTerm) ?? false;

          return brandMatch || modelMatch;
        });
        
        setFilteredVehicles(results);
      } catch (e) {
        console.error("Erreur lors du filtrage:", e);
        setError("Une erreur est survenue lors du filtrage des véhicules.");
      } finally {
        setIsLoading(false); 
      }
    }, 500);
  };

  if (isLoading && !hasSearched) {
    return <div className="min-h-screen flex items-center justify-center"><p>Chargement des données...</p></div>;
  }
  
  return (
    <div className="min-h-screen container mx-auto p-4 md:p-8">
      {/* Le formulaire de recherche */}
      <section className="mb-12">
        <VehicleSearchForm onSearch={handleVehicleSearch} />
      </section>

      {/* La section des résultats */}
      <section>
        {isLoading && (
          <div className="text-center py-10">
            <p className="text-xl font-semibold animate-pulse">Recherche en cours...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
            <p className="font-bold">Une erreur est survenue :</p>
            <p>{error}</p>
          </div>
        )}
        
        {hasSearched && !isLoading && !error && (
          <VehicleList vehicles={filteredVehicles} />
        )}
      </section>
    </div>
  );
}

interface VehicleListProps {
  vehicles: CarProps[];
}

export const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  const { t } = useTranslation('client');
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          {vehicles.length} {vehicles.length === 1 ? 'résultat trouvé' : 'résultats trouvés'}
        </h2>
      </div>

      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
           <CarCard
              key={vehicle.id}
              {...vehicle} 
              favorite={vehicle.favorite ?? false}
              onLike={() => console.log(`Liked ${vehicle.id}`)}
              onDislike={() => console.log(`Disliked ${vehicle.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('vehicles.no_vehicles')}.</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Veuillez essayer de modifier vos critères.</p>
        </div>
      )}
    </div>
  );
};