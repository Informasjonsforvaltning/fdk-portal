/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { App } from './app';

test('should render App correctly', () => {
  global.fetch = {};
  const wrapper = shallow(<App language='nb' onChangeLanguage={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});
