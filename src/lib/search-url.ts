import qs from 'qs';

import localization from './localization';
import { Filter } from '../types/enums';

export enum SearchSet {
  ALL = '',
  DATASETS = 'datasets',
  DATA_SERVICES = 'data-services',
  CONCEPTS = 'concepts',
  INFORMATION_MODELS = 'information-models',
  SERVICES_AND_EVENTS = 'services-and-events'
}

export type SearchQuery = Partial<Record<Filter, string | undefined>>;

const FRONTEND_LOCALES = ['nb', 'nn', 'en'];

const LIST_PARAMS: [Filter, string][] = [
  [Filter.ORGPATH, 'orgPath'],
  [Filter.ACCESSRIGHTS, 'access'],
  [Filter.PROVENANCE, 'provenance'],
  [Filter.FORMAT, 'format'],
  [Filter.LOS, 'losTheme'],
  [Filter.THEME, 'dataTheme']
];

/** Locale segment for links to pages served by fdk-frontend (`/{locale}/...`). */
export const frontendLocale = (): string => {
  const language = localization.getLanguage();
  return FRONTEND_LOCALES.includes(language) ? language : 'nb';
};

const splitValues = (value?: string): string[] =>
  (value ?? '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);

const appendValues = (
  params: URLSearchParams,
  key: string,
  values: string[]
) => {
  if (values.length === 0) {
    return;
  }
  const existing = splitValues(params.get(key) ?? undefined);
  params.set(key, [...new Set([...existing, ...values])].join(','));
};

export const parseSearchQuery = (search?: string): SearchQuery => {
  const parsed = qs.parse(search ?? '', { ignoreQueryPrefix: true });
  return Object.values(Filter).reduce<SearchQuery>((query, filter) => {
    const value = parsed[filter];
    return typeof value === 'string' ? { ...query, [filter]: value } : query;
  }, {});
};

export const buildSearchUrl = (
  set: SearchSet,
  query: SearchQuery = {}
): string => {
  const params = new URLSearchParams();

  const q = query[Filter.Q]?.trim();
  if (q) {
    params.set('q', q);
  }

  if (query[Filter.OPENDATA] === 'true') {
    appendValues(params, 'access', ['true']);
  }

  LIST_PARAMS.forEach(([filter, param]) =>
    appendValues(params, param, splitValues(query[filter]))
  );

  const lastXDays = query[Filter.LASTXDAYS]?.trim();
  if (lastXDays) {
    params.set('lastXDays', lastXDays);
    params.set('sort', 'firstHarvestedDesc');
  }

  const path = set
    ? `/${frontendLocale()}/search/${set}`
    : `/${frontendLocale()}/search`;
  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};
