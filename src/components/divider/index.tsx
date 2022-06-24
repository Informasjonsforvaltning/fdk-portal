import React, { FC } from 'react';
import SC from './styled';

interface Props {}

const Divider: FC<Props> = () => (
  <SC.DividerContainer>
    <SC.Divider />
  </SC.DividerContainer>
);

export default Divider;
