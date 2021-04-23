import React, { memo, FC, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  large?: boolean;
}

const SearchBoxHeader: FC<PropsWithChildren<Props>> = ({
  large = false,
  children
}) => <SC.SearchBoxHeader large={large}>{children}</SC.SearchBoxHeader>;

export default memo(SearchBoxHeader);
