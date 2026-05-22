/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#020a0f',
        surface: '#030d14',
        border: '#0a2030',
        accent: '#00b4ff',
        muted: '#1a4a6a',
        foreground: '#a0c8e0',
        danger: '#ff6030',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
      }
    },
  },
  plugins: [],
}