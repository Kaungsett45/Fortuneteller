/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily:{
          playwrite: ['"Playwrite US Trad"', 'serif'],
          modern: ['"Playwrite US Modern"', 'serif'],
      }
    },
  },
  plugins: [],
}

