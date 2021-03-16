
var path = require('path');
var babel = require('babel-polyfill');  
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: "development",
  devtool: "source-map",
  entry: {
    app: ['babel-polyfill', "./main.js"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './index.html'
  }),
],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      { 
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ] 
      }
    ],
  }
}