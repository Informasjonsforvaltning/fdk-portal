import React from 'react';
import { cleanup } from '@testing-library/react';

import { themeFDK as theme } from '../../../../../app/theme';

import { Expectation, renderWithTheme } from '../../../../../../test/utils';

import Detail from '..';

import testIds from '../test-ids';

afterEach(cleanup);

describe('Detail component', () => {
  it(Expectation.STRUCTURE, () => {
    const property = 'property';
    const textValue = 'value';
    const Component = () => <p>{textValue}</p>;

    const { getByTestId, rerender } = renderWithTheme(
      <Detail property={property} value={textValue} />,
      { theme }
    );

    let detailRootElement = getByTestId(testIds.root);
    let detailPropertyElement = getByTestId(testIds.property);
    let detailValueElement = getByTestId(testIds.value);

    expect(detailRootElement).toBeInTheDocument();
    expect(detailPropertyElement).toBeInTheDocument();
    expect(detailValueElement).toBeInTheDocument();
    expect(detailRootElement).toContainElement(detailPropertyElement);
    expect(detailRootElement).toContainElement(detailValueElement);
    expect(detailRootElement.children).toHaveLength(2);
    expect(detailRootElement.childNodes).toHaveLength(2);
    expect(detailRootElement.firstElementChild).toBe(detailPropertyElement);
    expect(detailRootElement.lastElementChild).toBe(detailValueElement);
    expect(detailPropertyElement).not.toBeEmptyDOMElement();
    expect(detailPropertyElement).toHaveTextContent(property);
    expect(detailValueElement).not.toBeEmptyDOMElement();
    expect(detailValueElement).toHaveTextContent(textValue);

    rerender(<Detail property={property} value={<Component />} />, { theme });

    detailRootElement = getByTestId(testIds.root);
    detailPropertyElement = getByTestId(testIds.property);
    detailValueElement = getByTestId(testIds.value);

    expect(detailRootElement).toBeInTheDocument();
    expect(detailPropertyElement).toBeInTheDocument();
    expect(detailValueElement).toBeInTheDocument();
    expect(detailRootElement).toContainElement(detailPropertyElement);
    expect(detailRootElement).toContainElement(detailValueElement);
    expect(detailRootElement.children).toHaveLength(2);
    expect(detailRootElement.childNodes).toHaveLength(2);
    expect(detailRootElement.firstElementChild).toBe(detailPropertyElement);
    expect(detailRootElement.lastElementChild).toBe(detailValueElement);
    expect(detailPropertyElement).not.toBeEmptyDOMElement();
    expect(detailPropertyElement).toHaveTextContent(property);
    expect(detailValueElement).not.toBeEmptyDOMElement();
    expect(detailValueElement).toHaveTextContent(textValue);
  });
});
