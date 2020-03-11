import React, { memo, FC, HTMLAttributes } from 'react';
import { RedirectProps } from 'react-router-dom';

import SC from './styled';

interface Props extends HTMLAttributes<HTMLElement> {}

const RoundedTagPure: FC<Props & Partial<RedirectProps>> = ({
  to = '',
  children
}) => <SC.RoundedTag to={to}>{children}</SC.RoundedTag>;

export const RoundedTag = memo(RoundedTagPure);
