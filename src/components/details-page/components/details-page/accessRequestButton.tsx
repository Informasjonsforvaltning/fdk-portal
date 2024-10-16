import Button from '@fellesdatakatalog/button';
import React from 'react';
import translations from '../../../../lib/localization';
import { AccessRequest } from '../../../../types';
import SC from './styled';
import { Entity } from '../../../../types/enums';
import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_DATASETS,
  PATHNAME_EVENTS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES
} from '../../../../constants/constants';
import env from '../../../../env';
import {
  EventAction,
  EventCategory,
  trackSiteImproveEvent
} from '../../../analytics-siteimprove/utils';

const entityToPath = (entity: Entity): string => {
  switch (entity) {
    case Entity.DATASET:
      return PATHNAME_DATASETS;
    case Entity.DATA_SERVICE:
      return PATHNAME_DATA_SERVICES;
    case Entity.CONCEPT:
      return PATHNAME_CONCEPTS;
    case Entity.INFORMATION_MODEL:
      return PATHNAME_INFORMATIONMODELS;
    case Entity.PUBLIC_SERVICE:
      return PATHNAME_PUBLIC_SERVICES;
    case Entity.EVENT:
      return PATHNAME_EVENTS;
    default:
      throw new Error('Unknown entity type');
  }
};

const createAccessRequestUrl = async (
  entity: Entity,
  id: string
): Promise<string> => {
  const accessRequestApi = env.ACCESS_REQUEST_API_HOST;
  const entityPath = entityToPath(entity);

  const input = `${accessRequestApi}/access-request/${translations._language}${entityPath}/${id}`;
  const response = await fetch(input, {
    method: 'POST'
  });

  return response.text();
};

export function AccessRequestButton({
  entityId,
  entity,
  accessRequest
}: {
  entity: Entity;
  entityId: string | undefined;
  accessRequest: AccessRequest | undefined;
}) {
  const trackAccessRequest = () => {
    trackSiteImproveEvent({
      category: EventCategory.DETAILS_PAGE,
      action: EventAction.REQUEST_ACCESS,
      label: entityId
    });
  };

  if (entityId && accessRequest?.requestAddress === 'https://soknad.kudaf.no') {
    return (
      <SC.AccessRequest>
        <Button
          onClick={() => {
            trackAccessRequest();
            createAccessRequestUrl(entity, entityId).then(url => {
              window.location.href = url;
            });
          }}
        >
          {translations.detailsPage.requestDataButton}
        </Button>
      </SC.AccessRequest>
    );
  }

  if (accessRequest === undefined) {
    return null;
  }

  return (
    <SC.AccessRequest>
      <a href={accessRequest.requestAddress} target='_blank' rel='noreferrer'>
        <Button onClick={trackAccessRequest}>
          {translations.detailsPage.requestDataButton}
        </Button>
      </a>
    </SC.AccessRequest>
  );
}
