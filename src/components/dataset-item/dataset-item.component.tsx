import React, { FC } from 'react';

import localization from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';

import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import {
  SearchHit,
  SearchHitFormats,
  SearchHitThemes,
  SearchHitAccessRights,
  SearchHitOpenData
} from '../search-hit/search-hit';

import { isLosTheme, isEuTheme } from '../../utils/common';

import ReactTooltipSC from '../tooltip/styled';

import PublicIconBase from '../../images/icon-access-open-md.svg';

import type { Dataset, MediaType } from '../../types';
import { SearchTypes } from '../../types/enums';

interface Props {
  dataset: Partial<Dataset>;
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

export const DatasetItem: FC<Props> = ({
  dataset: {
    id,
    title,
    description,
    publisher,
    losTheme: losThemes,
    theme: euThemes,
    distribution = [],
    accessRights = {},
    provenance = {}
  },
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

  const themes = [...(losThemes ?? []), ...(euThemes ?? [])];

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
          <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
        </SearchHitOpenData>
      )}

      {!isDatasetOpen(accessRights, distribution) && (
        <SearchHitAccessRights>
          <div data-tip={localization.publicDatasetTooltip}>
            {renderAccessRights(accessRights)}
          </div>
          <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
        </SearchHitAccessRights>
      )}

      <SearchHitThemes>
        {themes.map(theme => {
          if (isLosTheme(theme)) {
            const { uri, name, losPaths: [losPath] = [] } = theme;
            return (
              <RoundedTag key={uri} to={patchSearchQuery('losTheme', losPath)}>
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

      <SearchHitFormats>
        {[...new Set(formats)].map((format, index) => (
          <span key={`format-${format}-${index}`}>{format}</span>
        ))}
      </SearchHitFormats>
    </SearchHit>
  );
};
