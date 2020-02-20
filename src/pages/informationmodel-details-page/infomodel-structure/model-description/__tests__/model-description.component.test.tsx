import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';

import { Description } from '../model-description.component';
import { ModelDescription } from '../../../../../types';

afterEach(cleanup);

describe('Description component', () => {
  it('should render with all props', () => {
    const modelDescription: Partial<ModelDescription> = {
      description: { nb: 'test description' },
      identifier: 'test identifier',
      belongsToModule: 'test inntekt',
      concept: {
        anbefaltTerm: { nb: 'anbefaltTerm' },
        definition: { nb: 'definition' },
        conceptReference: 'conceptReference'
      }
    };
    const container = shallow(
      <Description modelDescription={modelDescription} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with some missing props', () => {
    const modelDescription: Partial<ModelDescription> = {
      description: { nb: 'test description' },

      belongsToModule: 'test inntekt',
      concept: {
        anbefaltTerm: { nb: 'anbefaltTerm' }
      }
    };
    const container = shallow(
      <Description modelDescription={modelDescription} />
    );
    expect(container).toMatchSnapshot();
  });
});
