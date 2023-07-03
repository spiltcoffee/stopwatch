import baseConfig from "./webpack.base.config";
import { merge } from "webpack-merge";

export default merge(baseConfig(), {
  entry: "./src/main.ts",
  target: "electron-main",
});
