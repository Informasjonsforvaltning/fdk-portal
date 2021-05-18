import React, { FC } from 'react';
import cx from 'classnames';
import _ from 'lodash';

import { getTranslateText } from '../../lib/translateText';
import {
  getReferenceDataByCode,
  REFERENCEDATA_PATH_APISTATUS
} from '../../redux/modules/referenceData';

interface Props {
  tag?: any;
  statusCode: 'STABLE' | 'DEPRECATED' | 'EXPERIMENTAL' | 'REMOVED';
  referenceData?: Record<string, any>;
}

export const LabelStatus: FC<Props> = ({
  tag: Tag = 'h3',
  statusCode,
  referenceData
}) => {
  if (statusCode === 'STABLE' || !referenceData) {
    return null;
  }
  const labelClass = cx({
    'fdk-color-neutral-darkest':
      statusCode.toUpperCase() === 'DEPRECATED' ||
      statusCode.toUpperCase() === 'EXPERIMENTAL',
    'fdk-color-danger': statusCode.toUpperCase() === 'REMOVED'
  });

  const apiStatusLabel = getTranslateText(
    _.get(
      getReferenceDataByCode(
        referenceData,
        REFERENCEDATA_PATH_APISTATUS,
        statusCode
      ),
      'prefLabel'
    )
  );

  return (
    <Tag className={labelClass}>
      ({apiStatusLabel ? apiStatusLabel.toLowerCase() : null})
    </Tag>
  );
};
