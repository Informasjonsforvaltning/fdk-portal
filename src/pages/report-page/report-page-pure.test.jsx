import React from 'react';
import { shallow } from 'enzyme';
import { ReportPagePure } from './report-page-pure';

test('should render ReportPagePure correctly', () => {
  const fetchPublishersIfNeeded = jest.fn();
  const fetchCatalogsIfNeeded = jest.fn();
  const wrapper = shallow(
    <ReportPagePure
      location={{ search: '' }}
      history={{ push: () => {} }}
      fetchCatalogsIfNeeded={fetchCatalogsIfNeeded}
      fetchPublishersIfNeeded={fetchPublishersIfNeeded}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
