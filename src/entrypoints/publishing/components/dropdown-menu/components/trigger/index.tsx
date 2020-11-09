import React, { memo, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';

interface Props {}

const Trigger: FC<PropsWithChildren<Props>> = ({ children }) => <>{children}</>;

export default compose<FC>(memo)(Trigger);
