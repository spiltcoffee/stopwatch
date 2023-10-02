import webpackMainConfig from "./webpack.main.config";
import webpackRendererConfig from "./webpack.renderer.config";

export default {
  packagerConfig: {
    asar: true,
    appCopyright: "MIT License, copyright SpiltCoffee 2019",
    icon: "./src/favicon.ico",
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "VRStopwatch",
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "spiltcoffee",
          name: "stopwatch",
        },
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        mainConfig: webpackMainConfig,
        renderer: {
          config: webpackRendererConfig,
          entryPoints: [
            {
              html: "./src/index.html",
              js: "./src/renderer.ts",
              name: "main_window",
            },
          ],
        },
      },
    },
  ],
};
