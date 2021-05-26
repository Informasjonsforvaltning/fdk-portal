import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { Configuration } from 'webpack';

import prodConfig from './prod.config';

const configuration: Configuration = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
      generateStatsFile: true
    })
  ]
});

export default configuration;
