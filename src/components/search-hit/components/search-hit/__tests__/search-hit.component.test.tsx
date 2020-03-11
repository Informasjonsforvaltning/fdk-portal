import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { SearchTypes } from '../../../../../types/enums';
import { SearchHit } from '../search-hit.component';

afterEach(cleanup);

describe('SearchHit component', () => {
  it('should render with properties', () => {
    const container = shallow(
      <SearchHit
        id="123"
        type={SearchTypes.dataset}
        title={{ nb: 'Test datasett' }}
        description={{ nb: 'Test datasett beskrivelse' }}
        publisher={{ uri: '111', id: '9999', name: 'Test direktorat' }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
