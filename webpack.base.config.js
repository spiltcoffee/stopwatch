const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const merge = require("webpack-merge");

module.exports = function(options) {
  options = merge(
    {
      base: "",
      relocate: true,
      flags: {
        PRODUCTION: process.env.NODE_ENV === "production",
        WEB: false
      }
    },
    options
  );

  return {
    mode: "none",
    module: {
      rules: [
        {
          test: /\.node$/,
          use: "node-loader"
        },
        options.relocate
          ? {
              test: /\.(m?js|node)$/,
              parser: { amd: false },
              use: {
                loader: "@marshallofsound/webpack-asset-relocator-loader",
                options: {
                  outputAssetBase: "native_modules"
                }
              }
            }
          : {},
        {
          test: /\.vue$/,
          use: "vue-loader"
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico|eot|woff2?|ttf|otf|wav|mp3|ogg)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[contenthash].[ext]",
              publicPath: options.base
            }
          }
        }
      ]
    },

    resolve: {
      extensions: [".vue", ".js"],
      alias: {
        vue: "vue/dist/vue.esm.js"
      }
    },

    plugins: [
      new webpack.DefinePlugin({
        FLAGS: options.flags
      }),

      new VueLoaderPlugin()
    ]
  };
};
