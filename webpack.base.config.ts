import webpack, { type Configuration } from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import { merge } from "webpack-merge";

const development = process.env.NODE_ENV !== "production";

interface ExtraWebpackOptions {
  base: string;
  relocate: boolean;
  flags: Record<Uppercase<string>, boolean>;
}

export default function (
  options: Partial<ExtraWebpackOptions> = {},
): Configuration {
  options = merge(
    {
      base: "",
      relocate: true,
      flags: { PRODUCTION: !development, WEB: false },
    },
    options,
  );

  return {
    mode: "none",
    module: {
      rules: [
        {
          test: /native_modules\/.+\.node$/,
          use: "node-loader",
        },
        options.relocate
          ? {
              test: /\.(m?js|node)$/,
              parser: { amd: false },
              use: {
                loader: "@vercel/webpack-asset-relocator-loader",
                options: {
                  outputAssetBase: "native_modules",
                },
              },
            }
          : {},
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                appendTsSuffixTo: [/\.vue$/],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico|wav|mp3|ogg)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[sha512:hash:6].[ext]",
              publicPath: options.base,
            },
          },
        },
      ],
    },

    resolve: {
      extensions: [".vue", ".ts", ".js"],
    },

    plugins: [
      new webpack.DefinePlugin({
        FLAGS: options.flags,
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: development,
      }),

      new webpack.ProvidePlugin({
        process: "process/browser",
      }),

      new VueLoaderPlugin(),
    ],
  };
}
