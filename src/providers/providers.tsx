// src/providers/providers.tsx
'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { LanguageProvider } from './LanguageProvider';
import { AuthProvider } from './AuthProvider';

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<AuthProvider>
					{children}
				</AuthProvider>
			</LanguageProvider>
		</ThemeProvider>
	);
}