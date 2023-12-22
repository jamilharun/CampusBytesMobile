

module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}", 
        // "./Screens/**/*.{js,jsx,ts,tsx}",
        // "./Slices/**/*.{js,jsx,ts,tsx}",
        // "./Components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
        //   gray: colors.gray,
          'white': '#ffffff',
          'EacColor': {
            'BlackPearl': '#03071E',
            'RedOxide': '#6a040f',
            'DeepFir': '#dc2F02',
            'TahitiGold': '#F48C06',
            'SelectiveYellow': '#FFBA08'
          }
          
    
        },
        fontFamily: {
          // 'Poppins': 'Poppins, sans-serif'
        }
    },
    plugin: []
}