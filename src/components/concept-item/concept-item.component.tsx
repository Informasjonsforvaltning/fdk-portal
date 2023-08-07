import React, { FC } from 'react';
import some from 'lodash/some';

import SC from './styled';
import { Concept, ConceptDefinition, TextLanguage } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit, SearchHitData } from '../search-hit/search-hit';
import localization from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';

interface Props {
  concept: Partial<Concept>;
  concepts?: Concept[];
  onAddConcept?: (concept: Partial<Concept>) => void;
  onDeleteConcept?: (id?: string) => void;
}

function getSourceRelationshipLabel(sourceRelationship: string) {
  switch (sourceRelationship) {
    case 'egendefinert':
      return localization.sourceRelationship.egendefinert;
    case 'sitatFraKilde':
      return localization.sourceRelationship.sitatFraKilde;
    case 'basertPåKilde':
      return localization.sourceRelationship.basertPåKilde;
    default:
      return '';
  }
}
const renderSource = ({
  sourceRelationship = '',
  sources = []
}: ConceptDefinition) => {
  if (sourceRelationship === 'egendefinert') {
    return (
      <div>
        <span>
          {`${localization.compare.source}: ${localization.sourceRelationship.egendefinert}`}
        </span>
      </div>
    );
  }
  if (sources && sources.length > 0) {
    return (
      <div>
        <span>
          {`${localization.compare.source}: ${getSourceRelationshipLabel(
            sourceRelationship
          )} `}
        </span>

        {sources.map(
          ({ text, uri }: any, index: number) =>
            `${index > 0 ? ',' : ''} ${text ? getTranslateText(text) : uri}`
        )}
      </div>
    );
  }
  return null;
};

const renderExample = (example?: Partial<TextLanguage>) => {
  if (!example) {
    return null;
  }
  return (
    <div>
      {localization.concept.sample}: {getTranslateText(example)}
    </div>
  );
};

const renderAddRemoveCompareButton = (
  item: Partial<Concept>,
  showCompare: boolean,
  onAddConcept: (concept: Partial<Concept>) => void,
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
  const { id, uri, prefLabel, definition, publisher, example } = concept;
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
      title={prefLabel}
      publisher={publisher}
      description={definition?.text}
      subtitle={localization.conceptLabel}
    >
      <SearchHitData>
        {definition && renderSource(definition)}
        {renderExample(example)}
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
