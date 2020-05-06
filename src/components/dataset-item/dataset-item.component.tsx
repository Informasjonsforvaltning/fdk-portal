import React, { FC } from 'react';

import { getTranslateText } from '../../lib/translateText';
import { Dataset, MediaType } from '../../types';
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
import ReactTooltipSC from '../tooltip/styled';

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

const renderFormats = (distributions: any, mediatypes: MediaType[]) => {
  if (!(distributions && distributions.length > 0)) {
    return null;
  }

  const formats: string[] = distributions.reduce(
    (previous: any, { format = [] }: any) => [...previous, ...format],
    []
  );

  return [...new Set(formats)].map((item: any, index: number) => (
    <span key={`format-${item}-${index}`}>
      {mediatypes?.find(({ code }) => code === item)?.name ?? item}
    </span>
  ));
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
        {renderFormats(distribution, mediatypes)}
      </SearchHitFormats>
    </SearchHit>
  );
};
