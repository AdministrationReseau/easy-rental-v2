'use client';

import React, { useEffect, useState } from 'react';
import { AgencyProps } from '@/types/models/agency';
import { CarProps } from '@/types/models/car';
import { CarCard } from '../cards/CarCard';

const AgencyVehiclesList = ({ agency }: { agency: AgencyProps }) => {
  const [vehicles, setVehicles] = useState<CarProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/data/vehicles.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CarProps[] = await response.json();

        if (Array.isArray(data)) {
          const filtered = data.filter(
            (v) => v.agencyId === agency.id
          );
          setVehicles(filtered);
        } else {
          console.error("Invalid vehicles format:", data);
        }
      } catch (error) {
        console.error("Error loading vehicles:", error);
      }
    };

    fetchVehicles();
  }, [agency.id]);

  // Pagination logic
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);
  const paginatedVehicles = vehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-5 my-6 w-full">
      <div className="flex flex-row flex-wrap gap-4 w-full justify-center">
        {paginatedVehicles.length > 0 ? (
          paginatedVehicles.map((vehicle) => (
            <CarCard
              key={vehicle.id}
              id={vehicle.id}
              agencyId={vehicle.agencyId}
              brand={vehicle.brand || ''}
              model={vehicle.model || ''}
              engine={vehicle.engine || { capacity: 0 }}
              transmission={vehicle.transmission || ''}
              passenger={vehicle.passenger || 0}
              pricePerDay={vehicle.pricePerDay || 0}
              images={vehicle.images || []}
              description={vehicle.description || ''}
              fonctionnalities={vehicle.fonctionnalities || []}
              service_history={vehicle.service_history || []}
              reviews={vehicle.reviews || []}
              favorite={false}
              onLike={(id: number) => console.log(id)}
              onDislike={(id: number) => console.log(id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No vehicles available
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
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AgencyVehiclesList;