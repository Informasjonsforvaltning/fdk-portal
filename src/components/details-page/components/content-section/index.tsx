import React, { FC, PropsWithChildren } from 'react';

import TruncatedText from '../../../truncated-text/index';

import SC from './styled';

interface Props {
  id: string;
  title: string;
}

const ContentSection: FC<PropsWithChildren<Props>> = ({
  id,
  title,
  children
}) => {
  return (
    <SC.ContentSection id={id}>
      <SC.Title>{title}</SC.Title>
      {typeof children === 'string' ? (
        <TruncatedText content={children} visibleLines={4} lineHeight={20} />
      ) : (
        children
      )}
    </SC.ContentSection>
  );
};

export default ContentSection;
