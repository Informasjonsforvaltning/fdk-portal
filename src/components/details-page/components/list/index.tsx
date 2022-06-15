import React, {
  memo,
  FC,
  PropsWithChildren,
  Children,
  isValidElement
} from 'react';

import SC from './styled';

interface Props {}

const List: FC<PropsWithChildren<Props>> = ({ children, ...props }) => (
  <SC.List {...props}>
    {Children.map(children, child => (isValidElement(child) ? child : null))}
  </SC.List>
);

export default memo(List);
