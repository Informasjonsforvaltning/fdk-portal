import React, { FC, memo, PropsWithChildren } from 'react';

import SC from './styled';

import { Variant } from './enums';

interface Props {
  variant?: Variant;
  header?: string;
}
const BoxRegular: FC<PropsWithChildren<Props>> = ({
  variant,
  header,
  children
}) => (
  <SC.BoxRegular>
    {header && <SC.BoxHeader>{header}</SC.BoxHeader>}
    {children && <SC.BoxContent variant={variant}>{children}</SC.BoxContent>}
  </SC.BoxRegular>
);

export default memo(BoxRegular);
export { Variant } from './enums';
