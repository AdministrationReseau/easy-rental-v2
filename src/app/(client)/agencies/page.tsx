'use client';
import SidebarFilterAgency from "@/components/filters/SideBarFilterAgency";
import { useTranslation } from "react-i18next";
import { AgencyProps, FilterAgencyProps } from '@/types/models/agency';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
import AgencyList from "@/components/lists/AgencyList";


export default function Agencies() {
  const { t } = useTranslation('client');
  const router = useRouter();
  
  const [agencies, setAgencies] = useState<AgencyProps[]>([]);
  const [filters, setFilters] = useState<FilterAgencyProps>({
    city: [],
      rating: null,
      type: [],
      status: 'all',
      followers: [0, 100],
  });

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
        } else {
          console.error('Unexpected data format:', data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error('Error loading Agencies:', error);
      });
  }, []);

  const handleFilterChange = (newFilters: FilterAgencyProps) => {
    setFilters(newFilters);
  };

  console.log("Agencies: ", agencies);
  console.log("Filters: ", filters);

  return (
    <div className="flex flex-col p-8  rounded-lg">
        <div className="flex items-center mb-4">
          <CircleArrowLeft onClick={() => router.back()} />
          <h1 className="font-bold text-3xl ml-2 mb-2">{t('agencies.title')}</h1>
        </div>

        <main className="flex flex-row">
        <div className="">
          <SidebarFilterAgency agencies={agencies} onFilter={handleFilterChange} />
        </div>
        <div className='flex justify-center items-center flex-col p-4 w-full'>
          <AgencyList agencies={agencies} filters={filters} />
        </div>

         </main>          
    </div>
  
  );
}

