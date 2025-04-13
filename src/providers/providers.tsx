// src/providers/providers.tsx
'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import I18nProvider from "@/providers/I18nProvider";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider>
			<I18nProvider>
				<AuthProvider>
					{children}
				</AuthProvider>
			</I18nProvider>
		</ThemeProvider>
	);
}