// src/components/navbar/ClientNavbar.tsx
'use client'

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
	FaHome,
	FaCar,
	FaHeart,
	FaBell,
	FaUser,
	FaBuilding,
	FaPhone,
	FaInfoCircle
} from 'react-icons/fa';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitcher from '../common/ThemeSwitcher';

const ClientNavbar: React.FC = () => {
	const { t } = useTranslation('client');

	return (
		<nav className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark shadow-md fixed top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<Link href="/client" className="flex items-center">
					<FaCar className="text-primary-500 mr-2 text-2xl" />
					<span className="text-xl font-bold">
            EASY-RENT
          </span>
				</Link>

				{/* Navigation Links */}
				<div className="flex items-center space-x-10">
					<nav className="flex space-x-4 items-center">
						<Link
							href="/client"
							className="flex flex-col items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaHome className="mr-2" />
							{t('navbar.home')}
						</Link>
						<Link
							href="/client/vehicles"
							className="flex flex-col items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaCar className="mr-2" />
							{t('navbar.vehicles')}
						</Link>

						<Link
							href="/client/agencies"
							className="flex flex-col items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaBuilding className="mr-2" />
							{t('navbar.agencies')}
						</Link>
						<Link
							href="/client/contact"
							className="flex flex-col items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaPhone className="mr-2" />
							{t('navbar.contact')}
						</Link>
						<Link
							href="/client/about"
							className="flex flex-col items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaInfoCircle className="mr-2" />
							{t('navbar.about')}
						</Link>
					</nav>

					{/* Action Icons */}
					<div className="flex items-center space-x-4">
						{/* Language and Theme Switchers */}
						<LanguageSwitcher />
						<ThemeSwitcher />

						{/* Favorite Vehicles */}
						<button className="text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 relative">
							<FaHeart />
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
						</button>

						{/* Notifications */}
						<button className="text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 relative">
							<FaBell />
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
						</button>

						{/* Profile */}
						<Link
							href="/client/profile"
							className="flex items-center bg-primary-500 text-white px-3 py-2 rounded-full hover:bg-primary-600 transition"
						>
							<FaUser className="mr-2" />
							{t('navbar.profile')}
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default ClientNavbar;