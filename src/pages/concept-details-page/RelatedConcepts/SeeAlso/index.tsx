import Link from '@fellesdatakatalog/link';
import { Link as RouteLink } from 'react-router-dom';
import React from 'react';
import { KeyValueListItem } from '../../../../components/details-page';
import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';
import { PATHNAME_CONCEPTS } from '../../../../constants/constants';
import {
  dateStringToDate,
  formatDate,
  isDateAfterToday,
  isDateBeforeToday
} from '../../../../lib/date-utils';

interface Props {
  seeAlso: string[];
  validToIncluding: string | undefined;
  validFromIncluding: string | undefined;
  conceptReferencesMap: Record<string, any>;
}

const SeeAlso = ({
  seeAlso,
  conceptReferencesMap,
  validFromIncluding,
  validToIncluding
}: Props) => (
  <>
    {seeAlso.map(uri => {
      const hasExpired = isDateBeforeToday(
        dateStringToDate(formatDate(dateStringToDate(validToIncluding)))
      );
      const willBeValid = isDateAfterToday(
        dateStringToDate(formatDate(dateStringToDate(validFromIncluding)))
      );

      return conceptReferencesMap?.[uri] ? (
        <KeyValueListItem
          key={conceptReferencesMap[uri].id}
          property={translations.conceptReferences.seeAlso}
          value={
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
        />
      ) : (
        <KeyValueListItem
          key={uri}
          property={translations.conceptReferences.seeAlso}
          value={uri}
        />
      );
    })}
  </>
);

export default SeeAlso;
