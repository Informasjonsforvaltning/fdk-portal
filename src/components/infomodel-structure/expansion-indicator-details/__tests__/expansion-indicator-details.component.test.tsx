import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import ExpansionIndicatorDetails from '..';

afterEach(cleanup);

describe('ExpansionIndicatorDetails component', () => {
  it('should with isExpanded like true', () => {
    const container = shallow(<ExpansionIndicatorDetails isExpanded />);

    expect(container).toMatchSnapshot();
  });

  it('should with isExpanded like false', () => {
    const container = shallow(<ExpansionIndicatorDetails isExpanded={false} />);

    expect(container).toMatchSnapshot();
  });
});
