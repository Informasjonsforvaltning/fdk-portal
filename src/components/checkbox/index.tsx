import React, { FC } from 'react';

import '../filter-box/filter-box.scss';

interface Props {
  id: string;
  active: boolean;
  onClick: () => void;
  value?: string;
  textLabel: string;
  displayClass: string;
}

const CheckBox: FC<Props> = ({
  id,
  active,
  onClick = () => null,
  value,
  textLabel,
  displayClass = ''
}) => (
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
      {textLabel}
    </label>
  </div>
);

export default CheckBox;
