import React, { FC, memo } from 'react';
import { compose } from 'redux';

import SC from './styled';
import { TextLanguage } from '../../types';

interface Props {
  textLanguage?: Partial<TextLanguage>;
  selectedLanguage?: string;
  whiteBackground?: boolean;
}

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
          <SC.TextLanguageLabel $whiteBackground={!!whiteBackground}>
            {language}
          </SC.TextLanguageLabel>
        ))}
    </SC.TextLanguageCodesContainer>
  ) : null;

export default compose<FC<Props>>(memo)(LanguageIndicator);
