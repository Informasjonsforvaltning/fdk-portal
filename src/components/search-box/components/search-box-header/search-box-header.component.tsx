import React, { ComponentType, memo, FC, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  large?: boolean;
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
}

const SearchBoxHeader: FC<PropsWithChildren<Props>> = ({
  as,
  large = false,
  children
}) => (
  <SC.SearchBoxHeader as={as} large={large}>
    {children}
  </SC.SearchBoxHeader>
);

export default memo(SearchBoxHeader);
