import React from 'react';
import { shallow } from 'enzyme';
import { PureDataServiceBreadcrumb } from './data-service-breadcrumb';

test('should render PureDataServiceBreadcrumb with data service active correctly', () => {
  const defaultProps = {
    dataServiceItem: {
      title: 'Data service title'
    }
  };
  const wrapper = shallow(<PureDataServiceBreadcrumb {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render PureDataServiceBreadcrumb correctly with no dataServiceItem', () => {
  const defaultProps = {};
  const wrapper = shallow(<PureDataServiceBreadcrumb {...defaultProps} />);
  expect(wrapper).toMatchSnapshot();
});
