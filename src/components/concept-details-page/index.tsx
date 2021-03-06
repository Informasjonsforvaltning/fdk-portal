import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import { dateStringToDate, formatDate } from '../../lib/date-utils';
import { getTranslateText as translate } from '../../lib/translateText';

import { themeFDK } from '../../app/theme';

import withConcept, { Props as ConceptProps } from '../with-concept';
import withDatasets, { Props as DatasetsProps } from '../with-datasets';
import withInformationModels, {
  Props as InformationModelsProps
} from '../with-information-models';
import withConcepts, { Props as ConceptsProps } from '../with-concepts';
import withPublicServices, {
  Props as PublicServicesProps
} from '../with-public-services';
import withErrorBoundary from '../with-error-boundary';

import DetailsPage, {
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../details-page';
import ErrorPage from '../error-page';
import RelationList from '../relation-list';

import SC from './styled';

import type { Theme } from '../../types';
import { Entity } from '../../types/enums';

interface RouteParams {
  conceptId: string;
}

interface Props
  extends ConceptProps,
    DatasetsProps,
    InformationModelsProps,
    ConceptsProps,
    PublicServicesProps,
    RouteComponentProps<RouteParams> {}

const ConceptDetailsPage: FC<Props> = ({
  concept,
  isLoadingConcept,
  datasetsRelations,
  publicServicesRelations,
  conceptsRelations,
  informationModelsRelations,
  conceptActions: { getConceptRequested: getConcept },
  conceptsActions: {
    getConceptsRelationsRequested: getConceptsRelations,
    resetConceptsRelations
  },
  datasetsActions: {
    getDatasetsRelationsRequested: getDatasetsRelations,
    resetDatasetsRelations
  },
  informationModelsActions: {
    getInformationModelsRelationsRequested: getInformationmodelsRelations,
    resetInformationModelsRelations
  },
  conceptsActions: { getConceptsRequested: getConcepts },
  publicServicesActions: {
    getPublicServicesRelationsRequested: getPublicServicesRelations,
    resetPublicServicesRelations
  },
  match: {
    params: { conceptId }
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const renderPage = isLoadingConcept || !isMounted || concept !== null;

  const entity = Entity.CONCEPT;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  useEffect(() => {
    if (concept?.id !== conceptId) {
      getConcept(conceptId);
    }

    setIsMounted(true);

    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (concept?.seeAlso && concept?.seeAlso.length > 0) {
      getConcepts({ identifiers: concept.seeAlso, size: 1000 });
    }
  }, [concept?.id]);

  useEffect(() => {
    if (concept?.identifier) {
      getConceptsRelations({ seeAlso: concept.identifier });
      getDatasetsRelations({ subject: concept.identifier });
      getInformationmodelsRelations({
        conceptIdentifiers: [concept.identifier]
      });
      getPublicServicesRelations({ isClassifiedBy: concept.identifier });
    }
    return () => {
      resetConceptsRelations();
      resetDatasetsRelations();
      resetInformationModelsRelations();
      resetPublicServicesRelations();
    };
  }, [concept?.identifier]);

  const entityId = concept?.id;
  const entityUri = concept?.uri;
  const identifier = concept?.identifier;
  const publisher = concept?.publisher;
  const title = translate(concept?.prefLabel);
  const description = translate(concept?.definition.text);
  const sourceRelationship = concept?.definition.sourceRelationship;
  const sources = concept?.definition.sources ?? [];
  const remark = translate(concept?.definition.remark);
  const altLabels =
    concept?.altLabel
      ?.filter(
        label =>
          label?.[translations.getLanguage() as 'nb' | 'nn' | 'no' | 'en']
      )
      .filter(Boolean) ?? [];
  const hiddenLabels =
    concept?.hiddenLabel
      ?.filter(
        label =>
          label?.[translations.getLanguage() as 'nb' | 'nn' | 'no' | 'en']
      )
      .filter(Boolean) ?? [];
  const example = translate(concept?.example);
  const subject = translate(concept?.subject);
  const applications =
    concept?.application
      ?.filter(
        application =>
          application?.[translations.getLanguage() as 'nb' | 'nn' | 'no' | 'en']
      )
      .filter(Boolean) ?? [];
  const range = translate(concept?.definition.range?.text);
  const rangeUri = concept?.definition.range?.uri;
  const lastPublished = formatDate(
    dateStringToDate(concept?.harvest?.firstHarvested)
  );
  const validFromIncluding = formatDate(
    dateStringToDate(concept?.validFromIncluding)
  );
  const validToIncluding = formatDate(
    dateStringToDate(concept?.validToIncluding)
  );
  const contactPoint = concept?.contactPoint;
  const themes: Theme[] = [];

  const renderSources = () => {
    if (sourceRelationship === 'egendefinert') {
      return `${translations.compare.source}: ${translations.sourceRelationship[sourceRelationship]}`;
    }

    return sources?.length ? (
      <>
        <span>
          {`${translations.compare.source}: ${
            sourceRelationship
              ? translations.sourceRelationship[sourceRelationship]
              : ''
          }`}
        </span>
        {sources.map(({ text, uri }, index) => (
          <span key={`${text}-${uri}`}>
            {index > 0 && ','}
            &nbsp;
            {uri ? (
              <Link href={uri} external>
                {translate(text) || uri}
              </Link>
            ) : (
              translate(text)
            )}
          </span>
        ))}
      </>
    ) : null;
  };

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
            title={translations.detailsPage.sectionTitles.concept.description}
            entityTheme={Entity.CONCEPT}
            truncate
          >
            {description}
            <SC.Sources>{renderSources()}</SC.Sources>
          </ContentSection>
        )}
        {(validFromIncluding || validToIncluding) && (
          <ContentSection
            id='validity'
            title={translations.detailsPage.sectionTitles.concept.validity}
          >
            <KeyValueList>
              {(validFromIncluding || validToIncluding) && (
                <KeyValueListItem
                  property={translations.concept.valid}
                  value={`${
                    validFromIncluding
                      ? `${translations.concept.from} ${validFromIncluding} `
                      : ''
                  }${
                    validToIncluding
                      ? `${translations.concept.to} ${validToIncluding}`
                      : ''
                  }`}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {remark && (
          <ContentSection
            id='remark'
            title={translations.detailsPage.sectionTitles.concept.remark}
          >
            {remark}
          </ContentSection>
        )}
        {(altLabels.length > 0 || hiddenLabels.length > 0) && (
          <ContentSection
            id='terms'
            title={translations.detailsPage.sectionTitles.concept.terms}
          >
            <KeyValueList>
              {altLabels.length > 0 && (
                <KeyValueListItem
                  property={translations.concept.altLabel}
                  value={altLabels.map(translate).join(', ')}
                />
              )}
              {hiddenLabels.length > 0 && (
                <KeyValueListItem
                  property={translations.concept.hiddenLabel}
                  value={hiddenLabels.map(translate).join(', ')}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {example && (
          <ContentSection
            id='example'
            title={translations.detailsPage.sectionTitles.concept.example}
          >
            {example}
          </ContentSection>
        )}
        {(subject || applications.length > 0) && (
          <ContentSection
            id='domain'
            title={
              translations.detailsPage.sectionTitles.concept
                .subjectAndApplication
            }
          >
            <KeyValueList>
              {subject && (
                <KeyValueListItem
                  property={translations.concept.subject}
                  value={subject}
                />
              )}
              {applications.length > 0 && (
                <KeyValueListItem
                  property={translations.concept.application}
                  value={applications.map(translate).join(', ')}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {range && (
          <ContentSection
            id='range'
            title={translations.detailsPage.sectionTitles.concept.range}
          >
            <Link href={rangeUri} external>
              {range}
            </Link>
          </ContentSection>
        )}
        {identifier && (
          <ContentSection
            id='identifier'
            title={translations.detailsPage.sectionTitles.concept.identifier}
          >
            {identifier}
          </ContentSection>
        )}
        {(contactPoint?.email || contactPoint?.telephone) && (
          <ContentSection
            id='contact-information'
            title={
              translations.detailsPage.sectionTitles.concept.contactInformation
            }
          >
            <KeyValueList>
              {contactPoint.email && (
                <KeyValueListItem
                  property={translations.email}
                  value={
                    <a
                      title={contactPoint.email}
                      href={`mailto:${contactPoint.email}`}
                      rel='noopener noreferrer'
                    >
                      {contactPoint.email}
                    </a>
                  }
                />
              )}
              {contactPoint.telephone && (
                <KeyValueListItem
                  property={translations.phone}
                  value={contactPoint.telephone}
                />
              )}
            </KeyValueList>
          </ContentSection>
        )}
        {(conceptsRelations.length > 0 ||
          datasetsRelations.length > 0 ||
          publicServicesRelations.length > 0 ||
          informationModelsRelations.length > 0) && (
          <ContentSection
            id='relationList'
            title={translations.detailsPage.relationList.title.concept}
          >
            <RelationList
              parentIdentifier={concept?.identifier}
              concepts={conceptsRelations}
              datasets={datasetsRelations}
              publicServices={publicServicesRelations}
              informationModels={informationModelsRelations}
            />
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
  withConcept,
  withDatasets,
  withInformationModels,
  withConcepts,
  withPublicServices,
  withErrorBoundary(ErrorPage)
)(ConceptDetailsPage);
