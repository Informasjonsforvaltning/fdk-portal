import React from 'react';
import { shallow } from 'enzyme';
import { ResultsConceptsPure } from './results-concepts.component';
import concepts from '../../../mock/concepts.response.json';
import {
  extractConceptAggregations,
  extractConcepts,
  extractConceptsTotal
} from '../../../api/search-fulltext-api/concepts';

test('should render ResultsConcepts correctly with minimum of props', () => {
  const result = shallow(<ResultsConceptsPure />);
  expect(result).toMatchSnapshot();
});

test('should render ResultsConcepts correctly with hits', () => {
  const props = {
    conceptItems: extractConcepts(concepts),
    conceptAggregations: extractConceptAggregations(concepts),
    conceptTotal: extractConceptsTotal(concepts)
  };

  const result = shallow(<ResultsConceptsPure {...props} />);
  expect(result).toMatchSnapshot();
});
