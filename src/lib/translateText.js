import localization from './localization';

export function getTranslateText(textObj, language) {
  const selectedLanguage = language || localization.getLanguage();
  if (typeof textObj === 'string') {
    return textObj;
  }

  if (textObj === null || typeof textObj !== 'object') {
    return null;
  }

  return (
    textObj[selectedLanguage] ||
    textObj.nb ||
    textObj.no ||
    textObj.nn ||
    textObj.en ||
    textObj[''] ||
    null
  );
}

export function getTranslateTextWithLanguageCode(textObj, language) {
  const selectedLanguage = language || localization.getLanguage();
  if (typeof textObj === 'string') {
    return textObj;
  }

  return textObj?.[selectedLanguage] || null;
}
