import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import Footer from '../footer.component';
import { Expectation } from '../../../../test/utils';

afterEach(cleanup);

describe('Footer component', () => {
  it(Expectation.STRUCTURE, () => {
    const container = shallow(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
