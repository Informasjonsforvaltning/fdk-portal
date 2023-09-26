import Link from '@fellesdatakatalog/link';
import { Link as RouteLink } from 'react-router-dom';
import React from 'react';
import { KeyValueListItem } from '../../../../components/details-page';
import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';
import { PATHNAME_CONCEPTS } from '../../../../constants/constants';
import { TextLanguage } from '../../../../types';

interface Props {
  title: Partial<TextLanguage>;
  isReplacedBy: string[];
  conceptReferencesMap: Record<string, any>;
}

const IsReplacedBy = ({ title, isReplacedBy, conceptReferencesMap }: Props) => (
  <>
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
          value={`${translations.conceptReferences.isReplacedBy} ${translate(
            title
          )}`}
        />
      ) : (
        <KeyValueListItem
          key={uri}
          property={translations.conceptReferences.seeAlso}
          value={uri}
        />
      )
    )}
  </>
);

export default IsReplacedBy;
