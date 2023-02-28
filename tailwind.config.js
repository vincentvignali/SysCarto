// See https://tailwindcss.com/docs/guides/create-react-app
// for more information

// const colors = require('tailwindcss/colors');
const zendesk = require('@zendeskgarden/tailwindcss')({
      includeBedrock: false // defaults to true
    })

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "white20": "rgba(255, 255, 255, 0.2)",
        "black02": "rgba(0, 0, 0, 0.02)",
        // "darky" :  garden.PALETTE.kale,
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
      }
    },
    fontFamily: {
      'situation': ['"Calps Black"'],
    }
  },
  plugins: [zendesk, "prettier"],
};
