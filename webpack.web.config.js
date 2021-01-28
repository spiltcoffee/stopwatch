const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./webpack.base.config");

const baseOptions = {
  relocate: false,
  flags: {
    WEB: true,
  },
};

module.exports = merge(base(baseOptions), {
  node: false,
  entry: "./src/renderer.js",

  output: {
    path: path.join(__dirname, "out/web"),
  },

  resolve: {
    alias: {
      electron$: path.join(__dirname, "src/utils/electron-mock"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
  ],
});
