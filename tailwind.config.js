/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}", 
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./slices/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          gray: colors.gray,
          'white': '#ffffff',
          'EacColor': {
            'BlackPearl': '#03071E',
            'RedOxide': '#6a040f',
            'DeepFir': '#dc2F02',
            'TahitiGold': '#F48C06',
            'SelectiveYellow': '#FFBA08'
          },
          'limeGreen': '#76BA1B',
          'babyBlue': '00B4D8'
    
        },
        fontFamily: {
          // 'Poppins': 'Poppins, sans-serif'
        }
    },
    plugin: []
}