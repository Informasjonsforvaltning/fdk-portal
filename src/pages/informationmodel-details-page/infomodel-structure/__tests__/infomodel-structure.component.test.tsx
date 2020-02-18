import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import * as informationModelItem from './__fixtures/informationModelResponse.json';
import { InfoModelStructure } from '../infomodel-structure.component';

afterEach(cleanup);

describe('InfoModelStructure component', () => {
  it('should render with missing information model properties', () => {
    const container = shallow(
      <InfoModelStructure informationModelDocument={{ id: '123' }} />
    );
    expect(container).toMatchSnapshot();
  });
  it('should render with props', () => {
    const container = shallow(
      <InfoModelStructure informationModelDocument={informationModelItem} />
    );
    expect(container).toMatchSnapshot();
  });
});
