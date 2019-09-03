const base = require("./webpack.base.config");

module.exports = {
  ...base(),
  entry: "./src/main.js"
};
