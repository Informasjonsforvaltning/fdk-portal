import React, { FC } from 'react';

import { getTranslateText } from '../../../../lib/translateText';
import { Dataset } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { RoundedTag } from '../../../../components/rounded-tag/rounded-tag.component';
import PublicIconBase from '../../../../images/icon-access-open-md.svg';
import {
  SearchHit,
  SearchHitFormats,
  SearchHitThemes,
  SearchHitAccessRights,
  SearchHitOpenData
} from '../../../../components/search-hit/search-hit';
import localization from '../../../../lib/localization';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';
import { PATHNAME_DATASETS } from '../../../../constants/constants';

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
  return themes
    .map((theme: any, index: number) => {
      const losItem: any =
        Object.values(losItems).find(
          (losItem: any) => losItem.uri === theme.id
        ) || {};
      const losPath: any = losItem?.losPaths ? losItem.losPaths[0] : '';
      const prefLabel = getTranslateText(losItem.prefLabel);
      return (
        prefLabel && (
          <RoundedTag
            key={`dataset-theme-${index}`}
            to={`${PATHNAME_DATASETS}${patchSearchQuery('losTheme', losPath)}`}
          >
            <span>{prefLabel}</span>
          </RoundedTag>
        )
      );
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
          <RoundedTag>
            <PublicIconBase />
            <span>{localization.openData}</span>
          </RoundedTag>
        </SearchHitOpenData>
      )}

      {!isDatasetOpen(accessRights, distribution) && (
        <SearchHitAccessRights>
          {renderAccessRights(accessRights)}
        </SearchHitAccessRights>
      )}

      <SearchHitThemes>{renderThemes(theme, losItems)}</SearchHitThemes>

      <SearchHitFormats>{renderFormats(distribution)}</SearchHitFormats>
    </SearchHit>
  );
};
