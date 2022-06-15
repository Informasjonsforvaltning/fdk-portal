import React, {
  ComponentType,
  memo,
  FC,
  PropsWithChildren,
  ReactNode,
  SVGProps
} from 'react';

import SC from './styled';

interface Props {
  title?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  value: string | ReactNode;
}

const IconValueItem: FC<PropsWithChildren<Props>> = ({
  title,
  Icon,
  value,
  ...props
}) => (
  <SC.IconValueItem {...props}>
    {Icon && (
      <SC.Icon>
        <Icon />
      </SC.Icon>
    )}
    <SC.Content>
      <SC.Title>{title}</SC.Title>
      <SC.Value>{value}</SC.Value>
    </SC.Content>
  </SC.IconValueItem>
);

export default memo(IconValueItem);
