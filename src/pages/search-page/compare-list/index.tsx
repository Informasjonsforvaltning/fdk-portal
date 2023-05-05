import React, { FC, memo } from 'react';
import capitalize from 'lodash/capitalize';

import SC from './styled';
import { Concept } from '../../../types';
import {
  PATHNAME_CONCEPTS,
  PATHNAME_CONCEPTS_COMPARE
} from '../../../constants/constants';

import { CompareTerms } from '../compare-terms/compare-terms.component';
import {
  getTranslateText,
  getTranslateText as translate
} from '../../../lib/translateText';
import localization from '../../../lib/localization';

interface Props {
  conceptsCompareList: Partial<Concept>[];
  removeConcept: () => void;
}

const CompareList: FC<Props> = ({
  conceptsCompareList = [],
  removeConcept
}) => {
  const conceptIdsArray: string[] = [];
  const renderCompareConceptItems = (items: Partial<Concept>[]) =>
    Object.keys(items).map((el: any) => {
      const { id, uri, prefLabel, publisher }: Partial<Concept> = items[el];
      if (id && uri) {
        conceptIdsArray.push(id);
        return (
          <CompareTerms
            key={uri}
            uri={id}
            prefLabel={prefLabel}
            creator={
              getTranslateText(publisher?.prefLabel) ??
              capitalize(translate(publisher?.name))
            }
            onDeleteTerm={removeConcept}
          />
        );
      }
      return null;
    });

  if (conceptsCompareList && Object.keys(conceptsCompareList).length > 0) {
    return (
      <SC.CompareList>
        <SC.BoxHeader>{localization.terms.compareTerms}</SC.BoxHeader>
        {renderCompareConceptItems(conceptsCompareList)}
        <SC.CompareLink
          to={`${PATHNAME_CONCEPTS}${PATHNAME_CONCEPTS_COMPARE}?compare=${conceptIdsArray}`}
        >
          {localization.compare.openCompare}
        </SC.CompareLink>
      </SC.CompareList>
    );
  }
  return null;
};

export default memo(CompareList);
