import React from 'react';
import { shallow } from 'enzyme';
import { DataServiceDetailsPage } from './data-service-details-page';
import dataServiceItemComplete from '../../mock/api.response.json';
import { dataServiceItemMissingFields } from './__fixtures/dataServiceItemMissingFields';

test('should render DataServiceDetailsPage correctly with no dataServiceItem', () => {
  const wrapper = shallow(<DataServiceDetailsPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should render DataServiceDetailsPage correctly with dataServiceItem', () => {
  const wrapper = shallow(
    <DataServiceDetailsPage
      dataServiceItem={dataServiceItemComplete}
      isFetchingDataset={false}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should render DataServiceDetailsPage correctly with missing api-properties', () => {
  const wrapper = shallow(
    <DataServiceDetailsPage
      dataServiceItem={dataServiceItemMissingFields}
      isFetchingDataset={false}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
