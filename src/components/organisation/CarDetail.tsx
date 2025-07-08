'use client';

import React from 'react';
import { VehicleProps } from '@/types/classes/Vehicle'; // <<<< UPDATED IMPORT PATH
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { CheckCircle, XCircle, Settings, Users, CreditCard, Droplet, Zap, Info, ShieldCheck, FileText, UserCircle, Building } from 'lucide-react'; // Added more icons

const DetailItem: React.FC<{ label: string; value?: string | number | boolean | null; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex items-start py-2">
    {icon && <span className="mr-2 text-blue-600">{icon}</span>}
    <span className="text-sm font-medium text-gray-600 w-1/3">{label}:</span>
    <span className="text-sm text-gray-800">
      {typeof value === 'boolean' ? (value ? <CheckCircle className="text-green-500 inline" size={16}/> : <XCircle className="text-red-500 inline" size={16}/>) : (value ?? 'N/A')}
    </span>
  </div>
);

const CarDetailComponent: React.FC<{ vehicle: VehicleProps | null }> = ({ vehicle }) => {
  if (!vehicle) {
    return <p className="text-center text-red-500 py-8">Vehicle details not available.</p>;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">{vehicle.brand} {vehicle.model} ({vehicle.year})</CardTitle>
        <CardDescription className="text-gray-600">{vehicle.category} - VIN: {vehicle.vin || 'N/A'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Image and Basic Info */}
          <div>
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md mb-6">
              <Image
                src={vehicle.images?.[0] || '/images/vehicles/placeholder.png'}
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Basic Information</h3>
            <DetailItem label="Plate Number" value={vehicle.plateNumber} icon={<Info size={16}/>} />
            <DetailItem label="Mileage" value={`${vehicle.mileage?.toLocaleString() || 0} km`} icon={<Settings size={16}/>} />
            <DetailItem label="Price per Day" value={`${vehicle.pricePerDay.toLocaleString()} ${vehicle.dailyRate.currency}`} icon={<CreditCard size={16}/>}/>
            <DetailItem label="Status" value={vehicle.status} icon={vehicle.available ? <CheckCircle size={16} className="text-green-500"/> : <XCircle size={16} className="text-red-500"/>} />
            <DetailItem label="Driver Required" value={vehicle.driverRequired} icon={<UserCircle size={16}/>}/>
            {vehicle.agencyId && <DetailItem label="Agency ID" value={vehicle.agencyId} icon={<Building size={16}/>}/>}

          </div>

          {/* Right Column: Specifications and Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Specifications</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
              <DetailItem label="Transmission" value={vehicle.transmission} icon={<Settings size={16}/>}/>
              <DetailItem label="Passengers" value={vehicle.passenger} icon={<Users size={16}/>}/>
              <DetailItem label="Engine Type" value={vehicle.engine?.type} icon={<Zap size={16}/>}/>
              <DetailItem label="Engine Capacity" value={vehicle.engine?.capacity ? `${vehicle.engine.capacity}L` : 'N/A'} icon={<Droplet size={16}/>}/>
              <DetailItem label="Color" value={vehicle.color} />
              {vehicle.fuelEfficiency && (
                <>
                  <DetailItem label="Fuel (City)" value={vehicle.fuelEfficiency.city} />
                  <DetailItem label="Fuel (Highway)" value={vehicle.fuelEfficiency.highway} />
                </>
              )}
            </div>

            <h3 className="text-lg font-semibold mb-3 text-gray-700">Features (Fonctionnalities)</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {vehicle.fonctionnalities && Object.entries(vehicle.fonctionnalities).map(([key, value]) => (
                <DetailItem key={key} label={key.replace(/_/g, ' ')} value={value} />
              ))}
            </div>

            {vehicle.features && vehicle.features.length > 0 && (
                <>
                    <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-700">Additional Features List</h3>
                    <ul className="list-disc list-inside pl-2 space-y-1 text-sm text-gray-700">
                        {vehicle.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </>
            )}
          </div>
        </div>

        {vehicle.description && (
            <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Description</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">{vehicle.description}</p>
            </div>
        )}

        {/* Documents, Registration, Owner, Service History, Insurance - if they exist */}
        {vehicle.documents && (
            <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Documents</h3>
                <DetailItem label="Reg. Certificate" value={vehicle.documents.registration_certificate} icon={<FileText size={16}/>}/>
                {/* Add other documents */}
            </div>
        )}
         {vehicle.insurance && (
            <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Insurance</h3>
                <DetailItem label="Provider" value={vehicle.insurance.provider} icon={<ShieldCheck size={16}/>}/>
                <DetailItem label="Policy #" value={vehicle.insurance.policy_number}/>
                <DetailItem label="Expiry" value={vehicle.insurance.expiry?.toString()}/>
            </div>
        )}


      </CardContent>
    </Card>
  );
};

export default CarDetailComponent;
