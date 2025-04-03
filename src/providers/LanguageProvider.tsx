// src/providers/LanguageProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Language = 'en' | 'fr' ;

type LanguageContextType = {
	language: Language;
	setLanguage: (language: Language) => void;
	t: (key: string, namespace?: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Charge les fichiers de traduction
const loadTranslations = async (lang: Language, namespace = 'common') => {
	try {
		const translations = await import(`/public/locales/${lang}/${namespace}.json`);
		return translations.default;
	} catch (error) {
		console.error(`Failed to load translations for ${lang}/${namespace}`, error);
		return {};
	}
};

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [language, setLanguageState] = useState<Language>('en');
	const [translations, setTranslations] = useState<Record<string, any>>({});
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Récupérer la langue du localStorage lors du chargement initial
		const savedLanguage = localStorage.getItem('language') as Language | null;
		if (savedLanguage) {
			setLanguageState(savedLanguage);
		} else {
			// Détecter la langue du navigateur
			const browserLanguage = navigator.language.split('-')[0] as Language;
			if (['en', 'fr', 'es'].includes(browserLanguage)) {
				setLanguageState(browserLanguage);
			}
		}
	}, []);

	useEffect(() => {
		// Charger les traductions lorsque la langue change
		const loadAllTranslations = async () => {
			const commonTranslations = await loadTranslations(language);
			setTranslations({ common: commonTranslations });
		};

		loadAllTranslations();

		// Sauvegarder la langue dans localStorage
		localStorage.setItem('language', language);

		// Mettre à jour l'attribut lang du HTML
		document.documentElement.lang = language;
	}, [language]);

	const setLanguage = (newLanguage: Language) => {
		setLanguageState(newLanguage);
	};

	const t = (key: string, namespace = 'common') => {
		const ns = translations[namespace] || {};
		return ns[key] || key;
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (context === undefined) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
};