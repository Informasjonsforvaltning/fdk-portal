import merge from 'webpack-merge';

import baseConfig from './base.config';

export default merge.smart(baseConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      maxSize: 40000,
      cacheGroups: {
        mainVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: module =>
            `main.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'main'
        },
        maintenanceVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: module =>
            `maintenance.vendor.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`,
          chunks: ({ name }) => name === 'maintenance'
        }
      }
    }
  }
});
