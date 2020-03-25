import React, { memo, FC, PropsWithChildren, Children } from 'react';

import SC from './styled';

const InlineList: FC<PropsWithChildren<any>> = ({ children, ...props }) => (
  <SC.List {...props}>
    {Children.map(
      children,
      child => child && <SC.ListItem>{child}</SC.ListItem>
    )}
  </SC.List>
);

export default memo(InlineList);
