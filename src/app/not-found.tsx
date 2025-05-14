'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaCar, FaHome, FaArrowLeft, FaRoad, FaCompass } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    const { t } = useTranslation('common');
    const router = useRouter();

    // Aller à la page précédente
    const goBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    // Aller à l'accueil
    const goHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background-light via-primary-50/30 to-background-light dark:from-background-dark dark:via-primary-900/20 dark:to-background-dark flex items-center justify-center px-4 py-8">
            <div className="max-w-4xl w-full text-center">
                {/* Illustration avec animation */}
                <div className="relative mb-8">
                    {/* Route perdue avec animation */}
                    <div className="relative mx-auto w-full max-w-lg">
                        {/* Route sinueuse */}
                        <svg
                            viewBox="0 0 400 300"
                            className="w-full h-auto opacity-20 dark:opacity-40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M 50 150 Q 100 50, 200 150 T 350 150"
                                stroke="currentColor"
                                strokeWidth="40"
                                className="text-gray-400 dark:text-gray-600"
                                strokeDasharray="10 20"
                            />
                        </svg>

                        {/* Voiture perdue avec animation */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-car-lost">
                            <div className="relative">
                                <FaCar className="text-6xl text-primary-500 dark:text-primary-400" />
                                {/* Nuage de fumée */}
                                <div className="absolute -top-8 -right-4 animate-smoke opacity-70">
                                    <div className="w-8 h-8 bg-gray-400 rounded-full blur-md animate-float-up"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Texte 404 stylisé */}
                    <div className="relative">
                        <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 mb-4 animate-text-glow">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20">
                            <FaRoad className="text-9xl text-gray-600" />
                        </div>
                    </div>
                </div>

                {/* Messages d'erreur */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-text-light dark:text-text-dark">
                        {t('page_not_found_title', 'Route introuvable')}
                    </h2>
                    <p className="text-base md:text-lg text-text-light-secondary dark:text-text-light-secondary max-w-md mx-auto">
                        {t('page_not_found_message', 'Il semble que cette destination n\'existe pas dans notre réseau de location.')}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-text-light-tertiary dark:text-text-light-tertiary">
                        <FaCompass className="text-sm animate-spin-slow" />
                        <span className="text-sm">
              {t('finding_alternative_route', 'Recherche d\'un itinéraire alternatif...')}
            </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button
                        onClick={goBack}
                        variant="default"
                        className="w-full sm:w-auto min-w-[200px] group"
                    >
                        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('go_back', 'Retour précédent')}
                    </Button>

                    <Button
                        onClick={goHome}
                        variant="outline"
                        className="w-full sm:w-auto min-w-[200px] group"
                    >
                        <FaHome className="mr-2 group-hover:scale-110 transition-transform" />
                        {t('go_home', 'Retour à l\'accueil')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
