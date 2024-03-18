import React, { FC } from 'react';
// import { Link as RouteLink } from 'react-router-dom';

import type { SearchObject } from '../../types';
import {
  // MediaTypeOrExtentType,
  SearchTypes
} from '../../types/enums';
// import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';
import {
  SearchHit
  // SearchHitFormats,
  // SearchHitOpenData
} from '../search-hit/search-hit';
// import { RoundedTag } from '../rounded-tag/rounded-tag.component';
// import PublicIconBase from '../../images/icon-access-open-md-v2.svg';
import localization from '../../lib/localization';

interface Props {
  dataService: Partial<SearchObject>;
}

export const DataServiceItem: FC<Props> = ({
  dataService: {
    id,
    title,
    description,
    // fdkFormatPrefixed,
    organization
  }
}) => (
  <SearchHit
    id={id}
    type={SearchTypes.dataservice}
    title={title}
    publisher={organization}
    description={description || null}
    subtitle={localization.apiLabel}
  >
    {/* 
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
    )} */}
  </SearchHit>
);
