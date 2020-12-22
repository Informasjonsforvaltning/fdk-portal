import React, { FC } from 'react';

import localization from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';

import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import {
  SearchHit,
  SearchHitFormats,
  SearchHitThemes,
  SearchHitAccessRights,
  SearchHitOpenData
} from '../search-hit/search-hit';

import ReactTooltipSC from '../tooltip/styled';

import PublicIconBase from '../../images/icon-access-open-md.svg';

import type { Dataset, MediaType } from '../../types';
import { SearchTypes } from '../../types/enums';

interface Props {
  dataset: Dataset;
  losItems: any;
  mediatypes?: MediaType[];
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
    ?.map((theme: any) =>
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
          <RoundedTag key={id} to={patchSearchQuery('theme', code)}>
            <span>{getTranslateText(title)}</span>
          </RoundedTag>
        );
      }
      if (isLosTheme(theme)) {
        const { uri, prefLabel, losPaths: [losPath] = [] } = theme;
        return (
          <RoundedTag key={uri} to={patchSearchQuery('losTheme', losPath)}>
            <span>{getTranslateText(prefLabel)}</span>
          </RoundedTag>
        );
      }
      return null;
    })
    .filter(Boolean);
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
  losItems,
  mediatypes = []
}) => {
  const formats = distribution
    ?.reduce(
      (previous, { format = [] }) => [...previous, ...format],
      [] as string[]
    )
    .map(
      format =>
        mediatypes?.find(({ uri }) => uri.includes(format))?.name ?? format
    );

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

      <SearchHitFormats>
        {[...new Set(formats)].map((format, index) => (
          <span key={`format-${format}-${index}`}>{format}</span>
        ))}
      </SearchHitFormats>
    </SearchHit>
  );
};
