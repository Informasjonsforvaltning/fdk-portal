import React, { PropsWithChildren, FC, memo } from 'react';

import SC from './styled';

interface Props {}

const Aside: FC<PropsWithChildren<Props>> = ({ children }) => (
  <SC.Aside>{children}</SC.Aside>
);

export default memo(Aside);
