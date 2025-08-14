import React, { memo, FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';

import Link from '@fellesdatakatalog/link';

import { getConfig } from '../../config';
import translations from '../../lib/localization';
import {
  getTranslateText as translate,
  getTranslateTextWithLanguageCode
} from '../../lib/translateText';
import { dateStringToDate, formatDate } from '../../lib/date-utils';

import {
  PATHNAME_DATASETS,
  PATHNAME_DATASET_DETAILS,
  PATHNAME_CONCEPTS,
  PATHNAME_DATA_SERVICES
} from '../../constants/constants';

import { themeFDK, themeNAP } from '../../app/theme';

import withDataset, {
  Props as DatasetProps
} from '../../components/with-dataset';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../../components/with-reference-data';
import withConcepts, {
  Props as ConceptsProps
} from '../../components/with-concepts';
import withDatasets, {
  Props as DatasetsProps
} from '../../components/with-datasets';
import withPublicServices, {
  Props as PublicServicesProps
} from '../../components/with-public-services';
import withDataServices, {
  Props as DataServicesProps
} from '../../components/with-data-services';
import withKartverket, {
  Props as KartverketProps
} from '../../components/with-kartverket';
import withErrorBoundary from '../../components/with-error-boundary';

import {
  DetailsPage,
  ContentSection,
  InlineList,
  KeyValueList,
  KeyValueListItem
} from '../../components/details-page';
import ErrorPage from '../error-page';
import DatasetDistribution from '../../components/dataset-distribution';
import RelationList from '../../components/relation-list';

import DownloadIcon from '../../images/icon-download-sm.svg';
import EyeIcon from '../../images/icon-eye.svg';

import Preview from '../../components/dataset-distribution/components/preview';

import SC from './styled';

import { Entity } from '../../types/enums';
import {
  AccessService,
  DatasetType,
  Distribution,
  MediaTypeOrExtent
} from '../../types';
import Markdown from '../../components/markdown';
import withResourceRelations, {
  ResourceRelationsProps
} from '../../components/with-resource-relations';
import {
  filterRelations,
  isEuTheme,
  isLosTheme,
  parseFormats
} from '../../utils/common';
import env from '../../env';

const { FDK_PORTAL_BASE_URI } = env;

interface RouteParams {
  datasetId?: string;
}

interface Props
  extends DatasetProps,
    ReferenceDataProps,
    ConceptsProps,
    DatasetsProps,
    DataServicesProps,
    KartverketProps,
    PublicServicesProps,
    ResourceRelationsProps,
    RouteComponentProps<RouteParams> {}

const DatasetDetailsPage: FC<Props> = ({
  dataset,
  isLoadingDataset,
  referenceData: { referencetypes: referenceTypesContainer },
  concepts,
  datasets,
  administrativeUnits,
  dataServices,
  relations,
  datasetActions: { getDatasetRequested: getDataset, resetDataset },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  conceptsActions: { getConceptsRequested: getConcepts, resetConcepts },
  kartverketActions: {
    listAdministrativeUnitsRequested: listAdministrativeUnits,
    resetAdministrativeUnits
  },
  datasetsActions: { getDatasetsRequested: getDatasets, resetDatasets },
  dataServicesActions: {
    getDataServicesRequested: getDataServices,
    resetDataServices
  },
  resourceRelationsActions: {
    getResourceRelationsRequested: getRelations,
    resetResourceRelations
  },
  match: {
    params: { datasetId }
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const renderPage = isLoadingDataset || !isMounted || dataset !== null;

  useEffect(() => {
    if (datasetId) {
      getDataset(datasetId);
      setIsMounted(true);
    }

    if (!referenceTypesContainer) {
      getReferenceData('referencetypes');
    }

    return () => {
      resetDataset();
      resetConcepts();
      resetAdministrativeUnits();
      resetDatasets();
      resetDataServices();
      resetResourceRelations();
    };
  }, [datasetId, getDataset]);

  useEffect(() => {
    if (isMounted) {
      const conceptURIs =
        dataset?.subject
          ?.map(({ identifier, uri }) => uri || identifier)
          .filter(Boolean) ?? [];

      if (conceptURIs.length > 0) {
        getConcepts({
          uri: conceptURIs as string[],
          size: conceptURIs.length
        });
      }

      const datasetUris = dataset?.references?.reduce(
        (accumulator, { source }) =>
          source?.uri ? [...accumulator, source.uri] : accumulator,
        [] as string[]
      );

      if (datasetUris && datasetUris.length > 0) {
        getDatasets({ uri: datasetUris, size: datasetUris.length });
      }
      const spatialUris = dataset?.spatial?.map(({ uri }) => uri) ?? [];
      if (spatialUris.length > 0) {
        listAdministrativeUnits(spatialUris);
      }

      if (dataset?.uri) {
        getRelations({ relations: dataset.uri });
      }

      const accessUris =
        dataset?.distribution
          ?.flatMap(({ accessService }) => accessService?.map(({ uri }) => uri))
          ?.filter((accessUri): accessUri is string => !!accessUri) ?? [];
      if (accessUris.length > 0) {
        getDataServices({ uri: accessUris, size: accessUris.length });
      }
    }
  }, [dataset?.id, isMounted]);

  const dataServicesRelations = filterRelations(relations, Entity.DATA_SERVICE);
  const datasetsRelations = filterRelations(relations, Entity.DATASET);
  const publicServicesRelations = filterRelations(
    relations,
    Entity.PUBLIC_SERVICE
  );

  const entity = Entity.DATASET;

  const theme = {
    entityColours: (getConfig().isNapProfile ? themeNAP : themeFDK)
      .extendedColors[entity]
  };

  const isAuthoritative = dataset?.provenance?.code === 'NASJONAL';
  const isPublicData =
    dataset?.accessRights?.code === 'PUBLIC' && !dataset?.isOpenData;
  const isRestrictedData = dataset?.accessRights?.code === 'RESTRICTED';
  const isNonPublicData = dataset?.accessRights?.code === 'NON_PUBLIC';

  const title = dataset?.title ?? {};
  const description = translate(
    dataset?.descriptionFormatted ?? dataset?.description
  );

  const datasetType = (
    dctType: DatasetType | string | undefined
  ): string | undefined => {
    if (typeof dctType === 'string' || typeof dctType === 'undefined') {
      return dctType;
    }
    const label = translate(dctType.prefLabel);
    return label || dctType.uri;
  };
  const lastPublished = formatDate(
    dateStringToDate(dataset?.harvest?.firstHarvested)
  );
  const objective = translate(dataset?.objective);
  const distributions = dataset?.distribution ?? [];
  const usage = {
    legalBasisForRestriction: dataset?.legalBasisForRestriction ?? [],
    legalBasisForProcessing: dataset?.legalBasisForProcessing ?? [],
    legalBasisForAccess: dataset?.legalBasisForAccess ?? [],
    type: datasetType(dataset?.dctType),
    standards: dataset?.conformsTo ?? [],
    informationModelReferences: dataset?.informationModel ?? [],
    languages: dataset?.language ?? [],
    moreInformationPage: dataset?.landingPage?.[0]
  };
  const samples =
    dataset?.sample?.filter(
      ({
        description: sampleDescription,
        format: formats,
        accessURL: accessURLs,
        downloadURL: downloadURLs
      }) =>
        translate(sampleDescription) ||
        Array.isArray(formats) ||
        Array.isArray(accessURLs) ||
        Array.isArray(downloadURLs)
    ) ?? [];
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
  const datasetReferenceTypes = dataset?.references ?? [];
  const keywords =
    (dataset?.keyword
      ?.map(keyword =>
        getTranslateTextWithLanguageCode(keyword, translations.getLanguage())
      )
      ?.filter(Boolean) as string[]) ?? [];
  const qualifiedAttributions = dataset?.qualifiedAttributions ?? [];
  const temporalRestrictions = dataset?.temporal ?? [];
  const contactPoints = dataset?.contactPoint ?? [];

  const referencedResourcesUnResolved =
    dataset?.references?.filter(
      ({ source }) =>
        !referencedDatasets.some(
          ({ uri: referencedDatasetsUri }) =>
            referencedDatasetsUri === source?.uri
        ) &&
        (source?.uri || source?.prefLabel)
    ) ?? [];

  const mapAccessServices = (distribution: Distribution) => {
    const accessServices: AccessService[] = [];
    distribution?.accessService?.forEach(({ uri }) => {
      if (uri) {
        const dataService = dataServices.find(ds => ds.uri === uri);
        dataService
          ? accessServices.push({
              description: dataService.title,
              endpointDescription: dataService.endpointDescription,
              uri: `${PATHNAME_DATA_SERVICES}/${dataService.id}`
            })
          : accessServices.push({ description: { nb: uri }, uri });
      }
    });

    return accessServices;
  };

  const uriNotInRefConcepts = (uri: string | undefined) => {
    if (!uri) {
      return true;
    }
    return !referencedConcepts.find(concept => concept.uri === uri);
  };

  const subjectsNotInRefConcepts =
    dataset?.subject
      ?.filter(Boolean)
      ?.filter(
        subject =>
          uriNotInRefConcepts(subject.uri) &&
          uriNotInRefConcepts(subject.identifier)
      ) ?? [];

  const [showSamplePreview, setShowSamplePreview] = useState(false);

  const handleShowSamplePreview = (show: boolean) => {
    setShowSamplePreview(show);
  };

  const themes = [...(dataset?.losTheme ?? []), ...(dataset?.theme ?? [])];

  return renderPage ? (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>
          {dataset?.title
            ? `${translate(dataset.title)} - data.norge.no`
            : `${translations.head.title} - data.norge.no`}
        </title>
        <meta
          name='description'
          content={
            dataset?.description
              ? translate(dataset.description)?.substring(0, 160) ||
                translations.head.description
              : translations.head.description
          }
        />
        <meta
          property='og:title'
          content={
            dataset?.title
              ? `${translate(dataset.title)} - data.norge.no`
              : `${translations.head.title} - data.norge.no`
          }
        />
        <meta
          property='og:description'
          content={
            dataset?.description
              ? translate(dataset.description)?.substring(0, 160) ||
                translations.head.description
              : translations.head.description
          }
        />
        <meta property='og:type' content='website' />
      </Helmet>
      <DetailsPage
        entity={entity}
        title={title}
        publisher={dataset?.publisher}
        entityId={dataset?.id}
        entityUri={dataset?.uri}
        lastPublished={lastPublished}
        isAuthoritative={isAuthoritative}
        isOpenData={dataset?.isOpenData || false}
        isPublicData={isPublicData}
        isRestrictedData={isRestrictedData}
        isNonPublicData={isNonPublicData}
      >
        {description && (
          <ContentSection
            id='description'
            title={translations.detailsPage.sectionTitles.dataset.description}
            truncate
          >
            <Markdown>{description}</Markdown>
          </ContentSection>
        )}
        {objective && (
          <ContentSection
            id='objective'
            title={translations.detailsPage.sectionTitles.dataset.objective}
          >
            <Markdown>{objective}</Markdown>
          </ContentSection>
        )}
        {(distributions.length > 0 || dataServicesRelations.length > 0) && (
          <ContentSection
            id='distributions'
            title={`${
              translations.formatString(
                translations.detailsPage.sectionTitles.dataset.distributions,
                { count: distributions.length }
              ) as string
            }
                ${
                  dataServicesRelations.length > 0
                    ? (translations.formatString(
                        translations.detailsPage.sectionTitles.dataset
                          .dataservices,
                        { count: dataServicesRelations.length }
                      ) as string)
                    : ''
                }`}
          >
            {dataServicesRelations.map(
              (
                {
                  id,
                  title: dataserviceTitle,
                  uri,
                  description: dataserviceDescription,
                  fdkFormatPrefixed
                },
                index
              ) => (
                <DatasetDistribution
                  key={`${uri || 'distribution-data-service'}-${index}`}
                  datasetTitle={title}
                  distribution={{
                    title: dataserviceTitle,
                    fdkFormat:
                      (parseFormats(fdkFormatPrefixed)?.filter(
                        format => format?.name
                      ) as MediaTypeOrExtent[]) ?? [],
                    description: dataserviceDescription
                  }}
                  accessServices={
                    dataserviceTitle && [
                      {
                        uri: `${PATHNAME_DATA_SERVICES}/${id}`,
                        description: dataserviceTitle
                      }
                    ]
                  }
                />
              )
            )}
            {distributions.map((distribution, index) => (
              <DatasetDistribution
                key={`${distribution.uri || 'distribution'}-${index}`}
                datasetTitle={title}
                distribution={distribution}
                accessServices={mapAccessServices(distribution)}
              />
            ))}
          </ContentSection>
        )}
        {Object.values(usage)
          .filter(Boolean)
          .filter(item => item && item?.length > 0).length > 0 && (
          <ContentSection
            id='usage'
            title={translations.detailsPage.sectionTitles.dataset.usage}
          >
            <KeyValueList>
              {usage.legalBasisForRestriction.length > 0 && (
                <KeyValueListItem
                  property={translations.dataset.legalBasisForRestriction}
                  value={
                    <SC.ExternalLinkList>
                      {usage.legalBasisForRestriction.map(
                        ({ uri, prefLabel }, index) =>
                          uri &&
                          prefLabel && (
                            <Link key={`${uri}-${index}`} href={uri} external>
                              {translate(prefLabel) ?? uri}
                            </Link>
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
                        ({ uri, prefLabel }, index) =>
                          uri &&
                          prefLabel && (
                            <Link key={`${uri}-${index}`} href={uri} external>
                              {translate(prefLabel) ?? uri}
                            </Link>
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
                        ({ uri, prefLabel }, index) =>
                          uri &&
                          prefLabel && (
                            <Link key={`${uri}-${index}`} href={uri} external>
                              {translate(prefLabel) ?? uri}
                            </Link>
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
                        ({ uri, prefLabel }, index) =>
                          uri &&
                          prefLabel && (
                            <Link key={`${uri}-${index}`} href={uri} external>
                              {translate(prefLabel) ?? uri}
                            </Link>
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
                        ({ uri, prefLabel }, index) =>
                          uri &&
                          prefLabel && (
                            <Link key={`${uri}-${index}`} href={uri} external>
                              {translate(prefLabel)}
                            </Link>
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
                  property=''
                  value={
                    <Link href={usage.moreInformationPage} external>
                      {translations.dataset.landingPage}
                    </Link>
                  }
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {samples.length > 0 && (
          <ContentSection
            id='sample'
            title={translations.detailsPage.sectionTitles.dataset.sample}
          >
            {samples.map(
              (
                {
                  description: sampleDescription,
                  format: formats,
                  accessURL: accessURLs,
                  downloadURL: downloadURLs
                },
                index
              ) => (
                <>
                  <KeyValueList key={`sample-${index}`}>
                    <KeyValueListItem
                      property={translations.dataset.distribution.description}
                      value={translate(sampleDescription)}
                    />
                    <KeyValueListItem
                      property={translations.dataset.distribution.format}
                      value={formats?.join(', ')}
                    />
                    {Array.isArray(accessURLs) && (
                      <KeyValueListItem
                        property={translations.dataset.distribution.accessUrl}
                        value={
                          <Link href={accessURLs?.[0]} external>
                            {translate(accessURLs?.[0])}
                          </Link>
                        }
                      />
                    )}
                  </KeyValueList>
                  {Array.isArray(downloadURLs) && (
                    <SC.Section>
                      <SC.DownloadLink
                        href={downloadURLs?.[0]}
                        icon={<DownloadIcon />}
                      >
                        {translations.dataset.sample.download}
                      </SC.DownloadLink>
                      <SC.PreviewLink
                        onClick={() => handleShowSamplePreview(true)}
                        icon={<EyeIcon />}
                      >
                        {translations.dataset.sample.preview}
                      </SC.PreviewLink>
                    </SC.Section>
                  )}
                  {Array.isArray(downloadURLs) && showSamplePreview && (
                    <Preview
                      title={
                        translations.detailsPage.sectionTitles.dataset.sample ??
                        ''
                      }
                      subtitle={translate(description) ?? accessURLs?.[0]}
                      downloadURL={downloadURLs?.[0]}
                      rowCount={100}
                      isOpen={showSamplePreview}
                      onClose={() => handleShowSamplePreview(false)}
                    />
                  )}
                </>
              )
            )}
          </ContentSection>
        )}
        {Object.values(provenance).filter(Boolean).length > 0 && (
          <ContentSection
            id='provenance'
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
            id='quality'
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
        {(referencedConcepts.length > 0 ||
          subjectsNotInRefConcepts.length > 0) && (
          <ContentSection
            id='concept-references'
            title={
              translations.detailsPage.sectionTitles.dataset.conceptReferences
            }
            entityIcon={Entity.CONCEPT}
            boxStyle
          >
            <KeyValueList>
              {referencedConcepts.map(
                (
                  { id, title: conceptTitle, description: conceptDescription },
                  index
                ) =>
                  id && (
                    <KeyValueListItem
                      key={`${id}-${index}`}
                      property={
                        <Link to={`${PATHNAME_CONCEPTS}/${id}`} as={RouteLink}>
                          {translate(conceptTitle)}
                        </Link>
                      }
                      value={translate(conceptDescription)}
                    />
                  )
              )}

              {subjectsNotInRefConcepts.map(
                ({ uri, prefLabel, definition }, index) =>
                  uri && (
                    <KeyValueListItem
                      key={`concept-${index}`}
                      property={
                        <Link href={uri} external>
                          {prefLabel ? translate(prefLabel) : uri}
                        </Link>
                      }
                      value={definition ? translate(definition) : ''}
                    />
                  )
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {referencedDatasets.length > 0 && (
          <ContentSection
            id='dataset-references'
            title={
              translations.detailsPage.sectionTitles.dataset.datasetReferences
            }
            entityIcon={Entity.DATASET}
            boxStyle
          >
            <KeyValueList>
              {referencedDatasets.map(
                ({ id, uri, title: datasetTitle }, index) => (
                  <KeyValueListItem
                    key={`${id}-${index}`}
                    property={translate(
                      referenceTypesContainer?.referenceTypes?.find(
                        ({ uri: referenceUri }) =>
                          referenceUri ===
                          datasetReferenceTypes.find(
                            ({ source }) => source?.uri === uri
                          )?.referenceType?.uri
                      )?.label
                    )}
                    value={
                      <Link
                        href={`${FDK_PORTAL_BASE_URI}${PATHNAME_DATASET_DETAILS}/${id}`}
                      >
                        {translate(datasetTitle)}
                      </Link>
                    }
                  />
                )
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {referencedResourcesUnResolved.length > 0 && (
          <ContentSection
            id='dataset-references-other'
            title={
              translations.detailsPage.sectionTitles.dataset.resourceReferences
            }
            entityIcon={Entity.DATASET}
            boxStyle
          >
            <InlineList column>
              {referencedResourcesUnResolved.map(({ source }, index) => (
                <Link
                  href={source?.uri}
                  rel='noopener noreferrer'
                  key={`unresolved-ref-${index}`}
                >
                  {translate(source?.prefLabel ?? source?.uri)}
                </Link>
              ))}
            </InlineList>
          </ContentSection>
        )}
        {themes.length > 0 && (
          <ContentSection id='themes' title={translations.facet.theme}>
            <InlineList>
              {themes.map(dataTheme => {
                if (isLosTheme(dataTheme)) {
                  const { uri, name, losPaths: [losPath] = [] } = dataTheme;
                  return (
                    <Link
                      key={uri}
                      to={`${PATHNAME_DATASETS}?losTheme=${losPath}`}
                      as={RouteLink}
                    >
                      {translate(name)}
                    </Link>
                  );
                }
                if (isEuTheme(dataTheme)) {
                  const {
                    title: themeTitle,
                    label: themeLabel,
                    code
                  } = dataTheme;
                  return (
                    <Link
                      key={`euTheme-${dataTheme.code}`}
                      to={`${PATHNAME_DATASETS}?theme=${code}`}
                      as={RouteLink}
                    >
                      {themeTitle
                        ? translate(themeTitle)
                        : translate(themeLabel)}
                    </Link>
                  );
                }
                return null;
              })}
            </InlineList>
          </ContentSection>
        )}
        {keywords.length > 0 && (
          <ContentSection
            id='keywords'
            title={translations.detailsPage.sectionTitles.dataset.keywords}
          >
            <InlineList>
              {keywords.map((keyword, index) => (
                <Link
                  key={`${keyword}-${index}`}
                  to={`${PATHNAME_DATASETS}?q=${encodeURIComponent(keyword)}`}
                  as={RouteLink}
                >
                  {keyword}
                </Link>
              ))}
            </InlineList>
          </ContentSection>
        )}

        {qualifiedAttributions.length > 0 && (
          <ContentSection
            id='qualifiedAttributions'
            title={
              translations.detailsPage.sectionTitles.dataset
                .qualifiedAttributions
            }
          >
            {qualifiedAttributions
              .map(
                ({ agent: { name, prefLabel } }) => translate(prefLabel) || name
              )
              .join(', ')}
          </ContentSection>
        )}
        {(administrativeUnits.length > 0 ||
          temporalRestrictions.length > 0) && (
          <ContentSection
            id='restrictions'
            title={translations.detailsPage.sectionTitles.dataset.restrictions}
          >
            <KeyValueList>
              {administrativeUnits.map(({ uri, name }, index) => (
                <KeyValueListItem
                  key={`${uri}-${index}`}
                  property={translations.dataset.spatial}
                  value={
                    uri ? (
                      <Link href={uri} external>
                        {translate(name) || uri}
                      </Link>
                    ) : (
                      translate(name) || uri
                    )
                  }
                />
              ))}
              {temporalRestrictions.map(({ startDate, endDate }, index) => (
                <KeyValueListItem
                  key={`${startDate}-${endDate}-${index}`}
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
        {(datasetsRelations.length > 0 ||
          publicServicesRelations.length > 0) && (
          <ContentSection
            id='relationList'
            title={translations.detailsPage.relationList.title.dataset}
          >
            <RelationList
              parentIdentifier={dataset?.uri}
              datasets={datasetsRelations}
              publicServices={publicServicesRelations}
            />
          </ContentSection>
        )}
        {contactPoints.length > 0 && (
          <ContentSection
            id='contact-information'
            title={
              translations.detailsPage.sectionTitles.dataset.contactInformation
            }
          >
            {contactPoints.map(
              ({ organizationUnit, email, hasURL, hasTelephone }, index) => (
                <KeyValueList
                  key={`${translate(
                    organizationUnit
                  )}-${email}-${hasURL}-${hasTelephone}-${index}`}
                >
                  {hasURL && (
                    <KeyValueListItem
                      property={translations.contactPoint}
                      value={
                        <Link href={hasURL} external>
                          {translate(organizationUnit) ?? hasURL}
                        </Link>
                      }
                    />
                  )}
                  {!hasURL && organizationUnit && (
                    <KeyValueListItem
                      property={translations.contactPoint}
                      value={translate(organizationUnit)}
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
      </DetailsPage>
    </ThemeProvider>
  ) : (
    <ErrorPage errorCode='404' />
  );
};

export default compose(
  memo,
  withDataset,
  withReferenceData,
  withConcepts,
  withDatasets,
  withDataServices,
  withPublicServices,
  withKartverket,
  withResourceRelations,
  withErrorBoundary(ErrorPage)
)(DatasetDetailsPage);
