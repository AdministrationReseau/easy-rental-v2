'use client';

import React, { useState } from 'react';
import { AgencyCard } from '@/components/cards/AgencyCard';
import { AgencyListProps, AgencyProps } from '@/types/models/agency';

const isAgencyOpen = (agency: AgencyProps) => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openingHour, openingMinute] = agency.openingTime.split(':').map(Number);
  const [closingHour, closingMinute] = agency.closingTime.split(':').map(Number);

  const openingTime = openingHour * 60 + openingMinute;
  const closingTime = closingHour * 60 + closingMinute;

  return currentTime >= openingTime && currentTime <= closingTime;
};

const AgencyList: React.FC<AgencyListProps> = ({ agencies, filters }) => {
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const itemsPerPage = 6; // Nombre d'éléments par page

  const filteredAgencies = agencies.filter((agency) => {
    if (!agency) return false;

    const matchesRating =
      filters.rating === null || (agency.rating && agency.rating >= filters.rating);

    const matchesCity =
      filters.city.length === 1 && filters.city[0] !== 'all' ? filters.city.includes(agency.city) : true;

    const matchesFollowers =
      typeof agency.followers === 'number' &&
      agency.followers >= filters.followers[0] &&
      agency.followers <= filters.followers[1];

    const matchesType = filters.type.length === 0 || filters.type.includes(agency.type);

    const matchesStatus = filters.status === 'all' || isAgencyOpen(agency);

    return matchesRating && matchesFollowers && matchesCity && matchesType && matchesStatus;
  });

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAgencies = filteredAgencies.slice(startIndex, endIndex);
  // const paginatedAgencies = agencies;
  const totalPages = Math.ceil(filteredAgencies.length / itemsPerPage);

  return (
    <div className="px-5 my-6 w-full">
      {/* Liste des agences */}
      <div className="flex flex-row flex-wrap gap-4 w-full justify-center">
        {paginatedAgencies.length > 0 ? (
          paginatedAgencies.map((agency) => (
            <AgencyCard
              key={agency.id}
              id={agency.id}
              city={agency.city}
              quater={agency.quater}
              name={agency.name}
              followers={agency.followers || 4}
              rating={agency.rating || 4}
              slogan={agency.slogan}
              images={agency.images}
              description={agency.description}
              openingTime={agency.openingTime}
              closingTime={agency.closingTime}
              type={agency.type}
              createdAt={agency.createdAt}
              updatedAt={agency.updatedAt}
              reviews={agency.reviews}
              onLike={(id: number) => console.log(id)}
              onDislike={(id: number) => console.log(id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No agencies available matching your filters.
          </p>
        )}
      </div>

      {/* Pagination */}
      {filteredAgencies.length > itemsPerPage && (
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

export default AgencyList;
