import React, { memo, FC, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  large?: boolean;
}

const SearchBoxTitle: FC<PropsWithChildren<Props>> = ({
  large = false,
  children
}) => <SC.Title large={large}>{children}</SC.Title>;

export default memo(SearchBoxTitle);
