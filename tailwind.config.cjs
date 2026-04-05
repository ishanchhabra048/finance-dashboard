/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        bg: {
          base: '#0D0F14',
          surface: '#13161E',
          elevated: '#1A1E2A',
          border: '#242836',
        },
        accent: {
          primary: '#00D4AA',
          'primary-dim': 'rgba(0, 212, 170, 0.13)',
          income: '#F5A623',
          'income-dim': 'rgba(245, 166, 35, 0.09)',
          expense: '#FF5C6A',
          'expense-dim': 'rgba(255, 92, 106, 0.09)',
        },
        text: {
          primary: '#E8ECF4',
          secondary: '#8892A4',
          muted: '#4A5266',
        },
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        badge: '4px',
      },
      fontSize: {
        xs: ['11px', { lineHeight: '1.4' }],
        sm: ['13px', { lineHeight: '1.5' }],
        base: ['15px', { lineHeight: '1.6' }],
        lg: ['18px', { lineHeight: '1.4' }],
        xl: ['24px', { lineHeight: '1.3' }],
        '2xl': ['32px', { lineHeight: '1.2' }],
        hero: ['48px', { lineHeight: '1.1' }],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 400ms ease-out forwards',
        'fade-in': 'fadeIn 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
