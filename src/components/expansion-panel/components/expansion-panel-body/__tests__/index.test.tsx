import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ExpansionPanelBody from '..';

afterEach(cleanup);

describe('ExpansionPanelBody component', () => {
  it('must not have a top level element', () => {
    const { container } = render(<ExpansionPanelBody />);

    expect(container).toBeEmptyDOMElement();
    expect(container.children).toHaveLength(0);
    expect(container.childNodes).toHaveLength(0);
  });

  it('must not render children if no children are provided', () => {
    const { container } = render(<ExpansionPanelBody />);

    expect(container).toBeEmptyDOMElement();
    expect(container.children).toHaveLength(0);
    expect(container.childNodes).toHaveLength(0);
  });

  it('must render single text child node correctly', () => {
    const text = 'text child';

    const { container } = render(
      <ExpansionPanelBody>{text}</ExpansionPanelBody>
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(container.children).toHaveLength(0);
    expect(container.childNodes).toHaveLength(1);
    expect(container).toHaveTextContent(text);
  });

  it('must render single element child node correctly', () => {
    const childTestId = 'child';

    const { container, getAllByTestId } = render(
      <ExpansionPanelBody>
        <div data-testid={childTestId}>child</div>
      </ExpansionPanelBody>
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(container.children).toHaveLength(1);
    expect(container.childNodes).toHaveLength(1);
    expect(getAllByTestId(childTestId)).toHaveLength(1);
  });

  it('must render multiple element child nodes correctly', () => {
    const childTestId = 'child';

    const { container, getAllByTestId } = render(
      <ExpansionPanelBody>
        <div data-testid={childTestId}>child 1</div>
        <div data-testid={childTestId}>child 2</div>
      </ExpansionPanelBody>
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(container.children).toHaveLength(2);
    expect(container.childNodes).toHaveLength(2);
    expect(getAllByTestId(childTestId)).toHaveLength(2);
  });

  it('must render text and element child nodes correctly', () => {
    const textBefore = 'text before';
    const textAfter = 'text after';
    const childTestId = 'child';

    const { container, getAllByTestId } = render(
      <ExpansionPanelBody>
        {textBefore}
        <div data-testid={childTestId}>child 1</div>
        <div data-testid={childTestId}>child 2</div>
        {textAfter}
      </ExpansionPanelBody>
    );

    expect(container).not.toBeEmptyDOMElement();
    expect(container.children).toHaveLength(2);
    expect(container.childNodes).toHaveLength(4);
    expect(container.firstChild!.textContent).toEqual(textBefore);
    expect(container.lastChild!.textContent).toEqual(textAfter);
    expect(getAllByTestId(childTestId)).toHaveLength(2);
  });
});
