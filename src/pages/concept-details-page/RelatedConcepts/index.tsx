import React, { useEffect } from 'react';
import { ContentSection, KeyValueList } from '../../../components/details-page';
import translations from '../../../lib/localization';
import { Entity } from '../../../types/enums';
import { Concept } from '../../../types';
import AssociativeRelations from './AssociativeRelations';
import PartitiveRelations from './PartitiveRelations';
import GenericRelations from './GenericRelations';
import SeeAlso from './SeeAlso';
import IsReplacedBy from './IsReplacedBy';
import MemberOf from './MemberOf';

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
    ({ related }) => related ?? ''
  );

  const partitiveRelationsUris: string[] = partitiveRelations?.map(
    ({ isPartOf, hasPart }) => isPartOf ?? hasPart ?? ''
  );

  const genericRelationsUris: string[] = genericRelations?.map(
    ({ generalizes, specializes }) => generalizes ?? specializes ?? ''
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
            ...isReplacedBy
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
        {associativeRelations.length > 0 && (
          <AssociativeRelations
            associativeRelations={associativeRelations}
            conceptReferencesMap={conceptReferencesMap}
          />
        )}
        {partitiveRelations.length > 0 && (
          <PartitiveRelations
            partitiveRelations={partitiveRelations}
            conceptReferencesMap={conceptReferencesMap}
          />
        )}
        {genericRelations.length > 0 && (
          <GenericRelations
            genericRelations={genericRelations}
            conceptReferencesMap={conceptReferencesMap}
          />
        )}
        {seeAlso.length > 0 && (
          <SeeAlso
            seeAlso={seeAlso}
            validToIncluding={concept?.validToIncluding}
            validFromIncluding={concept?.validFromIncluding}
            conceptReferencesMap={conceptReferencesMap}
          />
        )}
        {isReplacedBy.length > 0 && (
          <IsReplacedBy
            title={title}
            isReplacedBy={isReplacedBy}
            conceptReferencesMap={conceptReferencesMap}
          />
        )}
        {memberOf.length > 0 && <MemberOf memberOf={memberOf} />}
      </KeyValueList>
    </ContentSection>
  );
};

export default RelatedConcepts;
