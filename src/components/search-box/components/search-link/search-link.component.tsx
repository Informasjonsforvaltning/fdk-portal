import React, { FC } from 'react';

import SC from './styled';
import {
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES_AND_EVENTS
} from '../../../../constants/constants';
import localization from '../../../../lib/localization';
import { Entity } from '../../../../types/enums';

interface Props {
  entity:
    | Entity.DATASET
    | Entity.DATA_SERVICE
    | Entity.CONCEPT
    | Entity.INFORMATION_MODEL
    | Entity.PUBLIC_SERVICE;
}

const SearchLink: FC<Props> = ({ entity }) => {
  const categoriesLink = {
    [Entity.DATASET]: {
      path: PATHNAME_DATASETS,
      icon: SC.DatasetIcon,
      translation: localization.datasetLabel
    },
    [Entity.DATA_SERVICE]: {
      path: PATHNAME_DATA_SERVICES,
      icon: SC.ApiIcon,
      translation: localization.apiLabel
    },
    [Entity.CONCEPT]: {
      path: PATHNAME_CONCEPTS,
      icon: SC.ConceptIcon,
      translation: localization.conceptLabel
    },
    [Entity.INFORMATION_MODEL]: {
      path: PATHNAME_INFORMATIONMODELS,
      icon: SC.InfomodIcon,
      translation: localization.informationModelLabel
    },
    [Entity.PUBLIC_SERVICE]: {
      path: PATHNAME_PUBLIC_SERVICES_AND_EVENTS,
      icon: SC.PublicServiceIcon,
      translation: localization.serviceLabel
    }
  };

  const { path, icon: Icon, translation } = categoriesLink[entity];
  const capitalizedTranslation =
    translation.charAt(0).toUpperCase() + translation.slice(1);

  return (
    <SC.SearchLink
      to={path}
      type={entity}
      title={capitalizedTranslation}
      $smallWidth
    >
      <Icon />
      <span>{localization.showOnly}&nbsp;</span>
      <span>{translation.toLowerCase()}&nbsp;</span>
    </SC.SearchLink>
  );
};

export default SearchLink;
