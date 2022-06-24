import React, { PropsWithChildren, FC } from 'react';
import SC from './styled';

interface Props {}

const CommunityContainer: FC<PropsWithChildren<Props>> = ({ children }) => (
  <SC.CommunityContainer>{children}</SC.CommunityContainer>
);

export default CommunityContainer;
