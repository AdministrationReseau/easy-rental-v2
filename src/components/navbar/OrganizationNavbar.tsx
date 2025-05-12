// src/components/navbar/OrganizationNavbar.tsx
'use client'

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
	FaHome,
	FaCar,
	FaUsers,
	FaCalendarAlt,
	FaChartBar,
	FaBell,
	FaUser
} from 'react-icons/fa';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import ThemeSwitcher from '../ui/ThemeSwitcher';

const OrganizationNavbar: React.FC = () => {
	const { t } = useTranslation('organization');

	return (
		<nav className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark shadow-md fixed top-0 left-0 right-0 z-50">
			<div className="container mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<Link href="/organization" className="flex items-center">
					<FaCar className="text-primary-500 mr-2 text-2xl" />
					<span className="text-xl font-bold">
            EASY-RENT
          </span>
				</Link>

				{/* Navigation Links */}
				<div className="flex items-center space-x-6">
					<nav className="flex space-x-4 items-center">
						<Link
							href="/organization/"
							className="flex items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaHome className="mr-2" />
							{t('navbar.dashboard')}
						</Link>
						<Link
							href="/organization/vehicles"
							className="flex items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaCar className="mr-2" />
							{t('navbar.vehicles')}
						</Link>
						<Link
							href="/organization/drivers"
							className="flex items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaUsers className="mr-2" />
							{t('navbar.drivers')}
						</Link>
						<Link
							href="/organization/bookings"
							className="flex items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaCalendarAlt className="mr-2" />
							{t('navbar.bookings')}
						</Link>
						<Link
							href="/organization/analytics"
							className="flex items-center text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 transition"
						>
							<FaChartBar className="mr-2" />
							{t('navbar.analytics')}
						</Link>
					</nav>

					{/* Action Icons */}
					<div className="flex items-center space-x-4">
						{/* Language and Theme Switchers */}
						<LanguageSwitcher />
						<ThemeSwitcher />

						{/* Notifications */}
						<button className="text-text-light/70 dark:text-text-dark/70 hover:text-primary-500 relative">
							<FaBell />
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                5
              </span>
						</button>

						{/* Profile */}
						<Link
							href="/organization/profile"
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

export default OrganizationNavbar;