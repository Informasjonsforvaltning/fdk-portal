import React from 'react';
import { shallow } from 'enzyme';
import { ReportPagePure } from './report-page-pure';

test('should render ReportPagePure correctly', () => {
  const fetchPublishersIfNeeded = jest.fn();
  const wrapper = shallow(
    <ReportPagePure
      location={{ search: '' }}
      history={{ push: () => {} }}
      fetchPublishersIfNeeded={fetchPublishersIfNeeded}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
