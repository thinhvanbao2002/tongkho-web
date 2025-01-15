const COLORS = {
  primary: 'var(--primary)',
  baseBackground: 'var(--baseBackground)',
  hover: 'var(--hover)'
}

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/styles/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    colors: {
      ...COLORS,
      black: '#000',
      while: '#fff',
      'border-basic': '#ccc',
      money: '#f15e2c'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      fontSize: {
        'custom-xl': '24px', // Cỡ chữ XL
        'custom-sm': '18px', // Cỡ chữ SM
        'custom-xs': '16px' // Cỡ chữ XS
      },
      boxShadow: {
        custom: '0 9px 6px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)'
      }
    }
  }
}
