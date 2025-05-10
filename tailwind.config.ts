import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
                'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
                'body': ['Poppins', 'system-ui', 'sans-serif'],
                'title': ['Montserrat', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Primary Theme - Bleu
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9', // Couleur principale
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },

                // Couleurs secondaires
                success: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    500: '#22c55e',
                    700: '#15803d',
                },
                error: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    500: '#ef4444',
                    700: '#b91c1c',
                },
                warning: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    500: '#f97316',
                    700: '#c2410c',
                },

                // Background Colors
                background: {
                    light: '#FFFFFF',
                    dark: '#0F172A', // Dark blue-gray
                    neutral: '#F5F5F5',
                },

                // Surface Colors
                surface: {
                    light: '#F5F7FA',
                    dark: '#1E293B',
                },

                // Card Colors
                card: {
                    light: '#FFFFFF',
                    dark: '#1E293B',
                },

                // Border Colors
                border: {
                    light: '#E5E7EB',
                    dark: '#334155',
                },

                foreground: {
                    light: "var(--foreground)"
                },

                // Text Colors
                text: {
                    light: '#1F2937', // Dark gray
                    'light-secondary': '#4B5563',
                    'light-tertiary': '#9CA3AF',
                    dark: '#F9FAFB', // Light gray
                    'dark-secondary': '#E5E7EB',
                    'dark-tertiary': '#9CA3AF',
                    neutral: '#404040',
                },
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 12px 24px rgba(0, 0, 0, 0.1)',
            },
            borderRadius: {
                'card': '0.75rem',
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: 'var(--text-light)',
                    }
                },
                dark: {
                    css: {
                        color: 'var(--text-dark)',
                    }
                }
            },
            keyframes: {
                'icon-bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' }
                },
                'particle-1': {
                    '0%': { transform: 'translate(-50%, 0) scale(0)', opacity: '0' },
                    '50%': { transform: 'translate(-50%, -20px) scale(1)', opacity: '1' },
                    '100%': { transform: 'translate(-50%, -40px) scale(0)', opacity: '0' }
                },
                'particle-2': {
                    '0%': { transform: 'translate(0, -50%) scale(0)', opacity: '0' },
                    '50%': { transform: 'translate(20px, -50%) scale(1)', opacity: '1' },
                    '100%': { transform: 'translate(40px, -50%) scale(0)', opacity: '0' }
                },
                'shimmer': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                },
                'blob': {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' }
                },
            },
            animation: {
                'icon-bounce': 'icon-bounce 1.5s ease-in-out infinite',
                'particle-1': 'particle-1 2s ease-in-out infinite',
                'particle-2': 'particle-2 2s ease-in-out infinite 0.5s',
                'shimmer': 'shimmer 2s linear infinite',
                'blob': 'blob 7s infinite',
            },
            animationDelay: {
                '2000': '2s',
                '4000': '4s',
            },
        },
    },
    plugins: [],
    variants: {
        extend: {
            backgroundColor: ['dark', 'neutral'],
            textColor: ['dark', 'neutral'],
        }
    }
};

export default config;
