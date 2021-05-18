import { Configuration, ProvidePlugin } from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const configuration: Configuration = {
  entry: {
    main: './src/entrypoints/main/index.tsx',
    publishing: './src/entrypoints/publishing/index.tsx',
    maintenance: './src/entrypoints/maintenance/index.tsx'
  },
  output: {
    path: resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer')
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      hidePathInfo: true,
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,
      automaticNameDelimiter: '.',
      cacheGroups: {
        default: false,
        mainVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: 'main.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'main'
        },
        publishingVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: 'publishing.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'publishing'
        },
        maintenanceVendors: {
          test: ({ resource = '' }: any) => resource.includes('node_modules'),
          name: 'maintenance.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'maintenance'
        }
      }
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
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
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
      template: './src/entrypoints/publishing/index.html',
      filename: 'publishing.html',
      favicon: './src/img/favicon.ico',
      base: '/',
      chunks: ['publishing']
    }),
    new HtmlWebpackPlugin({
      template: './src/entrypoints/maintenance/index.html',
      filename: 'maintenance.html',
      favicon: './src/img/favicon.ico',
      base: '/',
      chunks: ['maintenance']
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
