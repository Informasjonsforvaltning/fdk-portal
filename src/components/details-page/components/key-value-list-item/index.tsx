import React, { memo, FC, PropsWithChildren, ReactNode } from 'react';

import SC from './styled';

interface Props {
  property: string | ReactNode;
  value: string | ReactNode;
}

const KeyValueListItem: FC<PropsWithChildren<Props>> = ({
  property,
  value,
  ...props
}) => (
  <SC.ListItem {...props}>
    <SC.Property>{property}</SC.Property>
    <SC.Value>{value}</SC.Value>
  </SC.ListItem>
);

export default memo(KeyValueListItem);
