import React, { FC } from 'react';

import { Api } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit, SearchHitOpenData } from '../search-hit/search-hit';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import PublicIconBase from '../../images/icon-access-open-md.svg';
import localization from '../../lib/localization';

interface Props {
  api: Api;
}

export const ApiItem: FC<Props> = ({
  api: {
    id,
    title,
    description,
    publisher,
    nationalComponent,
    isOpenAccess,
    isOpenLicense,
    isFree
  }
}) => {
  return (
    <SearchHit
      id={id}
      type={SearchTypes.api}
      title={title}
      publisher={publisher}
      description={description || null}
      isAuthoritative={nationalComponent}
    >
      {isOpenAccess && isOpenLicense && isFree && (
        <SearchHitOpenData>
          <RoundedTag>
            <PublicIconBase />
            <span>{localization.openData}</span>
          </RoundedTag>
        </SearchHitOpenData>
      )}
    </SearchHit>
  );
};
