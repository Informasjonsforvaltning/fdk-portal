import React, { PropsWithChildren, FC } from 'react';
import SC from './styled';

interface Props {
  href: string;
}

const ContainerFooter: FC<PropsWithChildren<Props>> = ({ href, children }) => (
  <SC.ContainerFooter href={href}> {children} </SC.ContainerFooter>
);

export default ContainerFooter;
