import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { Expectation } from '../../../../test/utils';
import response from './mock-entities-response.json';
import SearchEntities from '../search-entities.component';
import { extractEntities } from '../../../api/search-fulltext-api/all-entities';

afterEach(cleanup);

describe('SearchEntities', () => {
  const entities = extractEntities(response);
  it(Expectation.STRUCTURE, () => {
    const container = shallow(<SearchEntities entities={entities} />);
    expect(container).toMatchSnapshot();
  });
});
