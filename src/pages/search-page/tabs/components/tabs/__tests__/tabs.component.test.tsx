/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { Expectation } from '../../../../../../../test/utils';
import { Tabs } from '../../../tabs';

afterEach(cleanup);

describe('Tab component', () => {
  it(Expectation.STRUCTURE, () => {
    const container = shallow(<Tabs />);
    expect(container).toMatchSnapshot();
  });
});
