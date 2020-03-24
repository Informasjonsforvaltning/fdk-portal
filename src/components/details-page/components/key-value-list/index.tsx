import React, {
  memo,
  FC,
  PropsWithChildren,
  Children,
  isValidElement
} from 'react';

import KeyValueListItem from '../key-value-list-item';

import SC from './styled';

const KeyValueList: FC<PropsWithChildren<any>> = ({ children, ...props }) => (
  <SC.List {...props}>
    {Children.map(children, child =>
      isValidElement(child) && child.type === KeyValueListItem ? child : null
    )}
  </SC.List>
);

export default memo(KeyValueList);
