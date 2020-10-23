import React, { memo, FC } from 'react';
import { compose } from 'redux';

import {
  withTranslations,
  Props as TranslationsProps,
  Tokens
} from '../../providers/translations';

interface ExternalProps {
  id: string;
  tokens?: Tokens;
}

interface Props extends ExternalProps, TranslationsProps {}

const Translation: FC<Props> = ({ translationsService, id, tokens }) => (
  <>{translationsService.translate(id, tokens)}</>
);

export default compose<FC<ExternalProps>>(memo, withTranslations)(Translation);
