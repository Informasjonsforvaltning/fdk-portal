import { resolve } from 'path';
import { merge } from 'webpack-merge';
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';

import baseConfig from './base.config';

export default merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    filename: '[name].js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    before: app => app.get('/config.js', (_, res) => res.status(204).send()),
    historyApiFallback: {
      rewrites: [
        { from: /^\/maintenance/, to: '/maintenance.html' },
        { from: /./, to: '/index.html' }
      ]
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        include: [
          resolve(__dirname, '..', 'node_modules', 'ansi-styles'),
          resolve(__dirname, '..', 'node_modules', 'chalk'),
          resolve(__dirname, '..', 'node_modules', 'react-dev-utils')
        ]
      },
      {
        test: /\.(js|ts)x?$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new ErrorOverlayPlugin()]
});
