/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    main: './src/index.jsx',
    maintenance: './src/entrypoints/maintenance/index.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    historyApiFallback: {
      rewrites: [
        { from: /^\/maintenance/, to: '/maintenance.html' },
        { from: /./, to: '/index.html' }
      ]
    },
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
    new HtmlWebpackPlugin({
      entry: 'main',
      template: './src/index.html',
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
