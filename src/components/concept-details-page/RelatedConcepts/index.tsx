import React, { useEffect } from 'react';
import Link from '@fellesdatakatalog/link';
import { Link as RouteLink } from 'react-router-dom';
import {
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../../details-page';
import translations from '../../../lib/localization';
import { Entity } from '../../../types/enums';
import { PATHNAME_CONCEPTS } from '../../../constants/constants';
import { getTranslateText as translate } from '../../../lib/translateText';
import {
  dateStringToDate,
  formatDate,
  isDateAfterToday,
  isDateBeforeToday
} from '../../../lib/date-utils';
import { Concept } from '../../../types';

interface Props {
  concept: Concept | null;
  conceptReferences: Concept[];
  getConcepts: (params: any) => void;
  getConceptsRelations: (params: any) => void;
  getDatasetsRelations: (params: any) => void;
  getInformationmodelsRelations: (params: any) => void;
  getPublicServicesRelations: (params: any) => void;
}

const RelatedConcepts = ({
  concept,
  conceptReferences,
  getConcepts,
  getConceptsRelations,
  getDatasetsRelations,
  getPublicServicesRelations,
  getInformationmodelsRelations
}: Props) => {
  const title = concept?.prefLabel ?? {};
  const associativeRelations = concept?.associativeRelation ?? [];
  const partitiveRelations = concept?.partitiveRelation ?? [];
  const genericRelations = concept?.genericRelation ?? [];
  const isReplacedBy = concept?.isReplacedBy ?? [];
  const memberOf = concept?.memberOf ?? [];
  const seeAlso = concept?.seeAlso ?? [];

  const conceptReferencesMap = conceptReferences?.reduce(
    (previous, current) => ({ ...previous, [current.identifier]: current }),
    {} as Record<string, any>
  );

  const associativeRelationsUris: string[] = associativeRelations?.map(
    ({ related = '' }) => related
  );

  const partitiveRelationsUris: string[] = partitiveRelations?.map(
    ({ isPartOf = '', hasPart = '' }) => isPartOf ?? hasPart
  );

  const genericRelationsUris: string[] = genericRelations?.map(
    ({ generalizes = '', specializes = '' }) => generalizes ?? specializes
  );

  useEffect(() => {
    if (concept?.identifier) {
      if (
        (Array.isArray(concept?.seeAlso) && concept?.seeAlso.length > 0) ||
        (Array.isArray(associativeRelationsUris) &&
          associativeRelationsUris.length > 0) ||
        (Array.isArray(partitiveRelationsUris) &&
          partitiveRelationsUris.length > 0) ||
        (Array.isArray(genericRelationsUris) &&
          genericRelationsUris.length > 0) ||
        (Array.isArray(isReplacedBy) && isReplacedBy.length > 0) ||
        (Array.isArray(concept?.memberOf) && concept?.memberOf.length > 0)
      ) {
        getConcepts({
          identifiers: [
            ...(concept?.seeAlso ?? []),
            ...associativeRelationsUris,
            ...partitiveRelationsUris,
            ...genericRelationsUris,
            ...isReplacedBy,
            ...memberOf
          ],
          size: 1000
        });
      }

      getConceptsRelations({ seeAlso: concept.identifier });
      getDatasetsRelations({ subject: concept.identifier });
      getInformationmodelsRelations({
        conceptIdentifiers: [concept.identifier]
      });
      getPublicServicesRelations({ isClassifiedBy: concept.identifier });
    }
  }, [concept?.identifier]);

  return (
    <ContentSection
      id='concept-references'
      title={
        translations.formatString(
          translations.detailsPage.sectionTitles.concept.conceptReferences,
          {
            conceptCount: [
              ...associativeRelations,
              ...partitiveRelations,
              ...genericRelations,
              ...seeAlso,
              ...isReplacedBy,
              ...memberOf
            ].length
          }
        ) as string
      }
      entityIcon={Entity.CONCEPT}
      boxStyle
    >
      <KeyValueList>
        {associativeRelations.map(
          ({ description: associativeDescription, related = '' }) =>
            conceptReferencesMap?.[related] && (
              <KeyValueListItem
                key={conceptReferencesMap[related].id}
                property={
                  <Link
                    to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[related].id}`}
                    as={RouteLink}
                  >
                    {translate(conceptReferencesMap[related].prefLabel)}
                  </Link>
                }
                value={
                  <div>
                    <div>
                      <span>
                        {translations.conceptReferences.associative}
                        .&nbsp;
                      </span>
                    </div>
                    <div>
                      <span>{translate(associativeDescription)}</span>
                    </div>
                  </div>
                }
              />
            )
        )}
        {partitiveRelations.map(
          ({
            description: partitiveDescription,
            hasPart = '',
            isPartOf = ''
          }) => {
            const conceptReferenceUri = hasPart ?? isPartOf;
            return (
              conceptReferencesMap?.[conceptReferenceUri] && (
                <KeyValueListItem
                  key={conceptReferencesMap[conceptReferenceUri].id}
                  property={
                    <Link
                      to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[conceptReferenceUri].id}`}
                      as={RouteLink}
                    >
                      {translate(
                        conceptReferencesMap[conceptReferenceUri].prefLabel
                      )}
                    </Link>
                  }
                  value={
                    <div>
                      <div>
                        <span>
                          {translations.conceptReferences.partitive}
                          .&nbsp;
                          {isPartOf
                            ? translations.conceptReferences.isPartOf
                            : translations.conceptReferences.hasPart}
                        </span>
                      </div>
                      <div>
                        <span>{translate(partitiveDescription)}</span>
                      </div>
                    </div>
                  }
                />
              )
            );
          }
        )}
        {genericRelations.map(
          ({ divisioncriterion, generalizes = '', specializes = '' }) => {
            const conceptReferenceUri = generalizes ?? specializes;
            return (
              conceptReferencesMap?.[conceptReferenceUri] && (
                <KeyValueListItem
                  key={conceptReferencesMap[conceptReferenceUri].id}
                  property={
                    <Link
                      to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[conceptReferenceUri].id}`}
                      as={RouteLink}
                    >
                      {translate(
                        conceptReferencesMap[conceptReferenceUri].prefLabel
                      )}
                    </Link>
                  }
                  value={
                    <div>
                      <div>
                        <span>
                          {translations.conceptReferences.generic}
                          .&nbsp;
                          {generalizes
                            ? translations.conceptReferences.generalizes
                            : translations.conceptReferences.specializes}
                        </span>
                      </div>
                      <div>
                        <span>{translate(divisioncriterion)}</span>
                      </div>
                    </div>
                  }
                />
              )
            );
          }
        )}
        {seeAlso.map(uri => {
          const hasExpired = isDateBeforeToday(
            dateStringToDate(
              formatDate(dateStringToDate(concept?.validToIncluding))
            )
          );
          const willBeValid = isDateAfterToday(
            dateStringToDate(
              formatDate(dateStringToDate(concept?.validFromIncluding))
            )
          );

          return conceptReferencesMap?.[uri] ? (
            <KeyValueListItem
              key={conceptReferencesMap[uri].id}
              property={
                <Link
                  to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[uri].id}`}
                  as={RouteLink}
                >
                  {translate(conceptReferencesMap[uri].prefLabel)}
                  {hasExpired && <>&nbsp;({translations.validity.expired})</>}
                  {!hasExpired && willBeValid && (
                    <>&nbsp;({translations.validity.willBeValid})</>
                  )}
                </Link>
              }
              value={translations.conceptReferences.seeAlso}
            />
          ) : (
            <KeyValueListItem
              key={uri}
              property={translations.conceptReferences.seeAlso}
              value={uri}
            />
          );
        })}
        {isReplacedBy.map(uri =>
          conceptReferencesMap?.[uri] ? (
            <KeyValueListItem
              key={conceptReferencesMap[uri].id}
              property={
                <Link
                  to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[uri].id}`}
                  as={RouteLink}
                >
                  {translate(conceptReferencesMap[uri].prefLabel)}
                </Link>
              }
              value={`${
                translations.conceptReferences.isReplacedBy
              } ${translate(title)}`}
            />
          ) : (
            <KeyValueListItem
              key={uri}
              property={translations.conceptReferences.seeAlso}
              value={uri}
            />
          )
        )}
        {memberOf &&
          memberOf.map(uri =>
            conceptReferencesMap?.[uri] ? (
              <KeyValueListItem
                key={conceptReferencesMap[uri].id}
                property={
                  <Link
                    to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[uri].id}`}
                    as={RouteLink}
                  >
                    {translate(conceptReferencesMap[uri].prefLabel)}
                  </Link>
                }
                value={`${translations.conceptReferences.memberOf} ${translate(
                  title
                )}`}
              />
            ) : (
              <KeyValueListItem
                key={uri}
                property={translations.conceptReferences.memberOf}
                value={uri}
              />
            )
          )}
      </KeyValueList>
    </ContentSection>
  );
};

export default RelatedConcepts;
