import React, { FC, memo } from 'react';

import SC from './styled';
import {
  PATHNAME_APIS,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS
} from '../../../../constants/constants';
import localization from '../../../../lib/localization';
import { Entity } from '../../../../types/enums';

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
      path: PATHNAME_APIS,
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
    }
  };

  const { path, icon: Icon, translation } = categoriesLink[entity];

  return (
    <SC.SearchLink to={path} type={entity}>
      <Icon />
      <span>{localization.showOnly}</span>
      <span>{translation.toLowerCase()}</span>
    </SC.SearchLink>
  );
};

export default memo(SearchLink);
