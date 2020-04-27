import _ from 'lodash';

const normalizeBucketsArray = buckets =>
  buckets
    .map(({ key, doc_count, count }) =>
      doc_count || count
        ? {
            key,
            count: doc_count || count // support passing through already normalized data
          }
        : null
    )
    .filter(Boolean);

const normalizeBucketsObject = buckets =>
  Object.entries(buckets)
    .map(([key, { doc_count, count }]) =>
      doc_count || count
        ? {
            key,
            count: doc_count || count // support passing through already normalized data
          }
        : null
    )
    .filter(Boolean);

const normalizeAggregation = aggregation => {
  if (aggregation.doc_count || aggregation.value) {
    return { count: aggregation.doc_count || aggregation.value };
  }

  const { buckets } = aggregation;
  if (buckets && Array.isArray(buckets)) {
    return { buckets: normalizeBucketsArray(buckets) };
  }
  if (typeof buckets === 'object') {
    return { buckets: normalizeBucketsObject(buckets) };
  }
  return {};
};

export const normalizeAggregations = data => {
  const { aggregations } = data;
  if (aggregations) {
    const normalisedAggregations = _.mapValues(
      aggregations,
      normalizeAggregation
    );
    if (
      normalisedAggregations.accessRights &&
      normalisedAggregations.opendata
    ) {
      normalisedAggregations.accessRights.buckets.unshift({
        key: 'OPEN_DATA',
        count: normalisedAggregations.opendata.count
      });
    }
    return {
      ...data,
      aggregations: normalisedAggregations
    };
  }
  return data;
};
