'use client';

import React, { useState, useEffect } from 'react';
import { FaCar, FaKey, FaMapMarkerAlt, FaCheckCircle, FaFileContract } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullScreen?: boolean;
    showText?: boolean;
    className?: string;
    progress?: boolean;
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           size = 'md',
                                                           fullScreen = false,
                                                           showText = true,
                                                           className = '',
                                                           progress = true,
                                                           message,
                                                       }) => {
    const { t } = useTranslation('common');
    const [progressValue, setProgressValue] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    // Étapes du processus de location
    const steps = [
        { icon: FaFileContract, label: 'vehicle_check' },
        { icon: FaCar, label: 'preparation' },
        { icon: FaMapMarkerAlt, label: 'location_setup' },
        { icon: FaKey, label: 'keys_ready' },
        { icon: FaCheckCircle, label: 'ready' },
    ];

    // Définir les tailles en fonction de la prop size
    const sizes = {
        sm: {
            container: 'h-20 w-20',
            strokeWidth: '4',
            iconSize: 'text-lg',
            text: 'text-xs mt-3',
            stepIcons: 'text-xs',
            progressBar: 'h-2',
        },
        md: {
            container: 'h-28 w-28',
            strokeWidth: '6',
            iconSize: 'text-xl',
            text: 'text-sm mt-4',
            stepIcons: 'text-sm',
            progressBar: 'h-3',
        },
        lg: {
            container: 'h-40 w-40',
            strokeWidth: '8',
            iconSize: 'text-3xl',
            text: 'text-base mt-6',
            stepIcons: 'text-base',
            progressBar: 'h-4',
        },
        xl: {
            container: 'h-56 w-56',
            strokeWidth: '10',
            iconSize: 'text-5xl',
            text: 'text-lg mt-8',
            stepIcons: 'text-xl',
            progressBar: 'h-6',
        },
    };

    // Simulation du progrès
    useEffect(() => {
        const interval = setInterval(() => {
            setProgressValue((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }

                // Mettre à jour l'étape courante
                const step = Math.floor(prev / 20);
                if (step !== currentStep && step < steps.length) {
                    setCurrentStep(step);
                }

                return prev + 1;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [currentStep, steps.length]); // Ajout de steps.length aux dépendances

    // Calculer la circonférence pour le cercle SVG
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressValue / 100) * circumference;

    const loaderContent = (
        <div className={`flex flex-col items-center justify-center relative ${className}`}>
            {/* Conteneur principal avec animation */}
            <div className={`relative ${sizes[size].container}`}>
                {/* Cercle de progression */}
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                    {/* Fond du cercle */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={sizes[size].strokeWidth}
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                    />
                    {/* Cercle de progression */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={sizes[size].strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="text-primary-500 transition-all duration-300 ease-out"
                    />
                </svg>

                {/* Icône centrale avec animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        {/* Étape actuelle */}
                        <div className="animate-icon-bounce">
                            {React.createElement(steps[currentStep].icon, {
                                className: `${sizes[size].iconSize} text-primary-500 dark:text-primary-400 transition-all duration-300`,
                            })}
                        </div>

                        {/* Effet de particules */}
                        <div className="absolute inset-0 animate-pulse">
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary-400 rounded-full transform -translate-x-1/2 animate-particle-1"></div>
                            <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary-400 rounded-full transform -translate-y-1/2 animate-particle-2"></div>
                        </div>
                    </div>
                </div>

                {/* Pourcentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-text-light dark:text-text-dark mt-8 opacity-70">
                        {progressValue}%
                    </span>
                </div>
            </div>

            {/* Message et étape courante */}
            {showText && (
                <div className="text-center max-w-xs">
                    <h3 className={`font-medium text-text-light dark:text-text-dark ${sizes[size].text}`}>
                        {message || t('loading')}
                    </h3>
                    <p className="text-xs text-text-light-secondary dark:text-text-light-secondary mt-1">
                        {t(`loading_steps.${steps[currentStep].label}`)}
                    </p>
                </div>
            )}

            {/* Barre de progression linéaire */}
            {progress && (
                <div className={`mt-6 w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizes[size].progressBar}`}>
                    <div
                        className={`h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-300 ease-out`}
                        style={{ width: `${progressValue}%` }}
                    >
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                </div>
            )}

            {/* Indicateurs des étapes */}
            <div className="mt-6 flex justify-center space-x-3">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-300 ${
                            index === currentStep
                                ? 'scale-110'
                                : index < currentStep
                                    ? 'opacity-100'
                                    : 'opacity-40'
                        }`}
                    >
                        {React.createElement(step.icon, {
                            className: `${sizes[size].stepIcons} ${
                                index === currentStep
                                    ? 'text-primary-500 animate-pulse'
                                    : index < currentStep
                                        ? 'text-success-500'
                                        : 'text-gray-400'
                            }`,
                        })}
                    </div>
                ))}
            </div>
        </div>
    );

    // Si fullScreen est true, afficher en plein écran
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[9999] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md">
                {/* Fond avec animation subtile */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-100/40 dark:bg-primary-900/20 rounded-full filter blur-3xl animate-blob"></div>
                    <div className="absolute top-40 -right-40 w-80 h-80 bg-primary-200/40 dark:bg-primary-800/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-40 left-40 w-80 h-80 bg-primary-100/40 dark:bg-primary-700/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Contenu du loader */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    {loaderContent}
                </div>

                {/* Footer avec logo */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-2 text-text-light-secondary dark:text-text-light-secondary">
                        <FaCar className="text-primary-500" />
                        <span className="text-sm font-medium">Easy Rental</span>
                    </div>
                </div>
            </div>
        );
    }

    return loaderContent;
};

export default LoadingSpinner;
