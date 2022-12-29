import React from 'react';
import { ExpansionIndicator } from '@fellesdatakatalog/expansion-panel/lib/components/expansion-panel';
import SvgIcon from '@fellesdatakatalog/icons';
import SC from './styled';

const ExpansionPanelIndicator: ExpansionIndicator = {
  expand: (
    <SC.Button type='button'>
      <SvgIcon name='chevronDownStroke' />
    </SC.Button>
  ),
  collapse: (
    <SC.Button type='button'>
      <SvgIcon name='chevronUpStroke' />
    </SC.Button>
  )
};

export default ExpansionPanelIndicator;
