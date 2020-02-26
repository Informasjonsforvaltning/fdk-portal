import React, {
  memo,
  FC,
  isValidElement,
  Children,
  useState,
  useEffect,
  HTMLAttributes
} from 'react';

import ExpansionPanelHead from '../expansion-panel-head';
import ExpansionPanelBody from '../expansion-panel-body';

import SC from './styled';

import testIds from './test-ids';

export interface ExpansionIndicator {
  expand: JSX.Element;
  collapse: JSX.Element;
}

export interface Props extends HTMLAttributes<HTMLElement> {
  isExpanded?: boolean;
  shouldExpandOnHeadClick?: boolean;
  expansionIndicator?: ExpansionIndicator;
}

const ExpansionPanel: FC<Props> = ({
  isExpanded: isExpandedProp = false,
  shouldExpandOnHeadClick = true,
  expansionIndicator,
  onClick,
  children,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedProp);

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  useEffect(() => setIsExpanded(isExpandedProp), [isExpandedProp]);

  const renderExpansionPanelHeadChildren = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === ExpansionPanelHead ? child : null
    )?.shift();

  const renderExpansionPanelBodyChildren = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === ExpansionPanelBody ? child : null
    )?.shift();

  return (
    <SC.ExpansionPanel {...props} data-testid={testIds.root}>
      <SC.Head
        onClick={
          shouldExpandOnHeadClick ? onClick ?? toggleExpansion : undefined
        }
        shouldExpandOnHeadClick={shouldExpandOnHeadClick}
        data-testid={testIds.head}
      >
        <SC.HeadContent data-testid={testIds.headContent}>
          {renderExpansionPanelHeadChildren()}
        </SC.HeadContent>
        <SC.HeadExpansionIndicator
          data-testid={testIds.headExpansionIndicator}
          onClick={
            !shouldExpandOnHeadClick ? onClick ?? toggleExpansion : undefined
          }
        >
          {expansionIndicator &&
            (isExpanded
              ? expansionIndicator.collapse
              : expansionIndicator.expand)}
          {!expansionIndicator &&
            (isExpanded ? <SC.CollapseIcon /> : <SC.ExpandIcon />)}
        </SC.HeadExpansionIndicator>
      </SC.Head>
      {isExpanded && (
        <SC.Body data-testid={testIds.body}>
          {renderExpansionPanelBodyChildren()}
        </SC.Body>
      )}
    </SC.ExpansionPanel>
  );
};

export default memo(ExpansionPanel);
