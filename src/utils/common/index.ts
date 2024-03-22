import type {
  EnvironmentVariables,
  EuDataTheme,
  EuTheme,
  LosNode,
  LosTheme,
  SearchFilters
} from '../../types';
import localization from '../../lib/localization';
import { commaSeparatedStringToList } from '../../lib/stringUtils';

function assertIsDefined<T>(
  key: string,
  value: T
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Expected ${key} to be defined, but received ${value}`);
  }
}

export const validateEnv = (
  env: EnvironmentVariables
): EnvironmentVariables => {
  Object.entries(env).forEach(([key, value]) => assertIsDefined(key, value));
  return env;
};

export const isEuTheme = (
  theme: EuDataTheme | LosNode | EuTheme | LosTheme
): theme is EuTheme => {
  const { id, label, title, code } = theme as EuTheme;
  return !!id && !!code && (!!label || !!title);
};

export const isLosTheme = (theme: EuTheme | LosTheme): theme is LosTheme => {
  const { name, losPaths } = theme as LosTheme;
  return !!name && !!losPaths;
};

export const isLosNode = (theme: EuDataTheme | LosNode): theme is LosNode => {
  const { name, losPaths } = theme as LosNode;
  return !!name && !!losPaths;
};

export const translatePrefixedFormat = (format: string) => {
  const match = format.match(/(MEDIA_TYPE|FILE_TYPE|UNKNOWN)\s?(.*)/);
  return match
    ? `${localization.facet.formatType[match[1]]}${
        match[2] ? ` ${match[2]}` : ''
      }`
    : format;
};

interface Format {
  type: string;
  name: string;
}

export const parseFormats = (inputList: string[] | undefined): Format[] => {
  if (!inputList || inputList.length === 0) {
    return [];
  }

  return inputList
    .map(translatePrefixedFormat)
    .filter(format => {
      const splitItem = format.split(' ');
      return splitItem.length >= 2 && splitItem[1] !== 'null';
    })
    .map(format => {
      const splitItem = format.split(' ');
      const type = splitItem.shift()!;
      const name = splitItem.join(' ');
      return { type, name };
    });
};

export const cookieValue = (name: string) =>
  document.cookie
    .split('; ')
    .filter(row => row.startsWith(`${name}=`))
    .map(c => c.split('=')[1])[0];

const buildFirstHarvestSortBody = ({ sortfield }: any) => {
  sortfield === 'FIRST_HARVESTED'
    ? { field: 'FIRST_HARVESTED', direction: 'DESC' }
    : undefined;
};

const buildFilterSearchBody = ({
  opendata,
  accessrights,
  theme,
  spatial,
  provenance,
  losTheme,
  orgPath,
  format,
  relations,
  lastXDays,
  uris,
  uri
}: SearchFilters) => {
  const filters: Record<string, any> = {};

  const addFilter = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      filters[key] = { value };
    }
  };

  addFilter('openData', opendata);
  addFilter('accessRights', accessrights);
  addFilter('dataTheme', commaSeparatedStringToList(theme));
  addFilter('spatial', commaSeparatedStringToList(spatial));
  addFilter('provenance', commaSeparatedStringToList(provenance));
  addFilter('losTheme', commaSeparatedStringToList(losTheme));
  addFilter('orgPath', orgPath);
  addFilter('formats', commaSeparatedStringToList(format));
  addFilter('relations', relations);
  addFilter('lastXDays', lastXDays);
  addFilter('uri', uris);
  addFilter('uri', uri);

  return Object.keys(filters).length > 0 ? filters : undefined;
};

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  query: q,
  pagination: {
    page: page ? Number(page) : undefined,
    size: size ? Number(size) : undefined
  },
  sorting: buildFirstHarvestSortBody(params),
  filters: buildFilterSearchBody(params)
});
