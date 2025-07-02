'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { vehicleService } from '@/services/VehicleServiceImpl'; // Import the service instance
import { VehicleProps } from '@/types/classes/Vehicle'; // <<<< UPDATED IMPORT PATH
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarDays, Car, CreditCard, TrendingUp } from 'lucide-react';

// Assuming these components will be updated or are compatible:
import OrgResourceCalendar from "@/components/organisation/OrgResourceCalendar";
import CarDetailComponent from "@/components/organisation/CarDetail";

// Mock data for vehicle activity - this needs to be replaced or sourced if kept
interface Rental {
  id: number;
  startDate: string;
  endDate: string;
  revenue: number;
  customer: string;
  status: 'completed' | 'ongoing' | 'upcoming';
}

interface VehicleActivityData {
  totalRevenue: number;
  totalTrips: number;
  totalMiles: number;
  monthlyRevenue: { month: string; revenue: number }[];
  recentRentals: Rental[];
}

const sampleVehicleActivity: VehicleActivityData = {
  totalRevenue: 15750,
  totalTrips: 42,
  totalMiles: 3850,
  monthlyRevenue: [
    { month: 'Jan', revenue: 2500 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 2800 },
    { month: 'Apr', revenue: 3200 },
    { month: 'May', revenue: 4250 },
  ],
  recentRentals: [
    { id: 1, startDate: '2024-02-10', endDate: '2024-02-15', revenue: 450, customer: 'John Doe', status: 'completed' },
    { id: 2, startDate: '2024-02-20', endDate: '2024-02-25', revenue: 500, customer: 'Jane Smith', status: 'ongoing' },
  ]
};
// End mock data

export default function AgencyVehicleProfilePage() {
  const [vehicle, setVehicle] = useState<VehicleProps | null>(null);
  const [vehicleActivity, setVehicleActivity] = useState<VehicleActivityData>(sampleVehicleActivity);
  const update = false;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setHasError(true);
      console.error("No vehicle ID found in params");
      return;
    }

    const fetchVehicleDetails = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const fetchedVehicleProps = await vehicleService.getVehicleById(id);
        if (fetchedVehicleProps) {
          // If getVehicleById is already fetching related data and populating VehicleProps fully:
          setVehicle(fetchedVehicleProps);

          // If related data (reviews, agency, schedule) needs to be fetched separately by the page:
          // const vehicleWithDetails = { ...fetchedVehicleProps };
          // vehicleWithDetails.reviews = await vehicleService.getVehicleReviews(id);
          // vehicleWithDetails.agency = await vehicleService.getVehicleAgency(id);
          // vehicleWithDetails.scheduling = await vehicleService.getVehicleSchedule(id);
          // setVehicle(vehicleWithDetails);

          // TODO: Replace sampleVehicleActivity with actual data fetching logic if this tab is kept
          // e.g., const activityData = await vehicleService.getVehicleActivity(id);
          // setVehicleActivity(activityData);

        } else {
          setHasError(true);
          console.error(`Vehicle with ID ${id} not found.`);
        }
      } catch (error) {
        console.error('Error loading vehicle:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (update) setVehicleActivity(sampleVehicleActivity)

    fetchVehicleDetails();
  }, [id, update]);

  if (isLoading) return <div className="p-6 text-center">Loading vehicle details...</div>;
  if (hasError || !vehicle) return <div className="p-6 text-center text-red-500">Error loading vehicle or vehicle not found.</div>;

  return (
    <div className="h-full w-full flex flex-col gap-4 p-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vehicle Profile: {vehicle.brand} {vehicle.model}</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <CarDetailComponent vehicle={vehicle} />
          <OrgResourceCalendar requestedResource={vehicle} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicleActivity.totalRevenue.toLocaleString()} {vehicle.dailyRate.currency}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicleActivity.totalTrips}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Miles</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehicleActivity.totalMiles.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vehicleActivity.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} ${vehicle.dailyRate.currency}`} />
                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicleActivity.recentRentals.map((rental) => (
                  <div key={rental.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{rental.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{rental.revenue.toLocaleString()} {vehicle.dailyRate.currency}</p>
                        <p className={`text-sm ${
                          rental.status === 'completed' ? 'text-green-500' :
                          rental.status === 'ongoing' ? 'text-blue-500' :
                          'text-orange-500'
                        }`}>
                          {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
