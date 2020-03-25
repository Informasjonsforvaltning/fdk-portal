import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import SearchForm from '../search-form.component';
import { Expectation } from '../../../../../../test/utils';

afterEach(cleanup);

describe('SearchFormPure component', () => {
  it(Expectation.STRUCTURE, () => {
    const container = shallow(<SearchForm />);
    expect(container).toMatchSnapshot();
  });
});
