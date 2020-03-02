import React, { FC, memo } from 'react';

import { Property } from '../../../../types';

import { Element } from './element/element.component';
import ListTitleSC from '../list-title/styled';
import { getTranslateText } from '../../../../lib/translateText';

interface Props {
  title: string;
  properties?: Partial<Property>[];
}

const ModelElementListPure: FC<Props> = ({ title, properties }) => {
  if (!(properties && properties.length > 0)) {
    return null;
  }
  if (properties && properties.length > 0) {
    return (
      <>
        <ListTitleSC.ListTitle>{title}</ListTitleSC.ListTitle>
        {properties.map(property => (
          <Element key={getTranslateText(property.name)} property={property} />
        ))}
      </>
    );
  }
  return null;
};

export const ModelElementList = memo(ModelElementListPure);
