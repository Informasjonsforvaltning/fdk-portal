import React, { useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import _ from 'lodash';

import SC from './styled';
import localization from '../../lib/localization';

interface Props {
  defaultCollapsed?: boolean;
  nodeLabel: any;
  className?: string;
  itemClassName?: string;
  childrenClassName?: string;
  treeViewClassName?: string;
  onClick?: any;
}

const TreeView: FC<PropsWithChildren<Props>> = ({
  className = '',
  itemClassName = '',
  treeViewClassName = '',
  childrenClassName = '',
  nodeLabel,
  children,
  defaultCollapsed = true,
  onClick,
  ...rest
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const collapsedId = _.uniqueId('treeview-collapsed');

  const handleClick = (...args: any[]) => {
    setIsCollapsed(!isCollapsed);
    if (onClick) {
      onClick(...args);
    }
  };

  let arrowClassName = 'tree-view_arrow';
  let containerClassName = 'tree-view_children';
  if (isCollapsed) {
    arrowClassName += ' tree-view_arrow-collapsed';
    containerClassName += ' tree-view_children-collapsed';
  }

  const arrow = (
    <SC.CollapseButton
      {...rest}
      type='button'
      className={`${className} ${arrowClassName}`}
      onClick={handleClick}
      aria-expanded={!isCollapsed}
      aria-controls={collapsedId}
      aria-label={
        isCollapsed
          ? `${localization.open} ${localization.filter}`
          : `${localization.close} ${localization.filter}`
      }
    >
      <SC.ChevronUpIcon />
    </SC.CollapseButton>
  );

  return (
    <div className={`tree-view ${treeViewClassName}`}>
      <div className={`tree-view_item ${itemClassName}`}>
        {arrow}
        {nodeLabel}
      </div>
      <div
        className={`${containerClassName} ${childrenClassName}`}
        id={collapsedId}
      >
        {isCollapsed ? null : children}
      </div>
    </div>
  );
};

export default TreeView;
