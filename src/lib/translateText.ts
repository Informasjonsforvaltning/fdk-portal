import { TextLanguage } from '../types';
import { LanguageCodes } from '../types/enums';
import localization from './localization';

export function isTextLanguageKey(
  language: string
): language is keyof TextLanguage {
  return language in LanguageCodes;
}

export function getTranslateText(
  textObj?: Partial<TextLanguage> | string | null,
  language?: string
) {
  const selectedLanguage = language || localization.getLanguage();
  if (typeof textObj === 'string') {
    return textObj;
  }

  if (textObj === null || typeof textObj !== 'object') {
    return undefined;
  }

  return isTextLanguageKey(selectedLanguage)
    ? textObj[selectedLanguage]
    : textObj.nb ||
        textObj.no ||
        textObj.nn ||
        textObj.en ||
        textObj[''] ||
        undefined;
}

export function getTranslateTextWithLanguageCode(
  textObj?: Partial<TextLanguage> | string | null,
  language?: string
) {
  const selectedLanguage = language || localization.getLanguage();
  if (typeof textObj === 'string') {
    return textObj;
  }

  if (textObj === null || typeof textObj !== 'object') {
    return undefined;
  }

  return isTextLanguageKey(selectedLanguage)
    ? textObj[selectedLanguage]
    : undefined;
}
