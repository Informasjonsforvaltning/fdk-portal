import React, { memo, FC, MouseEvent, useState, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import { dateStringToDate, formatDate } from '../../lib/date-utils';
import { getTranslateText as translate } from '../../lib/translateText';
import { deepKeys } from '../../lib/deep-keys';
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
import MultiLingualField from '../multilingual-field';
import RelationList from '../relation-list';

import SC from './styled';

import type { Theme, Language } from '../../types';
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

  const [selectedLanguages, setSelectedLanguages] = useState<Language[] | []>([
    { code: 'nb' },
    { code: 'nn' },
    { code: 'en' }
  ]);

  const [
    determinedLanguagesFromConcept,
    setDeterminedLanguagesFromConcept
  ] = useState<string[]>([]);

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
      setSelectedLanguages([{ code: 'nb' }, { code: 'nn' }, { code: 'en' }]);
      setDeterminedLanguagesFromConcept([]);
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

  const translatableFields = [
    'prefLabel',
    'altLabel',
    'hiddenLabel',
    'definition',
    'example',
    'subject',
    'application'
  ];

  const getUsedLanguages = () =>
    concept
      ? [
          ...new Set(
            deepKeys(
              Object.fromEntries(
                Object.entries(concept).filter(([key]) =>
                  translatableFields.includes(key)
                )
              ),
              (__: any, v: string) => !!v
            ).filter(key => ['nb', 'nn', 'no', 'en'].includes(key))
          )
        ]
      : [];

  useEffect(() => {
    const usedLanguages: string[] = getUsedLanguages();
    if (concept) {
      setDeterminedLanguagesFromConcept(usedLanguages);
    }
    if (usedLanguages.length > 0) {
      const languages: Language[] = [...new Set(selectedLanguages)].map(
        language => ({
          ...language,
          selected: !!(translations.getLanguage() === language.code),
          disabled: !usedLanguages.includes(language.code)
        })
      );
      setSelectedLanguages(languages);
    }
  }, [concept, translations.getLanguage()]);

  const entityId = concept?.id;
  const entityUri = concept?.uri;
  const identifier = concept?.identifier;
  const publisher = concept?.publisher;
  const title = concept?.prefLabel ?? {};
  const description = concept?.definition.text;
  const sourceRelationship = concept?.definition.sourceRelationship;
  const sources = concept?.definition.sources ?? [];
  const remark = concept?.definition.remark;
  const altLabels = concept?.altLabel ?? [];
  const hiddenLabels = concept?.hiddenLabel ?? [];
  const example = concept?.example;
  const subject = concept?.subject;
  const applications = concept?.application ?? [];
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
          <span key={`${text}-${uri}-${index}`}>
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

  const toggleLanguage = (e: MouseEvent<HTMLButtonElement>, code: string) => {
    e.currentTarget.blur();
    const languages: Language[] = [...new Set(selectedLanguages)].map(
      language => ({
        ...language,
        selected:
          language.code === code ? !language.selected : language.selected,
        disabled: !determinedLanguagesFromConcept.includes(language.code)
      })
    );
    setSelectedLanguages(languages);
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
        toggleLanguage={toggleLanguage}
        languages={selectedLanguages}
      >
        {description && (
          <ContentSection
            id='description'
            title={translations.detailsPage.sectionTitles.concept.description}
            entityTheme={Entity.CONCEPT}
            truncate
          >
            <MultiLingualField
              languages={selectedLanguages}
              text={description}
              convertToMarkUp
            />
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
            <MultiLingualField languages={selectedLanguages} text={remark} />
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
                  value={altLabels.map((altLabel, index) => (
                    <MultiLingualField
                      key={index}
                      languages={selectedLanguages}
                      text={altLabel}
                      useFallback={false}
                    />
                  ))}
                />
              )}
              {hiddenLabels.length > 0 && (
                <KeyValueListItem
                  property={translations.concept.hiddenLabel}
                  value={hiddenLabels.map((hiddenLabel, index) => (
                    <MultiLingualField
                      key={index}
                      languages={selectedLanguages}
                      text={hiddenLabel}
                      useFallback={false}
                    />
                  ))}
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
            <MultiLingualField languages={selectedLanguages} text={example} />
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
                  value={
                    <MultiLingualField
                      languages={selectedLanguages}
                      text={subject}
                      useFallback={false}
                    />
                  }
                />
              )}
              {applications.length > 0 && (
                <KeyValueListItem
                  property={translations.concept.application}
                  value={applications.map((application, index) => (
                    <MultiLingualField
                      key={index}
                      languages={selectedLanguages}
                      text={application}
                      useFallback={false}
                    />
                  ))}
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
