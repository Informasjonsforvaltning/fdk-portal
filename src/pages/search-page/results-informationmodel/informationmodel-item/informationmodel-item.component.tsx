import React, { FC } from 'react';

import { InformationModelDocument } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import {
  SearchHit,
  SearchHitThemes
} from '../../../../components/search-hit/search-hit';
import { getTranslateText } from '../../../../lib/translateText';
import { RoundedTag } from '../../../../components/rounded-tag/rounded-tag.component';

interface Props {
  informationModel: InformationModelDocument;
  referenceData: any;
}

const renderThemes = (themes: any) => {
  return themes
    .map((theme: any, index: number) => {
      const { name } = theme;
      return (
        name && (
          <RoundedTag key={`dataset-theme-${index}`} to="">
            <span>{getTranslateText(name)}</span>
          </RoundedTag>
        )
      );
    })
    .filter(Boolean);
};

export const InformationModelItem: FC<Props> = ({
  informationModel: { id, title = {}, description, publisher = {}, themes }
}) => {
  return (
    <SearchHit
      id={id}
      type={SearchTypes.informationModel}
      title={title}
      publisher={publisher}
      description={description}
    >
      {themes && <SearchHitThemes>{renderThemes(themes)}</SearchHitThemes>}
    </SearchHit>
  );
};
