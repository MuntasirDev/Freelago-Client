/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      
      backgroundImage: {
        'linear-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
    },
  },

  plugins: [
    require('daisyui'), 
  ],

  daisyui: {
    themes: ["light", "dark"],
  },
};