'use client';

import React from 'react';
import { Heart, User, Sliders, Calendar, Award, BarChart, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

export interface VehicleCardProps {
    id: string;
    images: string[];
    brand: string;
    model: string;
    transmission: string;
    year: number;
    passenger: number;
    pricePerDay: number;
    available: boolean;
    favorite?: boolean;
    rating?: number;
    type?: string;
    onLike?: (id: string) => void;
    onDislike?: (id: string) => void;
    onEdit?: () => void;
    onDelete?: (id: string) => void;
    isAdmin?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
                                                            id,
                                                            images,
                                                            brand,
                                                            model,
                                                            transmission,
                                                            year,
                                                            passenger,
                                                            pricePerDay,
                                                            available,
                                                            favorite = false,
                                                            rating = 0,
                                                            type,
                                                            onLike,
                                                            onDislike,
                                                            onEdit,
                                                            onDelete,
                                                            isAdmin = false,
                                                        }) => {
    const { t } = useTranslation('common');

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (favorite && onDislike) {
            onDislike(id);
        } else if (onLike) {
            onLike(id);
        }
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onEdit) onEdit();
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) onDelete(id);
    };

    return (
        <Link href={`/client/vehicles/${id}`} passHref>
            <div className="bg-card-light dark:bg-card-dark rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden border border-border-light dark:border-border-dark">
                {/* Image container avec overlay pour status disponibilité */}
                <div className="relative h-48 w-full">
                    <Image
                        src={images?.[0] || '/placeholder-car.jpg'}
                        alt={`${brand} ${model}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Badge de disponibilité */}
                    <Badge
                        variant={available ? 'success' : 'error'}
                        className="absolute top-3 left-3"
                    >
                        {available ? t('vehicle_card.available') : t('vehicle_card.unavailable')}
                    </Badge>

                    {/* Badge de type de véhicule */}
                    {type && (
                        <Badge
                            variant="default"
                            className="absolute top-3 right-12"
                        >
                            {type}
                        </Badge>
                    )}

                    {/* Bouton favori */}
                    <button
                        onClick={handleLikeClick}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                        aria-label={favorite ? t('vehicle_card.remove_favorite') : t('vehicle_card.add_favorite')}
                    >
                        <Heart
                            fill={favorite ? 'var(--error-500)' : 'none'}
                            color={favorite ? 'var(--error-500)' : 'var(--text-light-secondary)'}
                            size={18}
                        />
                    </button>
                </div>

                {/* Contenu */}
                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-semibold text-lg text-text-light dark:text-text-dark">{brand} {model}</h3>
                            <p className="text-sm text-text-light-secondary dark:text-text-light-secondary">{year}</p>
                        </div>
                        {rating > 0 && (
                            <div className="flex items-center">
                                <Award size={14} className="text-warning-500 mr-1" />
                                <span className="text-sm font-medium">{rating}/5</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-3">
                        <div className="flex items-center text-text-light-secondary dark:text-text-light-secondary">
                            <Sliders size={14} className="mr-2" />
                            <span className="text-xs">{transmission}</span>
                        </div>
                        <div className="flex items-center text-text-light-secondary dark:text-text-light-secondary">
                            <User size={14} className="mr-2" />
                            <span className="text-xs">{t('vehicle_card.seats', { count: passenger })}</span>
                        </div>
                        <div className="flex items-center text-text-light-secondary dark:text-text-light-secondary">
                            <Calendar size={14} className="mr-2" />
                            <span className="text-xs">{year}</span>
                        </div>
                        <div className="flex items-center text-text-light-secondary dark:text-text-light-secondary">
                            <BarChart size={14} className="mr-2" />
                            <span className="text-xs">{type || t('vehicle_card.not_available')}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-border-light dark:border-border-dark">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-bold text-lg text-primary-500 dark:text-primary-400">{pricePerDay.toLocaleString()} XAF</span>
                                <span className="text-xs text-text-light-secondary dark:text-text-light-secondary"> {t('vehicle_card.per_day')}</span>
                            </div>

                            {isAdmin && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={handleEditClick}
                                        className="p-2 rounded-full bg-surface-light hover:bg-primary-100 dark:bg-surface-dark dark:hover:bg-primary-900 transition-colors"
                                        aria-label={t('vehicle_card.edit')}
                                    >
                                        <Edit size={16} className="text-text-light-secondary dark:text-text-light-secondary" />
                                    </button>
                                    <button
                                        onClick={handleDeleteClick}
                                        className="p-2 rounded-full bg-surface-light hover:bg-error-100 dark:bg-surface-dark dark:hover:bg-error-900 transition-colors"
                                        aria-label={t('vehicle_card.delete')}
                                    >
                                        <Trash2 size={16} className="text-text-light-secondary dark:text-text-light-secondary hover:text-error-500" />
                                    </button>
                                </div>
                            )}

                            {!isAdmin && (
                                <button
                                    className="px-3 py-1.5 rounded-md bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white text-sm font-medium transition-colors"
                                >
                                    {t('vehicle_card.book')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
