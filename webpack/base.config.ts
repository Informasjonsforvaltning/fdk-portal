import { Configuration, ProvidePlugin } from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const configuration: Configuration = {
  stats: {
    errorDetails: false
  },
  entry: {
    main: './src/entrypoints/main/index.tsx',
    auth: './src/entrypoints/auth/index.ts',
    publishing: './src/entrypoints/publishing/index.tsx'
  },
  output: {
    path: resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    clean: true
  },
  resolve: {
    alias: {
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      'react/jsx-runtime': 'react/jsx-runtime.js'
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer')
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
              configFile: resolve(__dirname, '..', 'babel.config.js')
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve(__dirname, '..', 'tsconfig.json')
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
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true
            }
          }
        ]
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
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: [resolve(__dirname, '..', 'src', 'images')]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entrypoints/main/index.html',
      filename: 'index.html',
      favicon: './src/img/favicon.ico',
      base: '/',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './src/entrypoints/auth/index.html',
      filename: 'auth.html',
      favicon: './src/img/favicon.ico',
      base: '/',
      chunks: ['auth']
    }),
    new HtmlWebpackPlugin({
      template: './src/entrypoints/publishing/index.html',
      filename: 'publishing.html',
      favicon: './src/img/favicon.ico',
      base: '/',
      chunks: ['publishing']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].styles.css'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './src/img/*', to: './img' }]
    }),
    new ProvidePlugin({
      process: 'process'
    })
  ]
};

export default configuration;
