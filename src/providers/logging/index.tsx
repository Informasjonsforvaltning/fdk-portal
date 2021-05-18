import React, { memo, FC, PropsWithChildren } from 'react';
import { compose } from 'redux';

import service from '../../services/logging';

import Context from './context';

interface Props {}

const LoggingProvider: FC<PropsWithChildren<Props>> = ({ children }) => (
  <Context.Provider value={{ service }}>{children}</Context.Provider>
);

export default compose<FC>(memo)(LoggingProvider);
export { withLogging } from './hoc';
export type { ServiceProps as Props } from './hoc';
export { Severity } from '../../services/logging';
