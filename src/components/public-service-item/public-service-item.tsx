import React, { FC } from 'react';
import { compose } from 'redux';

import { SearchObject } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit } from '../search-hit/search-hit';
import withEventTypes, { Props as EventTypesProps } from '../with-event-types';
import localization from '../../lib/localization';

interface ExternalProps {
  publicService: Partial<SearchObject>;
}

interface Props extends ExternalProps, EventTypesProps {}

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

export const PublicServiceItem = compose<FC<ExternalProps>>(withEventTypes)(
  PublicServiceItemPure
);
