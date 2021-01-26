import React, { FC } from 'react';

import { getTranslateText as translate } from '../../lib/translateText';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';

import { SearchHit, SearchHitThemes } from '../search-hit/search-hit';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';

import { isLosTheme, isEuTheme } from '../../utils/common';

import type { InformationModel } from '../../types';
import { SearchTypes } from '../../types/enums';

interface Props {
  informationModel: Partial<InformationModel>;
}

export const InformationModelItem: FC<Props> = ({
  informationModel: {
    id,
    title = {},
    description,
    publisher = {},
    losTheme: losThemes,
    theme: euThemes
  }
}) => {
  const themes = [...(losThemes ?? []), ...(euThemes ?? [])];

  return (
    <SearchHit
      id={id}
      type={SearchTypes.informationModel}
      title={title}
      publisher={publisher}
      description={description}
    >
      {Array.isArray(losThemes) && (
        <SearchHitThemes>
          {themes.map(theme => {
            if (isLosTheme(theme)) {
              const { uri, name, losPaths: [losPath] = [] } = theme;
              return (
                <RoundedTag
                  key={uri}
                  to={patchSearchQuery('losTheme', losPath)}
                >
                  <span>{translate(name)}</span>
                </RoundedTag>
              );
            }

            if (isEuTheme(theme)) {
              const { id, title, code } = theme;
              return (
                <RoundedTag key={id} to={patchSearchQuery('theme', code)}>
                  <span>{translate(title)}</span>
                </RoundedTag>
              );
            }

            return null;
          })}
        </SearchHitThemes>
      )}
    </SearchHit>
  );
};
