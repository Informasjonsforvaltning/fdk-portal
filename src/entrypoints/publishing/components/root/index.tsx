import React, { memo, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';

import SC from './styled';

interface Props {}

const Root: FC<PropsWithChildren<Props>> = ({ children }) => (
  <SC.Root>{children}</SC.Root>
);

export default compose<FC>(memo)(Root);
