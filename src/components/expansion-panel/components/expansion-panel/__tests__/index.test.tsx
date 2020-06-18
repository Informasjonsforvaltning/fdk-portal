import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import ExpansionPanel, { ExpansionIndicator } from '..';
import ExpansionPanelHead from '../../expansion-panel-head';
import ExpansionPanelBody from '../../expansion-panel-body';

import testIds from '../test-ids';

afterEach(cleanup);

describe('ExpansionPanel component', () => {
  it('must render correct structure if no children are provided', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel />
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(<ExpansionPanel isExpanded />);

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
  });

  it('must render correct structure if a single text child is provided', () => {
    const text = 'text child';

    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>{text}</ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(<ExpansionPanel isExpanded />);

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
  });

  it('must render correct structure if a single element child is provided', () => {
    const childTestId = 'child';

    const {
      container,
      getByTestId,
      queryByTestId,
      queryAllByTestId,
      rerender
    } = render(
      <ExpansionPanel>
        <div data-testid={childTestId}>child</div>
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(queryAllByTestId(childTestId)).toHaveLength(0);

    rerender(<ExpansionPanel isExpanded />);

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(queryAllByTestId(childTestId)).toHaveLength(0);
  });

  it('must render correct structure if multiple element children are provided', () => {
    const childTestId = 'child';

    const {
      container,
      getByTestId,
      queryByTestId,
      queryAllByTestId,
      rerender
    } = render(
      <ExpansionPanel>
        <div data-testid={childTestId}>child 1</div>
        <div data-testid={childTestId}>child 2</div>
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(queryAllByTestId(childTestId)).toHaveLength(0);

    rerender(<ExpansionPanel isExpanded />);

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(queryAllByTestId(childTestId)).toHaveLength(0);
  });

  it('must render correct structure if text and element children are provided', () => {
    const textBefore = 'text before';
    const textAfter = 'text after';
    const childTestId = 'child';

    const {
      container,
      getByTestId,
      queryByTestId,
      queryAllByTestId,
      rerender
    } = render(
      <ExpansionPanel>
        {textBefore}
        <div data-testid={childTestId}>child 1</div>
        <div data-testid={childTestId}>child 2</div>
        {textAfter}
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(queryAllByTestId(childTestId)).toHaveLength(0);

    rerender(<ExpansionPanel isExpanded />);

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(queryAllByTestId(childTestId)).toHaveLength(0);
  });

  it('must render correct structure if a single empty ExpansionPanelHead child is provided', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>
        <ExpansionPanelHead />
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelHead />
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
  });

  it('must render correct structure if a single non-empty ExpansionPanelHead child is provided', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>
        <ExpansionPanelHead>Head</ExpansionPanelHead>
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelHead>Head</ExpansionPanelHead>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
  });

  it('must render correct structure if multiple ExpansionPanelHead children are provided', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>
        <ExpansionPanelHead>Head 1</ExpansionPanelHead>
        <ExpansionPanelHead>Head 2</ExpansionPanelHead>
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadContentElement).toHaveTextContent('Head 1');
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelHead>Head 1</ExpansionPanelHead>
        <ExpansionPanelHead>Head 2</ExpansionPanelHead>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadContentElement).toHaveTextContent('Head 1');
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
  });

  it('must render correct structure if a single empty ExpansionPanelBody child is provided', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>
        <ExpansionPanelBody />
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelBody />
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
  });

  it('must render correct structure if a single non-empty ExpansionPanelBody child is provided', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>
        <ExpansionPanelBody>Body</ExpansionPanelBody>
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelBody>Body</ExpansionPanelBody>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelBodyElement).not.toBeEmptyDOMElement();
  });

  it('must render correct structure if multiple ExpanseionPanelBody children are provided', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>
        <ExpansionPanelBody>Body 1</ExpansionPanelBody>
        <ExpansionPanelBody>Body 2</ExpansionPanelBody>
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelBody>Body 1</ExpansionPanelBody>
        <ExpansionPanelBody>Body 2</ExpansionPanelBody>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelBodyElement).not.toBeEmptyDOMElement();
    expect(expansionPanelBodyElement).toHaveTextContent('Body 1');
  });

  it('must render correct structure if a single ExpansionPanelHead child and a single ExpanseionPanelBody child are provided in any order', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>
        <ExpansionPanelHead>Head</ExpansionPanelHead>
        <ExpansionPanelBody>Body</ExpansionPanelBody>
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelHead>Head</ExpansionPanelHead>
        <ExpansionPanelBody>Body</ExpansionPanelBody>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelBodyElement).not.toBeEmptyDOMElement();

    rerender(
      <ExpansionPanel>
        <ExpansionPanelBody>Body</ExpansionPanelBody>
        <ExpansionPanelHead>Head</ExpansionPanelHead>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = queryByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelBody>Body</ExpansionPanelBody>
        <ExpansionPanelHead>Head</ExpansionPanelHead>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelBodyElement).not.toBeEmptyDOMElement();
  });

  it('must render correct structure if multiple ExpansionPanelHead children and multiple ExpanseionPanelBody children are provided in any order', () => {
    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel>
        <ExpansionPanelHead>Head 1</ExpansionPanelHead>
        <ExpansionPanelHead>Head 2</ExpansionPanelHead>
        <ExpansionPanelBody>Body 1</ExpansionPanelBody>
        <ExpansionPanelBody>Body 2</ExpansionPanelBody>
      </ExpansionPanel>
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelHead>Head 1</ExpansionPanelHead>
        <ExpansionPanelHead>Head 2</ExpansionPanelHead>
        <ExpansionPanelBody>Body 1</ExpansionPanelBody>
        <ExpansionPanelBody>Body 2</ExpansionPanelBody>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelBodyElement).not.toBeEmptyDOMElement();
    expect(expansionPanelBodyElement).toHaveTextContent('Body 1');

    rerender(
      <ExpansionPanel>
        <ExpansionPanelBody>Body 2</ExpansionPanelBody>
        <ExpansionPanelBody>Body 1</ExpansionPanelBody>
        <ExpansionPanelHead>Head 1</ExpansionPanelHead>
        <ExpansionPanelHead>Head 2</ExpansionPanelHead>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = queryByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadContentElement).toHaveTextContent('Head 1');
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );

    rerender(
      <ExpansionPanel isExpanded>
        <ExpansionPanelBody>Body 2</ExpansionPanelBody>
        <ExpansionPanelBody>Body 1</ExpansionPanelBody>
        <ExpansionPanelHead>Head 1</ExpansionPanelHead>
        <ExpansionPanelHead>Head 2</ExpansionPanelHead>
      </ExpansionPanel>
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadContentElement).toHaveTextContent('Head 1');
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelBodyElement).not.toBeEmptyDOMElement();
    expect(expansionPanelBodyElement).toHaveTextContent('Body 2');
  });

  it('must not be expanded by default', () => {
    const { container, getByTestId, queryByTestId } = render(
      <ExpansionPanel />
    );

    const expansionPanelRootElement = getByTestId(testIds.root);
    const expansionPanelHeadElement = getByTestId(testIds.head);
    const expansionPanelBodyElement = queryByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
  });

  it('must be expanded when explicity specified', () => {
    const { container, getByTestId } = render(<ExpansionPanel isExpanded />);

    const expansionPanelRootElement = getByTestId(testIds.root);
    const expansionPanelHeadElement = getByTestId(testIds.head);
    const expansionPanelBodyElement = getByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
  });

  it('must be able to expand and collapse if not expanded initially', () => {
    const { container, getByTestId, queryByTestId } = render(
      <ExpansionPanel />
    );

    const expansionPanelRootElement = getByTestId(testIds.root);
    const expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);

    fireEvent.click(expansionPanelHeadElement);

    expansionPanelBodyElement = getByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);

    fireEvent.click(expansionPanelHeadElement);

    expansionPanelBodyElement = queryByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
  });

  it('must be able to collapse and expand if expanded initially', () => {
    const { container, getByTestId, queryByTestId } = render(
      <ExpansionPanel isExpanded />
    );

    const expansionPanelRootElement = getByTestId(testIds.root);
    const expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = getByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);

    fireEvent.click(expansionPanelHeadElement);

    expansionPanelBodyElement = queryByTestId(testIds.body) as any;

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);

    fireEvent.click(expansionPanelHeadElement);

    expansionPanelBodyElement = getByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
  });

  it('must not react to click events on expansion panel head if requested', () => {
    const { container, getByTestId, queryByTestId, asFragment } = render(
      <ExpansionPanel shouldExpandOnHeadClick={false} />
    );

    const expansionPanelRootElement = getByTestId(testIds.root);
    const expansionPanelHeadElement = getByTestId(testIds.head);
    const expansionPanelBodyElement = queryByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);

    fireEvent.click(expansionPanelHeadElement);

    expect(expansionPanelRootElement).toContainHTML(
      asFragment().firstElementChild!.outerHTML
    );

    fireEvent.click(expansionPanelHeadElement);

    expect(expansionPanelRootElement).toContainHTML(
      asFragment().firstElementChild!.outerHTML
    );
  });

  it('must render expansion indicator if provided', () => {
    const expandIndicatorTestId = 'expand-indicator';
    const collapseIndicatorTestId = 'collapse-indicator';

    const expandIndicatorText = 'Expand';
    const collapseIndicatorText = 'Collapse';

    const expansionIndicator: ExpansionIndicator = {
      expand: (
        <span data-testid={expandIndicatorTestId}>{expandIndicatorText}</span>
      ),
      collapse: (
        <span data-testid={collapseIndicatorTestId}>
          {collapseIndicatorText}
        </span>
      )
    };

    const { container, getByTestId, queryByTestId, rerender } = render(
      <ExpansionPanel expansionIndicator={expansionIndicator} />
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toContainElement(
      getByTestId(expandIndicatorTestId)
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toHaveTextContent(
      expandIndicatorText
    );
    expect(queryByTestId(collapseIndicatorTestId)).toBeNull();

    rerender(
      <ExpansionPanel isExpanded expansionIndicator={expansionIndicator} />
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toContainElement(
      getByTestId(collapseIndicatorTestId)
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toHaveTextContent(
      collapseIndicatorText
    );
    expect(queryByTestId(expandIndicatorTestId)).toBeNull();
  });

  it('must react to click events on expansion indicator if click events on expansion panel head are disabled', () => {
    const expandIndicatorTestId = 'expand-indicator';
    const collapseIndicatorTestId = 'collapse-indicator';

    const expandIndicatorText = 'Expand';
    const collapseIndicatorText = 'Collapse';

    const expansionIndicator: ExpansionIndicator = {
      expand: (
        <span data-testid={expandIndicatorTestId}>{expandIndicatorText}</span>
      ),
      collapse: (
        <span data-testid={collapseIndicatorTestId}>
          {collapseIndicatorText}
        </span>
      )
    };

    const {
      container,
      getByTestId,
      queryByTestId,
      asFragment,
      rerender
    } = render(
      <ExpansionPanel
        shouldExpandOnHeadClick={false}
        expansionIndicator={expansionIndicator}
      />
    );

    let expansionPanelRootElement = getByTestId(testIds.root);
    let expansionPanelHeadElement = getByTestId(testIds.head);
    let expansionPanelBodyElement = queryByTestId(testIds.body);
    let expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    let expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toContainElement(
      getByTestId(expandIndicatorTestId)
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toHaveTextContent(
      expandIndicatorText
    );
    expect(queryByTestId(collapseIndicatorTestId)).toBeNull();

    fireEvent.click(expansionPanelHeadElement);

    expect(expansionPanelRootElement).toContainHTML(
      asFragment().firstElementChild!.outerHTML
    );

    fireEvent.click(expansionPanelHeadElement);

    expect(expansionPanelRootElement).toContainHTML(
      asFragment().firstElementChild!.outerHTML
    );

    fireEvent.click(expansionPanelHeadExpansionIndicatorElement);

    expansionPanelBodyElement = getByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toContainElement(
      getByTestId(collapseIndicatorTestId)
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toHaveTextContent(
      collapseIndicatorText
    );
    expect(queryByTestId(expandIndicatorTestId)).toBeNull();

    fireEvent.click(expansionPanelHeadExpansionIndicatorElement);

    expect(expansionPanelRootElement).toContainHTML(
      asFragment().firstElementChild!.outerHTML
    );

    rerender(
      <ExpansionPanel
        isExpanded
        shouldExpandOnHeadClick={false}
        expansionIndicator={expansionIndicator}
      />
    );

    expansionPanelRootElement = getByTestId(testIds.root);
    expansionPanelHeadElement = getByTestId(testIds.head);
    expansionPanelBodyElement = getByTestId(testIds.body);
    expansionPanelHeadContentElement = getByTestId(testIds.headContent);
    expansionPanelHeadExpansionIndicatorElement = getByTestId(
      testIds.headExpansionIndicator
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeDefined();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(2);
    expect(expansionPanelRootElement.childNodes).toHaveLength(2);
    expect(expansionPanelRootElement.firstElementChild).toEqual(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement.lastElementChild).toEqual(
      expansionPanelBodyElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toContainElement(
      getByTestId(collapseIndicatorTestId)
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toHaveTextContent(
      collapseIndicatorText
    );
    expect(queryByTestId(expandIndicatorTestId)).toBeNull();

    fireEvent.click(expansionPanelHeadElement);

    expect(expansionPanelRootElement).toContainHTML(
      asFragment().firstElementChild!.outerHTML
    );

    fireEvent.click(expansionPanelHeadElement);

    expect(expansionPanelRootElement).toContainHTML(
      asFragment().firstElementChild!.outerHTML
    );

    fireEvent.click(expansionPanelHeadExpansionIndicatorElement);

    expansionPanelBodyElement = queryByTestId(testIds.body);

    expect(container).not.toBeEmptyDOMElement();
    expect(expansionPanelRootElement).toBeDefined();
    expect(expansionPanelHeadElement).toBeDefined();
    expect(expansionPanelBodyElement).toBeNull();
    expect(expansionPanelHeadContentElement).toBeDefined();
    expect(expansionPanelHeadExpansionIndicatorElement).toBeDefined();
    expect(expansionPanelRootElement).toContainElement(
      expansionPanelHeadElement
    );
    expect(expansionPanelRootElement).not.toContainElement(
      expansionPanelBodyElement
    );
    expect(expansionPanelRootElement.children).toHaveLength(1);
    expect(expansionPanelRootElement.childNodes).toHaveLength(1);
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadContentElement
    );
    expect(expansionPanelHeadElement).toContainElement(
      expansionPanelHeadExpansionIndicatorElement
    );
    expect(expansionPanelHeadElement.children).toHaveLength(2);
    expect(expansionPanelHeadElement.childNodes).toHaveLength(2);
    expect(expansionPanelHeadContentElement).toBeEmptyDOMElement();
    expect(
      expansionPanelHeadExpansionIndicatorElement
    ).not.toBeEmptyDOMElement();
    expect(expansionPanelHeadExpansionIndicatorElement.children).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement.childNodes).toHaveLength(
      1
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toContainElement(
      getByTestId(expandIndicatorTestId)
    );
    expect(expansionPanelHeadExpansionIndicatorElement).toHaveTextContent(
      expandIndicatorText
    );
    expect(queryByTestId(collapseIndicatorTestId)).toBeNull();

    fireEvent.click(expansionPanelHeadExpansionIndicatorElement);

    expect(expansionPanelRootElement).toContainHTML(
      asFragment().firstElementChild!.outerHTML
    );
  });
});
