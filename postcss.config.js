module.exports = {
  plugins: [
    require("postcss-url")({ url: "inline" }),
    require("postcss-import")({
      plugins: [require("postcss-url")({ url: "inline" })]
    }),
    require("tailwindcss")(),
    require("cssnano")()
  ]
};
