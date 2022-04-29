import { TextLanguage } from '../types';
import { LanguageCodes } from '../types/enums';
import localization from './localization';

export function isTextLanguageKey(
  language: string
): language is keyof TextLanguage {
  return language in LanguageCodes;
}

export function isTextLanguage(o: unknown): o is TextLanguage {
  if (typeof o === 'object' && o != null) {
    const keys = Object.keys(o);
    return keys.filter(key => key in LanguageCodes).length > 0;
  }
  return false;
}

export function getTranslateText(textObj?: unknown, language?: string) {
  const selectedLanguage = language || localization.getLanguage();

  if (typeof textObj === 'string') {
    return textObj;
  }

  if (!isTextLanguage(textObj)) {
    return null;
  }

  return (
    (isTextLanguageKey(selectedLanguage) && textObj[selectedLanguage]) ||
    textObj.nb ||
    textObj.no ||
    textObj.nn ||
    textObj.en ||
    textObj[''] ||
    null
  );
}

export function getTranslateTextWithLanguageCode(
  textObj?: Partial<TextLanguage> | string | null,
  language?: string
) {
  const selectedLanguage = language || localization.getLanguage();
  if (typeof textObj === 'string') {
    return textObj;
  }

  if (!isTextLanguage(textObj)) {
    return null;
  }

  return isTextLanguageKey(selectedLanguage) ? textObj[selectedLanguage] : null;
}
