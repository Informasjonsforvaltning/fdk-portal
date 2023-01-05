import React from 'react';
import type { FC, ChangeEventHandler } from 'react';
import _capitalize from 'lodash/capitalize';

import localization from '../../lib/localization';
import { getTranslateText } from '../../lib/translateText';

interface Props {
  itemKey: number;
  value?: string;
  labelRaw?: string;
  label?: string;
  count?: number;
  onClick: ChangeEventHandler;
  active?: boolean;
  referenceDataItems?: Record<string, any>;
  displayClass?: string;
  capitalize?: boolean;
}

export const FilterOption: FC<Props> = ({
  itemKey,
  value,
  labelRaw,
  label,
  count,
  onClick,
  active,
  referenceDataItems,
  displayClass,
  capitalize = true
}) => {
  const optionLabel = labelRaw || label;

  let textLabel;
  // if themes, then choose text from themes array, else choose label from localization-file.
  if (referenceDataItems) {
    if (referenceDataItems[`${label}`]) {
      textLabel =
        getTranslateText(referenceDataItems[`${label}`].label) ||
        getTranslateText(referenceDataItems[`${label}`].name);
    } else {
      textLabel = localization.unknown;
    }
  } else if (
    optionLabel?.toUpperCase() === 'UKJENT' ||
    optionLabel?.toUpperCase() === 'MISSING'
  ) {
    textLabel = localization.unknown;
  } else if (optionLabel?.toUpperCase()?.startsWith('/ANNET')) {
    textLabel = _capitalize(
      optionLabel.substr(optionLabel.lastIndexOf('/') + 1, optionLabel.length)
    );
  } else {
    textLabel = (optionLabel && localization[optionLabel]) || optionLabel;
  }
  if (textLabel && textLabel === textLabel.toUpperCase()) {
    textLabel =
      localization[textLabel.toLowerCase()] ||
      (capitalize ? `${_capitalize(textLabel)}` : textLabel);
  }

  const id = encodeURIComponent(itemKey + (value ?? ''));

  return (
    <div className={`checkbox ${displayClass}`}>
      <label
        className='checkbox_label'
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        htmlFor={id}
      >
        <input
          type='checkbox'
          id={id}
          checked={active}
          onChange={onClick}
          className='list-group-item fdk-label fdk-label-default'
          value={value}
        />
        <span className='checkbox-replacement' />
        {textLabel} {count ? `(${count})` : ''}
      </label>
    </div>
  );
};
