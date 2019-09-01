const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        use: "node-loader"
      },
      {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: "@marshallofsound/webpack-asset-relocator-loader",
          options: {
            outputAssetBase: "native_modules"
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "./[contenthash].[ext]"
          }
        }
      }
    ]
  },

  resolve: {
    extensions: [".vue", ".js"],
    alias: {
      vue: "vue/dist/vue.js"
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV === "production"
          ? "[name].[hash].css"
          : "[name].css",
      chunkFilename:
        process.env.NODE_ENV === "production" ? "[id].[hash].css" : "[id].css"
    })
  ]
};
