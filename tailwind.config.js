module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          primary: '#4851D9',
          light: '#8B92E8',
          dark: '#2A3190',
        },
        mint: {
          primary: '#C3F0D8',
          light: '#E3F9EB',
          dark: '#8ADDB3',
        },
        coral: {
          primary: '#FF6B6B', 
          light: '#FF9999',
          dark: '#D14D4D',
        },
        slate: {
          primary: '#2D3748',
          light: '#4A5568',
          dark: '#1A202C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        'nf': '8px',
      },
      boxShadow: {
        'nf-sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'nf-md': '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'nf-lg': '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}; 