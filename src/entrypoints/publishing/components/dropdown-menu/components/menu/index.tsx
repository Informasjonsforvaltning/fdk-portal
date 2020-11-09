import React, { memo, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';

interface Props {}

const Menu: FC<PropsWithChildren<Props>> = ({ children }) => <>{children}</>;

export default compose<FC>(memo)(Menu);
