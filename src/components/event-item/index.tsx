import React, { FC } from 'react';

import { SearchHit, SearchHitEvents } from '../search-hit/search-hit';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import translations from '../../lib/localization';

import type { Event } from '../../types';
import { SearchTypes, SpecializedEventType } from '../../types/enums';

interface Props {
  event: Partial<Event>;
}

const EventItem: FC<Props> = ({
  event: {
    id = '',
    title = {},
    description = {},
    hasCompetentAuthority = [],
    specialized_type: specializedType
  }
}) => (
  <SearchHit
    id={id}
    type={SearchTypes.event}
    title={title}
    publisher={hasCompetentAuthority?.[0]}
    description={description}
    beta
  >
    <SearchHitEvents>
      {specializedType && (
        <RoundedTag>
          <span>
            {(() => {
              switch (specializedType) {
                case SpecializedEventType.LIFEEVENT:
                  return translations.lifeEvent;
                case SpecializedEventType.BUSINESSEVENT:
                  return translations.businessEvent;
                default:
                  return '';
              }
            })()}
          </span>
        </RoundedTag>
      )}
    </SearchHitEvents>
  </SearchHit>
);

export default EventItem;
