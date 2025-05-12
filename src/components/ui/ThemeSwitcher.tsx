// src/components/common/ThemeSwitcher.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

type Theme = 'light' | 'dark';

const ThemeSwitcher: React.FC = () => {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		// Check for saved theme or system preference
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

	const themeIcons = {
		light: <FaSun />,
		dark: <FaMoon />
	};

	return (
		<button
			onClick={toggleTheme}
			className="
        p-2 rounded-full
        bg-neutral-100
        text-text-light/70
        transition-colors
      "
			aria-label="Toggle theme"
		>
			{themeIcons[theme]}
		</button>
	);
};

export default ThemeSwitcher;