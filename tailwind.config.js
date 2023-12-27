// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'green-500': '#38a169', // Custom green color
      },
    },
  },
  variants: {},
  plugins: [],
}
