// src/providers/ThemeProvider.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: 'light',
	setTheme: () => {},
	toggleTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		// Check saved theme or system preference
		const savedTheme = localStorage.getItem('theme') as Theme;
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (savedTheme) {
			applyTheme(savedTheme);
		} else if (systemPrefersDark) {
			applyTheme('dark');
		} else {
			applyTheme('light');
		}
	}, []);

	const applyTheme = (selectedTheme: Theme) => {
		const root = document.documentElement;

		// Remove all theme classes
		root.classList.remove('light', 'dark');

		// Add selected theme class
		root.classList.add(selectedTheme);

		// Save theme preference
		setTheme(selectedTheme);
		localStorage.setItem('theme', selectedTheme);
	};

	const toggleTheme = () => {
		const themes: Theme[] = ['light', 'dark'];
		const currentIndex = themes.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		const nextTheme = themes[nextIndex];

		applyTheme(nextTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme: applyTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

// Custom hook for using theme
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};