import baseConfig from "./webpack.base.config";
import { merge } from "webpack-merge";

export default merge(baseConfig({ base: "../" }), {
  target: "electron-renderer",
});
