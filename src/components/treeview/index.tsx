import React, { FC, PropsWithChildren, useState } from 'react';
import SC from './styled';

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
    />
  );

  return (
    <div className={`tree-view ${treeViewClassName}`}>
      <div className={`tree-view_item ${itemClassName}`}>
        {arrow}
        {nodeLabel}
      </div>
      <div className={`${containerClassName} ${childrenClassName}`}>
        {isCollapsed ? null : children}
      </div>
    </div>
  );
};

export default TreeView;
