/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blobito: '#4ade80',
        chispa: '#facc15',
        grunon: '#f87171',
        dormilon: '#60a5fa',
        glitchy: '#c084fc',
      },
    },
  },
  plugins: [],
}
