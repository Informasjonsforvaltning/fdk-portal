import React, { FC } from 'react';

import { PublicService } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit } from '../search-hit/search-hit';

interface Props {
  publicService: Partial<PublicService>;
}

export const PublicServiceItem: FC<Props> = ({
  publicService: {
    id = '',
    title = {},
    description = {},
    hasCompetentAuthority = []
  }
}) => {
  return (
    <SearchHit
      id={id}
      type={SearchTypes.publicService}
      title={title}
      publisher={hasCompetentAuthority?.[0]}
      description={description}
    />
  );
};
