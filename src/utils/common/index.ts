import type { EnvironmentVariables, EuTheme, LosTheme } from '../../types';
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

export const isEuTheme = (theme: EuTheme | LosTheme): theme is EuTheme => {
  const { id, label, title, code } = theme as EuTheme;
  return !!id && !!code && (!!label || !!title);
};

export const isLosTheme = (theme: EuTheme | LosTheme): theme is LosTheme => {
  const { uri, name, losPaths } = theme as LosTheme;
  return !!uri && !!name && !!losPaths;
};

export const translatePrefixedFormat = (format: string) => {
  const match = format.match(/(MEDIA_TYPE|FILE_TYPE|UNKNOWN)\s?(.*)/);
  return match
    ? `${localization.facet.formatType[match[1]]}${
        match[2] ? ` ${match[2]}` : ''
      }`
    : format;
};
