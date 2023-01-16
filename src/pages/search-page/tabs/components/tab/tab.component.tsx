import React, { FC, memo, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  active: boolean;
  tabLink: any;
  label: string;
}

const unfocus = (e: React.MouseEvent) => {
  let target: HTMLElement | null | undefined = e.target as HTMLElement;
  if (target.tagName !== 'A') {
    for (let i = 0; i < 5; i++) {
      const parent: HTMLElement | null | undefined = target?.parentElement;
      if (parent?.tagName === 'A') {
        parent.blur();
      }
      target = parent;
    }
  } else {
    target?.blur();
  }
};

const Tab: FC<PropsWithChildren<Props>> = ({
  active,
  tabLink,
  label,
  children
}) => (
  <SC.Tab active={active}>
    <SC.TabLink to={tabLink} aria-label={label} onMouseLeave={unfocus}>
      {children}
    </SC.TabLink>
  </SC.Tab>
);

export default memo(Tab);
