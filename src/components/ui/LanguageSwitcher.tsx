// // src/components/common/LanguageSwitcher.tsx
// 'use client';
//
// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import Flag from 'react-world-flags';
//
// const LanguageSwitcher: React.FC = () => {
// 	const { i18n } = useTranslation();
//
// 	const languages = [
// 		{ code: 'en', name: 'EN', flag: 'gb' },
// 		{ code: 'fr', name: 'FR', flag: 'fr' }
// 	];
//
// 	const changeLanguage = (lng: string) => {
// 		// Change i18n language
// 		i18n.changeLanguage(lng);
//
// 		// Set language cookie
// 		document.cookie = `lng=${lng}; path=/; max-age=31536000`; // 1 year expiry
//
// 		// Optional: Reload the page to ensure server-side language change
// 		window.location.reload();
// 	};
//
// 	return (
// 		<div className="flex items-center space-x-2">
// 			{languages.map((lang) => (
// 				<button
// 					key={lang.code}
// 					onClick={() => changeLanguage(lang.code)}
// 					className={`
//             flex items-center space-x-1
//             px-2 py-1 rounded
//             ${i18n.language === lang.code
// 						? 'bg-primary-100 text-primary'
// 						: 'hover:bg-neutral-100'}
//           `}
// 				>
// 					<Flag
// 						code={lang.flag}
// 						height="16"
// 						width="24"
// 						className="rounded-sm"
// 					/>
// 					<span className="text-sm">{lang.name}</span>
// 				</button>
// 			))}
// 		</div>
// 	);
//
// export default LanguageSwitcher;

// src/components/common/LanguageSwitcher.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import {BiChevronDown} from "react-icons/bi";

const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const languages = [
		{ code: 'en', name: 'EN', flag: 'gb' },
		{ code: 'fr', name: 'FR', flag: 'fr' }
	];

	const changeLanguage = (lng: string) => {
		// Change i18n language
		i18n.changeLanguage(lng);

		// Set language cookie
		document.cookie = `lng=${lng}; path=/; max-age=31536000`; // 1 year expiry

		// Close dropdown
		setIsOpen(false);

		// Optional: Reload the page to ensure server-side language change
		window.location.reload();
	};

	// Find current language
	const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center space-x-2 px-3 py-2 rounded border dark:border-text-dark/70 border-gray-200"
			>
				<Flag
					code={currentLanguage.flag}
					height="16"
					width="24"
					className="rounded-sm"
				/>
				<span className="text-sm">{currentLanguage.name}</span>
				<BiChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
			</button>

			{isOpen && (
				<div className="absolute mt-1 right-0 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[120px] py-1">
					{languages.map((lang) => (
						<button
							key={lang.code}
							onClick={() => changeLanguage(lang.code)}
							className={`
                w-full text-left px-3 py-2 
                flex items-center space-x-2
                hover:bg-gray-50
                ${i18n.language === lang.code ? 'bg-primary-50 text-primary dark:bg-primary-900 dark:text-primary-50' : 'dark:text-primary-700'}
              `}
						>
							<Flag
								code={lang.flag}
								height="16"
								width="24"
								className="rounded-sm"
							/>
							<span className="text-sm">{lang.name}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageSwitcher;