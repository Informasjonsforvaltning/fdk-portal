import React from 'react';
import { shallow } from 'enzyme';
import { HitsStats } from './hits-stats.component';

test('should render HitsStats correctly with hits ', () => {
  const defaultProps = {
    countDatasets: 100,
    countApis: 100,
    countTerms: 100,
    countInformationModels: 100
  };
  const wrapper = shallow(<HitsStats {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render HitsStats correctly when no hits', () => {
  const defaultProps = {
    countDatasets: 0,
    countApis: 0,
    countTerms: 0,
    countInformationModels: 0
  };
  const wrapper = shallow(<HitsStats {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
