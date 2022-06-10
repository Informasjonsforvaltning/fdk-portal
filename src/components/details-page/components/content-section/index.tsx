import React, { FC, PropsWithChildren } from 'react';

import TruncatedText from '../../../truncated-text/index';
import { Entity } from '../../../../types/enums';

import SC from './styled';

interface Props {
  id: string;
  title: string;
  boxStyle?: boolean;
  entityIcon?: Entity;
  entityTheme?: Entity;
  truncate?: boolean;
}

const icon = (entity?: Entity) => {
  switch (entity) {
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
    case Entity.EVENT:
      return <SC.ServiceIcon />;
    default:
      return null;
  }
};

const ContentSection: FC<PropsWithChildren<Props>> = ({
  id,
  title,
  boxStyle = true,
  entityIcon,
  entityTheme,
  truncate,
  children
}) => (
  <SC.ContentSection id={id} boxStyle={boxStyle}>
    <SC.Header>
      {entityIcon && (
        <SC.IconPlaceholder>{icon(entityIcon)}</SC.IconPlaceholder>
      )}
      <SC.Title>{title}</SC.Title>
    </SC.Header>

    {truncate ? (
      <TruncatedText
        visibleLines={4}
        lineHeight={20}
        entityTheme={entityTheme ?? Entity.DATASET}
      >
        {children}
      </TruncatedText>
    ) : (
      children
    )}
  </SC.ContentSection>
);

export default ContentSection;
