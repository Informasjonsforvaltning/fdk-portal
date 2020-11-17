import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { Expectation } from '../../../../../../../test/utils';
import { Tabs } from '../../../tabs';

afterEach(cleanup);

describe('Tab component', () => {
  const countDatasets = 100;
  const countApis = 200;
  const countConcepts = 300;
  const countInformationModels = 400;
  const countPublicServices = 500;

  it(Expectation.STRUCTURE, () => {
    const container = shallow(
      <Tabs
        countDatasets={countDatasets}
        countApis={countApis}
        countConcepts={countConcepts}
        countInformationModels={countInformationModels}
        countPublicServices={countPublicServices}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
