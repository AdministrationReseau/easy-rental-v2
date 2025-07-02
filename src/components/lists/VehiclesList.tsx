'use client';
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react';
import { CarCard } from '../cards/CarCard';
import { CarProps } from '@/types/models/car';


const VehiclesList = () => {
    const { t } = useTranslation('client');
    const [vehicles, setVehicles] = useState<CarProps[]>([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedVehicles = vehicles.slice(startIndex, endIndex);
    const totalPages = Math.ceil(vehicles.length / itemsPerPage);

    useEffect(() => {
        const fetchVehicles = async () => {
        try {
            const response = await fetch("/data/vehicles.json");
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: CarProps[] = await response.json();

            if (Array.isArray(data)) {
            setVehicles(data);
            } else {
            console.error("Invalid vehicles format:", data);
            }
        } catch (error) {
            console.error("Error loading vehicles:", error);
        }
        };

        fetchVehicles();
    }, []);


  return (
    <div className="px-2 my-6 w-full">
      {/* Liste des agences */}
      <div className="flex flex-row flex-wrap gap-4 w-full ">
        {paginatedVehicles.length > 0 ? (
          paginatedVehicles.map((vehicle) => (
          <CarCard
              key={vehicle.id}
              {...vehicle}
              favorite={vehicle.favorite || false}
              onLike={() => console.log(vehicle.id)}
              onDislike={() => console.log(vehicle.id)}
            />
            
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {t('vehicles.no_vehicles')}.
          </p>
        )}
      </div>

      {/* Pagination */}
      {vehicles.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            {t('vehicles.pagination.prev')}
          </button>
          <span className="text-gray-600">
            {t('vehicles.pagination.page')} {currentPage} {t('vehicles.pagination.of')} {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            {t('vehicles.pagination.next')}
          </button>
        </div>
      )}
    </div>
  );
};

export default VehiclesList;
