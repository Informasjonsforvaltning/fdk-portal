import type {
  EnvironmentVariables,
  EuDataTheme,
  EuTheme,
  LosNode,
  LosTheme
} from '../../types';
import localization from '../../lib/localization';

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

export const buildFirstHarvestSortBody = ({ sortfield }: any) => {
  sortfield === 'FIRST_HARVESTED'
    ? { field: 'FIRST_HARVESTED', direction: 'DESC' }
    : undefined;
};
