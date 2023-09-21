import Link from '@fellesdatakatalog/link';
import { Link as RouteLink } from 'react-router-dom';
import React from 'react';
import { KeyValueListItem } from '../../../../components/details-page';
import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';
import { PATHNAME_CONCEPTS } from '../../../../constants/constants';
import { PartitiveRelation } from '../../../../types';

interface Props {
  partitiveRelations: Partial<PartitiveRelation>[];
  conceptReferencesMap: Record<string, any>;
}

const PartitiveRelations = ({
  partitiveRelations,
  conceptReferencesMap
}: Props) => (
  <>
    {partitiveRelations.map(
      ({ description: partitiveDescription, hasPart, isPartOf }) => {
        const conceptReferenceUri = hasPart ?? isPartOf ?? '';
        return (
          conceptReferencesMap?.[conceptReferenceUri] && (
            <KeyValueListItem
              key={conceptReferencesMap[conceptReferenceUri].id}
              property={
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
              value={
                <Link
                  to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[conceptReferenceUri].id}`}
                  as={RouteLink}
                >
                  {translate(
                    conceptReferencesMap[conceptReferenceUri].prefLabel
                  )}
                </Link>
              }
            />
          )
        );
      }
    )}
  </>
);

export default PartitiveRelations;
