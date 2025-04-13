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
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Base color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },

        // Background Colors
        background: {
          light: '#FFFFFF',
          dark: '#0F172A', // Dark blue-gray
        },

        foreground: {
          light: "var(--foreground)"
        },

        // Text Colors
        text: {
          light: '#1F2937', // Dark gray
          dark: '#F9FAFB', // Light grayR
        },
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