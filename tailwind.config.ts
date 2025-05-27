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
        // Add custom font families
        'sans': ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Poppins', 'system-ui', 'sans-serif'],
        'title': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary Theme
        primary: {
          50:  '#e9f1ff',     // Very light blue
          100: '#c9ddff',     // Light pastel blue
          200: '#a0c2ff',     // Soft blue
          300: '#78a7ff',     // Closer to secondary-blue
          400: '#4e8dff',     // Vivid mid-blue
          500: '#3674f4',     // Slightly lighter than the base
          600: '#2474ff',     // Lighter than the base blue color
          700: '#053287',     // Darker, slightly muted
          800: '#0c2555',     // Deep navy
          900: '#041735',     // Very dark blue
          DEFAULT: '#155acd', // Base color
        },


        // Background Colors
        background: {
          light: '#FFFFFF',
          dark: '#0F172A', // Dark blue-gray
          whitish: '#F6F7F9',
          darkish: '#1B325F',
          green: '#DCFAED',
          orange: '#FFE5A1',
          red: '#FDE2E2',
          yellow: '#F2E2AB',
          blue: '#092D3E',
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
          primary: '#083A50',
          secondary: '#90A3BF',
          light: '#1F2937', // Dark gray
          lightSecondary: '#4B5563',
          lightTertiary: '#9CA3AF',
          dark: '#F9FAFB', // Light grayR
          darkSecondary: '#E5E7EB',
          darkTertiary: '#9CA3AF',
          green: '#0EAD69',
          orange: '#F49A47',
          red: '#FF5D47',
          yellow: '#EFBB3B',
          blue: '#1BA0E2',

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
        'car-lost': {
          '0%, 100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '25%': { transform: 'translate(-50%, -50%) rotate(-5deg)' },
          '75%': { transform: 'translate(-50%, -50%) rotate(5deg)' },
        },
        'smoke': {
          '0%': { opacity: '0', transform: 'translateY(0) scale(0.5)' },
          '50%': { opacity: '0.7', transform: 'translateY(-20px) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.5)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-30px)' },
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 10px rgba(59, 130, 246, 0.3)' },
          '50%': { textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        'float-1': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },

      animation: {
        'icon-bounce': 'icon-bounce 1.5s ease-in-out infinite',
        'particle-1': 'particle-1 2s ease-in-out infinite',
        'particle-2': 'particle-2 2s ease-in-out infinite 0.5s',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 7s infinite',
        'car-lost': 'car-lost 3s ease-in-out infinite',
        'smoke': 'smoke 2s ease-out infinite',
        'float-up': 'float-up 2s ease-out infinite',
        'text-glow': 'text-glow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 4s linear infinite',
        'shake': 'shake 3s ease-in-out infinite',
        'float-1': 'float-1 3s ease-in-out infinite',
        'float-2': 'float-2 3s ease-in-out infinite 0.5s',
        'float-3': 'float-3 3s ease-in-out infinite 1s',
      },


      animationDelay: {
        '2000': '2s',
        '3000': '3s',
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