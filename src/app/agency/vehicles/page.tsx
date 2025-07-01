'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { vehicleService } from '@/services/VehicleServiceImpl'; // Import the service instance
import { VehicleProps, FilterVehicleProps as NewFilterVehicleProps } from '@/types/classes/Vehicle'; // <<<< UPDATED IMPORT PATH

import OrgVehicleListComponent from '@/components/organisation/OrgVehicleList';
import SidebarVehicleFilter from '@/components/organisation/SideBarFilterVehicle'; // Use the actual component

import { Filter, X } from 'lucide-react';

export default function AgencyVehiclesPage() {
  const [allVehicles, setAllVehicles] = useState<VehicleProps[]>([]);
  const [filteredVehiclesList, setFilteredVehiclesList] = useState<VehicleProps[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentFilters, setCurrentFilters] = useState<NewFilterVehicleProps>({
    category: [],
    passenger: null,
    priceRange: [0, Infinity],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const fetchAndSetVehicles = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedVehicles = await vehicleService.getAllVehicles();
      setAllVehicles(fetchedVehicles);
      setFilteredVehiclesList(fetchedVehicles);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetVehicles();
  }, [fetchAndSetVehicles]);

  const applyFiltersToVehicleList = useCallback((filtersToApply: NewFilterVehicleProps) => {
    let currentVehicles = [...allVehicles];

    if (filtersToApply.category && filtersToApply.category.length > 0) {
      currentVehicles = currentVehicles.filter(vehicle =>
        filtersToApply.category!.includes(vehicle.category)
      );
    }
    if (filtersToApply.passenger !== null && filtersToApply.passenger !== undefined) {
      currentVehicles = currentVehicles.filter(vehicle =>
        vehicle.passenger != null && vehicle.passenger >= filtersToApply.passenger!
      );
    }
    if (filtersToApply.priceRange) {
      currentVehicles = currentVehicles.filter(vehicle =>
        vehicle.pricePerDay >= filtersToApply.priceRange![0] && vehicle.pricePerDay <= filtersToApply.priceRange![1]
      );
    }
    setFilteredVehiclesList(currentVehicles);
  }, [allVehicles]);

  const handleFilterChange = useCallback((newFilters: NewFilterVehicleProps) => {
    setCurrentFilters(newFilters);
    applyFiltersToVehicleList(newFilters);
  }, [applyFiltersToVehicleList]);


  // --- Statistics Calculations ---
  const totalVehicles = allVehicles.length;

  const averagePrice = totalVehicles > 0
    ? (allVehicles.reduce((sum, vehicle) => sum + vehicle.pricePerDay, 0) / totalVehicles).toFixed(2)
    : 'N/A';

  const vehiclesByCategory = allVehicles.reduce((acc, vehicle) => {
    acc[vehicle.category] = (acc[vehicle.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let mostCommonCategory = 'N/A';
  let maxCount = 0;
  if (totalVehicles > 0) {
    Object.entries(vehiclesByCategory).forEach(([category, count]) => {
      if (count > maxCount) {
        mostCommonCategory = category;
        maxCount = count;
      }
    });
  }

  const priceRanges = [
    { range: '0 - 20000', min: 0, max: 20000 },
    { range: '20001 - 40000', min: 20001, max: 40000 },
    { range: '40001 - 60000', min: 40001, max: 60000 },
    { range: '60001+', min: 60001, max: Infinity }
  ];

  const priceDistribution = priceRanges.map(range => ({
    range: range.range,
    count: allVehicles.filter(v => v.pricePerDay >= range.min && v.pricePerDay <= range.max).length
  }));
  // --- End Statistics Calculations ---

  if (isLoading) {
    return <div className="p-6 text-center text-gray-700">Loading vehicles...</div>;
  }

  return (
    <div className='h-full w-full p-4 flex flex-col gap-4 bg-gray-100'>
      <div className='w-full bg-white rounded-xl shadow-lg p-6'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900'>Agency Vehicles</h1>
            <p className='text-slate-600 text-sm mt-1'>
              Managing <span className='font-semibold text-blue-700'>{totalVehicles} vehicles</span>
            </p>
          </div>
          {/* TODO: Add "Add Vehicle" button here, linking to a creation modal/page */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors">
            + Add Vehicle
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-lg">
        <div className="grid grid-cols-2 border-b border-gray-200">
          <button
            className={`py-3 font-medium transition-colors text-center ${
              activeTab === 'general'
                ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`py-3 font-medium transition-colors text-center ${
              activeTab === 'statistics'
                ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </button>
        </div>

        {activeTab === 'general' && (
          <div className="p-6">
            <div className='hidden md:block mb-6'>
              <SidebarVehicleFilter // Use the actual imported component
                vehicles={allVehicles}
                onFilter={handleFilterChange}
              />
            </div>
            <OrgVehicleListComponent
              vehicles={filteredVehiclesList}
            />
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Total Vehicles" value={totalVehicles.toString()} />
              <StatCard title="Average Price" value={`${averagePrice} XAF`} subtitle="Per day rental fee" />
              <StatCard title="Most Common Category" value={mostCommonCategory} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Vehicles by Category">
                <div className="space-y-3">
                  {Object.entries(vehiclesByCategory).map(([category, count]) => (
                    <BarRow key={category} label={category} value={count} maxValue={totalVehicles} />
                  ))}
                </div>
              </ChartCard>

              <ChartCard title="Price Distribution (XAF)">
                <div className="space-y-4">
                  {priceDistribution.map((item) => (
                    <div key={item.range}>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>{item.range} XAF</span>
                        <span>{item.count} vehicles</span>
                      </div>
                      <BarRow label="" value={item.count} maxValue={totalVehicles} hideLabel={true} />
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </div>
        )}
      </div>

      <button
        className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-xl flex items-center space-x-2 z-20 hover:bg-blue-700 transition-transform active:scale-95"
        onClick={() => setIsMobileFilterOpen(true)}
      >
        <Filter className="h-5 w-5" />
        <span className="text-sm">Filters</span>
      </button>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center p-4 md:hidden">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-slate-800">Filter Vehicles</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-slate-500 hover:text-slate-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <SidebarVehicleFilter
                vehicles={allVehicles}
                onFilter={handleFilterChange}
                isPopupOpen={isMobileFilterOpen}
                setIsPopupOpen={setIsMobileFilterOpen}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper components for statistics display
const StatCard: React.FC<{ title: string; value: string; subtitle?: string }> = ({ title, value, subtitle }) => (
  <div className="bg-slate-50 rounded-xl p-5 shadow-sm">
    <p className="text-sm text-slate-500">{title}</p>
    <h4 className="text-3xl font-bold text-slate-800 mt-1">{value}</h4>
    {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-50 rounded-xl p-5 shadow-sm">
    <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
    <div className="min-h-[18rem] flex flex-col justify-center">{children}</div>
  </div>
);

const BarRow: React.FC<{ label: string; value: number; maxValue: number; hideLabel?: boolean }> = ({ label, value, maxValue, hideLabel }) => (
  <div className="flex items-center">
    {!hideLabel && <div className="w-1/3 text-sm text-slate-600 truncate pr-2">{label}</div>}
    <div className={`flex-1 h-6 bg-slate-200 rounded-md overflow-hidden ${hideLabel ? 'w-full' : 'w-2/3'}`}>
      <div
        className="h-full bg-blue-500 rounded-md transition-all duration-300 ease-out"
        style={{ width: maxValue > 0 ? `${(value / maxValue) * 100}%` : '0%' }}
      />
    </div>
    {!hideLabel && <div className="w-12 text-right text-sm font-medium text-slate-800 pl-2">{value}</div>}
  </div>
);
