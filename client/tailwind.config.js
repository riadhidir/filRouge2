/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        op: {
          "0%": {opacity: 0},
          "100%": {opacity: 1}
        },
        height: {
          "0%": {height: '0px'},
          "100%": {height: '100px'}
        }
      },
      animation: {
        op: "op 0.3s ease-in-out forwards",
        height: "height 2s ease-in-out forwards"
      }
    },
  },
  plugins: [
    // require('flowbite/plugin'),
  
    require("tw-elements/dist/plugin.cjs")
  ],
  darkMode: "class"
}

