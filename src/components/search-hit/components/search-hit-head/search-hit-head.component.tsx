import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import SC from './styled';
import type { TextLanguage } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';
import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_EVENTS
} from '../../../../constants/constants';

interface Props {
  id?: string;
  type: SearchTypes;
  title?: Partial<TextLanguage>;
  subtitle?: React.ReactNode;
  isAuthoritative?: boolean;
}

const detailLinks = {
  [SearchTypes.dataset]: PATHNAME_DATASETS,
  [SearchTypes.dataservice]: PATHNAME_DATA_SERVICES,
  [SearchTypes.concept]: PATHNAME_CONCEPTS,
  [SearchTypes.informationModel]: PATHNAME_INFORMATIONMODELS,
  [SearchTypes.publicService]: PATHNAME_PUBLIC_SERVICES,
  [SearchTypes.event]: PATHNAME_EVENTS
};

export const SearchHitHead: FC<Props> = ({
  id,
  type,
  title,
  subtitle,
  isAuthoritative = false
}) => (
  <SC.Head inverted={type === SearchTypes.event}>
    <SC.HeadTypeIndicator>
      {type === SearchTypes.dataset && <SC.DatasetIcon />}
      {type === SearchTypes.dataservice && <SC.ApiIcon />}
      {type === SearchTypes.concept && <SC.ConceptIcon />}
      {type === SearchTypes.informationModel && <SC.InfomodIcon />}
      {type === SearchTypes.publicService && <SC.ServiceIcon />}
      {type === SearchTypes.event && <SC.ServiceIcon />}
    </SC.HeadTypeIndicator>
    <SC.HeadInformation>
      <SC.Header>
        {title && (
          <SC.Title>
            <Link to={`${detailLinks[type]}/${id}`}>
              {getTranslateText(title)}
            </Link>
          </SC.Title>
        )}
        {isAuthoritative && (
          <div title={localization.authoritativeDatasetTooltip}>
            <SC.AuthoritativeIcon />
          </div>
        )}
      </SC.Header>
      {subtitle && <SC.Type>{subtitle}</SC.Type>}
    </SC.HeadInformation>
  </SC.Head>
);
