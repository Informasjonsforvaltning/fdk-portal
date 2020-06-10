/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  context: path.join(__dirname),
  entry: {
    main: './src/entrypoints/main/index.tsx',
    maintenance: './src/entrypoints/maintenance/index.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new (class ChunksFromEntryPlugin {
      apply(compiler) {
        compiler.hooks.emit.tap('ChunksFromEntryPlugin', compilation => {
          compilation.hooks.htmlWebpackPluginAlterChunks.tap(
            'ChunksFromEntryPlugin',
            (_, { plugin }) =>
              compilation.entrypoints
                .get(plugin.options.entry)
                .chunks.map(chunk => ({
                  names: chunk.name ? [chunk.name] : [],
                  files: chunk.files.slice(),
                  size: chunk.modulesSize(),
                  hash: chunk.hash
                }))
          );
        });
      }
    })(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new HtmlWebpackPlugin({
      entry: 'main',
      template: './src/entrypoints/main/index.html',
      filename: 'index.html',
      inject: true
    }),
    new HtmlWebpackPlugin({
      entry: 'maintenance',
      template: './src/entrypoints/maintenance/index.html',
      filename: 'maintenance.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].styles.css'
    }),
    new CopyWebpackPlugin(
      [{ from: './src/img/*', to: './img', flatten: true }],
      {
        copyUnmodified: true
      }
    )
  ]
};
