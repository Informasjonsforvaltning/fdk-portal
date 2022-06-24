import React, { PropsWithChildren, FC } from 'react';
import SC from './styled';

interface Props {}

const ContainerHeader: FC<PropsWithChildren<Props>> = ({ children }) => (
  <SC.ContainerHeader>{children}</SC.ContainerHeader>
);

export default ContainerHeader;
