const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  // CSS and file (image) loaders
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images/',
                  publicPath: 'images/'
                }
              }
            ]
      }
    ],
  },
  // Below is needed for webpack-dev-server
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'guest-dashboard.html',
      template: './src/guest-dashboard.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'manager-dashboard.html',
      template: './src/manager-dashboard.html',
      chunks: ['app']
    })
  ],
  devServer: {
         contentBase: './dist'
  }
};
