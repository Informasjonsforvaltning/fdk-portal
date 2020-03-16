import React, { FC, memo, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  active: boolean;
  tabLink: any;
  label: string;
}

const Tab: FC<PropsWithChildren<Props>> = ({
  active,
  tabLink,
  label,
  children
}) => (
  <SC.Tab active={active}>
    <SC.TabLink to={tabLink} aria-label={label}>
      {children}
    </SC.TabLink>
  </SC.Tab>
);

export default memo(Tab);
