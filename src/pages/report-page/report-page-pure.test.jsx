/**
 * @jest-environment jsdom
 */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { ReportPagePure } from './report-page-pure';

test('should render ReportPagePure correctly', () => {
  const fetchPublishersIfNeeded = jest.fn();
  const wrapper = shallow(
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <ReportPagePure
        location={{ search: '' }}
        history={{ push: () => {} }}
        fetchPublishersIfNeeded={fetchPublishersIfNeeded}
      />
    </MemoryRouter>
  );
  expect(wrapper).toMatchSnapshot();
});
