/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Breadcrumbs } from './breadcrumbs.component';

test('should render Breadcrumbs correctly', () => {
  const wrapper = shallow(
    <BrowserRouter>
      <Breadcrumbs />
    </BrowserRouter>
  );
  expect(wrapper).toMatchSnapshot();
});
