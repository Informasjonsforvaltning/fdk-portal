import React, { FC } from 'react';

import { DataService } from '../../types';
import { SearchTypes } from '../../types/enums';
import {
  SearchHit,
  SearchHitFormats,
  SearchHitOpenData
} from '../search-hit/search-hit';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import PublicIconBase from '../../images/icon-access-open-md.svg';
import localization from '../../lib/localization';
import ReactTooltipSC from '../tooltip/styled';

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
  >
    {isOpenAccess && isOpenLicense && isFree && (
      <SearchHitOpenData>
        <div data-tip={localization.openApiTooltip}>
          <RoundedTag>
            <PublicIconBase />
            <span>{localization.openApi}</span>
          </RoundedTag>
        </div>
        <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
      </SearchHitOpenData>
    )}
    {fdkFormat && (
      <SearchHitFormats>
        {[...new Set(fdkFormat.map(format => format.name))]
          .sort()
          .map((format, index) => (
            <span key={`format-${format}-${index}`}>{`${format}`}</span>
          ))}
      </SearchHitFormats>
    )}
  </SearchHit>
);
