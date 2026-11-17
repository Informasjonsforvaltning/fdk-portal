import React, {
  ComponentPropsWithoutRef,
  ComponentType,
  FC,
  memo,
  PropsWithChildren
} from 'react';
import { Link } from 'react-router-dom';

import SC from './styled';

export interface Props extends Partial<ComponentPropsWithoutRef<Link>> {
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
  href?: string;
}

const StatisticsRegular: FC<PropsWithChildren<Props>> = ({
  children,
  as,
  href,
  to = '',
  ...props
}) =>
  href ? (
    <SC.StatisticsRegular as='a' href={href} {...props}>
      {children}
    </SC.StatisticsRegular>
  ) : (
    <SC.StatisticsRegular as={as} to={to} {...props}>
      {children}
    </SC.StatisticsRegular>
  );

export default memo(StatisticsRegular);
export { Variant } from './enums';
