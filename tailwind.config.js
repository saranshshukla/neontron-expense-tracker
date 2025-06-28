// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: '#00ffff',
        bg: '#000000',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'], // Futuristic font
      },
      boxShadow: {
        'neon-lg': '0 0 8px rgba(0,255,255,0.7)',
      },
    },
  },
  plugins: [],
}
