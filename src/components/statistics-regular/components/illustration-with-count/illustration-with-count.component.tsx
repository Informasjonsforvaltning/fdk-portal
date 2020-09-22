import React, { FC, memo, ReactNode } from 'react';

import SC from './styled';

import { Variant } from './enums';

interface Props {
  variant?: Variant;
  icon?: ReactNode;
  chart?: ReactNode;
  count?: number;
  percentage?: number;
}

const IllustrationWithCount: FC<Props> = ({
  variant,
  icon,
  chart,
  count,
  percentage
}) => (
  <SC.Content variant={variant}>
    {icon && <SC.Icon>{icon}</SC.Icon>}
    {chart && <SC.Chart>{chart}</SC.Chart>}
    {Number.isInteger(count) && <SC.Count>{count}</SC.Count>}
    {Number.isInteger(percentage) && <SC.Count>{percentage}%</SC.Count>}
  </SC.Content>
);

export default memo(IllustrationWithCount);
export { Variant } from './enums';
