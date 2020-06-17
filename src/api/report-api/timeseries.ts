import { reportApiGet } from './host';
import { DataPoint } from '../../types';

export const extractLabelsAndData = (timeSeries: DataPoint[]) => {
  if (!Array.isArray(timeSeries)) {
    return {};
  }

  const timeSeriesLabels = timeSeries.map(({ xAxis }) => xAxis);
  const timeSeriesData = timeSeries.map(({ yAxis }) => yAxis);

  return {
    timeSeriesLabels,
    timeSeriesData
  };
};

export const getDatasetsTimeseries = (params: any = '') =>
  reportApiGet('/timeseries/datasets', params).then(extractLabelsAndData);
