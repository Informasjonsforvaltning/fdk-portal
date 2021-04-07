import React, { memo, FC, useState, useEffect, Fragment } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import parse from 'html-react-parser';
import { Alignment } from '@fellesdatakatalog/theme';
import { Tab, Pane } from '@fellesdatakatalog/tabs';

import translations from '../../lib/localization';
import { dateStringToDate, formatDate } from '../../lib/date-utils';
import { getTranslateText as translate } from '../../lib/translateText';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

import { PATHNAME_INFORMATIONMODELS } from '../../constants/constants';

import { themeFDK } from '../../app/theme';

import withInformationModel, {
  Props as InformationModelProps
} from '../with-information-model';
import withConcepts, { Props as ConceptsProps } from '../with-concepts';
import withInformationModels, {
  Props as InformationModelsProps
} from '../with-information-models';
import withDatasets, { Props as DatasetProps } from '../with-datasets';
import withDataServices, {
  Props as DataServicesProps
} from '../with-data-services';
import withErrorBoundary from '../with-error-boundary';

import DetailsPage, {
  ContentSection,
  InlineList,
  KeyValueList,
  KeyValueListItem
} from '../details-page';
import ErrorPage from '../error-page';
import InfoModelStructure from '../infomodel-structure';
import RelationList from '../relation-list';

import SC from './styled';

import type { InformationModel } from '../../types';
import { Entity, DataFormat } from '../../types/enums';
import { getConfig } from '../../config';

interface RouteParams {
  informationModelId: string;
}

interface Props
  extends InformationModelProps,
    ConceptsProps,
    InformationModelsProps,
    RouteComponentProps<RouteParams>,
    DatasetProps,
    DataServicesProps {}

const InformationModelDetailsPage: FC<Props> = ({
  informationModel,
  informationModelRdfRepresentations,
  concepts,
  informationModels,
  isLoadingInformationModel,
  isLoadingInformationModelRdfRepresentations,
  datasetsRelations,
  dataServicesRelations,
  informationModelsRelations,
  informationModelActions: {
    getInformationModelRequested: getInformationModel,
    getInformationModelRdfRepresentationsRequested: getInformationModelRdfRepresentations,
    resetInformationModel
  },
  conceptsActions: { getConceptsRequested: getConcepts, resetConcepts },
  informationModelsActions: {
    getInformationModelsRequested: getInformationModels,
    getInformationModelsRelationsRequested: getInformationmodelsRelations,
    resetInformationModelsRelations
  },
  datasetsActions: {
    getDatasetsRelationsRequested: getDatasetsRelations,
    resetDatasetsRelations
  },
  dataServicesActions: {
    getDataServicesRelationsRequested: getDataServicesRelations,
    resetDataServicesRelations
  },
  match: {
    params: { informationModelId }
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const entity = Entity.INFORMATION_MODEL;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  useEffect(() => {
    if (informationModel?.id !== informationModelId) {
      getInformationModel(informationModelId);
      getInformationModelRdfRepresentations(informationModelId, [
        DataFormat.TURTLE,
        DataFormat.JSONLD,
        DataFormat.RDF_XML
      ]);
    }

    setIsMounted(true);

    return () => {
      resetInformationModel();
      resetConcepts();
    };
  }, [location.pathname]);

  const isLoading =
    !isMounted ||
    isLoadingInformationModel ||
    isLoadingInformationModelRdfRepresentations;

  const renderPage = isLoading || informationModel !== null;

  const informationModelStatus: { [key: string]: string } = {
    'http://purl.org/adms/status/Completed':
      translations.infoMod.statusCompleted,
    'http://purl.org/adms/status/Deprecated':
      translations.infoMod.statusDeprecated,
    'http://purl.org/adms/status/UnderDevelopment':
      translations.infoMod.statusUnderDevelopment,
    'http://purl.org/adms/status/Withdrawn':
      translations.infoMod.statusWithdrawn
  };

  const entityId = informationModel?.id;
  const entityUri = informationModel?.id;
  const identifier = informationModel?.identifier?.[0];
  const publisher = informationModel?.publisher;
  const title = informationModel?.title ?? {};
  const description = translate(
    informationModel?.description ?? informationModel?.modelDescription
  );
  const iriType = informationModel?.dctType?.match(/#.*/)?.[0];
  const type = iriType
    ? translations.infoMod.types[iriType]
    : informationModel?.dctType;
  const status = informationModel?.status
    ? translate(informationModelStatus?.[informationModel.status])
    : null;
  const issued = formatDate(dateStringToDate(informationModel?.issued));
  const modified = formatDate(dateStringToDate(informationModel?.modified));
  const version = informationModel?.versionInfo;
  const validFromIncluding = formatDate(
    dateStringToDate(informationModel?.validFromIncluding)
  );
  const validToIncluding = formatDate(
    dateStringToDate(informationModel?.validToIncluding)
  );
  const licenses = informationModel?.license ?? [];
  const languages = informationModel?.language ?? [];
  const seeAlso = informationModel?.homepage;
  const keywords =
    informationModel?.keyword
      ?.filter(keyword => translations.getLanguage() in keyword)
      .map(translate)
      .filter(Boolean) ?? [];
  const spatialRestrictions = informationModel?.spatial ?? [];
  const lastPublished = formatDate(
    dateStringToDate(informationModel?.harvest?.firstHarvested)
  );
  const informationModelCategory = informationModel?.category;
  const conceptIdentifiers = informationModel?.containsSubjects ?? [];
  const modelElements = informationModel?.modelElements ?? {};
  const modelProperties = informationModel?.modelProperties ?? {};
  const isPartOf = informationModel?.isPartOf;
  const hasPart = informationModel?.hasPart;
  const isReplacedBy = informationModel?.isReplacedBy;
  const replaces = informationModel?.replaces;
  const contactPoint = informationModel?.contactPoint;
  const themes = [
    ...(informationModel?.losTheme ?? []),
    ...(informationModel?.theme ?? [])
  ];

  const informationModelIdentifiers = ([
    isPartOf,
    hasPart,
    isReplacedBy,
    replaces
  ] as string[]).filter(Boolean);

  const informationModelsMap = informationModels.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, InformationModel>
  );

  useEffect(() => {
    if (conceptIdentifiers.length > 0) {
      getConcepts({
        identifiers: conceptIdentifiers as string[],
        size: 1000
      });
    }
  }, [conceptIdentifiers.join()]);

  useEffect(() => {
    if (informationModelIdentifiers.length > 0) {
      getInformationModels({ informationModelIdentifiers, size: 4 });
    }
  }, [informationModelIdentifiers.join()]);

  useEffect(() => {
    if (informationModel?.uri) {
      getDataServicesRelations({ endpointDescription: informationModel.uri });
      getInformationmodelsRelations({ relations: informationModel.uri });
    }
    return () => {
      resetDataServicesRelations();
      resetInformationModelsRelations();
    };
  }, [informationModel?.uri]);

  useEffect(() => {
    if (informationModel?.id) {
      getDatasetsRelations({
        relatedToInfoModel: getConfig().searchHost.host + location.pathname
      });
    }
    return () => {
      resetDatasetsRelations();
    };
  }, [informationModel?.id]);

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
              translations.detailsPage.sectionTitles.informationModel
                .description
            }
            entityTheme={Entity.INFORMATION_MODEL}
            truncate
          >
            {parse(convertToSanitizedHtml(description))}
          </ContentSection>
        )}
        {(status ||
          issued ||
          modified ||
          version ||
          validFromIncluding ||
          validToIncluding) && (
          <ContentSection
            id='status'
            title={
              translations.detailsPage.sectionTitles.informationModel.status
            }
          >
            <KeyValueList>
              {status && (
                <KeyValueListItem
                  property={translations.infoMod.modelStatus}
                  value={status}
                />
              )}
              {issued && (
                <KeyValueListItem
                  property={translations.infoMod.issued}
                  value={issued}
                />
              )}
              {modified && (
                <KeyValueListItem
                  property={translations.infoMod.lastModified}
                  value={modified}
                />
              )}
              {version && (
                <KeyValueListItem
                  property={translations.infoMod.version}
                  value={version}
                />
              )}
              {(validFromIncluding || validToIncluding) && (
                <KeyValueListItem
                  property={translations.infoMod.valid}
                  value={`${
                    validFromIncluding
                      ? `${translations.infoMod.from} ${validFromIncluding} `
                      : ''
                  }${
                    validToIncluding
                      ? `${translations.infoMod.to} ${validToIncluding}`
                      : ''
                  }`}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {(type ||
          licenses.length > 0 ||
          languages.length > 0 ||
          informationModelCategory ||
          seeAlso) && (
          <ContentSection
            id='usage'
            title={
              translations.detailsPage.sectionTitles.informationModel.usage
            }
          >
            <KeyValueList>
              {informationModelCategory && (
                <KeyValueListItem
                  property={translations.infoMod.category}
                  value={informationModelCategory}
                />
              )}
              {licenses.length > 0 && (
                <KeyValueListItem
                  property={translations.infoMod.license}
                  value={licenses.map(({ uri, code, prefLabel }) => (
                    <Fragment key={code}>
                      <SC.Link href={uri} external>
                        {translate(prefLabel) || uri}
                      </SC.Link>
                      <br />
                    </Fragment>
                  ))}
                />
              )}
              {type && (
                <KeyValueListItem
                  property={translations.infoMod.type}
                  value={type}
                />
              )}
              {languages.length > 0 && (
                <KeyValueListItem
                  property={translations.infoMod.language}
                  value={languages
                    .map(({ prefLabel }) => translate(prefLabel))
                    .filter(Boolean)
                    .join(', ')}
                />
              )}
              {seeAlso && (
                <KeyValueListItem
                  property={translations.infoMod.seeAlso}
                  value={
                    <SC.Link href={seeAlso} external>
                      {translations.infoMod.moreInfo}
                    </SC.Link>
                  }
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {!isLoading &&
          (Object.values(modelElements).length > 0 ||
            informationModelRdfRepresentations?.[DataFormat.TURTLE] ||
            informationModelRdfRepresentations?.[DataFormat.JSONLD] ||
            informationModelRdfRepresentations?.[DataFormat.RDF_XML]) && (
            <ContentSection
              id='information-model'
              title={
                translations.detailsPage.sectionTitles.informationModel
                  .informationModel
              }
            >
              <SC.Tabs tabsAlignment={Alignment.LEFT}>
                {Object.values(modelElements).length > 0 && (
                  <Tab for='structure-pane' as={SC.Tab}>
                    {translations.infoMod.tabs.structure}
                  </Tab>
                )}
                {informationModelRdfRepresentations?.[DataFormat.TURTLE] && (
                  <Tab for='turtle-pane' as={SC.Tab}>
                    {translations.infoMod.tabs.turtle}
                  </Tab>
                )}
                {informationModelRdfRepresentations?.[DataFormat.JSONLD] && (
                  <Tab for='jsonld-pane' as={SC.Tab}>
                    {translations.infoMod.tabs.jsonld}
                  </Tab>
                )}
                {informationModelRdfRepresentations?.[DataFormat.RDF_XML] && (
                  <Tab for='rdfxml-pane' as={SC.Tab}>
                    {translations.infoMod.tabs.rdfxml}
                  </Tab>
                )}
                {Object.values(modelElements).length > 0 && (
                  <Pane id='structure-pane' as={SC.Pane}>
                    <InfoModelStructure
                      modelElements={modelElements}
                      modelProperties={modelProperties}
                      concepts={concepts}
                    />
                  </Pane>
                )}
                {informationModelRdfRepresentations?.[DataFormat.TURTLE] && (
                  <Pane id='turtle-pane' as={SC.Pane}>
                    <SC.Code>
                      {informationModelRdfRepresentations[DataFormat.TURTLE]}
                    </SC.Code>
                  </Pane>
                )}
                {informationModelRdfRepresentations?.[DataFormat.JSONLD] && (
                  <Pane id='jsonld-pane' as={SC.Pane}>
                    <SC.Code>
                      {informationModelRdfRepresentations[DataFormat.JSONLD]}
                    </SC.Code>
                  </Pane>
                )}
                {informationModelRdfRepresentations?.[DataFormat.RDF_XML] && (
                  <Pane id='rdfxml-pane' as={SC.Pane}>
                    <SC.Code>
                      {informationModelRdfRepresentations[DataFormat.RDF_XML]}
                    </SC.Code>
                  </Pane>
                )}
              </SC.Tabs>
            </ContentSection>
          )}
        {identifier && (
          <ContentSection
            id='identifiers'
            title={
              translations.detailsPage.sectionTitles.informationModel
                .identifiers
            }
          >
            <KeyValueList>
              {identifier && (
                <KeyValueListItem
                  property={translations.infoMod.identifier}
                  value={identifier}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}

        {keywords.length > 0 && (
          <ContentSection
            id='keywords'
            title={
              translations.detailsPage.sectionTitles.informationModel.keywords
            }
          >
            <InlineList>
              {keywords.map((keyword, index) => (
                <SC.Link
                  to={`${PATHNAME_INFORMATIONMODELS}?keywords=${encodeURIComponent(
                    keyword
                  )}`}
                  key={`${keyword}-${index}`}
                  forwardedAs={RouteLink}
                >
                  {keyword}
                </SC.Link>
              ))}
            </InlineList>
          </ContentSection>
        )}
        {(isPartOf || hasPart || isReplacedBy || replaces) && (
          <ContentSection
            id='information-model-references'
            title={
              translations.detailsPage.sectionTitles.informationModel.relations
            }
          >
            <KeyValueList>
              {isPartOf && (
                <KeyValueListItem
                  property={translations.infoMod.isPartOf}
                  value={
                    informationModelsMap[isPartOf] ? (
                      <SC.Link
                        to={`${PATHNAME_INFORMATIONMODELS}/${informationModelsMap[isPartOf].id}`}
                        forwardedAs={RouteLink}
                      >
                        {translate(informationModelsMap[isPartOf].title)}
                      </SC.Link>
                    ) : (
                      isPartOf
                    )
                  }
                />
              )}
              {hasPart && (
                <KeyValueListItem
                  property={translations.infoMod.hasPart}
                  value={
                    informationModelsMap[hasPart] ? (
                      <SC.Link
                        to={`${PATHNAME_INFORMATIONMODELS}/${informationModelsMap[hasPart].id}`}
                        forwardedAs={RouteLink}
                      >
                        {translate(informationModelsMap[hasPart].title)}
                      </SC.Link>
                    ) : (
                      hasPart
                    )
                  }
                />
              )}
              {isReplacedBy && (
                <KeyValueListItem
                  property={translations.infoMod.isReplacedBy}
                  value={
                    informationModelsMap[isReplacedBy] ? (
                      <SC.Link
                        to={`${PATHNAME_INFORMATIONMODELS}/${informationModelsMap[isReplacedBy].id}`}
                        forwardedAs={RouteLink}
                      >
                        {translate(informationModelsMap[isReplacedBy].title)}
                      </SC.Link>
                    ) : (
                      isReplacedBy
                    )
                  }
                />
              )}
              {replaces && (
                <KeyValueListItem
                  property={translations.infoMod.replaces}
                  value={
                    informationModelsMap[replaces] ? (
                      <SC.Link
                        to={`${PATHNAME_INFORMATIONMODELS}/${informationModelsMap[replaces].id}`}
                        forwardedAs={RouteLink}
                      >
                        {translate(informationModelsMap[replaces].title)}
                      </SC.Link>
                    ) : (
                      replaces
                    )
                  }
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {spatialRestrictions.length > 0 && (
          <ContentSection
            id='spatial-restrictions'
            title={
              translations.detailsPage.sectionTitles.informationModel
                .spatialRestrictions
            }
          >
            <InlineList>
              {spatialRestrictions.map(({ uri, prefLabel }) => (
                <SC.Link href={uri} key={uri} external>
                  {translate(prefLabel) ?? uri}
                </SC.Link>
              ))}
            </InlineList>
          </ContentSection>
        )}
        {(datasetsRelations.length > 0 ||
          dataServicesRelations.length > 0 ||
          informationModelsRelations.length > 0) && (
          <ContentSection
            id='relationList'
            title={translations.detailsPage.relationList.title.informationmodel}
          >
            <RelationList
              parentIdentifier={informationModel?.uri}
              datasets={datasetsRelations}
              dataServices={dataServicesRelations}
              informationModels={informationModelsRelations}
            />
          </ContentSection>
        )}
        {contactPoint && contactPoint.length > 0 && (
          <ContentSection
            id='contact-information'
            title={
              translations.detailsPage.sectionTitles.informationModel
                .contactInformation
            }
          >
            {contactPoint?.map(
              (
                {
                  fullname,
                  organizationName,
                  organizationUnit,
                  email,
                  hasTelephone
                },
                index
              ) => (
                <KeyValueList
                  key={`${fullname}-${email}-${hasTelephone}-${index}`}
                >
                  {(fullname || organizationName || organizationUnit) && (
                    <KeyValueListItem
                      property={translations.name}
                      value={translate(
                        fullname || organizationName || organizationUnit
                      )}
                    />
                  )}
                  {email && (
                    <KeyValueListItem
                      property={translations.email}
                      value={
                        <SC.Link
                          title={email}
                          href={`mailto:${email}`}
                          rel='noopener noreferrer'
                        >
                          {email}
                        </SC.Link>
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

export default compose<FC>(
  memo,
  withInformationModel,
  withConcepts,
  withInformationModels,
  withDatasets,
  withDataServices,
  withErrorBoundary(ErrorPage)
)(InformationModelDetailsPage);
