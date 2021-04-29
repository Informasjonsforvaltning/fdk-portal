import React, { FC } from 'react';

import localization from '../../../../lib/localization';

interface Props {
  countDatasets?: number;
  countTerms?: number;
  countApis?: number;
  countInformationModels?: number;
}

export const HitsStats: FC<Props> = ({
  countDatasets = 0,
  countTerms = 0,
  countApis = 0,
  countInformationModels = 0
}) => (
  <span>
    {localization.formatString(
      countDatasets === 0 &&
        countApis === 0 &&
        countTerms === 0 &&
        countInformationModels === 0
        ? localization.hitstats.nohits
        : localization.hitstats.search,
      countDatasets,
      countApis,
      countTerms,
      countInformationModels
    )}
  </span>
);
