import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import {
  dateStringToDate,
  formatDate,
  isDateBeforeToday,
  isDateAfterToday
} from '../../lib/date-utils';
import { getTranslateText as translate } from '../../lib/translateText';

import {
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_CONCEPTS
} from '../../constants/constants';

import { themeFDK } from '../../app/theme';

import withConcept, { Props as ConceptProps } from '../with-concept';
import withDatasets, { Props as DatasetsProps } from '../with-datasets';
import withInformationModels, {
  Props as InformationModelsProps
} from '../with-information-models';
import withConcepts, { Props as ConceptsProps } from '../with-concepts';

import DetailsPage, {
  ContentSection,
  KeyValueList,
  KeyValueListItem,
  InlineList
} from '../details-page';

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
    RouteComponentProps<RouteParams> {}

const ConceptDetailsPage: FC<Props> = ({
  concept,
  datasets,
  informationModels,
  concepts,
  conceptActions: { getConceptRequested: getConcept },
  datasetsActions: { getDatasetsRequested: getDatasets },
  informationModelsActions: {
    getInformationModelsRequested: getInformationModels
  },
  conceptsActions: { getConceptsRequested: getConcepts },
  match: {
    params: { conceptId }
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

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
    if (concept?.identifier) {
      getDatasets({ subject: concept.identifier, size: 1000 });
      getInformationModels({
        conceptIdentifiers: [concept.identifier],
        size: 3
      });
    }

    if (concept?.seeAlso && concept?.seeAlso.length > 0) {
      getConcepts({ identifiers: concept.seeAlso, size: 3 });
    }
  }, [concept?.id]);

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
  const seeAlsoConceptReferences = concepts.filter(({ identifier }) =>
    concept?.seeAlso?.includes(identifier)
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
                {text || uri}
              </Link>
            ) : (
              translate(text)
            )}
          </span>
        ))}
      </>
    ) : null;
  };

  return isMounted ? (
    <ThemeProvider theme={theme}>
      <DetailsPage
        entity={entity}
        title={title}
        publisher={publisher}
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
            id="description"
            title={translations.detailsPage.sectionTitles.concept.description}
          >
            <SC.Description>{description}</SC.Description>
            <SC.Sources>{renderSources()}</SC.Sources>
          </ContentSection>
        )}
        {(validFromIncluding || validToIncluding) && (
          <ContentSection
            id="validity"
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
            id="remark"
            title={translations.detailsPage.sectionTitles.concept.remark}
          >
            {remark}
          </ContentSection>
        )}
        {(altLabels.length > 0 || hiddenLabels.length > 0) && (
          <ContentSection
            id="terms"
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
            id="example"
            title={translations.detailsPage.sectionTitles.concept.example}
          >
            {example}
          </ContentSection>
        )}
        {(subject || applications.length > 0) && (
          <ContentSection
            id="domain"
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
            id="range"
            title={translations.detailsPage.sectionTitles.concept.range}
          >
            <Link href={rangeUri} external>
              {range}
            </Link>
          </ContentSection>
        )}
        {identifier && (
          <ContentSection
            id="identifier"
            title={translations.detailsPage.sectionTitles.concept.identifier}
          >
            {identifier}
          </ContentSection>
        )}
        {datasets.length > 0 && (
          <ContentSection
            id="dataset-references"
            title={
              translations.detailsPage.sectionTitles.concept.datasetReferences
            }
          >
            <InlineList>
              {datasets.map(dataset => (
                <Link to={`${PATHNAME_DATASETS}/${dataset.id}`} as={RouteLink}>
                  {translate(dataset.title)}
                </Link>
              ))}
            </InlineList>
          </ContentSection>
        )}
        {informationModels.length > 0 && (
          <ContentSection
            id="information-model-references"
            title={
              translations.detailsPage.sectionTitles.concept
                .informationModelReferences
            }
          >
            <InlineList>
              {informationModels.map(informationModel => (
                <Link
                  to={`${PATHNAME_INFORMATIONMODELS}/${informationModel.id}`}
                  as={RouteLink}
                >
                  {translate(informationModel.title)}
                </Link>
              ))}
            </InlineList>
          </ContentSection>
        )}
        {seeAlsoConceptReferences.length > 0 && (
          <ContentSection
            id="concept-references"
            title={
              translations.formatString(
                translations.detailsPage.sectionTitles.concept
                  .conceptReferences,
                { concept: translate(concept?.prefLabel) }
              ) as string
            }
          >
            <KeyValueList>
              {seeAlsoConceptReferences.map(concept => {
                const isExpired = isDateBeforeToday(
                  dateStringToDate(validToIncluding)
                );
                const isWillBeValid = isDateAfterToday(
                  dateStringToDate(validFromIncluding)
                );

                return (
                  <KeyValueListItem
                    key={concept.id}
                    property={translations.conceptReferences.seeAlso}
                    value={
                      <Link
                        to={`${PATHNAME_CONCEPTS}/${concept.id}`}
                        as={RouteLink}
                      >
                        {translate(concept.prefLabel)}
                        {isExpired && (
                          <>&nbsp;({translations.validity.expired})</>
                        )}
                        {!isExpired && isWillBeValid && (
                          <>&nbsp;({translations.validity.willBeValid})</>
                        )}
                      </Link>
                    }
                  />
                );
              })}
            </KeyValueList>
          </ContentSection>
        )}
        {(contactPoint?.email || contactPoint?.telephone) && (
          <ContentSection
            id="contact-information"
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
                      rel="noopener noreferrer"
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
  ) : null;
};

export default compose<FC>(
  memo,
  withConcept,
  withDatasets,
  withInformationModels,
  withConcepts
)(ConceptDetailsPage);
