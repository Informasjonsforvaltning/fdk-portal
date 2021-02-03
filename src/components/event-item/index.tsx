import React, { FC } from 'react';

import { SearchHit } from '../search-hit/search-hit';

import type { Event } from '../../types';
import { SearchTypes } from '../../types/enums';

interface Props {
  event: Partial<Event>;
}

const EventItem: FC<Props> = ({
  event: { id = '', title = {}, description = {}, hasCompetentAuthority = [] }
}) => (
  <SearchHit
    id={id}
    type={SearchTypes.event}
    title={title}
    publisher={hasCompetentAuthority?.[0]}
    description={description}
    beta
  />
);

export default EventItem;
