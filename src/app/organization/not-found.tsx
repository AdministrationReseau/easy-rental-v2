'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    FaExclamationTriangle,
    FaArrowLeft,
    FaBuilding,
    FaChartBar,
    FaUsers,
    FaCog,
    FaDashcube,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function OrganizationNotFound() {
    const { t } = useTranslation('common');
    const router = useRouter();

    // Aller à la page précédente
    const goBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/organization');
        }
    };

    // Aller au tableau de bord organisation
    const goDashboard = () => {
        router.push('/organization');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background-light via-primary-50/20 to-background-light dark:from-background-dark dark:via-primary-900/10 dark:to-background-dark flex items-center justify-center px-4 py-8">
            <div className="max-w-5xl w-full text-center">
                {/* Illustration avec thème organisation */}
                <div className="relative mb-8">
                    <div className="relative mx-auto w-full max-w-2xl">
                        {/* Diagramme organisationnel perdu */}
                        <div className="relative">
                            {/* Boxes représentant des sections d'organisation */}
                            <div className="grid grid-cols-3 gap-8 opacity-20 dark:opacity-30 mb-8">
                                <div className="h-20 bg-primary-200 dark:bg-primary-800 rounded-lg flex items-center justify-center animate-float-1">
                                    <FaDashcube className="text-2xl text-primary-600 dark:text-primary-300" />
                                </div>
                                <div className="h-20 bg-primary-300 dark:bg-primary-700 rounded-lg flex items-center justify-center animate-float-2">
                                    <FaUsers className="text-2xl text-primary-700 dark:text-primary-200" />
                                </div>
                                <div className="h-20 bg-primary-200 dark:bg-primary-800 rounded-lg flex items-center justify-center animate-float-3">
                                    <FaChartBar className="text-2xl text-primary-600 dark:text-primary-300" />
                                </div>
                            </div>

                            {/* Lignes de connexion brisées */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                    viewBox="0 0 300 200"
                                    className="w-full max-w-md opacity-30 dark:opacity-40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M 50 100 L 150 100 M 150 100 L 250 100"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeDasharray="5 5"
                                        className="text-error-400"
                                    />
                                    <path
                                        d="M 150 50 L 150 150"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeDasharray="5 5"
                                        className="text-error-400"
                                        strokeDashoffset="10"
                                    />
                                </svg>
                            </div>

                            {/* Icône de bâtiment central déconnecté */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                <div className="relative animate-shake">
                                    <FaBuilding className="text-6xl text-primary-500 dark:text-primary-400" />
                                    {/* Signal d'erreur */}
                                    <div className="absolute -top-2 -right-2 animate-pulse">
                                        <FaExclamationTriangle className="text-xl text-error-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Texte 404 stylisé pour organisation */}
                        <div className="relative mt-12">
                            <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 dark:from-primary-400 dark:via-primary-500 dark:to-primary-600 mb-4 animate-text-glow">
                                404
                            </h1>
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20">
                                <FaDashcube className="text-8xl text-gray-600 rotate-12" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages d'erreur pour organisation */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold text-text-light dark:text-text-dark">
                        {t('org_page_not_found_title', 'Module introuvable')}
                    </h2>
                    <p className="text-base md:text-lg text-text-light-secondary dark:text-text-light-secondary max-w-lg mx-auto">
                        {t('org_page_not_found_message', 'Cette fonctionnalité organisationnelle n\'est pas disponible ou a été déplacée.')}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-text-light-tertiary dark:text-text-light-tertiary">
                        <FaCog className="text-sm animate-spin-slow" />
                        <span className="text-sm">
              {t('checking_permissions', 'Vérification des permissions...')}
            </span>
                    </div>
                </div>

                {/* Actions pour organisation */}
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
                        onClick={goDashboard}
                        variant="outline"
                        className="w-full sm:w-auto min-w-[200px] group"
                    >
                        <FaDashcube className="mr-2 group-hover:scale-110 transition-transform" />
                        {t('go_dashboard', 'Tableau de bord')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
