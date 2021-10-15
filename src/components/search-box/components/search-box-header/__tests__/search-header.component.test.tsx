/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import SearchBoxHeader from '../search-box-header.component';

afterEach(cleanup);

describe('SearchBoxHeader component', () => {
  it('must render single text child node correctly', () => {
    const text = 'text child';

    const { container } = render(<SearchBoxHeader>{text}</SearchBoxHeader>);

    expect(container).not.toBeEmptyDOMElement();
    expect(container.children).toHaveLength(1);
    expect(container.childNodes).toHaveLength(1);
    expect(container).toHaveTextContent(text);
  });
});
