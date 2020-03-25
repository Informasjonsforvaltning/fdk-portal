import React, { memo, FC, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  id: string;
  title: string;
}

const ContentSection: FC<PropsWithChildren<Props>> = ({
  id,
  title,
  children
}) => (
  <SC.ContentSection id={id}>
    <SC.Title>{title}</SC.Title>
    {children}
  </SC.ContentSection>
);

export default memo(ContentSection);
