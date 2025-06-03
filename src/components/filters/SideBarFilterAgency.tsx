'use client';

import React, { useEffect, useState } from 'react';
import { AgencyProps, FilterAgencyProps } from '@/types/models/agency';
import { RatingStars } from '../ui/ratingStars';

const SidebarAgencyFilter: React.FC<{ agencies: AgencyProps[]; onFilter: (filters: FilterAgencyProps) => void }> = ({
  agencies,
  onFilter,
}) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>(['all']);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<'open' | 'all'>('all');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [followersRange, setFollowersRange] = useState<number[]>(() => {
    

    if (agencies.length === 0) {
      return [0, 100]; // Défaut si aucune donnée n'est disponible
    }
    return [
      Math.min(...agencies.map((agency) => agency.followers)),
      Math.max(...agencies.map((agency) => agency.followers))
    ];
  });

  const ratingRanges = [
    { stars: 5, min: 4.1, max: 5 },
    { stars: 4, min: 3.1, max: 4 },
    { stars: 3, min: 2.1, max: 3 },
    { stars: 2, min: 1.1, max: 2 },
    { stars: 1, min: 0, max: 1 },
  ];

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCities(value === 'all' ? ['all'] : [value]);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
    console.log("Selected Rate:", rating)
  };

  const handleFollowersRangeChange = (event: Event, newValue: number | number[]) => {
    setFollowersRange(newValue as [number, number]);
    console.log("Selected Followers Ranger Rang:", newValue)
  }
  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    console.log("Selected type:", type)
  };

  const handleStatusChange = () => {
    setStatusFilter(statusFilter === 'all' ? 'open' : 'all');
    console.log("Selected Status:", statusFilter)
  };

  const isAgencyOpen = (agency: AgencyProps) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openingHour, openingMinute] = agency.openingTime.split(':').map(Number);
    const [closingHour, closingMinute] = agency.closingTime.split(':').map(Number);

    const openingTime = openingHour * 60 + openingMinute;
    const closingTime = closingHour * 60 + closingMinute;
    console.log("CurrentTime: ", openingTime, " et ", closingTime, " pour", currentTime);
    return currentTime >= openingTime && currentTime <= closingTime;

  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024); // `lg` breakpoint
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const applyFilters = () => {
    const selectedRanges = selectedRating.map((stars) =>
      ratingRanges.find((range) => range.stars === stars)
    );

    const filteredAgencies = agencies.filter((agency) => {
      const rating = agency.rating || 0;
      const matchesRating =
        selectedRanges.length === 0 ||
        selectedRanges.some((range) => range && rating >= range.min && rating <= range.max);

      const matchesFollowers =
        typeof agency.followers === 'number' &&
        agency.followers >= followersRange[0] &&
        agency.followers <= followersRange[1];

      const matchesCity = selectedCities.length === 1 && selectedCities[0] !== 'all' ? selectedCities.includes(agency.city) : true;

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(agency.type);

      const matchesStatus = statusFilter === 'all' || isAgencyOpen(agency);
      setPopupOpen(false); // Close popup after applying
      return matchesRating && matchesFollowers && matchesCity && matchesType && matchesStatus;
      
    });

    const filters: FilterAgencyProps = {
      city: selectedCities,
      rating: selectedRating.length > 0 ? Math.max(...selectedRating) : null,
      type: selectedTypes,
      status: statusFilter,
      followers: followersRange,
    };

    onFilter(filters);
    console.log('Filtered Agencies:', filteredAgencies);
    console.log('Filters:', filters);
  };

  const clearFilters = () => {
    setSelectedCities(['all']);
    setSelectedRating([]);
    setSelectedTypes([]);
    setStatusFilter('all');
    setFollowersRange([
      Math.min(...agencies.map((agency) => agency.followers)),
      Math.max(...agencies.map((agency) => agency.followers)),
    ]);
    onFilter({
      city: [],
      rating: null,
      type: [],
      status: 'all',
      followers: [0, 100],
    });
    setPopupOpen(false); // Close popup after applying
  };

  return (
    <div className="text-text-light dark:text-text-dark ">
      {isMobileView ? (
        <div>
          <button
            className="fixed bottom-4 right-4  p-3 rounded-full shadow-lg z-50"
            onClick={() => setPopupOpen(true)}
          >
            Filters
          </button>

          {popupOpen && (
            
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
              <div className=" bg-background-light dark:bg-background-dark relative rounded-lg shadow-lg w-[80%] max-h-[90%] overflow-y-auto p-4">
              
              <button
                  className="absolute top-3 right-3 text-gray-600"
                  onClick={() => setPopupOpen(false)}
                >
                  ✕
                </button>
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                {/* Filter Contents */}
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">City</h3>
                  <select
                    value={selectedCities[0]} // Display only the selected city or "all"
                    onChange={(e) => setSelectedCities([e.target.value])}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 text-text-light dark:text-text-dark"
                  >
                    <option value="all">All</option>
                    {Array.from(new Set(agencies.map((agency) => agency.city || 'Unknown'))).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between">
                <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Stars</h3>
            <ul className="space-y-2">
              {ratingRanges.map(({ stars }) => (
                <li key={stars} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedRating.includes(stars)}
                    onChange={() => handleRatingChange(stars)}
                  />
                  <span>
                    <RatingStars stars={stars}  />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Type</h3>
            <ul className="space-y-2">
              {Array.from(new Set(agencies.map((agency) => agency.type))).map((type) => (
                <li key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Status</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={statusFilter === 'open'}
                onChange={handleStatusChange}
              />
              <span>Open Only</span>
            </label>
          </div>
          </div>
          <div className="m-4 w-[80%]">
            <h3 className="text-md font-medium mb-2">Followers</h3>
            <RangeSlider max={followersRange[1]} fonction={handleFollowersRangeChange}/>
            <div className="flex justify-between text-sm">
              <span>Min: {followersRange[0]}</span>
              <span>Max: {followersRange[1]}</span>
            </div>
          </div>

                {/* Add other filter sections (e.g., Stars, Type, Status, Followers) here */}
                <div className="flex gap-2 mt-4">
                  <button
                    className=" bg-primary text-white dark:bg-primary-700  p-2 rounded-lg flex-grow"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 p-2 rounded-lg flex-grow"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
    <div className="flex flex-col h-screen-[90%]  w-[250px] sticky top-0">
      <div className='bg-background-light dark:bg-background-dark rounded-lg shadow-lg flex flex-col p-4 h-[90%]  w-[250px]'>
        <div className=' w-full h-full overflow-y-auto relative'>

          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">City</h3>
            <select
              value={selectedCities[0]} // Display only the selected city or "all"
              onChange={handleCityChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 text-text-light dark:text-text-dark"
            >
              <option value="all">All</option>
              {Array.from(new Set(agencies.map((agency) => agency.city || 'Unknown'))).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 text-text-light dark:text-text-dark ">
            <h3 className="text-md font-medium mb-2">Stars</h3>
            <ul className="space-y-2">
              {ratingRanges.map(({ stars }) => (
                <li key={stars} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedRating.includes(stars)}
                    onChange={() => handleRatingChange(stars)}
                  />
                  <span>
                    <RatingStars stars={stars}  />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Type</h3>
            <ul className="space-y-2">
              {Array.from(new Set(agencies.map((agency) => agency.type))).map((type) => (
                <li key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-medium mb-2">Status</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={statusFilter === 'open'}
                onChange={handleStatusChange}
              />
              <span>Open Only</span>
            </label>
          </div>

          <div className="m-4 w-[80%]">
            <h3 className="text-md font-medium mb-2">Followers</h3>
            <RangeSlider max={followersRange[1]} fonction={handleFollowersRangeChange}/>
            <div className="flex justify-between text-sm">
              <span>Min: {followersRange[0]}</span>
              <span>Max: {followersRange[1]}</span>
            </div>
          </div>

          <div className="flex gap-2 m-4">
            <button className="bg-primary text-white dark:bg-primary-700  p-2 rounded-lg flex-grow" onClick={applyFilters}>
              Apply Filters
            </button>
            <button className="bg-background-whitish dark:bg-gray-500 p-2 rounded-lg flex-grow" onClick={clearFilters}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
    )}
    </div>
  );
};

export default SidebarAgencyFilter;



interface RangeSliderProps {
  max: number;
  fonction: (event: Event, newValue: number | number[]) => void;
}

export const RangeSlider = ({max,fonction}:RangeSliderProps) => {
  const [value, setValue] = useState(max); // valeur par défaut
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    fonction(e.nativeEvent, newValue); // on passe un `Event` natif comme attendu
  };

  return (
    <div className="w-full max-w-md mx-auto py-4">
      <label htmlFor="range" className="block text-sm font-medium text-gray-700 mb-2">
        Valeur sélectionnée : <span className="font-bold">{value}</span>
      </label>
      
      <input
        id="range"
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer range-sm accent-blue-500"
      />
    </div>
  );
};
