import React, { FC } from 'react';

import SC from './styled';
import {
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES
} from '../../../../constants/constants';
import localization from '../../../../lib/localization';
import { Entity } from '../../../../types/enums';
import { getConfig } from '../../../../config';

const smallWidth = !!getConfig().showPublicService;

interface Props {
  entity: Entity;
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
      path: PATHNAME_PUBLIC_SERVICES,
      icon: SC.PublicServiceIcon,
      translation: localization.serviceLabel
    }
  };

  const { path, icon: Icon, translation } = categoriesLink[entity];

  return (
    <SC.SearchLink to={path} type={entity} smallWidth={smallWidth}>
      <Icon />
      <span>{localization.showOnly}</span>
      <span>{translation.toLowerCase()}</span>
    </SC.SearchLink>
  );
};

export default SearchLink;
