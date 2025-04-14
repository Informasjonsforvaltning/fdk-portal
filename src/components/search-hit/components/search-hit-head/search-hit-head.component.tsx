import React, { FC } from 'react';
import Link from '@fellesdatakatalog/link';
import SC from './styled';
import type { Organization, TextLanguage } from '../../../../types';
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
import env from '../../../../env';

const { FDK_PORTAL_BASE_URI } = env;

interface Props {
  id?: string;
  type: SearchTypes;
  title?: Partial<TextLanguage>;
  subtitle?: React.ReactNode;
  isAuthoritative?: boolean;
  publisher?: Partial<Organization>;
}

const detailLinks = {
  [SearchTypes.dataset]: `${FDK_PORTAL_BASE_URI}${PATHNAME_DATASETS}`,
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
              <Link href={`${detailLinks[type]}/${id}`}>
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
