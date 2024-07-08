import React, { FC, PropsWithChildren } from 'react';

import TruncatedText from '../../../truncated-text/index';
import { Entity } from '../../../../types/enums';

import SC from './styled';

interface Props {
  id: string;
  title?: string;
  boxStyle?: boolean;
  entityIcon?: Entity;
  truncate?: boolean;
}

const ContentSection: FC<PropsWithChildren<Props>> = ({
  id,
  title,
  boxStyle = true,
  entityIcon,
  truncate,
  children
}) => (
  <SC.ContentSection id={id} boxStyle={boxStyle}>
    {(title || entityIcon) && (
      <SC.Header>
        <SC.Title>{title}</SC.Title>
      </SC.Header>
    )}

    {truncate ? (
      <TruncatedText visibleLines={4} lineHeight={20}>
        {children}
      </TruncatedText>
    ) : (
      children
    )}
  </SC.ContentSection>
);

export default ContentSection;
