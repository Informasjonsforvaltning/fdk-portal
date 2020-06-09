import React, { FC, memo } from 'react';

import SC from './styled';

interface Props {
  to: string;
  text1?: string;
  text2?: string;
}

const ListItem: FC<Props> = ({ to, text1, text2, ...props }) => (
  <SC.ListItem to={to} {...props}>
    {text1 && <SC.Text>{text1}</SC.Text>}
    {text2 && <SC.Text>{text2}</SC.Text>}
  </SC.ListItem>
);

export default memo(ListItem);
