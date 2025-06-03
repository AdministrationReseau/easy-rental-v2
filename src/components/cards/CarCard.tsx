'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CarProps } from "@/types/models/car";
import { Fuel, Gauge, Heart, Users } from 'lucide-react';

interface LikeProps {
    isLiked: boolean;
    onClick: () => void;
}

const LikeButton: React.FC<LikeProps> = ({ isLiked, onClick }) => {
    return (
        <button onClick={onClick} className="text-xl">
            {isLiked ? (
                <Heart className="text-red-500" />
            ) : (
                <Heart className="text-gray-500" />
            )}
        </button>
    );
};

const CarCard: React.FC<CarProps> = ({
                                         id = 0,
                                         brand = '',
                                         model = '',
                                         engine = { capacity: 0 },
                                         transmission = '',
                                         passenger = 0,
                                         pricePerDay = 0,
                                         images = [],
                                         favorite = false,
                                         onLike = () => {},
                                         onDislike = () => {},
                                     }) => {
    const [isLiked, setIsLiked] = useState<boolean>(favorite);

    const toggleLike = () => {

            setIsLiked(!isLiked);
            if (!isLiked) {
                onLike(id);
            } else {
                onDislike(id);
            }  
    };

    return (
        <div className="bg-white text-secondary-text rounded-lg shadow-md overflow-hidden w-[280px]">
            {/* Header - Brand, Model, Like Button */}
            <div className="flex justify-between items-center p-4 h-[50px]">
                <h2 className="text-md font-semibold text-gray-800">
                    {brand} {model}
                </h2>
                <LikeButton isLiked={isLiked} onClick={toggleLike} />
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center h-[180px]">
                {images[0] && (
                    <Image
                        src={images[0]}
                        alt={`${brand} ${model}`}
                        width={250}
                        height={120}
                        className="object-contain"
                    />
                )}
            </div>

            {/* Details Section */}
            <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <Fuel className="w-5 h-5 text-gray-500" />
                    <p>{engine.capacity}L</p>
                </div>
                <div className="flex items-center gap-1">
                    <Gauge className="w-5 h-5 text-gray-500" />
                    <p>{transmission}</p>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="w-5 h-5 text-gray-500" />
                    <p>{passenger} People</p>
                </div>
            </div>

            {/* Footer Section */}
            <div className="px-4 py-2 flex justify-between items-center">
                <div>
                    <span className="text-xl font-semibold text-gray-800">
                        {pricePerDay} CFA
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/ jour</span>
                </div>
                <Link href={`/customer/cars/${id}`}>
                    <button className="text-sm py-2 px-4 bg-primary-blue text-white rounded-md transition duration-200 transform hover:scale-105 hover:bg-blue-600">
                        View More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { CarCard };
