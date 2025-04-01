import React, {
  memo,
  FC,
  PropsWithChildren,
  Children,
  isValidElement
} from 'react';

import SC from './styled';
import KeyValueListItem from '../key-value-list-item';
import AssociativeRelations from '../RelatedConcepts/AssociativeRelations';
import GenericRelations from '../RelatedConcepts/GenericRelations';
import IsReplacedBy from '../RelatedConcepts/IsReplacedBy';
import MemberOf from '../RelatedConcepts/MemberOf';
import PartitiveRelations from '../RelatedConcepts/PartitiveRelations';
import SeeAlso from '../RelatedConcepts/SeeAlso';

const KeyValueList: FC<PropsWithChildren<any>> = ({ children, ...props }) => {
  const hasChildren = React.Children.count(children) > 0;
  if (!hasChildren) return (<></>);
  return (
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
}

export default memo(KeyValueList);
