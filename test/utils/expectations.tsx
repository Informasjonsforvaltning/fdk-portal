import React, { ComponentType } from 'react';
import { render } from '@testing-library/react';

import * as renderers from './renderers';

type Renderer = typeof renderers[keyof typeof renderers] | typeof render;

interface StyleRule {
  property: string;
  value: string;
  options?: { media?: string; modifier?: string; supports?: string };
}

export const expectCorrectRootElement = (
  Component: ComponentType,
  tagName: string,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  const { container } = renderer(<Component />, renderOptions);

  expect(container).not.toBeEmptyDOMElement();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild!.tagName.toLowerCase()).toEqual(
    tagName.toLowerCase()
  );
};

export const expectNoChildren = (
  Component: ComponentType,
  hasRootElement: boolean = true,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  const { container } = renderer(<Component />, renderOptions);

  if (hasRootElement) {
    expect(container).not.toBeEmptyDOMElement();
    expect(container.children).toHaveLength(1);
    expect(container.childNodes).toHaveLength(1);
    expect(container.firstElementChild).not.toBeNull();
    expect(container.firstElementChild).toBeEmptyDOMElement();
    expect(container.firstElementChild!.children).toHaveLength(0);
    expect(container.firstElementChild!.childNodes).toHaveLength(0);
  } else {
    expect(container).toBeEmptyDOMElement();
    expect(container.children).toHaveLength(0);
    expect(container.childNodes).toHaveLength(0);
  }
};

export const expectSingleTextChild = (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  const text = 'text child';

  const { container } = renderer(<Component>{text}</Component>, renderOptions);

  expect(container).not.toBeEmptyDOMElement();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild).not.toBeNull();
  expect(container.firstElementChild).not.toBeEmptyDOMElement();
  expect(container.firstElementChild!.children).toHaveLength(0);
  expect(container.firstElementChild!.childNodes).toHaveLength(1);
  expect(container.firstElementChild).toHaveTextContent(text);
};

export const expectSingleElementChild = (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  const childTestId = 'child';

  const { container, getByTestId } = renderer(
    <Component>
      <div data-testid={childTestId}>child</div>
    </Component>,
    renderOptions
  );

  expect(container).not.toBeEmptyDOMElement();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild).not.toBeNull();
  expect(container.firstElementChild).not.toBeEmptyDOMElement();
  expect(container.firstElementChild!.children).toHaveLength(1);
  expect(container.firstElementChild!.childNodes).toHaveLength(1);
  expect(getByTestId(childTestId)).not.toBeNull();
};

export const expectMultipleElementChildren = (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  const childTestId = 'child';

  const { container, getAllByTestId } = renderer(
    <Component>
      <div data-testid={childTestId}>child 1</div>
      <div data-testid={childTestId}>child 2</div>
    </Component>,
    renderOptions
  );

  expect(container).not.toBeEmptyDOMElement();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild).not.toBeNull();
  expect(container.firstElementChild).not.toBeEmptyDOMElement();
  expect(container.firstElementChild!.children).toHaveLength(2);
  expect(container.firstElementChild!.childNodes).toHaveLength(2);
  expect(getAllByTestId(childTestId)).toHaveLength(2);
};

export const expectTextAndElementChildren = (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  const textBefore = 'text before';
  const textAfter = 'text after';
  const childTestId = 'child';

  const { container, getAllByTestId } = renderer(
    <Component>
      {textBefore}
      <div data-testid={childTestId}>child 1</div>
      <div data-testid={childTestId}>child 2</div>
      {textAfter}
    </Component>,
    renderOptions
  );

  expect(container).not.toBeEmptyDOMElement();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild).not.toBeNull();
  expect(container.firstElementChild).not.toBeEmptyDOMElement();
  expect(container.firstElementChild!.children).toHaveLength(2);
  expect(container.firstElementChild!.childNodes).toHaveLength(4);
  expect(container.firstElementChild!.firstChild!.textContent).toEqual(
    textBefore
  );
  expect(container.firstElementChild!.lastChild!.textContent).toEqual(
    textAfter
  );
  expect(getAllByTestId(childTestId)).toHaveLength(2);
};

export const expectStyleRules = (
  Component: ComponentType,
  styleRules: StyleRule[],
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  const { container } = renderer(<Component />, renderOptions);

  styleRules.forEach(({ property, value, options }) =>
    (expect(container.firstElementChild) as any).toHaveStyleRule(
      property,
      value,
      options
    )
  );
};
