import React, { FC, memo } from 'react';
import { compose } from 'redux';
import { ThemeProvider } from 'styled-components';

import { getConfig } from '../../config';
import { themeFDK, themeNAP } from '../../app/theme';

import { DatasetItem } from '../dataset-item/dataset-item.component';
import { DataServiceItem } from '../data-service-item/data-service-item.component';
import { ConceptItem } from '../concept-item/concept-item.component';
import { InformationModelItem } from '../informationmodel-item/informationmodel-item.component';
import { PublicServiceItem } from '../public-service-item/public-service-item';
import EventItem from '../event-item';
import withErrorBoundary from '../with-error-boundary';
import ErrorPage from '../error-page';

import type { Entity as EntityType, Concept, MediaType } from '../../types';
import { Entity } from '../../types/enums';

interface ExternalProps {
  entities: Partial<EntityType>[];
  mediatypes?: MediaType[];
  compareConceptList?: Concept[];
  addConcept?: (concept: Partial<Concept>) => void;
  removeConcept?: (id?: string) => void;
}

interface Props extends ExternalProps {}

const renderEntity = (
  entity: Partial<EntityType>,
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
    case Entity.EVENT:
      return (
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
              Entity.EVENT
            ]
          }
        >
          <EventItem event={entity} />
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
      {entities.map(entity =>
        renderEntity(entity, {
          mediatypes,
          compareConceptList,
          addConcept,
          removeConcept
        })
      )}
    </div>
  ) : null;

export default compose<FC<ExternalProps>>(
  memo,
  withErrorBoundary(ErrorPage)
)(SearchEntities);
