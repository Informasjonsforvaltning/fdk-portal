import qs from 'qs';

/**
 * Returns param from url, if exists.
 * @returns {null}
 */
export function getParamFromUrl(param) {
  const queryObj = qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  });
  if (queryObj && queryObj[param]) {
    return queryObj[param];
  }
  return null;
}

export function getParamFromLocation(location, param) {
  const queryObj = qs.parse(location && location.search, {
    ignoreQueryPrefix: true
  });

  return queryObj && queryObj[param];
}

export function patchSearchQuery(key, value) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  query[key] = [...new Set([...(query[key] || '').split(','), value])]
    .filter(Boolean)
    .join();
  return qs.stringify(query, { addQueryPrefix: true });
}

export function patchListOfSearchQuery(list) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  return qs.stringify({ ...query, ...list }, { addQueryPrefix: true });
}
