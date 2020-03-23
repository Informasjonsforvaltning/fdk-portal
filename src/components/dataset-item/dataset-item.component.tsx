import React, { FC } from 'react';

import { getTranslateText } from '../../lib/translateText';
import { Dataset } from '../../types';
import { SearchTypes } from '../../types/enums';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import PublicIconBase from '../../images/icon-access-open-md.svg';
import {
  SearchHit,
  SearchHitFormats,
  SearchHitThemes,
  SearchHitAccessRights,
  SearchHitOpenData
} from '../search-hit/search-hit';
import localization from '../../lib/localization';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';
import { PATHNAME_DATASETS } from '../../constants/constants';
import ReactTooltipSC from '../tooltip/styled';

interface Props {
  dataset: Dataset;
  losItems: any;
}

function isDatasetOpen(accessRights: any, distribution: any): boolean {
  return (
    accessRights?.code === 'PUBLIC' &&
    (distribution || []).filter((item: any) => !!item.openLicense).length > 0
  );
}

const renderAccessRights = (accessRight: any) => {
  if (accessRight?.code === 'PUBLIC') {
    return (
      <RoundedTag>
        <PublicIconBase />
        <span>
          {localization.dataset.accessRights.authorityCode.publicDetailsLabel}
        </span>
      </RoundedTag>
    );
  }
  return null;
};

const renderThemes = (themes: any, losItems: any) => {
  const isEuTheme = ({ id, title, code }: any) => !!id && !!title && !!code;
  const isLosTheme = ({ uri, prefLabel, losPaths }: any) =>
    !!uri && !!prefLabel && !!losPaths;

  return themes
    .map((theme: any) =>
      theme.id && !theme.code
        ? Object.values(losItems).find(
            (losItem: any) => losItem.uri === theme.id
          ) ?? null
        : theme
    )
    .filter(Boolean)
    .map((theme: any) => {
      if (isEuTheme(theme)) {
        const { id, title, code } = theme;
        return (
          <RoundedTag
            key={id}
            to={`${PATHNAME_DATASETS}${patchSearchQuery('theme', code)}`}
          >
            <span>{getTranslateText(title)}</span>
          </RoundedTag>
        );
      }
      if (isLosTheme(theme)) {
        const { uri, prefLabel, losPaths: [losPath] = [] } = theme;
        return (
          <RoundedTag
            key={uri}
            to={`${PATHNAME_DATASETS}${patchSearchQuery('losTheme', losPath)}`}
          >
            <span>{getTranslateText(prefLabel)}</span>
          </RoundedTag>
        );
      }
      return null;
    })
    .filter(Boolean);
};

const renderFormats = (distributions: any) => {
  if (!(distributions && distributions.length > 0)) {
    return null;
  }

  return distributions.map((distribution: any) =>
    distribution.format?.map((item: string) => (
      <span key={`format-${item}`}>{item}</span>
    ))
  );
};

export const DatasetItem: FC<Props> = ({
  dataset: {
    id,
    title,
    description,
    publisher,
    theme,
    distribution = [],
    accessRights = {},
    provenance = {}
  },
  losItems
}) => {
  return (
    <SearchHit
      id={id}
      type={SearchTypes.dataset}
      title={title}
      publisher={publisher}
      description={description}
      isAuthoritative={provenance?.code === 'NASJONAL'}
    >
      {isDatasetOpen(accessRights, distribution) && (
        <SearchHitOpenData>
          <div data-tip={localization.openDataTooltip}>
            <RoundedTag>
              <PublicIconBase />
              <span>{localization.openData}</span>
            </RoundedTag>
          </div>
          <ReactTooltipSC.ReactTooltipStyled effect="solid" multiline />
        </SearchHitOpenData>
      )}

      {!isDatasetOpen(accessRights, distribution) && (
        <SearchHitAccessRights>
          <div data-tip={localization.publicDatasetTooltip}>
            {renderAccessRights(accessRights)}
          </div>
          <ReactTooltipSC.ReactTooltipStyled effect="solid" multiline />
        </SearchHitAccessRights>
      )}

      <SearchHitThemes>{renderThemes(theme, losItems)}</SearchHitThemes>

      <SearchHitFormats>{renderFormats(distribution)}</SearchHitFormats>
    </SearchHit>
  );
};
