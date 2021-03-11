import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { SearchHitHead } from '../search-hit-head.component';
import { SearchTypes } from '../../../../../types/enums';

afterEach(cleanup);

describe('SearchHitHead component', () => {
  it('should render with properties', () => {
    const container = shallow(
      <SearchHitHead
        id='123'
        type={SearchTypes.dataset}
        title={{ nb: 'Test datasett' }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
