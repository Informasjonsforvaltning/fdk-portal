import qs from 'qs';
import { PATHNAME_MAIN_PAGE, PATHNAME_SEARCH } from '../constants/constants';

export const renderSearchParams = searchParams =>
  qs.stringify(searchParams, { skipNulls: true, addQueryPrefix: true });

export const historyPushSearchParams = (history, searchParams) => {
  if (typeof history.push !== 'function') {
    throw new Error('History parameter must be a react-router history object');
  }

  if (history.location.pathname === PATHNAME_MAIN_PAGE) {
    return history.push(PATHNAME_SEARCH + renderSearchParams(searchParams));
  }

  return history.push(
    history.location.pathname + renderSearchParams(searchParams)
  );
};

export const parseSearchParams = location => {
  if (!location || !('search' in location)) {
    throw new Error(
      'Location parameter must be a react-router location object'
    );
  }
  return qs.parse(location.search, { ignoreQueryPrefix: true }) || {};
};
