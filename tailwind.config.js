const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".card": {
          "background-color": "#fff",
          "border-radius": ".25rem",
          "box-shadow": "0 2px 4px rgba(0,0,0,0.2)",
        },
      });
    }),
  ],
};
