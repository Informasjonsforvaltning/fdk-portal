import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import parse from 'html-react-parser';
import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import { dateStringToDate, formatDate } from '../../lib/date-utils';
import { getTranslateText as translate } from '../../lib/translateText';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

import {
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS
} from '../../constants/constants';

import { themeFDK } from '../../app/theme';

import withDataService, {
  Props as DataServiceProps
} from '../with-data-service';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../with-reference-data';
import withDatasets, { Props as DatasetsProps } from '../with-datasets';
import withInformationModels, {
  Props as InformationModelsProps
} from '../with-information-models';
import withErrorBoundary from '../with-error-boundary';

import DetailsPage, {
  ContentSection,
  KeyValueList,
  KeyValueListItem,
  InlineList
} from '../details-page';
import ErrorPage from '../error-page';
import RelationList from '../relation-list';

import SC from './styled';

import type { Theme } from '../../types';
import { Entity } from '../../types/enums';

interface RouteParams {
  dataServiceId: string;
}

interface Props
  extends DataServiceProps,
    ReferenceDataProps,
    DatasetsProps,
    InformationModelsProps,
    RouteComponentProps<RouteParams> {}

const DataserviceDetailsPage: FC<Props> = ({
  dataService,
  isLoadingDataService,
  referenceData: { apiservicetype },
  datasets,
  informationModels,
  datasetsRelations,
  dataServiceActions: { getDataServiceRequested: getDataService },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  datasetsActions: {
    getDatasetsRequested: getDatasets,
    getDatasetsRelationsRequested: getDatasetsRelations,
    resetDatasetsRelations
  },
  informationModelsActions: {
    getInformationModelsRequested: getInformationModels
  },
  match: {
    params: { dataServiceId }
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const entity = Entity.DATA_SERVICE;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  const renderPage = isLoadingDataService || !isMounted || dataService !== null;

  useEffect(() => {
    if (dataService?.id !== dataServiceId) {
      getDataService(dataServiceId);
    }

    getReferenceData('apiservicetype');

    setIsMounted(true);

    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (dataService?.servesDataset && dataService?.servesDataset.length > 0) {
      getDatasets({ uris: dataService.servesDataset, size: 1000 });
    }
  }, [dataService?.id]);

  useEffect(() => {
    if (dataService?.endpointDescription) {
      getInformationModels({
        informationModelIdentifiers: dataService.endpointDescription
      });
    }
  }, [dataService?.endpointDescription?.join()]);

  useEffect(() => {
    if (dataService?.uri) {
      getDatasetsRelations({ referencesSource: dataService.uri });
    }
    return () => {
      resetDatasetsRelations();
    };
  }, [dataService?.uri]);

  const entityId = dataService?.id;
  const entityUri = dataService?.uri;
  const title = translate(dataService?.title);
  const publisher = dataService?.publisher;
  const lastPublished = formatDate(
    dateStringToDate(dataService?.harvest?.firstHarvested)
  );
  const description = translate(
    dataService?.descriptionFormatted ?? dataService?.description
  );
  const formats =
    dataService?.mediaType
      ?.map(({ prefLabel }) => translate(prefLabel))
      .filter(Boolean) ?? [];
  const endpointUrls = dataService?.endpointURL ?? [];
  const endpointDescriptions = dataService?.endpointDescription ?? [];
  const landingPage = dataService?.landingPage?.[0];
  const conformsTo =
    dataService?.conformsTo
      ?.map(({ uri }) =>
        translate(
          apiservicetype?.find(
            ({ code }) =>
              code?.toLowerCase() === uri.split('/').pop()?.toLowerCase()
          )?.prefLabel
        )
      )
      .filter(Boolean) ?? [];
  const contactPoint = dataService?.contactPoint ?? [];
  const themes: Theme[] = [];

  return renderPage ? (
    <ThemeProvider theme={theme}>
      <DetailsPage
        entity={entity}
        title={title}
        publisher={publisher}
        entityId={entityId}
        entityUri={entityUri}
        lastPublished={lastPublished}
        isAuthoritative={false}
        isOpenData={false}
        isPublicData={false}
        isRestrictedData={false}
        isNonPublicData={false}
        themes={themes}
      >
        {description && (
          <ContentSection
            id='description'
            title={
              translations.detailsPage.sectionTitles.dataService.description
            }
            entityTheme={Entity.DATA_SERVICE}
            truncate
          >
            {parse(convertToSanitizedHtml(description))}
          </ContentSection>
        )}
        {formats.length > 0 && (
          <ContentSection
            id='formats'
            title={translations.detailsPage.sectionTitles.dataService.formats}
          >
            {formats.join(', ')}
          </ContentSection>
        )}
        {(endpointUrls.length > 0 ||
          endpointDescriptions.length > 0 ||
          landingPage) && (
          <ContentSection
            id='usage'
            title={translations.detailsPage.sectionTitles.dataService.usage}
          >
            <KeyValueList>
              {endpointUrls.map(url => (
                <KeyValueListItem
                  key={url}
                  property={translations.api.endpointUrl}
                  value={url}
                />
              ))}
              {endpointDescriptions.map(description => (
                <KeyValueListItem
                  key={description}
                  property={translations.api.endpointDescription}
                  value={
                    <Link href={description} external>
                      {translations.api.goToSpecification}
                    </Link>
                  }
                />
              ))}
              {landingPage && (
                <KeyValueListItem
                  property=''
                  value={
                    <Link href={landingPage} external>
                      {translations.api.landingPage}
                    </Link>
                  }
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {conformsTo.length > 0 && (
          <ContentSection
            id='service-type'
            title={
              translations.detailsPage.sectionTitles.dataService.serviceType
            }
          >
            {conformsTo.join(', ')}
          </ContentSection>
        )}
        {datasets.length > 0 && (
          <ContentSection
            id='dataset-references'
            title={
              translations.detailsPage.sectionTitles.dataService
                .datasetReferences
            }
          >
            <InlineList>
              {datasets.map(dataset => (
                <Link
                  key={dataset.id}
                  to={`${PATHNAME_DATASETS}/${dataset.id}`}
                  as={RouteLink}
                >
                  {translate(dataset.title)}
                </Link>
              ))}
            </InlineList>
          </ContentSection>
        )}
        {datasetsRelations.length > 0 && (
          <ContentSection
            id='relationList'
            title={translations.detailsPage.relationList.title.dataservice}
          >
            <RelationList
              parentIdentifier={dataService?.uri}
              datasets={datasetsRelations}
            />
          </ContentSection>
        )}
        {contactPoint.length > 0 &&
          contactPoint.some(
            ({ organizationName, hasURL, email, hasTelephone }) =>
              organizationName || hasURL || email || hasTelephone
          ) && (
            <ContentSection
              id='contact-information'
              title={
                translations.detailsPage.sectionTitles.dataService
                  .contactInformation
              }
            >
              {contactPoint.map(
                ({ organizationName, hasURL, email, hasTelephone }) =>
                  (organizationName || hasURL || email || hasTelephone) && (
                    <KeyValueList
                      key={`${organizationName}-${hasURL}-${email}`}
                    >
                      {(organizationName || hasURL) && (
                        <KeyValueListItem
                          property={translations.contactPoint}
                          value={
                            <Link href={hasURL} external>
                              {organizationName ?? hasURL}
                            </Link>
                          }
                        />
                      )}
                      {email && (
                        <KeyValueListItem
                          property={translations.email}
                          value={
                            <Link
                              href={`mailto:${email}`}
                              rel='noopener noreferrer'
                            >
                              {email}
                            </Link>
                          }
                        />
                      )}
                      {hasTelephone && (
                        <KeyValueListItem
                          property={translations.phone}
                          value={hasTelephone}
                        />
                      )}
                    </KeyValueList>
                  )
              )}
            </ContentSection>
          )}
        {informationModels?.length > 0 && (
          <ContentSection
            id='informationModel-relations'
            title={
              translations.detailsPage.sectionTitles.dataService
                .informationModelReferences
            }
          >
            <InlineList column>
              {informationModels.map(
                ({ id, uri, title }) =>
                  uri && (
                    <SC.Link
                      to={`${PATHNAME_INFORMATIONMODELS}/${id}`}
                      key={`relation-${uri}`}
                      forwardedAs={RouteLink}
                    >
                      {translate(title)}
                    </SC.Link>
                  )
              )}
            </InlineList>
          </ContentSection>
        )}
      </DetailsPage>
    </ThemeProvider>
  ) : (
    <ErrorPage errorCode='404' />
  );
};

export default compose<FC>(
  memo,
  withDataService,
  withReferenceData,
  withDatasets,
  withInformationModels,
  withErrorBoundary(ErrorPage)
)(DataserviceDetailsPage);
