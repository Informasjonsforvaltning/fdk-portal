import React, { FC, Fragment } from 'react';
import some from 'lodash/some';

import SC from './styled';
import { Concept, TextLanguage } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit, SearchHitData } from '../search-hit/search-hit';
import { LinkExternal } from '../link-external/link-external.component';
import localization from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';

interface Props {
  concept: Concept;
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
const renderSource = ({ sourceRelationship = '', sources = [] }: any) => {
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
          )}`}
        </span>
        {sources.map(({ text, uri }: any, index: number) => (
          <Fragment key={`${text}-${uri}`}>
            {index > 0 && ','}
            &nbsp;
            {uri ? (
              <LinkExternal uri={uri} prefLabel={text || uri} openInNewTab />
            ) : (
              getTranslateText(text)
            )}
          </Fragment>
        ))}
      </div>
    );
  }
  return null;
};

const renderExample = (example: Partial<TextLanguage>) => {
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
        type="button"
      >
        <i className="fa fa-plus-circle mr-2" />
        {localization.compare.addCompare}
      </SC.ButtonCompare>
    );
  }
  return (
    <SC.ButtonCompare
      onClick={() => {
        onDeleteConcept(item.id);
      }}
      type="button"
    >
      <i className="fa fa-minus-circle mr-2" />
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
      (concept: Partial<Concept>) => concept.uri === uri
    );
  }
  return (
    <SearchHit
      id={id}
      type={SearchTypes.concept}
      title={prefLabel}
      publisher={publisher}
      description={definition.text || null}
    >
      <SearchHitData>
        {renderSource(definition)}
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
