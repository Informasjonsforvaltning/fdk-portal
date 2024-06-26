import React, { FC } from 'react';

import CircleMinusIcon from '@fellesdatakatalog/icons/assets/svg/circle-minus-stroke.svg';

import localization from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';

import './compare-terms.scss';
import { TextLanguage } from '../../../types';

interface Props {
  uri?: string;
  title?: Partial<TextLanguage>;
  creator?: string;
  onDeleteTerm: (id: string) => void;
}

const capitalCase = (label?: string) =>
  label
    ?.trim()
    ?.toLowerCase()
    ?.replace(/^\w/, c => c.toUpperCase()) ?? '';

export const CompareTerms: FC<Props> = ({
  uri,
  title,
  creator,
  onDeleteTerm
}) => (
  <div className='fdk-container p-4 fdk-container-compare-terms'>
    <div className='d-flex align-items-baseline justify-content-between'>
      <h3 className=''>{capitalCase(getTranslateText(title))}</h3>
      <button
        type='button'
        className='btn fdk-text-size-15 fdk-color-link bg-transparent nowrap'
        onClick={() => {
          uri && onDeleteTerm(uri);
        }}
      >
        <CircleMinusIcon className='fdk-compare-icon' />
        &nbsp;
        {localization.terms.removeTerms}
      </button>
    </div>
    <div>{creator && <div>{creator}</div>}</div>
  </div>
);
