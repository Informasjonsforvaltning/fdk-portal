import React, { FC, HTMLAttributes } from 'react';

import SC from './styled';
import { Language } from '../../types';
import translations from '../../lib/localization';

export interface Props extends HTMLAttributes<HTMLElement> {
  languages: Language[];
  title?: string;
  toggleLanguage: (code: string) => void;
}

const LanguagePicker: FC<Props> = ({ languages, toggleLanguage }) => {
  const languageTranslations: { [key: string]: string } = {
    nb: translations.lang['norwegian-nb'],
    nn: translations.lang['norwegian-nn'],
    en: translations.lang['english-en']
  };

  return (
    <SC.LanguagePicker>
      {languages.map(({ code, selected = false, disabled = false }, index) => (
        <SC.LanguageButton
          key={`${code}-${index}`}
          selected={selected}
          disabled={disabled}
          onClick={() => toggleLanguage(code)}
        >
          {selected && <SC.CheckedIcon />}
          {languageTranslations[code]}
        </SC.LanguageButton>
      ))}
    </SC.LanguagePicker>
  );
};

export default LanguagePicker;
