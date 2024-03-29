/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import InfoModelStructure from '..';

import * as informationModel from './__fixtures/informationModelResponse.json';

afterEach(cleanup);

describe('InfoModelStructure component', () => {
  it('should render with missing information model properties', () => {
    const container = shallow(
      <InfoModelStructure
        modelElements={{}}
        modelProperties={{}}
        concepts={[]}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with props', () => {
    const container = shallow(
      <InfoModelStructure {...informationModel} concepts={[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
