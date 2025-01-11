/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Inclut tous les fichiers Angular dans src/
    "./src/**/*.html", // Inclut tous les fichiers HTML dans src/
    "./src/**/*.ts", // Inclut tous les fichiers TypeScript dans src/
    "./src/app/authentification/**/*.html", // Inclut tous les fichiers HTML dans src/app/authentification/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
