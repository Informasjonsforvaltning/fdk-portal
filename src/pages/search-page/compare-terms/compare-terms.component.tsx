import React, { FC } from 'react';

import localization from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';

import './compare-terms.scss';

interface Props {
  uri?: string;
  prefLabel?: Record<string, any>;
  creator?: string;
  onDeleteTerm: (id: string) => void;
}

export const CompareTerms: FC<Props> = ({
  uri,
  prefLabel,
  creator,
  onDeleteTerm
}) => (
  <div className='fdk-container p-4 fdk-container-compare-terms'>
    <div className='d-flex align-items-baseline justify-content-between'>
      <h3 className=''>
        {getTranslateText(prefLabel)?.charAt(0).toUpperCase() +
          getTranslateText(prefLabel)?.substring(1).toLowerCase()}
      </h3>
      <button
        type='button'
        className='btn fdk-text-size-15 fdk-color-link bg-transparent'
        onClick={() => {
          uri && onDeleteTerm(uri);
        }}
      >
        <i className='fa fa-minus-circle' />
        &nbsp;
        {localization.terms.removeTerms}
      </button>
    </div>
    <div>{creator && <div>{creator}</div>}</div>
  </div>
);