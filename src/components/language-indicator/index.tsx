import React, { FC, memo } from 'react';
import { compose } from 'redux';

import SC from './styled';
import type { TextLanguage } from '../../types';

interface Props {
  textLanguage?: Partial<TextLanguage>;
  selectedLanguage?: string;
  whiteBackground?: boolean;
}

const languageTitle = (language: string) => {
  switch (language) {
    case 'en':
      return 'English';
    case 'nb':
      return 'Norsk bokmål';
    case 'nn':
      return 'Nynorsk';
    default:
      return '';
  }
};

const LanguageIndicator: FC<Props> = ({
  textLanguage,
  selectedLanguage,
  whiteBackground
}) =>
  textLanguage ? (
    <SC.TextLanguageCodesContainer $whiteBackground={!!whiteBackground}>
      {Object.keys(textLanguage)
        .filter(language => !selectedLanguage || language === selectedLanguage)
        .map(language => (
          <SC.TextLanguageLabel
            $whiteBackground={!!whiteBackground}
            title={languageTitle(language)}
          >
            {language}
          </SC.TextLanguageLabel>
        ))}
    </SC.TextLanguageCodesContainer>
  ) : null;

export default compose<FC<Props>>(memo)(LanguageIndicator);
