"use client";

import React, { useState } from 'react';
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import GuestNavbar from "@/components/navbar/GuestNavbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Services from "@/components/landing/Services";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [showProgress, setShowProgress] = useState(true);
    const [loadingType, setLoadingType] = useState<'rental' | 'payment' | 'booking'>('rental');
    const [activeDemos, setActiveDemos] = useState({
        sm: false,
        md: false,
        lg: false,
        xl: false,
    });

    // Données de véhicules d'exemple
    const vehiclesData = [
        {
            id: "1",
            images: ["/images/vehicles/corolla.jpg"],
            brand: "Toyota",
            model: "Corolla",
            transmission: "Automatic",
            year: 2023,
            passenger: 5,
            pricePerDay: 25000,
            available: true,
            favorite: true,
            rating: 4.8,
            type: "Berline"
        },
        {
            id: "2",
            images: ["/images/vehicles/corolla.jpg"],
            brand: "Honda",
            model: "Civic",
            transmission: "Manuel",
            year: 2022,
            passenger: 5,
            pricePerDay: 22000,
            available: false,
            favorite: false,
            rating: 4.5,
            type: "Berline"
        },
        {
            id: "3",
            images: ["/images/vehicles/corolla.jpg"],
            brand: "Mercedes",
            model: "CLA",
            transmission: "Automatic",
            year: 2023,
            passenger: 4,
            pricePerDay: 45000,
            available: true,
            favorite: false,
            rating: 4.9,
            type: "Premium"
        }
    ];

    // Messages pour différents types de chargement
    const loadingMessages = {
        rental: "Préparation de votre réservation...",
        payment: "Traitement du paiement en cours...",
        booking: "Finalisation de votre location...",
    };

    // Fonction pour simuler différents types de chargement
    const simulateLoading = (type: 'rental' | 'payment' | 'booking', fullScreen = false) => {
        setLoadingType(type);
        if (fullScreen) {
            setShowFullScreen(true);
            setTimeout(() => {
                setShowFullScreen(false);
            }, 8000);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 4000);
        }
    };

    // Fonction pour test des différentes tailles
    const testSize = (size: 'sm' | 'md' | 'lg' | 'xl') => {
        setActiveDemos(prev => ({ ...prev, [size]: true }));
        setTimeout(() => {
            setActiveDemos(prev => ({ ...prev, [size]: false }));
        }, 3000);
    };

    // Gestionnaires d'événements pour les cartes
    const handleLike = (id: string) => {
        console.log(`Liked vehicle with id: ${id}`);
    };

    const handleDislike = (id: string) => {
        console.log(`Disliked vehicle with id: ${id}`);
    };

    const handleEdit = () => {
        console.log('Edit vehicle');
    };

    const handleDelete = (id: string) => {
        console.log(`Delete vehicle with id: ${id}`);
    };

    // Fonction pour basculer le thème
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
	        <GuestNavbar/>
	        <Hero/>
	        <HowItWorks/>
	        <Services/>

            {/* Loader plein écran */}
            {showFullScreen && (
                <LoadingSpinner
                    fullScreen
                    size="lg"
                    message={loadingMessages[loadingType]}
                    progress={showProgress}
                />
            )}

            <main className="pt-[80px] flex-1 container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                    <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4 md:mb-0">
                        Test du Loader Professionnel
                    </h1>
                    <div className="flex flex-wrap gap-4">
                        <Button onClick={toggleTheme}>
                            Basculer Thème
                        </Button>
                        <Button
                            onClick={() => setIsAdmin(!isAdmin)}
                            variant={isAdmin ? "default" : "outline"}
                        >
                            {isAdmin ? 'Mode Admin' : 'Mode Client'}
                        </Button>
                    </div>
                </div>

                {/* Contrôles du loader */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Contrôles de Test du Loader</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold mb-4">Tests de Chargement</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        onClick={() => simulateLoading('rental', true)}
                                        className="col-span-2"
                                    >
                                        Simuler Réservation (Plein écran)
                                    </Button>
                                    <Button
                                        onClick={() => simulateLoading('payment', true)}
                                    >
                                        Simuler Paiement
                                    </Button>
                                    <Button
                                        onClick={() => simulateLoading('booking', true)}
                                    >
                                        Simuler Finalisation
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4">Options</h3>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <Switch
                                            checked={showProgress}
                                            onChange={(checked) => setShowProgress(checked)}
                                        />
                                        <span>Afficher la barre de progression</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Démonstration inline */}
                {isLoading && (
                    <Card className="mb-8">
                        <CardContent className="py-8">
                            <div className="flex justify-center">
                                <LoadingSpinner
                                    size="lg"
                                    message={loadingMessages[loadingType]}
                                    progress={showProgress}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Tests de différentes tailles */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Tests de Tailles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                                <div key={size} className="text-center">
                                    <Button
                                        onClick={() => testSize(size)}
                                        className="mb-4 w-full"
                                        variant="outline"
                                    >
                                        Test {size.toUpperCase()}
                                    </Button>
                                    <div className="h-40 flex items-center justify-center bg-surface-light dark:bg-surface-dark rounded-lg">
                                        {activeDemos[size] ? (
                                            <LoadingSpinner size={size} progress={showProgress} />
                                        ) : (
                                            <span className="text-text-light-secondary">
                        {size.toUpperCase()}
                      </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Section Véhicules */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-6 text-text-light dark:text-text-dark">
                        {isAdmin ? 'Cartes Véhicules (Mode Admin)' : 'Cartes Véhicules (Mode Client)'}
                    </h2>

                    <Button
                        onClick={() => simulateLoading('rental', false)}
                        className="mb-6"
                    >
                        Simuler chargement des véhicules
                    </Button>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {vehiclesData.map((vehicle) => (
                            <VehicleCard
                                key={vehicle.id}
                                {...vehicle}
                                onLike={handleLike}
                                onDislike={handleDislike}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                </section>

                {/* Démonstrations spéciales */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Démonstrations Spéciales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <h3 className="font-semibold mb-4">Loader Compact</h3>
                                <div className="h-32 flex items-center justify-center bg-surface-light dark:bg-surface-dark rounded-lg">
                                    <LoadingSpinner size="sm" showText={false} progress={false} />
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="font-semibold mb-4">Loader Standard</h3>
                                <div className="h-32 flex items-center justify-center bg-surface-light dark:bg-surface-dark rounded-lg">
                                    <LoadingSpinner size="md" />
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="font-semibold mb-4">Loader Message Personnalisé</h3>
                                <div className="h-32 flex items-center justify-center bg-surface-light dark:bg-surface-dark rounded-lg">
                                    <LoadingSpinner
                                        size="md"
                                        message="Traitement en cours..."
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Scénarios de test */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Scénarios de Test</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                onClick={() => {
                                    simulateLoading('payment', true);
                                    setTimeout(() => setShowFullScreen(false), 3000);
                                    setTimeout(() => simulateLoading('booking', true), 3500);
                                }}
                            >
                                Séquence Complète (Paiement → Réservation)
                            </Button>

                            <Button
                                onClick={() => {
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false);
                                        simulateLoading('rental', true);
                                    }, 2000);
                                }}
                                variant="outline"
                            >
                                Chargement Multiple
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <footer className="bg-surface-light dark:bg-surface-dark py-4 border-t border-border-light dark:border-border-dark">
                <div className="container mx-auto px-4">
                    <p className="text-center text-text-light-secondary dark:text-text-light-secondary">
                        © 2025 Easy Rental - Page de test du loader professionnel
                    </p>
                </div>
            </footer>
        </div>
    );
}
