import React, { FC } from 'react';

import { getTranslateText as translate } from '../../lib/translateText';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';

import { SearchHit, SearchHitThemes } from '../search-hit/search-hit';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';

import { isEuTheme, isLosNode } from '../../utils/common';

import type { SearchObject } from '../../types';
import { SearchTypes } from '../../types/enums';
import localization from '../../lib/localization';

interface Props {
  informationModel: Partial<SearchObject>;
}

export const InformationModelItem: FC<Props> = ({
  informationModel: {
    id,
    title = {},
    description,
    organization = {},
    losTheme: losThemes,
    dataTheme: euThemes
  }
}) => {
  const themes = [...(losThemes ?? []), ...(euThemes ?? [])];

  return (
    <SearchHit
      id={id}
      type={SearchTypes.informationModel}
      title={title}
      publisher={organization}
      description={description}
      subtitle={localization.informationModelLabel}
    >
      {Array.isArray(losThemes) && (
        <SearchHitThemes>
          {themes.map(theme => {
            if (isLosNode(theme)) {
              const { name, losPaths: [losPath] = [] } = theme;
              return (
                <RoundedTag
                  key={`los-${name}`}
                  to={patchSearchQuery('losTheme', losPath)}
                >
                  <span>{translate(name)}</span>
                </RoundedTag>
              );
            }

            if (isEuTheme(theme)) {
              const {
                id: themeId,
                title: themeTitle,
                label: themeLabel,
                code
              } = theme;
              return (
                <RoundedTag key={themeId} to={patchSearchQuery('theme', code)}>
                  <span>
                    {themeTitle ? translate(themeTitle) : translate(themeLabel)}
                  </span>
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
