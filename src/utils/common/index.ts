import type {
  EnvironmentVariables,
  EuDataTheme,
  EuTheme,
  LosNode,
  LosTheme,
  MediaTypeOrExtent,
  Relation,
  SearchFilters,
  SearchObject,
  SearchQuery
} from '../../types';
import localization from '../../lib/localization';
import { commaSeparatedStringToList } from '../../lib/stringUtils';
import { getConfig } from '../../config';
import { Entity } from '../../types/enums';

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

export const parseFormats = (
  inputList: string[] | undefined
): MediaTypeOrExtent[] => {
  if (!inputList || inputList.length === 0) {
    return [];
  }

  return inputList
    .filter(format => {
      const splitItem = format.split(' ');
      return splitItem.length >= 2 && splitItem[1] !== 'null';
    })
    .map(format => {
      const splitItem = format.split(' ');
      const type = splitItem.shift()!;
      const name = splitItem.join(' ');
      return { type, name, code: name };
    });
};

export const cookieValue = (name: string) =>
  document.cookie
    .split('; ')
    .filter(row => row.startsWith(`${name}=`))
    .map(c => c.split('=')[1])[0];

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
  uri
}: SearchFilters = {}) => {
  const filters: Record<string, any> = {};

  const addFilter = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      if (value === 'null') {
        filters[key] = { value: null };
      } else {
        filters[key] = { value };
      }
    }
  };

  addFilter('openData', opendata);
  addFilter('accessRights', accessrights);
  addFilter('dataTheme', commaSeparatedStringToList(theme));
  addFilter('spatial', commaSeparatedStringToList(spatial));
  addFilter('provenance', provenance);
  addFilter('losTheme', commaSeparatedStringToList(losTheme));
  addFilter('orgPath', orgPath);
  addFilter('formats', commaSeparatedStringToList(format));
  addFilter('relations', relations);
  addFilter('lastXDays', lastXDays);
  addFilter('uri', uri);

  return Object.keys(filters).length > 0 ? filters : undefined;
};

export const paramsToSearchBody = ({
  q,
  page,
  size,
  sortfield,
  ...filters
}: SearchQuery) => ({
  query: q,
  pagination: {
    page: page ? Number(page) : undefined,
    size: size ? Number(size) : undefined
  },
  sort: sortfield ? { field: sortfield, direction: 'desc' } : undefined,
  filters: buildFilterSearchBody(filters),
  ...(!!getConfig().filterTransportDatasets && { profile: 'TRANSPORT' })
});

const getRelationType = (
  uri: string,
  relations?: Relation[]
): string | undefined => {
  const currentRelation =
    relations && relations.find(relation => relation.uri === uri);
  return currentRelation ? currentRelation.type : undefined;
};

export const filterRelations = (
  relations: SearchObject[],
  searchType: Entity,
  relationType?: string,
  parentUri?: string
): SearchObject[] =>
  relations.filter(
    relation =>
      !searchType ||
      (relation.searchType === searchType &&
        (!relationType ||
          !parentUri ||
          getRelationType(parentUri, relation.relations) === relationType))
  );
