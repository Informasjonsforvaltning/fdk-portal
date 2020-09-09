import React, { FC, memo, useState } from 'react';

import SC from './styled';
import ListItem from '../list-item/list-item.component';
import localization from '../../../../lib/localization';

interface ListItem {
  id: string;
  path?: string;
  text1?: string;
  text2?: string;
}

interface Props {
  headerText1: string;
  headerText2: string;
  listItems?: ListItem[];
  isExpanded?: boolean;
  expandItemsDefault?: number;
  showMoreLabel?: string;
  showLessLabel?: string;
}

const renderListItems = (listItems: ListItem[]) =>
  listItems.map(({ id, path = '', text1, text2 }: ListItem) => (
    <ListItem key={`item-${id}`} to={path} text1={text1} text2={text2} />
  ));

const List: FC<Props> = ({
  listItems = [],
  headerText1,
  headerText2,
  isExpanded: isExpandedProp = false,
  expandItemsDefault = 10,
  showMoreLabel = localization.showMore,
  showLessLabel = localization.showLess
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedProp);
  const toggleExpansion = () => setIsExpanded(!isExpanded);
  return (
    <SC.List>
      <SC.ListHeader>
        <SC.HeaderText>{headerText1}</SC.HeaderText>
        <SC.HeaderText>{headerText2}</SC.HeaderText>
      </SC.ListHeader>
      {listItems &&
        renderListItems(
          isExpanded ? listItems : listItems.splice(0, expandItemsDefault)
        )}

      {listItems.length > expandItemsDefault && (
        <SC.Expansion onClick={toggleExpansion}>
          {isExpanded ? (
            <div>
              <SC.CollapseIcon />
              {showLessLabel}
            </div>
          ) : (
            <div>
              <SC.ExpandIcon />
              {showMoreLabel}
            </div>
          )}
        </SC.Expansion>
      )}
    </SC.List>
  );
};

export default memo(List);
