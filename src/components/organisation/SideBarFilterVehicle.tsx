'use client';

import React, { useState, useEffect } from 'react';
import { VehicleProps, FilterVehicleProps as NewFilterVehicleProps } from '@/types/classes/Vehicle'; // <<<< UPDATED IMPORT PATH
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Assuming shadcn/ui select

interface SidebarVehicleFilterProps {
  vehicles: VehicleProps[];
  onFilter: (filters: NewFilterVehicleProps) => void;
  isPopupOpen?: boolean;
  setIsPopupOpen?: (isOpen: boolean) => void;
}

const SidebarVehicleFilter: React.FC<SidebarVehicleFilterProps> = ({
  vehicles,
  onFilter,
  isPopupOpen, // Used to determine if it's in a popup for layout adjustments
  setIsPopupOpen,
}) => {
  const [tempFilters, setTempFilters] = useState<NewFilterVehicleProps>({
    category: [],
    passenger: null,
    priceRange: [0, 1000000], // Default broad range
  });

  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');

  useEffect(() => {
    if (vehicles.length > 0) {
      const prices = vehicles.map(v => v.pricePerDay).filter(p => typeof p === 'number');
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000000;
      setTempFilters(prev => ({ ...prev, priceRange: [minPrice, maxPrice] }));
      setMinPriceInput(minPrice.toString());
      setMaxPriceInput(maxPrice.toString());
    }
  }, [vehicles]);

  const handleApplyFilters = () => {
    const finalFilters = {
        ...tempFilters,
        priceRange: [
            parseFloat(minPriceInput) || (tempFilters.priceRange ? tempFilters.priceRange[0] : 0),
            parseFloat(maxPriceInput) || (tempFilters.priceRange ? tempFilters.priceRange[1] : 1000000)
        ] as [number, number]
    };
    onFilter(finalFilters);
    if (setIsPopupOpen) setIsPopupOpen(false);
  };

  const handleCategoryChange = (categoryValue: string) => {
    setTempFilters(prev => {
        const currentCategories = prev.category || [];
        const newCategories = currentCategories.includes(categoryValue)
            ? currentCategories.filter(c => c !== categoryValue)
            : [...currentCategories, categoryValue];
        return {...prev, category: newCategories};
    });
  };

  // Constante pour représenter "aucune sélection"
  const ANY_CAPACITY = "any_capacity";
  
  // Ajoutons une fonction pour traiter la valeur du sélecteur de passagers
  const handlePassengerChange = (value: string) => {
    setTempFilters(prev => ({
      ...prev, 
      passenger: value === ANY_CAPACITY ? null : parseInt(value)
    }));
  };

  const uniqueCategories = Array.from(new Set(vehicles.map(v => v.category).filter(Boolean)));
  const uniqueCapacities = Array.from(new Set(vehicles.map(v => v.passenger).filter(p => p != null && p > 0))).sort((a,b) => (a || 0)-(b || 0));

  return (
    <div className={`p-4 rounded-lg shadow-md ${isPopupOpen ? 'bg-white' : 'bg-gray-50 dark:bg-gray-800'}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Filter Vehicles</h3>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</Label>
          <div className="mt-2 space-y-2">
            {uniqueCategories.map(cat => (
              <div key={cat} className="flex items-center">
                <input
                  type="checkbox"
                  id={`cat-${cat}`}
                  value={cat}
                  checked={tempFilters.category?.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <Label htmlFor={`cat-${cat}`} className="ml-2 text-sm text-gray-600 dark:text-gray-400">{cat}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Passenger Capacity Filter */}
        <div>
          <Label htmlFor="passenger-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Passengers</Label>
          <Select
            value={tempFilters.passenger?.toString() ?? ANY_CAPACITY}
            onValueChange={handlePassengerChange}
          >
            <SelectTrigger id="passenger-select" className="w-full mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="Any capacity" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700 dark:text-white">
              <SelectItem value={ANY_CAPACITY}>Any</SelectItem>
              {uniqueCapacities.map(cap => <SelectItem key={cap} value={cap?.toString() || "Hello"}>{cap} Passengers</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price Range (XAF per day)</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
                type="number"
                placeholder="Min"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                // className="w-1/2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <span className="text-gray-500 dark:text-gray-400">-</span>
            <Input
                type="number"
                placeholder="Max"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                // className="w-1/2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
           {/* Basic Slider - can be enhanced with a proper range slider component */}
           {/* For now, using inputs. A library like rc-slider or Material UI Slider could be used. */}
        </div>
      </div>

      <Button onClick={handleApplyFilters} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
        Apply Filters
      </Button>
    </div>
  );
};

export default SidebarVehicleFilter;
