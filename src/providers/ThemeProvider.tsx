// src/providers/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'blue' | 'green';

type ThemeContextType = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		// Récupérer le thème du localStorage lors du chargement initial
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme) {
			setTheme(savedTheme);
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// Si l'utilisateur préfère le thème sombre
			setTheme('dark');
		}
	}, []);

	useEffect(() => {
		// Mettre à jour les classes sur le HTML element
		const root = document.documentElement;

		// Supprimer toutes les classes de thème
		root.classList.remove('light', 'dark', 'blue', 'green');

		// Ajouter la classe du thème actuel
		root.classList.add(theme);

		// Sauvegarder dans le localStorage
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};