import React from 'react';
import { shallow } from 'enzyme';
import { ResultsDatasetPure } from './results-dataset.component';
import datasetsResponse from '../__fixtures/datasetsApiResponse.json';
import {
  extractDatasetAggregations,
  extractDatasets,
  extractDatasetsTotal
} from '../../../api/search-fulltext-api/datasets';

test('should render ResultsDataset correctly with minimum of props', () => {
  const result = shallow(<ResultsDatasetPure />);
  expect(result).toMatchSnapshot();
});

test('should render ResultsDataset correctly with hits', () => {
  const props = {
    datasetItems: extractDatasets(datasetsResponse?.hits),
    datasetAggregations: extractDatasetAggregations(datasetsResponse),
    datasetTotal: extractDatasetsTotal(datasetsResponse)
  };
  const result = shallow(<ResultsDatasetPure {...props} />);
  expect(result).toMatchSnapshot();
});
