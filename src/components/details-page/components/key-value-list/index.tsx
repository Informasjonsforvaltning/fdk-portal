import React, {
  memo,
  FC,
  PropsWithChildren,
  Children,
  isValidElement
} from 'react';

import SC from './styled';
import { KeyValueListItem } from '../../index';
import AssociativeRelations from '../../../../pages/concept-details-page/RelatedConcepts/AssociativeRelations';
import GenericRelations from '../../../../pages/concept-details-page/RelatedConcepts/GenericRelations';
import IsReplacedBy from '../../../../pages/concept-details-page/RelatedConcepts/IsReplacedBy';
import MemberOf from '../../../../pages/concept-details-page/RelatedConcepts/MemberOf';
import PartitiveRelations from '../../../../pages/concept-details-page/RelatedConcepts/PartitiveRelations';
import SeeAlso from '../../../../pages/concept-details-page/RelatedConcepts/SeeAlso';

const KeyValueList: FC<PropsWithChildren<any>> = ({ children, ...props }) => (
  <SC.List {...props}>
    {Children.map(children, child =>
      isValidElement(child) &&
      (child.type === KeyValueListItem ||
        child.type === AssociativeRelations ||
        child.type === GenericRelations ||
        child.type === IsReplacedBy ||
        child.type === MemberOf ||
        child.type === PartitiveRelations ||
        child.type === SeeAlso)
        ? child
        : null
    )}
  </SC.List>
);

export default memo(KeyValueList);
