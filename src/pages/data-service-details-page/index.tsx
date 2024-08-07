import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import { dateStringToDate, formatDate } from '../../lib/date-utils';
import { getTranslateText as translate } from '../../lib/translateText';

import {
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS
} from '../../constants/constants';

import { themeFDK } from '../../app/theme';

import withDataService, {
  Props as DataServiceProps
} from '../../components/with-data-service';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../../components/with-reference-data';
import withDatasets, {
  Props as DatasetsProps
} from '../../components/with-datasets';
import withInformationModels, {
  Props as InformationModelsProps
} from '../../components/with-information-models';
import withErrorBoundary from '../../components/with-error-boundary';

import {
  DetailsPage,
  ContentSection,
  KeyValueList,
  KeyValueListItem,
  InlineList
} from '../../components/details-page';
import ErrorPage from '../error-page';
import RelationList from '../../components/relation-list';

import SC from './styled';

import { Entity } from '../../types/enums';
import Markdown from '../../components/markdown';
import withResourceRelations, {
  ResourceRelationsProps
} from '../../components/with-resource-relations';
import { filterRelations, getLastWordAfterSlash } from '../../utils/common';

interface RouteParams {
  dataServiceId: string;
}

interface Props
  extends DataServiceProps,
    ReferenceDataProps,
    DatasetsProps,
    InformationModelsProps,
    ResourceRelationsProps,
    RouteComponentProps<RouteParams> {}

const DataserviceDetailsPage: FC<Props> = ({
  dataService,
  isLoadingDataService,
  referenceData: { apispecifications },
  datasets,
  relations,
  dataServiceActions: { getDataServiceRequested: getDataService },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  datasetsActions: { getDatasetsRequested: getDatasets, resetDatasets },

  resourceRelationsActions: {
    getResourceRelationsRequested: getRelations,
    resetResourceRelations
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

    getReferenceData('apispecifications');

    setIsMounted(true);

    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (dataService?.servesDataset && dataService?.servesDataset.length > 0) {
      getDatasets({
        uri: dataService.servesDataset,
        size: dataService.servesDataset.length
      });
    }

    return () => {
      resetDatasets();
    };
  }, [dataService?.id]);

  useEffect(() => {
    if (dataService?.uri) {
      getRelations({ relations: dataService.uri });
    }
    return () => {
      resetResourceRelations();
    };
  }, [dataService?.uri]);

  const entityId = dataService?.id;
  const entityUri = dataService?.uri;
  const title = dataService?.title ?? {};
  const publisher = dataService?.publisher;
  const lastPublished = formatDate(
    dateStringToDate(dataService?.harvest?.firstHarvested)
  );
  const description = translate(
    dataService?.descriptionFormatted ?? dataService?.description
  );

  const formats = dataService?.fdkFormat ?? [];
  const endpointUrls = dataService?.endpointURL ?? [];
  const endpointDescriptions = dataService?.endpointDescription ?? [];
  const page = dataService?.page ?? [];
  const landingPage = dataService?.landingPage?.[0];
  const informationModelRelations = filterRelations(
    relations,
    Entity.INFORMATION_MODEL
  );

  const conformsTo =
    dataService?.conformsTo
      ?.map(({ uri }) =>
        apispecifications?.apiSpecifications?.find(
          ({ source }) => source === uri
        )
      )
      .filter(Boolean) ?? [];
  const contactPoint = dataService?.contactPoint ?? [];

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
      >
        {description && (
          <ContentSection
            id='description'
            title={
              translations.detailsPage.sectionTitles.dataService.description
            }
            truncate
          >
            <Markdown>{description}</Markdown>
          </ContentSection>
        )}
        {formats.length > 0 && (
          <ContentSection
            id='formats'
            title={translations.detailsPage.sectionTitles.dataService.formats}
          >
            {formats
              .map(
                format =>
                  format.name ||
                  (format?.uri && getLastWordAfterSlash(format?.uri))
              )
              .filter(Boolean)
              .join(', ')}
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
              {endpointDescriptions.map(endpointDescription => (
                <KeyValueListItem
                  key={endpointDescription}
                  property={translations.api.endpointDescription}
                  value={
                    <Link href={endpointDescription} external>
                      {translations.api.goToSpecification}
                    </Link>
                  }
                />
              ))}
              {page.length > 0 && (
                <KeyValueListItem
                  property={translations.api.documentation}
                  value={
                    <SC.ExternalLinkList>
                      {page.map(pageItem => (
                        <Link href={pageItem} external>
                          {translations.api.goToDocumentation}
                        </Link>
                      ))}
                    </SC.ExternalLinkList>
                  }
                />
              )}
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
            id='conforms-to'
            title={
              translations.detailsPage.sectionTitles.dataService.conformsTo
            }
          >
            {conformsTo.map(
              (spec, index) =>
                spec && (
                  <>
                    {index > 0 && <br />}
                    <Link href={spec.source} external>
                      {translate(spec.label)}
                    </Link>
                  </>
                )
            )}
          </ContentSection>
        )}
        {datasets.length > 0 && (
          <ContentSection
            id='dataset-references'
            title={
              translations.detailsPage.sectionTitles.dataService
                .datasetReferences
            }
            entityIcon={Entity.DATASET}
            boxStyle
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
        {relations.length > 0 && (
          <ContentSection
            id='relationList'
            title={translations.detailsPage.relationList.title.dataservice}
            entityIcon={Entity.DATASET}
            boxStyle
          >
            <RelationList
              parentIdentifier={dataService?.uri}
              datasets={filterRelations(relations, Entity.DATASET)}
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
                      key={`${translate(organizationName)}-${hasURL}-${email}`}
                    >
                      {(organizationName || hasURL) && (
                        <KeyValueListItem
                          property={translations.contactPoint}
                          value={
                            <Link href={hasURL} external>
                              {translate(organizationName) ?? hasURL}
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
        {informationModelRelations?.length > 0 && (
          <ContentSection
            id='informationModel-relations'
            title={
              translations.detailsPage.sectionTitles.dataService
                .informationModelReferences
            }
            entityIcon={Entity.INFORMATION_MODEL}
            boxStyle
          >
            <InlineList column>
              {informationModelRelations.map(
                ({ id, uri, title: informationModelTitle }) =>
                  uri && (
                    <SC.Link
                      to={`${PATHNAME_INFORMATIONMODELS}/${id}`}
                      key={`relation-${uri}`}
                      forwardedAs={RouteLink}
                    >
                      {translate(informationModelTitle)}
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
  withResourceRelations,
  withErrorBoundary(ErrorPage)
)(DataserviceDetailsPage);
