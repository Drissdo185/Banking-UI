/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          brand: '#00A693',
          brandDark: '#008B7A',
          brandLight: '#1AB8A6',
        },
        secondary: {
          orange: '#FF9500',
          orangeLight: '#FFB84D',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'radial-gradient': 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
      },
      backdropBlur: {
        'md': '12px',
      },
    },
  },
  plugins: [],
}