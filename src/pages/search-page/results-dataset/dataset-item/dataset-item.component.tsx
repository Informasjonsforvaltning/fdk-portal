import React, { FC } from 'react';
import find from 'lodash/find';

import { getTranslateText } from '../../../../lib/translateText';
import { getLosStructure } from '../../../../redux/modules/referenceData';
import { Dataset } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { SearchHitOpenData } from '../../../../components/search-hit/components/search-hit-open-data/search-hit-open-data.component';
import { RoundedTag } from '../../../../components/rounded-tag/rounded-tag.component';
import PublicIconBase from '../../../../images/icon-access-open-md.svg';
import { SearchHitAccessRights } from '../../../../components/search-hit/components/search-hit-access-rigths/search-hit-access-rights.component';
import { SearchHitThemes } from '../../../../components/search-hit/components/search-hit-themes/searh-hit-themes.component';
import { SearchHitFormats } from '../../../../components/search-hit/components/search-hit-formats/search-hit-formats';
import { SearchHit } from '../../../../components/search-hit/components/search-hit/search-hit.component';
import localization from '../../../../lib/localization';

interface Props {
  dataset: Dataset;
  referenceData: any;
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
      const losItem = find(losItems, { uri: theme.id });
      const title = getTranslateText(losItem?.prefLabel || theme.title);
      return (
        title && (
          <RoundedTag key={`dataset-theme-${index}`} to="">
            <span>{title}</span>
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
  referenceData
}) => {
  const losItems = getLosStructure(referenceData);
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
