import React, { FC, useEffect } from 'react';
import { compose } from 'redux';

import { EventType, PublicService } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit, SearchHitEvents } from '../search-hit/search-hit';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';
import { getTranslateText as translate } from '../../lib/translateText';
import withEventTypes, { Props as EventTypesProps } from '../with-event-types';
import localization from '../../lib/localization';

interface ExternalProps {
  publicService: Partial<PublicService>;
}

interface Props extends ExternalProps, EventTypesProps {}

const PublicServiceItemPure: FC<Props> = ({
  publicService: {
    id = '',
    title = {},
    description = {},
    hasCompetentAuthority = [],
    ownedBy = [],
    associatedBroaderTypesByEvents = []
  },
  eventTypes,
  eventTypesActions: { getEventTypesRequested: getEventTypes }
}) => {
  useEffect(() => {
    if (eventTypes.length === 0) {
      getEventTypes();
    }
  }, []);

  const eventTypesMap = eventTypes?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, EventType>
  );

  const uniqueAssociatedBroaderTypesByEvents = Array.from(
    new Set(associatedBroaderTypesByEvents)
  );

  return (
    <SearchHit
      id={id}
      type={SearchTypes.publicService}
      title={title}
      publisher={hasCompetentAuthority?.[0] || ownedBy?.[0]}
      description={description}
      subtitle={localization.service}
    >
      <SearchHitEvents>
        {uniqueAssociatedBroaderTypesByEvents.map(uri =>
          uri ? (
            <RoundedTag key={uri} to={patchSearchQuery('eventType', uri)}>
              <span>{translate(eventTypesMap?.[uri]?.prefLabel) ?? uri}</span>
            </RoundedTag>
          ) : null
        )}
      </SearchHitEvents>
    </SearchHit>
  );
};

export const PublicServiceItem = compose<FC<ExternalProps>>(withEventTypes)(
  PublicServiceItemPure
);
