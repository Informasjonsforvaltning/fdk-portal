import Link from '@fellesdatakatalog/link';
import { Link as RouteLink } from 'react-router-dom';
import React from 'react';
import KeyValueListItem from '../../key-value-list-item';
import translations from '../../../../../lib/localization';
import { getTranslateText as translate } from '../../../../../lib/translateText';
import { PATHNAME_CONCEPTS } from '../../../../../constants/constants';
import { AssociativeRelation } from '../../../../../types';

interface Props {
  associativeRelations: Partial<AssociativeRelation>[];
  conceptReferencesMap: Record<string, any>;
}

const AssociativeRelations = ({
  associativeRelations,
  conceptReferencesMap
}: Props) => (
  <>
    {associativeRelations.map(
      ({ description: associativeDescription, related = '' }) =>
        related && (
          <KeyValueListItem
            key={
              conceptReferencesMap?.[related]
                ? conceptReferencesMap[related].id
                : `related-${related}`
            }
            property={
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
            value={
              conceptReferencesMap[related] ? (
                <Link
                  to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[related].id}`}
                  as={RouteLink}
                >
                  {translate(conceptReferencesMap[related].title)}
                </Link>
              ) : (
                <p>{related}</p>
              )
            }
          />
        )
    )}
  </>
);

export default AssociativeRelations;
