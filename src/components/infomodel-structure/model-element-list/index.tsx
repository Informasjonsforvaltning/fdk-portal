import React, { memo, FC } from 'react';
import { compose } from 'redux';

import Element from './element';
import ListTitleSC from '../list-title/styled';

import type {
  InformationModelElement,
  InformationModelProperty,
  ModelCodeElement
} from '../../../types';

interface ExternalProps {
  title: string;
  properties?: Partial<InformationModelProperty | ModelCodeElement>[];
  modelElements: Record<string, Partial<InformationModelElement>>;
}

interface Props extends ExternalProps {}

const ModelElementList: FC<Props> = ({ title, properties, modelElements }) =>
  properties && properties.length > 0 ? (
    <>
      <ListTitleSC.ListTitle>{title}</ListTitleSC.ListTitle>
      {properties.map(property => (
        <Element
          key={property.identifier}
          property={property}
          code={property}
          modelElements={modelElements}
        />
      ))}
    </>
  ) : null;

export default compose<FC<ExternalProps>>(memo)(ModelElementList);
