const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: ['./src/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    historyApiFallback: true,
    before: app => app.get('/config.js', (_, res) => res.status(204).send())
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /(node_modules)/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: [path.resolve(__dirname, 'src', 'images')]
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ],
        include: [path.resolve(__dirname, 'src', 'images')]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000 } // Convert images < 10k to base64 strings
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CopyWebpackPlugin(
      [{ from: './src/img/*', to: './img', flatten: true }],
      {
        copyUnmodified: true
      }
    )
  ]
};
