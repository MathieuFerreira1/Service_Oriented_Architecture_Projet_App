/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './apps/**/src/**/*.{html,ts}', // Inclure tous les fichiers HTML et TS dans toutes les applications
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}