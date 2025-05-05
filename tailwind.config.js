import type { Config } from 'tailwindcss'

/**
 * @type {import('tailwindcss').Config}
 */
const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#29ABE2',
        secondary: '#FFFFFF',
        accent: '#FFDA63',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': '14px',
        'sm': '16px',
        'md': '18px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '48px',
        '5xl': '64px',
      },
      screens: {
        'mobile': { 'max': '600px' },
        'tablet': '601px',
        'desktop': '901px',
      },
    },
  },
  safelist: [
    'text-xs',
    'text-sm',
    'text-md',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'font-montserrat',
    'font-open-sans',
    'text-primary',
    'text-secondary',
    'text-accent',
    'bg-primary',
    'bg-secondary',
    'bg-accent',
  ],
  plugins: [],
}
export default config