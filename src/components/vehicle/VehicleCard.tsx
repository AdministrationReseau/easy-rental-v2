'use client';

import React from 'react';
import { Heart, User, Sliders, Calendar, Award, BarChart, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { VehicleProps as ImportedVehicleProps } from '@/types/classes/Vehicle';
import { VehicleStatus } from '@/types/enums/VehicleStatus';

// Use the imported VehicleProps as the component's props
export interface VehicleCardProps extends ImportedVehicleProps {
    // Keep isAdmin or other UI-specific props if they are not in VehicleProps
    isAdmin?: boolean;
    // onLike, onDislike, onEdit, onDelete are already in VehicleProps and should have string ID
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
                                                            id, // string
                                                            images,
                                                            brand, // mapped from make
                                                            model,
                                                            transmission,
                                                            year,
                                                            passenger = 0, // ensure default
                                                            pricePerDay,
                                                            favorite = false,
                                                            rating = 0,
                                                            category, // was type
                                                            status, // Utilisation du statut directement
                                                            onLike,
                                                            onDislike,
                                                            onEdit, // onEdit in VehicleProps takes string id
                                                            onDelete, // onDelete in VehicleProps takes string id
                                                            isAdmin = false,
                                                        }) => {
    const { t } = useTranslation('common');

    // Fonction pour déterminer la variante de badge en fonction du statut
    const getStatusBadgeVariant = (status: VehicleStatus | string): "default" | "success" | "warning" | "destructive" | "error" | "outline" | "secondary" => {
        if (typeof status === 'string') {
            switch (status) {
                case 'AVAILABLE': return 'success';
                case 'MAINTENANCE': return 'warning';
                case 'RENTED': return 'secondary';
                case 'BOOKED': return 'default';
                case 'BLOCKED': return 'destructive';
                case 'OUT_OF_SERVICE': return 'error';
                case 'UNKNOWN': return 'outline';
                default: return 'outline';
            }
        }

        // Si c'est un enum VehicleStatus
        switch (status) {
            case VehicleStatus.AVAILABLE: return 'success';
            case VehicleStatus.MAINTENANCE: return 'warning';
            case VehicleStatus.RENTED: return 'secondary';
            case VehicleStatus.BOOKED: return 'default';
            case VehicleStatus.BLOCKED: return 'destructive';
            case VehicleStatus.OUT_OF_SERVICE: return 'error';
            default: return 'outline';
        }
    };

    // Fonction pour obtenir le texte du statut
    const getStatusText = (status: VehicleStatus | string | undefined): string => {
        if (status === undefined) return t('vehicle_status.unknown');

        // Si c'est une chaîne ou un enum avec des valeurs de chaîne, on peut l'utiliser directement
        const statusKey = (typeof status === 'string') ? status.toLowerCase() : String(status).toLowerCase();
        return t(`vehicle_status.${statusKey}`, { defaultValue: String(status) });
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (favorite && onDislike) {
            onDislike(id); // id is string
        } else if (onLike) {
            onLike(id); // id is string
        }
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onEdit) onEdit(id); // Pass string id
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) onDelete(id); // Pass string id
    };

    // Determine link based on context (e.g., isAdmin or a prop)
    // For now, assuming a client-facing link. This might need adjustment.
    const vehicleLink = isAdmin ? `/agency/vehicles/${id}` : `/client/vehicles/${id}`;

    return (
        <Link href={vehicleLink} passHref>
            <div className="bg-card-light dark:bg-card-dark rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full overflow-hidden border border-border-light dark:border-border-dark">
                {/* Image container avec overlay pour status disponibilité */}
                <div className="relative h-48 w-full">
                    <Image
                        src={images?.[0] || '/images/vehicles/placeholder.png'} // Updated placeholder
                        alt={`${brand} ${model}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Badge de statut */}
                    <Badge
                        variant={getStatusBadgeVariant(status)}
                        className="absolute top-3 left-3"
                    >
                        {getStatusText(status)}
                    </Badge>

                    {/* Badge de category de véhicule */}
                    {category && (
                        <Badge
                            variant="default"
                            className="absolute top-3 right-12"
                        >
                            {category} {/* Changed from type to category */}
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
                                <Award size={14} className="text-warning-500 mr-1" /> {/* Ensure text-warning-500 is defined */}
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
                            <span className="text-xs">{category || t('vehicle_card.not_available')}</span> {/* Changed type to category */}
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
                                        className="p-2 rounded-full bg-surface-light hover:bg-primary-100 dark:bg-surface-dark dark:hover:bg-primary-900 transition-colors" // Ensure these CSS vars are defined
                                        aria-label={t('vehicle_card.edit')}
                                    >
                                        <Edit size={16} className="text-text-light-secondary dark:text-text-light-secondary" />
                                    </button>
                                    <button
                                        onClick={handleDeleteClick}
                                        className="p-2 rounded-full bg-surface-light hover:bg-error-100 dark:bg-surface-dark dark:hover:bg-error-900 transition-colors" // Ensure these CSS vars are defined
                                        aria-label={t('vehicle_card.delete')}
                                    >
                                        <Trash2 size={16} className="text-text-light-secondary dark:text-text-light-secondary hover:text-error-500" /> {/* Ensure text-error-500 is defined */}
                                    </button>
                                </div>
                            )}

                            {!isAdmin && (
                                <button
                                    className="px-3 py-1.5 rounded-md bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white text-sm font-medium transition-colors" // Ensure these CSS vars are defined
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
