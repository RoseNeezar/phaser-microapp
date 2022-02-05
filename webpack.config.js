const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const package = require("./package.json");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/js/bootstrap.ts",
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 3010,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|json)$/i,
        type: "javascript/auto",
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "phaser",
  //         enforce: true,
  //         chunks: "initial",
  //       },
  //     },
  //   },
  // },
  resolve: {
    extensions: [".js", ".ts"],
  },
  // output: {
  //   path: path.resolve(__dirname, "./dist"),
  //   filename: "[name].[chunkhash].js",
  //   chunkFilename: "[name].[chunkhash].js",
  //   clean: true,
  // },
  plugins: [
    new ModuleFederationPlugin({
      name: "game",
      filename: "remoteEntry.js",
      exposes: {
        "./Game": "./src/js/index.ts",
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      hot: true,
    }),
  ],
};
