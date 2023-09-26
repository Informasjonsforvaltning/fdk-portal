import type { FC } from 'react';
import React, { memo, useState, useEffect } from 'react';
import { compose } from 'redux';
import type { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import translations from '../../lib/localization';
import { dateStringToDate, formatDate } from '../../lib/date-utils';
import { getTranslateText as translate } from '../../lib/translateText';
import { deepKeys } from '../../lib/deep-keys';
import { themeFDK } from '../../app/theme';

import type { Props as ConceptProps } from '../../components/with-concept';
import withConcept from '../../components/with-concept';
import type { Props as DatasetsProps } from '../../components/with-datasets';
import withDatasets from '../../components/with-datasets';
import type { Props as InformationModelsProps } from '../../components/with-information-models';
import withInformationModels from '../../components/with-information-models';
import type { Props as ConceptsProps } from '../../components/with-concepts';
import withConcepts from '../../components/with-concepts';
import type { Props as PublicServicesProps } from '../../components/with-public-services';
import withPublicServices from '../../components/with-public-services';
import withErrorBoundary from '../../components/with-error-boundary';

import DetailsPage from '../../components/details-page';
import ErrorPage from '../error-page';

import type { Theme, Language, TextLanguage } from '../../types';
import { Entity } from '../../types/enums';
import RelatedConcepts from './RelatedConcepts';
import ContactPoint from './ContactPoint';
import Created from './Created';
import Description from './Description';
import Validity from './Validity';
import Remark from './Remark';
import Terms from './Terms';
import Example from './Example';
import SubjectAndApplication from './SubjectAndApplication';
import Range from './Range';
import Identifier from './Identifier';
import RelationsList from './RelationsList';

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
  concepts: conceptReferences,
  isLoadingConcept,
  datasetsRelations,
  publicServicesRelations,
  conceptsRelations,
  informationModelsRelations,
  conceptActions: { getConceptRequested: getConcept },
  conceptsActions: {
    getConceptsRequested: getConcepts,
    getConceptsRelationsRequested: getConceptsRelations,
    resetConcepts,
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
      resetConcepts();
      resetConceptsRelations();
      resetDatasetsRelations();
      resetInformationModelsRelations();
      resetPublicServicesRelations();
    };
  }, [conceptId]);

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

  const hasFieldSelectedLanguage = (field: Partial<TextLanguage>[]): boolean =>
    field?.length > 0
      ? Object.keys(
          field.reduce((result, obj) => Object.assign(result, obj), {})
        ).some(label =>
          selectedLanguages
            .filter(({ selected }) => selected)
            .map(({ code }: Language) => code)
            .includes(label)
        )
      : false;

  useEffect(() => {
    const usedLanguages: string[] = getUsedLanguages();
    if (usedLanguages.length > 0) {
      const languages: Language[] = [...new Set(selectedLanguages)].map(
        language => ({
          ...language,
          selected: usedLanguages.includes(language.code),
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
  const description = concept?.definition?.text;
  const sourceRelationship = concept?.definition?.sourceRelationship;
  const sources = concept?.definition?.sources ?? [];
  const remark = concept?.definition?.remark;
  const altLabels = concept?.altLabel ?? [];
  const hiddenLabels = concept?.hiddenLabel ?? [];
  const example = concept?.example;
  const subjectLabels =
    concept?.subject
      ?.map(s => s.label)
      ?.filter((element): element is Partial<TextLanguage> => !!element) ?? [];
  const applications = concept?.application ?? [];
  const range = translate(concept?.definition?.range?.text);
  const rangeUri = concept?.definition?.range?.uri;
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
  const created = concept?.created ?? '';
  const hasRelatedConcepts =
    concept?.associativeRelation ||
    concept?.partitiveRelation ||
    concept?.genericRelation ||
    concept?.isReplacedBy ||
    concept?.memberOf ||
    concept?.seeAlso;
  const hasRelationsList =
    conceptsRelations.length > 0 ||
    datasetsRelations.length > 0 ||
    publicServicesRelations.length > 0 ||
    informationModelsRelations.length > 0;
  const hasSubjectAndApplication =
    (subjectLabels.length > 0 && hasFieldSelectedLanguage(subjectLabels)) ||
    hasFieldSelectedLanguage(applications);
  const hasValidity = validFromIncluding || validToIncluding;
  const hasTerms =
    hasFieldSelectedLanguage(altLabels) ||
    (hiddenLabels.length > 0 && hasFieldSelectedLanguage(hiddenLabels));

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
        languages={selectedLanguages}
      >
        {created && <Created created={created} />}
        {description && (
          <Description
            description={description}
            selectedLanguages={selectedLanguages}
            sources={sources}
            sourceRelationship={sourceRelationship}
          />
        )}
        {hasValidity && (
          <Validity
            validFromIncluding={validFromIncluding}
            validToIncluding={validToIncluding}
          />
        )}
        {remark && (
          <Remark remark={remark} selectedLanguages={selectedLanguages} />
        )}
        {hasTerms && (
          <Terms
            altLabels={altLabels}
            hiddenLabels={hiddenLabels}
            hasFieldSelectedLanguage={hasFieldSelectedLanguage}
            selectedLanguages={selectedLanguages}
          />
        )}
        {example && (
          <Example example={example} selectedLanguages={selectedLanguages} />
        )}
        {hasSubjectAndApplication && (
          <SubjectAndApplication
            applications={applications}
            subjectLabels={subjectLabels}
            hasFieldSelectedLanguage={hasFieldSelectedLanguage}
            selectedLanguages={selectedLanguages}
          />
        )}
        {range && <Range range={range} rangeUri={rangeUri} />}
        {identifier && <Identifier identifier={identifier} />}
        {hasRelatedConcepts && (
          <RelatedConcepts
            concept={concept}
            conceptReferences={conceptReferences}
            getConcepts={getConcepts}
            getConceptsRelations={getConceptsRelations}
            getDatasetsRelations={getDatasetsRelations}
            getInformationmodelsRelations={getInformationmodelsRelations}
            getPublicServicesRelations={getPublicServicesRelations}
          />
        )}
        {hasRelationsList && (
          <RelationsList
            identifier={concept?.identifier}
            conceptsRelations={conceptsRelations}
            datasetsRelations={datasetsRelations}
            publicServicesRelations={publicServicesRelations}
            informationModelsRelations={informationModelsRelations}
          />
        )}
        {(contactPoint?.email || contactPoint?.telephone) && (
          <ContactPoint contactPoint={contactPoint} />
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
