import React, { FC } from 'react';
import parse from 'html-react-parser';

import { convertToSanitizedHtml } from '../../../../lib/markdown-converter';
import SC from './styled';
import { Language, TextLanguage } from '../../../../types';
import {
  getTranslateText,
  getTranslateTextWithLanguageCode
} from '../../../../lib/translateText';

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
        {convertToMarkUp
          ? parse(convertToSanitizedHtml(getTranslateText(item)))
          : getTranslateText(item)}
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
