import path from "path";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import baseConfig from "./webpack.base.config";

export default merge(baseConfig({ relocate: false, flags: { WEB: true } }), {
  node: false,
  entry: "./src/renderer.ts",

  output: {
    path: path.join(__dirname, "out/web"),
  },

  resolve: {
    alias: {
      electron: path.join(__dirname, "src/utils/electron-mock.ts"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
  ],
});
