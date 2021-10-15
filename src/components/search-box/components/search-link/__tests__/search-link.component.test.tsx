/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import SearchLink from '../search-link.component';
import { Expectation } from '../../../../../../test/utils';
import { Entity } from '../../../../../types/enums';

afterEach(cleanup);

describe('SearchLink component', () => {
  it(Expectation.STRUCTURE, () => {
    const container = shallow(<SearchLink entity={Entity.DATASET} />);
    expect(container).toMatchSnapshot();
  });
});
