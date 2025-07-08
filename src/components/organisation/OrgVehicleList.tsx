'use client';

import React from 'react';
import { VehicleProps } from '@/types/classes/Vehicle'; // <<<< UPDATED IMPORT PATH
import { VehicleCard } from '@/components/vehicle/VehicleCard'; // Assuming VehicleCard is now updated

interface OrgVehicleListProps {
  vehicles: VehicleProps[];
  // Add other props as needed, e.g., onEdit, onDelete for isAdmin context
}

const OrgVehicleListComponent: React.FC<OrgVehicleListProps> = ({ vehicles }) => {
  if (!vehicles || vehicles.length === 0) {
    return <p className="text-center text-gray-500 py-8">No vehicles to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          {...vehicle} // Spread all vehicle props
          isAdmin={true} // Assuming this list is for admin/organisation context
          // TODO: Implement actual onEdit, onDelete, onLike, onDislike handlers
          onEdit={(id) => console.log('Edit vehicle:', id)}
          onDelete={(id) => console.log('Delete vehicle:', id)}
          onLike={(id) => console.log('Like vehicle:', id)}
          onDislike={(id) => console.log('Dislike vehicle:', id)}
        />
      ))}
    </div>
  );
};

export default OrgVehicleListComponent;
