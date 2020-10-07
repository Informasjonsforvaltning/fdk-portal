import React, { memo, FC, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import parse from 'html-react-parser';
import sanitise from 'sanitize-html';

import { getConfig } from '../../config';
import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';
import { dateStringToDate, formatDate } from '../../lib/date-utils';

import {
  PATHNAME_DATASETS,
  PATHNAME_DATASET_DETAILS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS
} from '../../constants/constants';

import { themeFDK, themeNAP } from '../../app/theme';

import withDataset, { Props as DatasetProps } from '../with-dataset';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../with-reference-data';
import withConcepts, { Props as ConceptsProps } from '../with-concepts';
import withDatasets, { Props as DatasetsProps } from '../with-datasets';
import withDataServices, {
  Props as DataServicesProps
} from '../with-data-services';

import DetailsPage, {
  ContentSection,
  InlineList,
  KeyValueList,
  KeyValueListItem
} from '../details-page';
import DatasetDistribution from '../dataset-distribution';
import ExternalLink from '../link-external';

import SC from './styled';

import type { Theme } from '../../types';
import { Entity } from '../../types/enums';

interface RouteParams {
  datasetId?: string;
}

interface Props
  extends DatasetProps,
    ReferenceDataProps,
    ConceptsProps,
    DatasetsProps,
    DataServicesProps,
    RouteComponentProps<RouteParams> {}

const DatasetDetailsPage: FC<Props> = ({
  dataset,
  referenceData: { referencetypes },
  concepts,
  datasets,
  dataServices,
  datasetActions: { getDatasetRequested: getDataset, resetDataset },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  conceptsActions: { getConceptsRequested: getConcepts },
  datasetsActions: { getDatasetsRequested: getDatasets, resetDatasets },
  dataServicesActions: { getDataServicesRequested: getDataServices },
  match: {
    params: { datasetId }
  }
}) => {
  useEffect(() => {
    if (datasetId) {
      getDataset(datasetId);
    }
    if (!referencetypes) {
      getReferenceData('referencetypes');
    }

    return () => {
      resetDataset();
    };
  }, [datasetId]);

  const conceptIdentifiers = dataset?.subject?.map(
    ({ identifier }) => identifier
  );
  const datasetUris =
    dataset?.references?.map(({ source: { uri } }) => uri) ?? [];
  const datasetUri = dataset?.uri ?? '';

  useEffect(() => {
    getConcepts({
      identifiers: conceptIdentifiers?.join()
    });
  }, [conceptIdentifiers?.join()]);

  useEffect(() => {
    if (datasetUris?.length > 0) {
      getDatasets({
        uris: datasetUris?.join()
      });
    }

    return () => {
      resetDatasets();
    };
  }, [datasetUris?.join()]);

  useEffect(() => {
    getDataServices({ dataseturi: datasetUri });
  }, [datasetUri]);

  const entity = Entity.DATASET;

  const theme = {
    entityColours: (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
      entity
    ]
  };

  const isAuthoritative = dataset?.provenance?.code === 'NASJONAL';
  const isOpenData =
    dataset?.accessRights?.code === 'PUBLIC' &&
    dataset?.distribution?.some(({ openLicense }) => openLicense);
  const isPublicData = dataset?.accessRights?.code === 'PUBLIC' && !isOpenData;
  const isRestrictedData = dataset?.accessRights?.code === 'RESTRICTED';
  const isNonPublicData = dataset?.accessRights?.code === 'NON_PUBLIC';

  const title = translate(dataset?.title);
  const description = parse(sanitise(translate(dataset?.descriptionFormatted)));

  const lastPublished = formatDate(
    dateStringToDate(dataset?.harvest?.firstHarvested)
  );
  const objective = translate(dataset?.objective);
  const distributions = dataset?.distribution ?? [];
  const usage = {
    legalBasisForRestriction: dataset?.legalBasisForRestriction ?? [],
    legalBasisForProcessing: dataset?.legalBasisForProcessing ?? [],
    legalBasisForAccess: dataset?.legalBasisForAccess ?? [],
    type: dataset?.type,
    standards: dataset?.conformsTo ?? [],
    informationModelReferences: dataset?.informationModel ?? [],
    languages: dataset?.language ?? [],
    moreInformationPage: dataset?.landingPage?.[0]
  };
  const samples = dataset?.sample ?? [];
  const provenance = {
    provenance: translate(dataset?.provenance?.prefLabel),
    frequency: translate(dataset?.accrualPeriodicity?.prefLabel),
    issued: formatDate(dateStringToDate(dataset?.issued)),
    modified: formatDate(dateStringToDate(dataset?.modified))
  };
  const quality = {
    relevance: dataset?.hasRelevanceAnnotation?.hasBody,
    completeness: dataset?.hasCompletenessAnnotation?.hasBody,
    accuracy: dataset?.hasAccuracyAnnotation?.hasBody,
    availability: dataset?.hasAvailabilityAnnotation?.hasBody,
    currentness: dataset?.hasCurrentnessAnnotation?.hasBody
  };
  const referencedConcepts = concepts;
  const referencedDatasets = datasets;
  const referencedDataServices = dataServices;
  const datasetReferenceTypes = dataset?.references ?? [];
  const keywords = dataset?.keyword?.map(translate)?.filter(Boolean) ?? [];
  const qualifiedAttributions = dataset?.qualifiedAttributions ?? [];
  const spatialRestrictions = dataset?.spatial ?? [];
  const temporalRestrictions = dataset?.temporal ?? [];
  const contactPoints = dataset?.contactPoint ?? [];

  const referencedResourcesUnResolved =
    dataset?.references?.filter(
      ({ source: { uri: datasetRefererenceUri } }) =>
        !referencedDatasets.some(
          ({ uri: referencedDatasetsUri }) =>
            referencedDatasetsUri === datasetRefererenceUri
        )
    ) ?? [];

  const themes: Theme[] = [
    ...(dataset?.losTheme?.map(({ uri: id }) => ({ id })) ?? []),
    ...(dataset?.theme?.map(({ id }) => ({ id })) ?? [])
  ];

  return (
    dataset && (
      <ThemeProvider theme={theme}>
        <DetailsPage
          entity={entity}
          title={title}
          publisher={dataset?.publisher}
          entityId={dataset?.id}
          entityUri={dataset?.uri}
          lastPublished={lastPublished}
          isAuthoritative={isAuthoritative}
          isOpenData={isOpenData}
          isPublicData={isPublicData}
          isRestrictedData={isRestrictedData}
          isNonPublicData={isNonPublicData}
          themes={themes}
        >
          {description && (
            <ContentSection
              id="description"
              title={translations.detailsPage.sectionTitles.dataset.description}
            >
              {description}
            </ContentSection>
          )}
          {objective && (
            <ContentSection
              id="objective"
              title={translations.detailsPage.sectionTitles.dataset.objective}
            >
              {objective}
            </ContentSection>
          )}
          {distributions.length > 0 && (
            <ContentSection
              id="distributions"
              title={
                translations.formatString(
                  translations.detailsPage.sectionTitles.dataset.distributions,
                  { count: distributions.length }
                ) as string
              }
            >
              {distributions.map((distribution, index) => (
                <DatasetDistribution
                  key={distribution.uri || `distribution-${index}`}
                  distribution={distribution}
                />
              ))}
            </ContentSection>
          )}
          {Object.values(usage)
            .filter(Boolean)
            .filter(item => item && item?.length > 0).length > 0 && (
            <ContentSection
              id="usage"
              title={translations.detailsPage.sectionTitles.dataset.usage}
            >
              <KeyValueList>
                {usage.legalBasisForRestriction.length > 0 && (
                  <KeyValueListItem
                    property={translations.dataset.legalBasisForRestriction}
                    value={
                      <SC.ExternalLinkList>
                        {usage.legalBasisForRestriction.map(
                          ({ uri, prefLabel }) =>
                            uri &&
                            prefLabel && (
                              <ExternalLink
                                key={uri}
                                uri={uri}
                                prefLabel={prefLabel}
                                openInNewTab
                              />
                            )
                        )}
                      </SC.ExternalLinkList>
                    }
                  />
                )}
                {usage.legalBasisForProcessing.length > 0 && (
                  <KeyValueListItem
                    property={translations.dataset.legalBasisForProcessing}
                    value={
                      <SC.ExternalLinkList>
                        {usage.legalBasisForProcessing.map(
                          ({ uri, prefLabel }) =>
                            uri &&
                            prefLabel && (
                              <ExternalLink
                                key={uri}
                                uri={uri}
                                prefLabel={prefLabel}
                                openInNewTab
                              />
                            )
                        )}
                      </SC.ExternalLinkList>
                    }
                  />
                )}
                {usage.legalBasisForAccess.length > 0 && (
                  <KeyValueListItem
                    property={translations.dataset.legalBasisForAccess}
                    value={
                      <SC.ExternalLinkList>
                        {usage.legalBasisForAccess.map(
                          ({ uri, prefLabel }) =>
                            uri &&
                            prefLabel && (
                              <ExternalLink
                                key={uri}
                                uri={uri}
                                prefLabel={prefLabel}
                                openInNewTab
                              />
                            )
                        )}
                      </SC.ExternalLinkList>
                    }
                  />
                )}
                {usage.type && (
                  <KeyValueListItem
                    property={translations.dataset.type}
                    value={usage.type}
                  />
                )}
                {usage.standards.length > 0 && (
                  <KeyValueListItem
                    property={translations.dataset.conformsTo}
                    value={
                      <SC.ExternalLinkList>
                        {usage.standards.map(
                          ({ uri, prefLabel }) =>
                            uri &&
                            prefLabel && (
                              <ExternalLink
                                key={uri}
                                uri={uri}
                                prefLabel={prefLabel}
                                openInNewTab
                              />
                            )
                        )}
                      </SC.ExternalLinkList>
                    }
                  />
                )}
                {usage.informationModelReferences.length > 0 && (
                  <KeyValueListItem
                    property={translations.dataset.informationModel}
                    value={
                      <SC.ExternalLinkList>
                        {usage.informationModelReferences.map(
                          ({ uri, prefLabel }) =>
                            uri &&
                            prefLabel && (
                              <ExternalLink
                                key={uri}
                                uri={uri}
                                prefLabel={prefLabel}
                                openInNewTab
                              />
                            )
                        )}
                      </SC.ExternalLinkList>
                    }
                  />
                )}
                {usage.languages.length > 0 && (
                  <KeyValueListItem
                    property={translations.dataset.language}
                    value={usage.languages
                      .map(({ prefLabel }) => prefLabel && translate(prefLabel))
                      .filter(Boolean)
                      .join(', ')}
                  />
                )}
                {usage.moreInformationPage && (
                  <KeyValueListItem
                    property=""
                    value={
                      <ExternalLink
                        uri={usage.moreInformationPage}
                        prefLabel={translations.dataset.landingPage}
                        openInNewTab
                      />
                    }
                  />
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {samples.length > 0 && (
            <ContentSection
              id="sample"
              title={translations.detailsPage.sectionTitles.dataset.sample}
            >
              {samples.map(
                (
                  { description, format: formats, accessURL: [accessURL] },
                  index
                ) => (
                  <KeyValueList key={`sample-${index}`}>
                    <KeyValueListItem
                      property={translations.dataset.distribution.description}
                      value={translate(description)}
                    />
                    <KeyValueListItem
                      property={translations.dataset.distribution.format}
                      value={formats?.join(', ')}
                    />
                    <KeyValueListItem
                      property={translations.dataset.distribution.accessUrl}
                      value={
                        <ExternalLink
                          uri={accessURL}
                          prefLabel={accessURL}
                          openInNewTab
                        />
                      }
                    />
                  </KeyValueList>
                )
              )}
            </ContentSection>
          )}
          {Object.values(provenance).filter(Boolean).length > 0 && (
            <ContentSection
              id="provenance"
              title={translations.detailsPage.sectionTitles.dataset.provenance}
            >
              <KeyValueList>
                {provenance.provenance && (
                  <KeyValueListItem
                    property={translations.dataset.provenance}
                    value={provenance.provenance}
                  />
                )}
                {provenance.frequency && (
                  <KeyValueListItem
                    property={translations.dataset.frequency}
                    value={provenance.frequency}
                  />
                )}
                {provenance.issued && (
                  <KeyValueListItem
                    property={translations.dataset.issued}
                    value={provenance.issued}
                  />
                )}
                {provenance.modified && (
                  <KeyValueListItem
                    property={translations.dataset.modified}
                    value={provenance.modified}
                  />
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {Object.values(quality).filter(Boolean).length > 0 && (
            <ContentSection
              id="quality"
              title={translations.detailsPage.sectionTitles.dataset.quality}
            >
              <KeyValueList>
                {quality.currentness && (
                  <KeyValueListItem
                    property={translations.dataset.currentness}
                    value={translate(quality.currentness)}
                  />
                )}
                {quality.completeness && (
                  <KeyValueListItem
                    property={translations.dataset.completenessAnnotation}
                    value={translate(quality.completeness)}
                  />
                )}
                {quality.accuracy && (
                  <KeyValueListItem
                    property={translations.dataset.accuracyAnnotation}
                    value={translate(quality.accuracy)}
                  />
                )}
                {quality.relevance && (
                  <KeyValueListItem
                    property={translations.dataset.relevanceAnnotation}
                    value={translate(quality.relevance)}
                  />
                )}
                {quality.availability && (
                  <KeyValueListItem
                    property={translations.dataset.availabilityAnnotations}
                    value={translate(quality.availability)}
                  />
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {referencedConcepts.length > 0 && (
            <ContentSection
              id="concept-references"
              title={
                translations.detailsPage.sectionTitles.dataset.conceptReferences
              }
            >
              <KeyValueList>
                {referencedConcepts.map(
                  ({ id, prefLabel, definition: { text: definition } }) =>
                    id && (
                      <KeyValueListItem
                        key={id}
                        property={
                          <Link to={`${PATHNAME_CONCEPTS}/${id}`}>
                            {translate(prefLabel)}
                          </Link>
                        }
                        value={translate(definition)}
                      />
                    )
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {(referencedDatasets.length > 0 ||
            referencedResourcesUnResolved.length > 0) && (
            <ContentSection
              id="dataset-references"
              title={
                translations.detailsPage.sectionTitles.dataset.datasetReferences
              }
            >
              <KeyValueList>
                {referencedDatasets?.map(({ id, uri, title }) => (
                  <KeyValueListItem
                    key={id}
                    property={translate(
                      referencetypes?.find(
                        ({ uri: referenceUri }) =>
                          referenceUri ===
                          datasetReferenceTypes.find(
                            ({ source }) => source.uri === uri
                          )?.referenceType.uri
                      )?.prefLabel
                    )}
                    value={
                      <Link to={`${PATHNAME_DATASET_DETAILS}/${id}`}>
                        {translate(title)}
                      </Link>
                    }
                  />
                ))}
                {referencedResourcesUnResolved?.map(
                  (
                    {
                      source: { uri },
                      referenceType: { uri: referenceTypeUri }
                    },
                    index
                  ) => (
                    <KeyValueListItem
                      key={`${uri}-${index}`}
                      property={translate(
                        referencetypes?.find(
                          ({ uri: referenceTypesUri }) =>
                            referenceTypesUri === referenceTypeUri
                        )?.prefLabel
                      )}
                      value={
                        <a href={uri} rel="noopener noreferrer">
                          {uri}
                        </a>
                      }
                    />
                  )
                )}
              </KeyValueList>
            </ContentSection>
          )}

          {referencedDataServices.length > 0 && (
            <ContentSection
              id="dataservice-references"
              title={
                translations.detailsPage.sectionTitles.dataset
                  .dataserviceReferences
              }
            >
              <KeyValueList>
                {referencedDataServices.map(
                  ({ id, title, description, descriptionFormatted }) =>
                    id && (
                      <KeyValueListItem
                        key={id}
                        property={
                          <Link to={`${PATHNAME_DATA_SERVICES}/${id}`}>
                            {translate(title)}
                          </Link>
                        }
                        value={translate(descriptionFormatted || description)}
                      />
                    )
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {keywords.length > 0 && (
            <ContentSection
              id="keywords"
              title={translations.detailsPage.sectionTitles.dataset.keywords}
            >
              <InlineList>
                {keywords.map((keyword, index) => (
                  <Link
                    to={`${PATHNAME_DATASETS}?keywords=${encodeURIComponent(
                      keyword
                    )}`}
                    key={`${keyword}-${index}`}
                  >
                    {keyword}
                  </Link>
                ))}
              </InlineList>
            </ContentSection>
          )}
          {qualifiedAttributions.length > 0 && (
            <ContentSection
              id="qualifiedAttributions"
              title={
                translations.detailsPage.sectionTitles.dataset
                  .qualifiedAttributions
              }
            >
              {qualifiedAttributions
                .map(
                  ({ agent: { name, prefLabel } }) =>
                    translate(prefLabel) || name
                )
                .join(', ')}
            </ContentSection>
          )}
          {(spatialRestrictions.length > 0 ||
            temporalRestrictions.length > 0) && (
            <ContentSection
              id="restrictions"
              title={
                translations.detailsPage.sectionTitles.dataset.restrictions
              }
            >
              <KeyValueList>
                {spatialRestrictions.map(({ code, uri, prefLabel }) => (
                  <KeyValueListItem
                    key={`${code}-${uri}`}
                    property={translations.dataset.spatial}
                    value={
                      uri ? (
                        <ExternalLink
                          uri={uri}
                          prefLabel={translate(prefLabel) || uri}
                          openInNewTab
                        />
                      ) : (
                        translate(prefLabel) || uri
                      )
                    }
                  />
                ))}
                {temporalRestrictions.map(({ startDate, endDate }) => (
                  <KeyValueListItem
                    key={`${startDate}-${endDate}`}
                    property={translations.dataset.temporal}
                    value={
                      startDate && endDate
                        ? `${formatDate(
                            dateStringToDate(startDate)
                          )} - ${formatDate(dateStringToDate(endDate))}`
                        : formatDate(dateStringToDate(startDate || endDate))
                    }
                  />
                ))}
              </KeyValueList>
            </ContentSection>
          )}
          {contactPoints.length > 0 && (
            <ContentSection
              id="contact-information"
              title={
                translations.detailsPage.sectionTitles.dataset
                  .contactInformation
              }
            >
              {contactPoints.map(
                ({ organizationUnit, email, hasURL, hasTelephone }) => (
                  <KeyValueList
                    key={`${organizationUnit}-${email}-${hasURL}-${hasTelephone}`}
                  >
                    {hasURL && (
                      <KeyValueListItem
                        property={translations.contactPoint}
                        value={
                          <ExternalLink
                            uri={hasURL}
                            prefLabel={organizationUnit ?? hasURL}
                            openInNewTab
                          />
                        }
                      />
                    )}
                    {email && (
                      <KeyValueListItem
                        property={translations.email}
                        value={
                          <a
                            title={email}
                            href={`mailto:${email}`}
                            rel="noopener noreferrer"
                          >
                            {email}
                          </a>
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
        </DetailsPage>
      </ThemeProvider>
    )
  );
};

export default compose(
  memo,
  withDataset,
  withReferenceData,
  withConcepts,
  withDatasets,
  withDataServices
)(DatasetDetailsPage);
