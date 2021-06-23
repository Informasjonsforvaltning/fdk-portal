import React, { FC } from 'react';

import SC from './styled';
import { Language, TextLanguage } from '../../../../types';
import {
  getTranslateText,
  getTranslateTextWithLanguageCode
} from '../../../../lib/translateText';
import Markdown from '../../../markdown';

export interface Props {
  languages: Language[];
  text?: Partial<TextLanguage>;
  convertToMarkUp?: boolean;
  useFallback?: boolean;
  skippedLanguages?: string[];
}

const renderTextField = ({
  languages,
  text,
  convertToMarkUp,
  useFallback,
  skippedLanguages
}: Props) => {
  const selectedLanguages = languages.filter(
    ({ code, selected }) => selected && !skippedLanguages?.includes(code)
  );
  const textArray: any = [];

  selectedLanguages.forEach(({ code }) => {
    if (getTranslateTextWithLanguageCode(text, code)) {
      textArray.push({
        [code]: getTranslateTextWithLanguageCode(text, code)
      });
    }
  });

  if (
    selectedLanguages?.length === 0 ||
    (textArray.length === 0 && useFallback)
  ) {
    textArray.push(text);
  }

  return (
    textArray.length > 0 &&
    textArray.map((item: any, index: number) => (
      <SC.LanguageField key={index}>
        <SC.LanguageIndicator>{Object.keys(item)}</SC.LanguageIndicator>
        {convertToMarkUp ? (
          <Markdown>{getTranslateText(item)}</Markdown>
        ) : (
          getTranslateText(item)
        )}
      </SC.LanguageField>
    ))
  );
};

const MultiLingualField: FC<Props> = ({
  languages,
  text = {},
  convertToMarkUp = false,
  useFallback = true,
  skippedLanguages = []
}) => (
  <SC.MultiLingualField>
    {renderTextField({
      languages,
      text,
      convertToMarkUp,
      useFallback,
      skippedLanguages
    })}
  </SC.MultiLingualField>
);

export default MultiLingualField;
