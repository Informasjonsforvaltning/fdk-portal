import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import SC from './styled';
import { TextLanguage } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';

interface Props {
  id: string;
  type: SearchTypes;
  title: Partial<TextLanguage>;
  isAuthoritative?: boolean;
}

export const SearchHitHead: FC<Props> = ({
  id,
  type,
  title,
  isAuthoritative = false
}) => (
  <SC.Head>
    <SC.HeadTypeIndicator>
      {type === SearchTypes.dataset && <SC.DatasetIcon />}
      {type === SearchTypes.api && <SC.ApiIcon />}
      {type === SearchTypes.concept && <SC.ConceptIcon />}
      {type === SearchTypes.informationModel && <SC.InfomodIcon />}
    </SC.HeadTypeIndicator>
    <SC.HeadInformation>
      <SC.Header>
        {title && (
          <SC.Title>
            <Link to={`/${SearchTypes[type]}s/${id}`}>
              {getTranslateText(title)}
            </Link>
          </SC.Title>
        )}
        {isAuthoritative && <SC.AuthoritativeIcon />}
      </SC.Header>

      <SC.Type>
        {type === SearchTypes.dataset && localization.datasetLabel}
        {type === SearchTypes.api && localization.apiLabel}
        {type === SearchTypes.concept && localization.conceptLabel}
        {type === SearchTypes.informationModel &&
          localization.informationModelLabel}
      </SC.Type>
    </SC.HeadInformation>
  </SC.Head>
);
