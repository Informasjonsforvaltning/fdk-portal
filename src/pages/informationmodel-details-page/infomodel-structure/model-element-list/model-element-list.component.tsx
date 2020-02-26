import React, { FC, memo } from 'react';

import { ModelElement } from '../../../../types';

import { Element } from './element/element.component';
import ListTitleSC from '../list-title/styled';

interface Props {
  title: string;
  listOfObjectTypes?: Partial<ModelElement>[];
}

const ModelElementListPure: FC<Props> = ({ title, listOfObjectTypes }) => (
  <>
    {listOfObjectTypes && listOfObjectTypes.length > 0 && (
      <>
        <ListTitleSC.ListTitle>{title}</ListTitleSC.ListTitle>
        {listOfObjectTypes.map(attribute => (
          <Element
            key={attribute.referencedObject?.refId}
            element={attribute}
          />
        ))}
      </>
    )}
  </>
);

export const ModelElementList = memo(ModelElementListPure);
