'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// import { Favorite, FavoriteBorder, People, Star, AccessTime } from '@mui/icons-material';
import Image from "next/image"; // Import des icônes pour like et dislike
import { AgencyProps } from '@/types/models/agency';
import { Clock4, Heart, HeartIcon, Star, UsersIcon } from 'lucide-react';

interface LikeProps {
    isLiked: boolean; // Etat du like : true si aimé, false sinon
    onClick: () => void; // Fonction appelée lorsque l'utilisateur clique sur l'icône
}

const LikeButton: React.FC<LikeProps> = ({ isLiked, onClick }) => {
    return (
        <button onClick={onClick} className="text-xl">
            {isLiked ? (
                <HeartIcon className="text-red-500" /> // Coeur rouge si aimé
            ) : (
                <Heart className="text-gray-500" /> // Coeur incolore si non aimé
            )}
        </button>
    );
};

const AgencyCard: React.FC<AgencyProps> = ({
    id,
    city,
    quater,
    followers,
    rating,
    slogan,
    type,
    name,
    images,
    description,
    openingTime,
    closingTime,
    createdAt,
    updatedAt,
    reviews,
    onLike,
    onDislike,
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

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
    // Fonction pour basculer l'état du like
    const toggleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            if (onLike) onLike(id); // Appel de la fonction onLike si le véhicule est aimé
        } else {
            if(onDislike) onDislike(id); // Appel de la fonction onDislike si le véhicule est non aimé
        }
    };
    const agency = {
        id : id,
        city : city,
        quater : quater,
        name : name,
        followers : followers ,
        rating : rating,
        slogan : slogan,
        images : images,
        description : description,
        openingTime : openingTime,
        closingTime : closingTime,
        type : type,
        createdAt : createdAt,
        updatedAt : updatedAt,
        reviews : reviews,
        onLike : onLike,
        onDislike: onDislike
    }
    const isOpen = isAgencyOpen(agency);

    return (
        <div className="bg-white dark:bg-background-dark text-secondary-text rounded-lg shadow-md overflow-hidden w-[280px]">
            {/* Première ligne - Nom et Like/Dislike */}
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold text-primary-text">{name}</h2>
                <p className='text-sm text-secondary-text'><i>({type})</i></p>
                <LikeButton isLiked={isLiked} onClick={toggleLike} />
            </div>

            {/* Deuxième ligne - Marque */}
            <div className="px-4 py-2 text-sm text-secondary-text h-[70px]">
                <p>{slogan}</p>
            </div>

            {/* Image du véhicule */}
            <div className='flex items-center justify-center h-[200px]'>
                <Image
                    src={images[0]}
                    alt={`${name} `}
                    width={200}
                    height={100}
                    className=" "
                />
            </div>

            {/* Détails supplémentaires */}
            <div className='flex justify-between items-center text-sm'>
                <div className="flex items-center gap-2 px-2 py-2">
                    <Star className="w-5 h-5" />
                    <p>{rating}</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-2">
                    <UsersIcon className="w-5 h-5" />
                    <p>{followers}</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-2">
                    <Clock4 className="w-5 h- 5" />
                    <p>{isOpen? 'Open': 'Close'}</p>
                </div>
            </div>


            {/* Prix de location et bouton Rent Now */}
            <div className="px-4 py-2 flex justify-between items-center">
                <span className='m-2'>
                    <p className="text-xl font-semibold text-gray-800">{city}</p>
                    <p className='text-sm'>{quater}</p>
                </span>
                <Link
                    href={`/agencies/${id}`}
                    className="text-primary-blue mt-2 inline-block"
                >
                    <button className="py-2 px-4 text-sm bg-primary dark:bg-primary-700 text-white rounded-md transition duration-200 hover:scale-105 hover:bg-primary-800 w-[116px] h-[44px]">
                        View more
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { AgencyCard };
