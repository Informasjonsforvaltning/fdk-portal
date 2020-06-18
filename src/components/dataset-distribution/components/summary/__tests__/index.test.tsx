import React from 'react';
import { cleanup } from '@testing-library/react';

import { themeFDK as theme } from '../../../../../app/theme';

import { Expectation, renderWithTheme } from '../../../../../../test/utils';

import Summary from '..';

import testIds from '../test-ids';

import { DataFormat } from '../../../../../types/enums';

afterEach(cleanup);

describe('Summary component', () => {
  it(Expectation.STRUCTURE, () => {
    const title = 'title';
    const formats: DataFormat[] = [
      DataFormat.JSON,
      DataFormat.XML,
      DataFormat.CSV,
      DataFormat.UNKNOWN
    ];

    const {
      getByTestId,
      getAllByTestId,
      queryAllByTestId,
      rerender
    } = renderWithTheme(<Summary title={title} formats={[]} />, { theme });

    let summaryRootElement = getByTestId(testIds.root);
    let summaryTitleElement = getByTestId(testIds.title);
    let summaryFormatsElement = getByTestId(testIds.formats);
    let summaryFormatElements = queryAllByTestId(testIds.format);

    expect(summaryRootElement).toBeInTheDocument();
    expect(summaryTitleElement).toBeInTheDocument();
    expect(summaryFormatsElement).toBeInTheDocument();
    expect(summaryFormatElements).toHaveLength(0);
    expect(summaryRootElement).toContainElement(summaryTitleElement);
    expect(summaryRootElement).toContainElement(summaryFormatsElement);
    expect(summaryRootElement.children).toHaveLength(2);
    expect(summaryRootElement.childNodes).toHaveLength(2);
    expect(summaryRootElement.firstElementChild).toBe(summaryTitleElement);
    expect(summaryRootElement.lastElementChild).toBe(summaryFormatsElement);
    expect(summaryTitleElement).not.toBeEmptyDOMElement();
    expect(summaryTitleElement).toHaveTextContent(title);
    expect(summaryFormatsElement).toBeEmptyDOMElement();

    rerender(<Summary title={title} formats={formats} />, { theme });

    summaryRootElement = getByTestId(testIds.root);
    summaryTitleElement = getByTestId(testIds.title);
    summaryFormatsElement = getByTestId(testIds.formats);
    summaryFormatElements = getAllByTestId(testIds.format);

    expect(summaryRootElement).toBeInTheDocument();
    expect(summaryTitleElement).toBeInTheDocument();
    expect(summaryFormatsElement).toBeInTheDocument();
    expect(summaryFormatElements).toHaveLength(formats.length);
    expect(summaryRootElement).toContainElement(summaryTitleElement);
    expect(summaryRootElement).toContainElement(summaryFormatsElement);
    expect(summaryRootElement.children).toHaveLength(2);
    expect(summaryRootElement.childNodes).toHaveLength(2);
    expect(summaryRootElement.firstElementChild).toBe(summaryTitleElement);
    expect(summaryRootElement.lastElementChild).toBe(summaryFormatsElement);
    expect(summaryTitleElement).not.toBeEmptyDOMElement();
    expect(summaryTitleElement).toHaveTextContent(title);
    expect(summaryFormatsElement).not.toBeEmptyDOMElement();

    summaryFormatElements.forEach(element => {
      expect(summaryFormatsElement).toContainElement(element);
      expect(element).not.toBeEmptyDOMElement();
      expect(element.children).toHaveLength(1);
      expect(element.childNodes).toHaveLength(1);
      expect(element.firstElementChild?.tagName.toLowerCase()).toEqual('svg');
    });
  });
});
