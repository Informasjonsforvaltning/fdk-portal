import React, { memo, FC } from 'react';

import SC from './styled';

interface Props {
  property: string;
  value: any;
}

const Detail: FC<Props> = ({ property, value, ...props }) => (
  <SC.Detail {...props}>
    <SC.Property>{property}</SC.Property>
    <SC.Value>{value}</SC.Value>
  </SC.Detail>
);

export default memo(Detail);
