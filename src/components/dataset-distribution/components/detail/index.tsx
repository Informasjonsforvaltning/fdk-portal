import React, { memo, FC } from 'react';

import SC from './styled';

import testIds from './test-ids';

interface Props {
  property: string;
  value: any;
}

const Detail: FC<Props> = ({ property, value, ...props }) => (
  <SC.Detail data-testid={testIds.root} {...props}>
    <SC.Property data-testid={testIds.property}>{property}</SC.Property>
    <SC.Value data-testid={testIds.value}>{value}</SC.Value>
  </SC.Detail>
);

export default memo(Detail);
