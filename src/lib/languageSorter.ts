import { Language } from '../providers/translations';
import type { TextLanguage } from '../types';

const priorities: Record<string, number> = {
  [Language.NB]: 1,
  [Language.NN]: 2,
  [Language.EN]: 3
};

export const languageSorter = (languageArray: Partial<TextLanguage>[]) =>
  languageArray.sort((a: Partial<TextLanguage>, b: Partial<TextLanguage>) => {
    const aKey = Object.keys(a)[0];
    const bKey = Object.keys(b)[0];

    if (!(aKey in priorities)) {
      return 1;
    }

    if (!(bKey in priorities)) {
      return -1;
    }

    return priorities[aKey] > priorities[bKey] ? 1 : -1;
  });
