import React, { memo, FC } from 'react';
import { compose } from 'redux';

import Element from './element';
import ListTitleSC from '../list-title/styled';

import type {
  InformationModelElement,
  InformationModelProperty,
  ModelCodeElement,
  Concept
} from '../../../types';
import { ModelElementType } from '../../../types/enums';

interface ExternalProps {
  title: string;
  properties?: Partial<InformationModelProperty | ModelCodeElement>[];
  modelElements: Record<string, Partial<InformationModelElement>>;
  concepts: Record<string, Concept>;
  type: ModelElementType;
}

interface Props extends ExternalProps {}

const ModelElementList: FC<Props> = ({
  title,
  properties,
  modelElements,
  concepts,
  type
}) =>
  properties && properties.length > 0 ? (
    <>
      <ListTitleSC.ListTitle>{title}</ListTitleSC.ListTitle>
      {properties.map((property, index) => (
        <Element
          key={property.identifier ?? property.uri ?? `property-${index}`}
          property={property}
          code={property}
          modelElements={modelElements}
          concepts={concepts}
          type={type}
        />
      ))}
    </>
  ) : null;

export default compose<FC<ExternalProps>>(memo)(ModelElementList);
