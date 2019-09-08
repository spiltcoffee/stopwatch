const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./webpack.base.config");

module.exports = merge(base({ relocate: false }), {
  entry: "./src/renderer.js",

  output: {
    path: path.join(__dirname, "out/web")
  },

  resolve: {
    alias: {
      electron$: path.join(__dirname, "src/utils/electron-mock")
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      "flags.WEB": true
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html")
    })
  ]
});
