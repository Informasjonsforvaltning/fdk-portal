import { resolve } from 'path';
import {
  mergeWithCustomize,
  customizeArray,
  CustomizeRule
} from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration } from 'webpack';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';

import baseConfig from './base.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const deps = require('../package.json').dependencies;

const configuration: Configuration = mergeWithCustomize({
  customizeArray: customizeArray({
    'module.rules': CustomizeRule.Replace
  })
})(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    hot: true,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // onBeforeSetupMiddleware
      devServer.app.get('/config.js', (_, res) => res.status(204).send());

      return middlewares;
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/publishing/, to: '/publishing.html' },
        { from: /^\/auth/, to: '/auth.html' },
        { from: /./, to: '/index.html' }
      ]
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: resolve(__dirname, '..', 'babel.config.js'),
              plugins: ['react-refresh/babel']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(__dirname, '..', 'tsconfig.json'),
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true
            }
          }
        ],
        include: [resolve(__dirname, '..', 'src', 'images')]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images'
            }
          }
        ]
      },
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
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: [resolve(__dirname, '..', 'src', 'images')]
      }
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'portal',
      remotes: {
        sparql_gui:
          'sparql_gui@https://sparql.staging.fellesdatakatalog.digdir.no/sparql/remoteEntry.js'
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        'react-dom': { singleton: true, requiredVersion: deps.react }
      }
    })
  ]
});

export default configuration;
