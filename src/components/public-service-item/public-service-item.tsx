import React, { FC } from 'react';
import { compose } from 'redux';

import { SearchObject } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit } from '../search-hit/search-hit';
import localization from '../../lib/localization';

interface ExternalProps {
  publicService: Partial<SearchObject>;
}

interface Props extends ExternalProps {}

const PublicServiceItemPure: FC<Props> = ({
  publicService: { id = '', title = {}, description = {}, organization }
}) => (
  <SearchHit
    id={id}
    type={SearchTypes.publicService}
    title={title}
    publisher={organization}
    description={description}
    subtitle={localization.service}
  />
);

export const PublicServiceItem = compose<FC<ExternalProps>>()(
  PublicServiceItemPure
);
