import React, { FC } from 'react';

import SC from './styled';
import { TextLanguage } from '../../../../types';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';

interface Props {
  description: Partial<TextLanguage>;
}

export const Description: FC<Props> = ({ description }) => (
  <SC.ModelDescription>
    <SC.DescriptionField>
      <strong>{localization.description}:</strong>
      {getTranslateText(description)}
    </SC.DescriptionField>
  </SC.ModelDescription>
);
