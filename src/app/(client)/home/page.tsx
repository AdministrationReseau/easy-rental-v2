'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ClientNavbar from '@/components/navbar/ClientNavbar';
import LoadingSpinner from '@/components/ui/loadingSpinner';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaStar } from 'react-icons/fa';
import Image from "next/image";

const ClientHome = () => {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();
    const { t } = useTranslation('client');

    useEffect(() => {
        // Redirect if not authenticated or not client
        if (!isLoading && (!isAuthenticated || user?.role !== 'user')) {
            router.push('/signin');
        }
    }, [isAuthenticated, isLoading, user, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark">
                <LoadingSpinner size="lg" showText={true} fullScreen={false} />
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== 'user') {
        return null; // Will redirect in useEffect
    }

    const featuredVehicles = [
        {
            id: 1,
            name: 'Toyota Corolla',
            image: '/images/vehicles/corolla.jpg',
            price: 25000,
            rating: 4.8,
            location: 'Yaoundé',
            available: true
        },
        {
            id: 2,
            name: 'Honda Civic',
            image: '/images/vehicles/civic.jpg',
            price: 30000,
            rating: 4.9,
            location: 'Douala',
            available: true
        },
        {
            id: 3,
            name: 'Mercedes E-Class',
            image: '/images/vehicles/mercedes.jpg',
            price: 85000,
            rating: 4.7,
            location: 'Yaoundé',
            available: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
            <ClientNavbar />

            <main className="pt-[80px]">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl font-bold mb-4">
                                {t('home.hero.title', { name: user?.name?.split(' ')[0] || 'Client' })}
                            </h1>
                            <p className="text-xl text-primary-100 mb-8">
                                {t('home.hero.subtitle')}
                            </p>

                            {/* Quick Search Box */}
                            <div className="bg-white rounded-lg p-6 text-gray-900 shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('home.search.location')}
                                        </label>
                                        <select className="w-full p-3 border border-gray-300 rounded-md">
                                            <option>{t('home.search.all_locations')}</option>
                                            <option>Yaoundé</option>
                                            <option>Douala</option>
                                            <option>Bamenda</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('home.search.pickup_date')}
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('home.search.return_date')}
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <Link href="/client/vehicles">
                                            <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3">
                                                {t('home.search.search_button')}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Vehicles */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-text-dark mb-2">
                                {t('home.featured.title')}
                            </h2>
                            <p className="text-gray-600 dark:text-text-dark/70">
                                {t('home.featured.subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredVehicles.map((vehicle) => (
                                <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-text-dark">
                                                {vehicle.name}
                                            </h3>
                                            <div className="flex items-center text-yellow-400">
                                                <FaStar className="w-4 h-4" />
                                                <span className="ml-1 text-sm text-gray-600 dark:text-text-dark/70">
                          {vehicle.rating}
                        </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-gray-500 dark:text-text-dark/70 text-sm mb-3">
                                            <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                                            {vehicle.location}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div>
                        <span className="text-2xl font-bold text-primary-600">
                          {vehicle.price.toLocaleString()} XAF
                        </span>
                                                <span className="text-sm text-gray-500 dark:text-text-dark/70">
                          {t('home.featured.per_day')}
                        </span>
                                            </div>
                                            <Button
                                                className={`${
                                                    vehicle.available
                                                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                                disabled={!vehicle.available}
                                            >
                                                {vehicle.available ? t('home.featured.rent_now') : t('home.featured.unavailable')}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/client/vehicles">
                                <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                                    {t('home.featured.view_all')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="bg-white dark:bg-background-dark py-12 border-t border-b dark:border-gray-700">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-primary-600">100+</div>
                                <div className="text-gray-600 dark:text-text-dark/70">{t('home.stats.vehicles')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">10+</div>
                                <div className="text-gray-600 dark:text-text-dark/70">{t('home.stats.locations')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">4.9</div>
                                <div className="text-gray-600 dark:text-text-dark/70">{t('home.stats.rating')}</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary-600">24/7</div>
                                <div className="text-gray-600 dark:text-text-dark/70">{t('home.stats.support')}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaCar className="w-8 h-8 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-text-dark mb-2">
                                    {t('home.features.wide_selection.title')}
                                </h3>
                                <p className="text-gray-600 dark:text-text-dark/70">
                                    {t('home.features.wide_selection.description')}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaCalendarAlt className="w-8 h-8 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-text-dark mb-2">
                                    {t('home.features.flexible_booking.title')}
                                </h3>
                                <p className="text-gray-600 dark:text-text-dark/70">
                                    {t('home.features.flexible_booking.description')}
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaStar className="w-8 h-8 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-text-dark mb-2">
                                    {t('home.features.best_service.title')}
                                </h3>
                                <p className="text-gray-600 dark:text-text-dark/70">
                                    {t('home.features.best_service.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ClientHome;