import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';

import en from '../l10n/en.json';
import nb from '../l10n/nb.json';
import nn from '../l10n/nn.json';

interface LocaleStrings extends LocalizedStringsMethods {
  [key: string]: any;
}

const localization: LocaleStrings = new LocalizedStrings({
  nb,
  nn,
  en
});

export default localization;
