const base = require("./webpack.base.config");
const { merge } = require("webpack-merge");

module.exports = merge(base(), {
  entry: "./src/main.js",
});
