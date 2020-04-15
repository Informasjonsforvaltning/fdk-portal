import React, { memo, FC, HTMLAttributes } from 'react';
import { RedirectProps } from 'react-router-dom';

import SC from './styled';

interface Props extends HTMLAttributes<HTMLElement> {}

const RoundedTagPure: FC<Props & Partial<RedirectProps>> = ({
  to,
  children
}) => {
  if (!to) {
    return <SC.RoundedTag>{children}</SC.RoundedTag>;
  }
  return <SC.RoundedTagWithLink to={to}>{children}</SC.RoundedTagWithLink>;
};

export const RoundedTag = memo(RoundedTagPure);
