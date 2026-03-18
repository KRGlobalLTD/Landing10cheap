import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem'
      },
      screens: {
        '2xl': '1200px'
      }
    },
    extend: {
      colors: {
        background: '#070707',
        foreground: '#f4f4f5',
        muted: '#a1a1aa',
        border: '#27272a',
        card: '#111114',
        accent: '#fafafa'
      },
      boxShadow: {
        soft: '0 0 0 1px rgba(255, 255, 255, 0.06), 0 10px 40px rgba(0, 0, 0, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
