import qs from 'qs';
import { reportApiGet } from './host';
import { DataPoint } from '../../types';

export const getDatasetsTimeseries = (params: any = '') =>
  reportApiGet(
    `/timeseries/datasets${qs.stringify(params, { addQueryPrefix: true })}`
  );

export const extractLabelsAndData = (timeSeries: DataPoint[]) => {
  const timeSeriesLabels = timeSeries.map((entry: any) => entry.xAxis);
  const timeSeriesData = timeSeries.map((entry: any) => entry.yAxis);

  return {
    timeSeriesLabels,
    timeSeriesData
  };
};
