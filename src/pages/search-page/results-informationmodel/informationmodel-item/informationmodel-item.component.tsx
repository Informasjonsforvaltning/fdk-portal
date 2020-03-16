import React, { FC } from 'react';

import { InformationModelDocument } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import {
  SearchHit,
  SearchHitThemes
} from '../../../../components/search-hit/search-hit';
import { getTranslateText } from '../../../../lib/translateText';
import { RoundedTag } from '../../../../components/rounded-tag/rounded-tag.component';
import { PATHNAME_INFORMATIONMODELS } from '../../../../constants/constants';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';

interface Props {
  informationModel: InformationModelDocument;
  losItems: any;
}

const renderThemes = (themes: any, losItems: any) => {
  return themes
    .map((theme: any, index: number) => {
      const losItem: any =
        Object.values(losItems).find(
          (losItem: any) => losItem.uri === theme.uri
        ) || {};
      const losPath: any = losItem?.losPaths ? losItem.losPaths[0] : '';
      const prefLabel = getTranslateText(losItem.prefLabel);
      return (
        prefLabel && (
          <RoundedTag
            key={`dataset-theme-${index}`}
            to={`${PATHNAME_INFORMATIONMODELS}${patchSearchQuery(
              'losTheme',
              losPath
            )}`}
          >
            <span>{prefLabel}</span>
          </RoundedTag>
        )
      );
    })
    .filter(Boolean);
};

export const InformationModelItem: FC<Props> = ({
  informationModel: { id, title = {}, description, publisher = {}, themes },
  losItems
}) => {
  return (
    <SearchHit
      id={id}
      type={SearchTypes.informationModel}
      title={title}
      publisher={publisher}
      description={description}
    >
      {themes && (
        <SearchHitThemes>{renderThemes(themes, losItems)}</SearchHitThemes>
      )}
    </SearchHit>
  );
};
