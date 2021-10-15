/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { Expectation } from '../../../../../../../test/utils';
import { Tab } from '../../../tabs';

afterEach(cleanup);

describe('Tab component', () => {
  const tabLink = { pathname: '/datasets', search: '' };
  const label = 'Tab for datasett';
  it(Expectation.STRUCTURE, () => {
    const container = shallow(<Tab active tabLink={tabLink} label={label} />);
    expect(container).toMatchSnapshot();
  });
  it(Expectation.STRUCTURE, () => {
    const container = shallow(
      <Tab active={false} tabLink={tabLink} label={label} />
    );
    expect(container).toMatchSnapshot();
  });
});
