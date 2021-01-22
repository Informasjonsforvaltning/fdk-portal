import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import SC from './styled';
import { TextLanguage } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';
import ReactTooltipSC from '../../../tooltip/styled';
import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES
} from '../../../../constants/constants';

interface Props {
  id?: string;
  type: SearchTypes;
  title?: Partial<TextLanguage>;
  isAuthoritative?: boolean;
}

const detailLinks = {
  [SearchTypes.dataset]: PATHNAME_DATASETS,
  [SearchTypes.dataservice]: PATHNAME_DATA_SERVICES,
  [SearchTypes.concept]: PATHNAME_CONCEPTS,
  [SearchTypes.informationModel]: PATHNAME_INFORMATIONMODELS,
  [SearchTypes.publicService]: PATHNAME_PUBLIC_SERVICES
};

export const SearchHitHead: FC<Props> = ({
  id,
  type,
  title,
  isAuthoritative = false
}) => (
  <SC.Head>
    <SC.HeadTypeIndicator>
      {type === SearchTypes.dataset && <SC.DatasetIcon />}
      {type === SearchTypes.dataservice && <SC.ApiIcon />}
      {type === SearchTypes.concept && <SC.ConceptIcon />}
      {type === SearchTypes.informationModel && <SC.InfomodIcon />}
      {type === SearchTypes.publicService && <SC.ServiceIcon />}
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
          <div data-tip={localization.authoritativeDatasetTooltip}>
            <SC.AuthoritativeIcon />
            <ReactTooltipSC.ReactTooltipStyled effect="solid" multiline />
          </div>
        )}
      </SC.Header>

      <SC.Type>
        {type === SearchTypes.dataset && localization.datasetLabel}
        {type === SearchTypes.dataservice && localization.apiLabel}
        {type === SearchTypes.concept && localization.conceptLabel}
        {type === SearchTypes.informationModel &&
          localization.informationModelLabel}
        {type === SearchTypes.publicService && localization.serviceLabel}
      </SC.Type>
    </SC.HeadInformation>
  </SC.Head>
);
