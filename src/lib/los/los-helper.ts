import keyBy from 'lodash/keyBy';
import { LosTheme } from '../../types';

export const getLosByKeys = (losItems: LosTheme[]) =>
  keyBy(
    losItems?.map(({ name: prefLabel, ...theRest }: LosTheme) => ({
      prefLabel,
      ...theRest
    })),
    (los: LosTheme) => los.losPaths?.[0]
  );
