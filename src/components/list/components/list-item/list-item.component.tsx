import React, { FC, memo } from 'react';

import SC from './styled';

interface Props {
  to: string;
  text1?: string;
  text2?: string;
}

const ListItem: FC<Props> = ({ to, text1, text2, ...props }) => (
  <li>
    <SC.ListItem to={to} {...props}>
      <SC.Text>{text1}</SC.Text>
      <SC.Text>{text2}</SC.Text>
    </SC.ListItem>
  </li>
);

export default memo(ListItem);
