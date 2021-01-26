import React, { FC, PropsWithChildren } from 'react';

import TruncatedText from '../../../truncated-text/index';
import { Entity } from '../../../../types/enums';

import SC from './styled';

interface Props {
  id: string;
  title: string;
  boxStyle?: boolean;
  iconEntity?: Entity;
}

const icon = (iconEntity?: Entity) => {
  switch (iconEntity) {
    case Entity.DATASET:
      return <SC.DatasetIcon />;
    case Entity.DATA_SERVICE:
      return <SC.ApiIcon />;
    case Entity.CONCEPT:
      return <SC.ConceptIcon />;
    case Entity.INFORMATION_MODEL:
      return <SC.InfomodIcon />;
    case Entity.PUBLIC_SERVICE:
      return <SC.ServiceIcon />;
    default:
      return null;
  }
};

const ContentSection: FC<PropsWithChildren<Props>> = ({
  id,
  title,
  boxStyle = false,
  iconEntity,
  children
}) => {
  return (
    <SC.ContentSection id={id} boxStyle={boxStyle}>
      <SC.Header>
        {iconEntity && (
          <SC.IconPlaceholder>{icon(iconEntity)}</SC.IconPlaceholder>
        )}
        <SC.Title>{title}</SC.Title>
      </SC.Header>

      {typeof children === 'string' ? (
        <TruncatedText content={children} visibleLines={4} lineHeight={20} />
      ) : (
        children
      )}
    </SC.ContentSection>
  );
};

export default ContentSection;
