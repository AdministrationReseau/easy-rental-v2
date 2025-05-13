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
          green: '#DCFAED',
          orange: '#FFE5A1',
          red: '#FDE2E2',
          yellow: '#F2E2AB',
          blue: '#092D3E',
        },

        foreground: {
          light: "var(--foreground)"
        },

        // Text Colors
        text: {
          primary: '#083A50',
          secondary: '#90A3BF',
          light: '#1F2937', // Dark gray
          dark: '#F9FAFB', // Light grayR
          green: '#0EAD69',
          orange: '#F49A47',
          red: '#FF5D47',
          yellow: '#EFBB3B',
          blue: '#1BA0E2',

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