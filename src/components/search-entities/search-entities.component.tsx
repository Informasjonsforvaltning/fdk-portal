import React, { FC, memo } from 'react';
import { ThemeProvider } from 'styled-components';

import { getConfig } from '../../config';
import { themeFDK, themeNAP } from '../../app/theme';
import { Entity } from '../../types/enums';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { Concept } from '../../types';
import { DatasetItem } from '../dataset-item/dataset-item.component';
import { ApiItem } from '../api-item/api-item.component';
import { ConceptItem } from '../concept-item/concept-item.component';
import { InformationModelItem } from '../informationmodel-item/informationmodel-item.component';

interface Props {
  entities: any;
  losItems: any;
  compareConceptList?: Concept[] | undefined;
  addConcept?: Function;
  removeConcept?: Function;
}

const renderEntity = (
  entity: any,
  {
    losItems,
    compareConceptList,
    addConcept,
    removeConcept
  }: Pick<
    Props,
    'losItems' | 'compareConceptList' | 'addConcept' | 'removeConcept'
  >
) => {
  switch (entity.type) {
    case Entity.DATASET:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).colors[Entity.DATASET]
          }
        >
          <DatasetItem dataset={entity} losItems={losItems} />
        </ThemeProvider>
      );
    case Entity.DATA_SERVICE:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).colors[
              Entity.DATA_SERVICE
            ]
          }
        >
          <ApiItem api={entity} />
        </ThemeProvider>
      );
    case Entity.CONCEPT:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).colors[Entity.CONCEPT]
          }
        >
          <ConceptItem
            concept={entity}
            concepts={compareConceptList}
            onAddConcept={addConcept}
            onDeleteConcept={removeConcept}
          />
        </ThemeProvider>
      );
    case Entity.INFORMATION_MODEL:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).colors[
              Entity.INFORMATION_MODEL
            ]
          }
        >
          <InformationModelItem informationModel={entity} losItems={losItems} />
        </ThemeProvider>
      );
    default:
      return null;
  }
};

const SearchEntities: FC<Props> = ({
  entities,
  losItems,
  compareConceptList,
  addConcept,
  removeConcept
}) => {
  if (losItems && entities && Array.isArray(entities)) {
    return (
      <div>
        {entities.map((entity: any) => (
          <ErrorBoundary key={entity.id}>
            {renderEntity(entity, {
              losItems,
              compareConceptList,
              addConcept,
              removeConcept
            })}
          </ErrorBoundary>
        ))}
      </div>
    );
  }
  return null;
};

export default memo(SearchEntities);
