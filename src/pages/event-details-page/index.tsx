import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';

import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';
import { dateStringToDate, formatDate } from '../../lib/date-utils';

import { themeFDK } from '../../app/theme';

import withEvent, { Props as EventProps } from '../../components/with-event';
import withPublicServices, {
  Props as PublicServicesProps
} from '../../components/with-public-services';
import withErrorBoundary from '../../components/with-error-boundary';

import {
  DetailsPage,
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../../components/details-page';
import ErrorPage from '../error-page';
import RelationList from '../../components/relation-list';
import { Entity, SpecializedEventType } from '../../types/enums';

import { PATHNAME_PUBLIC_SERVICES } from '../../constants/constants';
import Markdown from '../../components/markdown';
import withResourceRelations, {
  ResourceRelationsProps
} from '../../components/with-resource-relations';
import { filterRelations } from '../../utils/common';

interface RouteParams {
  eventId: string;
}

interface Props
  extends RouteComponentProps<RouteParams>,
    EventProps,
    ResourceRelationsProps,
    PublicServicesProps {}

const EventDetailsPage: FC<Props> = ({
  match: {
    params: { eventId }
  },
  event,
  isLoadingEvent,
  eventActions: { getEventRequested: getEvent },
  publicServices,
  relations,
  publicServicesActions: {
    getPublicServicesRequested: getPublicServices,
    resetPublicServices
  },
  resourceRelationsActions: {
    getResourceRelationsRequested: getRelations,
    resetResourceRelations
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const entity = Entity.EVENT;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  const renderPage = isLoadingEvent || !isMounted || event != null;

  useEffect(() => {
    if (event?.id !== eventId) {
      getEvent(eventId);
    }

    getPublicServices({ size: 1000 });
    setIsMounted(true);

    return () => {
      setIsMounted(false);
      resetPublicServices();
    };
  }, []);

  useEffect(() => {
    if (event?.uri) {
      getRelations({ relations: event.uri });
    }
    return () => {
      resetResourceRelations();
    };
  }, [event?.uri]);

  const publicServicesRelations = filterRelations(
    relations,
    Entity.PUBLIC_SERVICE
  );

  const title = event?.title ?? {};
  const description = translate(event?.description);
  const lastPublished = formatDate(
    dateStringToDate(event?.harvest?.firstHarvested)
  );
  const relation = new Set(event?.relation ?? []);
  const relatedServices = publicServices.filter(({ uri }) => relation.has(uri));
  const dctTypes = event?.dctType ?? [];
  const specializedType = event?.specializedType;

  return renderPage ? (
    event && (
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>
            {event?.title
              ? `${translate(event.title)} - data.norge.no`
              : `${translations.head.title} - data.norge.no`}
          </title>
          <meta
            name='description'
            content={
              event?.description
                ? translate(event.description)?.substring(0, 160) ||
                  translations.head.description
                : translations.head.description
            }
          />
          <meta
            property='og:title'
            content={
              event?.title
                ? `${translate(event.title)} - data.norge.no`
                : `${translations.head.title} - data.norge.no`
            }
          />
          <meta
            property='og:description'
            content={
              event?.description
                ? translate(event.description)?.substring(0, 160) ||
                  translations.head.description
                : translations.head.description
            }
          />
          <meta property='og:type' content='website' />
        </Helmet>
        <DetailsPage
          entity={entity}
          title={title}
          entityId={event?.id}
          entityUri={event?.uri}
          lastPublished={lastPublished}
          isAuthoritative={false}
          isOpenData={false}
          isPublicData={false}
          isRestrictedData={false}
          isNonPublicData={false}
        >
          {description && (
            <ContentSection
              id='description'
              title={translations.detailsPage.sectionTitles.event.description}
              truncate
            >
              <Markdown>{description}</Markdown>
            </ContentSection>
          )}
          {(dctTypes.length > 0 || specializedType) && (
            <ContentSection
              id='usage'
              title={translations.detailsPage.sectionTitles.event.usage}
            >
              <KeyValueList>
                {dctTypes.length > 0 && (
                  <KeyValueListItem
                    property={translations.dctType}
                    value={dctTypes
                      ?.map(({ prefLabel }) => translate(prefLabel))
                      .filter(Boolean)
                      .join(', ')}
                  />
                )}
                <KeyValueListItem
                  property={translations.eventType}
                  value={(() => {
                    switch (specializedType) {
                      case SpecializedEventType.LIFEEVENT:
                        return translations.lifeEvent;
                      case SpecializedEventType.BUSINESSEVENT:
                        return translations.businessEvent;
                      default:
                        return '';
                    }
                  })()}
                />
              </KeyValueList>
            </ContentSection>
          )}
          {relatedServices.length > 0 && (
            <ContentSection
              id='relatedServices'
              title={
                translations.detailsPage.sectionTitles.event.relatedServices
              }
              boxStyle
              entityIcon={Entity.PUBLIC_SERVICE}
            >
              <KeyValueList>
                {relatedServices?.map(
                  (
                    {
                      uri,
                      title: relatedServiceTitle,
                      id,
                      description: relatedServiceDescription
                    },
                    index
                  ) =>
                    uri && relatedServiceTitle && id ? (
                      <KeyValueListItem
                        key={`${uri}-${index}`}
                        property={
                          <Link
                            as={RouterLink}
                            to={`${PATHNAME_PUBLIC_SERVICES}/${id}`}
                          >
                            {translate(relatedServiceTitle)}
                          </Link>
                        }
                        value={translate(relatedServiceDescription)}
                      />
                    ) : null
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {publicServicesRelations.length > 0 && (
            <ContentSection
              id='relationList'
              title={translations.detailsPage.relationList.title.event}
            >
              <RelationList
                parentIdentifier={event.uri}
                publicServices={publicServicesRelations}
              />
            </ContentSection>
          )}
        </DetailsPage>
      </ThemeProvider>
    )
  ) : (
    <ErrorPage errorCode='404' />
  );
};

export default compose(
  memo,
  withEvent,
  withPublicServices,
  withResourceRelations,
  withErrorBoundary(ErrorPage)
)(EventDetailsPage);
