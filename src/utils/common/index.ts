import type { EnvironmentVariables, EuTheme, LosTheme } from '../../types';

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
  const { id, title, code } = theme as EuTheme;
  return !!id && !!title && !!code;
};

export const isLosTheme = (theme: EuTheme | LosTheme): theme is LosTheme => {
  const { uri, name, losPaths } = theme as LosTheme;
  return !!uri && !!name && !!losPaths;
};
