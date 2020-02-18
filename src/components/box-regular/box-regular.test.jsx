import React from 'react';
import { shallow } from 'enzyme';
import { BoxRegular } from './box-regular.component';
import { findByTestId, testIds } from '../../../test/utils/testIds';

function setup() {
  const wrapper = shallow(<BoxRegular />);
  return wrapper;
}

describe('Header component', () => {
  let wrapper;

  it('should render without error', () => {
    wrapper = setup();
    const component = findByTestId(wrapper, testIds.boxRegular.component);
    expect(component.length).toBe(1);
  });
});
