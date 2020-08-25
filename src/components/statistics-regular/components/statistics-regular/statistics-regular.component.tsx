import React, {
  ComponentPropsWithoutRef,
  ComponentType,
  FC,
  memo,
  PropsWithChildren
} from 'react';
import { Link } from 'react-router-dom';

import SC from './styled';

export interface Props extends ComponentPropsWithoutRef<Link> {
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
}

const StatisticsRegular: FC<PropsWithChildren<Props>> = ({
  children,
  as,
  ...props
}) => (
  <SC.StatisticsRegular as={as} {...props}>
    {children}
  </SC.StatisticsRegular>
);

export default memo(StatisticsRegular);
export { Variant } from './enums';
