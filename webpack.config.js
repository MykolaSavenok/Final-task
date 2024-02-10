const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
   entry: './client/src/index.jsx',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[fullhash].js',
      clean: true,
      publicPath: "/",
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './client/src/index.html'
      }),
      new MiniCssExtractPlugin({
         filename: '[name]-[fullhash].css',
      }),
      new CopyPlugin({
         patterns: [
            { from: "client/static", to: "static" }
         ],
      }),
   ],
   devServer: {
      port: 9999,
      historyApiFallback: true,
      static: {
         directory: path.join(__dirname, 'dist')
      }
   },
   resolve: {
      extensions: [".jsx", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.jsx$/,
            exclude: /node_module/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: [
                     '@babel/preset-env',
                     '@babel/preset-react'
                  ]
               }
            }
         },
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               {
                  loader: "sass-loader",
                  options: {
                     sassOptions: {
                        includePaths: ["node_modules"],
                     },
                  },
               },
            ],
         },
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
         },
         {
            test: /\.svg$/,
            use: 'svg-loader',
         },
         {
            test: /\.(png|gif|svg)$/i,
            use: [
               {
                  loader: "file-loader",
                  options: {
                     name: "[name].[ext]",
                     outputPath: "images/",
                  },
                  loader: 'image-webpack-loader',
                  options: {
                     mozjpeg: {
                        progressive: true,
                        quality: 65,
                     },
                     optipng: {
                        enabled: false,
                     },
                     svgo: {
                        enabled: true,
                     },
                     jpegtran: {
                        progressive: true,
                     },
                  },
               },
            ],
         },
      ]
   },
   optimization: {
      minimizer: [new CssMinimizerPlugin()],
   },
};