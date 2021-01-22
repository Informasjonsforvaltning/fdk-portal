import React, { FC, memo } from 'react';
import { ThemeProvider } from 'styled-components';

import { getConfig } from '../../config';
import { themeFDK, themeNAP } from '../../app/theme';
import { Entity } from '../../types/enums';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { Concept, MediaType } from '../../types';
import { DatasetItem } from '../dataset-item/dataset-item.component';
import { DataServiceItem } from '../data-service-item/data-service-item.component';
import { ConceptItem } from '../concept-item/concept-item.component';
import { InformationModelItem } from '../informationmodel-item/informationmodel-item.component';
import { PublicServiceItem } from '../public-service-item/public-service-item';

interface Props {
  entities: any;
  mediatypes?: MediaType[];
  compareConceptList?: Concept[] | undefined;
  addConcept?: (concept: Partial<Concept>) => void;
  removeConcept?: (id?: string) => void;
}

const renderEntity = (
  entity: any,
  {
    mediatypes,
    compareConceptList,
    addConcept,
    removeConcept
  }: Pick<
    Props,
    'mediatypes' | 'compareConceptList' | 'addConcept' | 'removeConcept'
  >
) => {
  switch (entity.type) {
    case Entity.DATASET:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
              Entity.DATASET
            ]
          }
        >
          <DatasetItem dataset={entity} mediatypes={mediatypes} />
        </ThemeProvider>
      );
    case Entity.DATA_SERVICE:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
              Entity.DATA_SERVICE
            ]
          }
        >
          <DataServiceItem dataService={entity} />
        </ThemeProvider>
      );
    case Entity.CONCEPT:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
              Entity.CONCEPT
            ]
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
            (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
              Entity.INFORMATION_MODEL
            ]
          }
        >
          <InformationModelItem informationModel={entity} />
        </ThemeProvider>
      );
    case Entity.PUBLIC_SERVICE:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
              Entity.PUBLIC_SERVICE
            ]
          }
        >
          <PublicServiceItem publicService={entity} />
        </ThemeProvider>
      );
    default:
      return null;
  }
};

const SearchEntities: FC<Props> = ({
  entities,
  mediatypes,
  compareConceptList,
  addConcept,
  removeConcept
}) =>
  Array.isArray(entities) ? (
    <div>
      {entities.map(entity => (
        <ErrorBoundary key={entity.id}>
          {renderEntity(entity, {
            mediatypes,
            compareConceptList,
            addConcept,
            removeConcept
          })}
        </ErrorBoundary>
      ))}
    </div>
  ) : null;

export default memo(SearchEntities);
