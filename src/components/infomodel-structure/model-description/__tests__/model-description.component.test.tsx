/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import Description from '..';
import { TextLanguage } from '../../../../types';

afterEach(cleanup);

describe('Description component', () => {
  it('should render with all props', () => {
    const description: Partial<TextLanguage> = {
      nb: 'test description'
    };

    const container = shallow(<Description description={description} />);

    expect(container).toMatchSnapshot();
  });
});
