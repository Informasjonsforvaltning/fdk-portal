import React, { memo, FC } from 'react';
import { compose } from 'redux';

import Element from './element';

import { getTranslateText as translate } from '../../../lib/translateText';

import BidirIcon from '../../../images/icon-infomod-accosiation-twoway-sm.svg';

import ListTitleSC from '../list-title/styled';
import SC from './styled';

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
}) => {
  if (
    (type === ModelElementType.BIDIR_IN ||
      type === ModelElementType.BIDIR_OUT) &&
    properties &&
    properties.length === 2
  ) {
    const bidirIn = properties[0] as Partial<InformationModelProperty>;
    const bidirOut = properties[1] as Partial<InformationModelProperty>;

    return (
      <>
        <ListTitleSC.ListTitle>{title}</ListTitleSC.ListTitle>
        <>
          <SC.BidirTitle>
            <BidirIcon />
            {translate(
              bidirIn?.relationPropertyLabel ?? bidirOut.relationPropertyLabel
            )}
          </SC.BidirTitle>
          <Element
            key={bidirIn.identifier ?? bidirIn.uri ?? `property-0a`}
            property={bidirIn}
            code={bidirIn}
            modelElements={modelElements}
            concepts={concepts}
            type={type}
          />
          <Element
            key={bidirOut.identifier ?? bidirOut.uri ?? `property-0b`}
            property={bidirOut}
            code={bidirOut}
            modelElements={modelElements}
            concepts={concepts}
            type={ModelElementType.BIDIR_IN}
          />
        </>
      </>
    );
  }

  return properties && properties.length > 0 ? (
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
};

export default compose<FC<ExternalProps>>(memo)(ModelElementList);
