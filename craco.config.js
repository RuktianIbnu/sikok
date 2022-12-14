const { ESLINT_MODES } = require("@craco/craco");
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  eslint: {
    configure: {
      rules: {
        "no-unused-vars": "off",
      },
    },
  },
};
