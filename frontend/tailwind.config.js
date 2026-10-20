/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        industrial: {
          950: '#080c14',
          900: '#0d131f',
          850: '#111928',
          800: '#172236',
          700: '#22324e',
          600: '#33486c',
          500: '#4d658d',
          400: '#7a92b7',
          300: '#a3b8d4',
          200: '#cbd7e6',
          100: '#e6edf5',
        },
        cyan: {
          glow: '#00f0ff',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        status: {
          healthy: '#10b981',
          'healthy-bg': 'rgba(16, 185, 129, 0.12)',
          warning: '#f59e0b',
          'warning-bg': 'rgba(245, 158, 11, 0.12)',
          critical: '#ef4444',
          'critical-bg': 'rgba(239, 68, 68, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.25)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.25)',
        'glow-rose': '0 0 20px -3px rgba(239, 68, 68, 0.25)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
