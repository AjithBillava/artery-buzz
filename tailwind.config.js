const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend:{
      colors:{
        black:{
          light:"#1e1d1d",
          DEFAULT:"#181717",
          dark:"#000000"
        },
        primaryColor:{
          light:"#FACC15",
          DEFAULT:"#fbbf24",
          dark:"#fc9e23"
        }
      }      
    },
    screens:{
      'xsm' : '425px',
      ...defaultTheme.screens,
      // 'mobile': '320px',
      // 'tablet': '640px',
      // 'laptop': '1024px',
      // 'desktop': '1280px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
