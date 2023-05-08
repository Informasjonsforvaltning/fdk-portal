import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import type { DataService } from '../../types';
import { MediaTypeOrExtentType, SearchTypes } from '../../types/enums';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';
import {
  SearchHit,
  SearchHitFormats,
  SearchHitOpenData
} from '../search-hit/search-hit';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import PublicIconBase from '../../images/icon-access-open-md-v2.svg';
import localization from '../../lib/localization';

interface Props {
  dataService: Partial<DataService>;
}

export const DataServiceItem: FC<Props> = ({
  dataService: {
    id,
    title,
    description,
    fdkFormat,
    publisher,
    nationalComponent,
    isOpenAccess,
    isOpenLicense,
    isFree
  }
}) => (
  <SearchHit
    id={id}
    type={SearchTypes.dataservice}
    title={title}
    publisher={publisher}
    description={description || null}
    isAuthoritative={nationalComponent}
    subtitle={localization.apiLabel}
  >
    {isOpenAccess && isOpenLicense && isFree && (
      <SearchHitOpenData>
        <div title={String(localization.openDataTooltip)}>
          <RoundedTag>
            <PublicIconBase />
            <span>{localization.openApi}</span>
          </RoundedTag>
        </div>
      </SearchHitOpenData>
    )}
    {fdkFormat && (
      <SearchHitFormats>
        {fdkFormat
          .filter(
            format =>
              format.name && format.type !== MediaTypeOrExtentType.UNKNOWN
          )
          .sort((a, b) => `${a.name}`.localeCompare(`${b.name}`))
          .map((format, index) => (
            <RouteLink
              key={`format-${format.name}-${index}`}
              to={patchSearchQuery('format', `${format.type} ${format.name}`)}
            >
              <span>{`${format.name}`}</span>
            </RouteLink>
          ))}
      </SearchHitFormats>
    )}
  </SearchHit>
);
