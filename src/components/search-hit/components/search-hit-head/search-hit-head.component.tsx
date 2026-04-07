import React, { FC } from 'react';
import SC from './styled';
import type { Organization, TextLanguage } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';
import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_EVENTS
} from '../../../../constants/constants';
import { getDataServiceDetailUrl } from '../../../../utils/common';

interface Props {
  id?: string;
  type: SearchTypes;
  title?: Partial<TextLanguage>;
  subtitle?: React.ReactNode;
  isAuthoritative?: boolean;
  publisher?: Partial<Organization>;
}

const detailLinks = {
  [SearchTypes.dataset]: PATHNAME_DATASETS,
  [SearchTypes.concept]: PATHNAME_CONCEPTS,
  [SearchTypes.informationModel]: PATHNAME_INFORMATIONMODELS,
  [SearchTypes.publicService]: PATHNAME_PUBLIC_SERVICES,
  [SearchTypes.event]: PATHNAME_EVENTS
};

const buildDetailHref = (type: SearchTypes, id?: string): string => {
  if (type === SearchTypes.dataservice) {
    return getDataServiceDetailUrl(id ?? '');
  }
  return `${detailLinks[type as keyof typeof detailLinks]}/${id}`;
};

export const SearchHitHead: FC<Props> = ({
  id,
  type,
  title,
  subtitle,
  isAuthoritative = false,
  publisher
}) => {
  const { title: publisherTitle, name } = publisher || {};

  return (
    <SC.Head inverted={type === SearchTypes.event}>
      <div>
        <SC.Header>
          {title && (
            <SC.Title>
              <a href={buildDetailHref(type, id)}>
                {getTranslateText(title)}
              </a>
            </SC.Title>
          )}
          {isAuthoritative && (
            <div title={localization.authoritativeDatasetTooltip}>
              <SC.AuthoritativeIcon />
            </div>
          )}
        </SC.Header>
        {subtitle && <SC.Type>{subtitle}</SC.Type>}
        {(publisherTitle || name) && (
          <>
            <span>{subtitle ? ' - ' : ''}</span>
            <span>{getTranslateText(publisherTitle) || name}</span>
          </>
        )}
      </div>
    </SC.Head>
  );
};
