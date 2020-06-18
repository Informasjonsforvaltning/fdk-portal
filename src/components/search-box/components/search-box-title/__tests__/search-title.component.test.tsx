import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Title from '../search-box-title.component';

afterEach(cleanup);

describe('Title component', () => {
  it('must render single text child node correctly', () => {
    const text = 'text child';

    const { container } = render(<Title>{text}</Title>);

    expect(container).not.toBeEmptyDOMElement();
    expect(container.children).toHaveLength(1);
    expect(container.childNodes).toHaveLength(1);
    expect(container).toHaveTextContent(text);
  });
});
