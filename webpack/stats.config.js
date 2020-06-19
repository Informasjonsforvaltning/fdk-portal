import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import prodConfig from './prod.config';

export default merge.smart(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
      generateStatsFile: true
    })
  ]
});
