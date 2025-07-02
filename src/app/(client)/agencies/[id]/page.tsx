'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AgencyProps, FilterAgencyProps } from '@/types/models/agency';
import Link from 'next/link';
import AgencyList from '@/components/lists/AgencyList';
import AgencyDetail from '@/components/details/AgencyDetail';



const AgencyDetails: React.FC = () => {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params?.id[0] : '';
  const [agency, setAgency] = React.useState<AgencyProps | null>(null);
  const [agencies, setAgencies] = useState<AgencyProps[]>([]);
  const [filters] = useState<FilterAgencyProps>({
    city: [],
    rating: null,
    type: [],
    status: 'all',
    followers: [0, 1000],
  });

  console.log("ID: ", id);

  // Chargement des données des véhicules
  useEffect(() => {
    fetch('/data/agencies.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          setAgencies(data);
          const foundAgency = data.find(
            (a: AgencyProps) => a.id.toString() === id
          );
          setAgency(foundAgency || null); // Trouve l'agence correspondant à l'ID
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error loading Agencies:', error);
      });
  }, [id]);

  if (!agency) {
    return <p className='text-center text-text-light dark:text-text-dark'> Cette Agence est introuvable</p>;
  }


  return (
    <div >
      <main className="flex text-text-light dark:text-text- justify-center items-center flex-col p-4">
        
        <div className='flex justify-center items-center flex-col'>
          <AgencyDetail agency={agency} />
       
          <Link href="/vehicles">
          <button className='m-4 p-4 text-white bg-primary dark:bg-primary-700 rounded-lg'>
              See More Vehicles
          </button>
          </Link>
          
          {/* Recommendations Section */}
          <div className="w-full rounded-lg p-6">
            <h4 className="font-bold text-2xl dark:text-text-dark text-center">You would also like</h4>
            <AgencyList agencies={agencies} filters={filters} />
          </div>
          
          <Link href="/agencies">
          <button className='m-4 p-4 text-white bg-primary dark:bg-primary-700 rounded-lg'>
              See More Agencies
          </button>
          </Link>
        </div>
 
      </main>
    </div>
  );
};

export default AgencyDetails;
