import _ from 'lodash';

import { normalizeAggregations } from '../lib/normalizeAggregations';
import { searchDataServices } from './search-fulltext-api/dataservices';

function getFromBucketArray(data, aggregation, key) {
  const buckets = _.get(data, ['aggregations', aggregation, 'buckets'], []);
  const bucket = buckets.find(
    bucket => bucket.key.toUpperCase() === key.toUpperCase()
  );
  return _.get(bucket, 'count', 0);
}

export function extractStats(data) {
  return {
    total: _.get(data, 'total', 0),
    newLastWeek: getFromBucketArray(data, 'firstHarvested', 'last7days'),
    openLicense: getFromBucketArray(data, 'openLicence', 'true'),
    notOpenLicense: getFromBucketArray(data, 'openLicence', 'false'),
    missingOpenLicense: getFromBucketArray(data, 'openLicence', 'MISSING'),
    openAccess: getFromBucketArray(data, 'openAccess', 'true'),
    notOpenAccess: getFromBucketArray(data, 'openAccess', 'false'),
    missingOpenAccess: getFromBucketArray(data, 'openAccess', 'MISSING'),
    freeUsage: getFromBucketArray(data, 'freeUsage', 'true'),
    notFreeUsage: getFromBucketArray(data, 'freeUsage', 'false'),
    missingFreeUsage: getFromBucketArray(data, 'freeUsage', 'MISSING'),
    formatCounts: _.get(data, ['aggregations', 'formats', 'buckets'], [])
  };
}

export const getDataServiceStats = orgPath =>
  searchDataServices({
    orgPath,
    size: 0,
    aggregations:
      'formats,orgPath,firstHarvested,publisher,openAccess,openLicence,freeUsage'
  })
    .then(normalizeAggregations)
    .then(extractStats);
