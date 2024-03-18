import React, { FC } from 'react';
import some from 'lodash/some';

import SC from './styled';
import { Concept, SearchObject } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit, SearchHitData } from '../search-hit/search-hit';
import localization from '../../lib/localization';

interface Props {
  concept: Partial<SearchObject>;
  concepts?: Concept[];
  onAddConcept?: (concept: Partial<SearchObject>) => void;
  onDeleteConcept?: (id?: string) => void;
}

const renderAddRemoveCompareButton = (
  item: Partial<SearchObject>,
  showCompare: boolean,
  onAddConcept: (concept: Partial<SearchObject>) => void,
  onDeleteConcept: (id?: string) => void
) => {
  if (showCompare) {
    return (
      <SC.ButtonCompare
        onClick={() => {
          onAddConcept(item);
        }}
        type='button'
      >
        <SC.CirclePlusIcon />
        {localization.compare.addCompare}
      </SC.ButtonCompare>
    );
  }
  return (
    <SC.ButtonCompare
      onClick={() => {
        onDeleteConcept(item.id);
      }}
      type='button'
    >
      <SC.CircleMinusIcon />
      {localization.compare.removeCompare}
    </SC.ButtonCompare>
  );
};

export const ConceptItem: FC<Props> = ({
  concept,
  concepts,
  onAddConcept,
  onDeleteConcept
}) => {
  const { id, uri, title, description, organization } = concept;
  let showCompareButton = true;
  if (concepts) {
    showCompareButton = !some(
      concepts,
      ({ uri: conceptUri }: Partial<Concept>) => conceptUri === uri
    );
  }
  return (
    <SearchHit
      id={id}
      type={SearchTypes.concept}
      title={title}
      publisher={organization}
      description={description}
      subtitle={localization.conceptLabel}
    >
      <SearchHitData>
        {concepts &&
          onAddConcept &&
          onDeleteConcept &&
          renderAddRemoveCompareButton(
            concept,
            showCompareButton,
            onAddConcept,
            onDeleteConcept
          )}
      </SearchHitData>
    </SearchHit>
  );
};
