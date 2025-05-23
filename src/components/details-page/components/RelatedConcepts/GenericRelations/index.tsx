import Link from '@fellesdatakatalog/link';
import { Link as RouteLink } from 'react-router-dom';
import React from 'react';
import KeyValueListItem from '../../key-value-list-item';
import translations from '../../../../../lib/localization';
import { getTranslateText as translate } from '../../../../../lib/translateText';
import { PATHNAME_CONCEPTS } from '../../../../../constants/constants';
import { GenericRelation } from '../../../../../types';

interface Props {
  genericRelations: Partial<GenericRelation>[];
  conceptReferencesMap: Record<string, any>;
}

const GenericRelations = ({
  genericRelations,
  conceptReferencesMap
}: Props) => (
  <>
    {genericRelations.map(({ divisioncriterion, generalizes, specializes }) => {
      const conceptReferenceUri = generalizes ?? specializes ?? '';
      const property = (
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
      );
      return conceptReferencesMap?.[conceptReferenceUri] ? (
        <KeyValueListItem
          key={conceptReferencesMap[conceptReferenceUri].id}
          property={property}
          value={
            <Link
              to={`${PATHNAME_CONCEPTS}/${conceptReferencesMap[conceptReferenceUri].id}`}
              as={RouteLink}
            >
              {translate(conceptReferencesMap[conceptReferenceUri].title)}
            </Link>
          }
        />
      ) : (
        <KeyValueListItem
          key={conceptReferenceUri}
          property={property}
          value={conceptReferenceUri}
        />
      );
    })}
  </>
);

export default GenericRelations;
