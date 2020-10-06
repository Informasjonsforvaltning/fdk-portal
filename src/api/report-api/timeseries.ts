import { reportApiGet } from './host';
import { DataPoint } from '../../types';

export const extractLabelsAndData = (timeSeries: DataPoint[]) => {
  if (!Array.isArray(timeSeries)) {
    return {};
  }

  const timeSeriesData = timeSeries.map(({ xAxis, yAxis }) => [
    Date.parse(xAxis),
    yAxis
  ]);

  return {
    timeSeriesData
  };
};

export const getDatasetsTimeseries = (params: any = '') =>
  reportApiGet('/timeseries/datasets', params).then(extractLabelsAndData);

export const getConceptsTimeseries = (params: any = '') =>
  reportApiGet('/timeseries/concepts', params).then(extractLabelsAndData);

export const getInformationModelsTimeseries = (params: any = '') =>
  reportApiGet('/timeseries/informationmodels', params).then(
    extractLabelsAndData
  );

export const getDataServicesTimeseries = (params: any = '') =>
  reportApiGet('/timeseries/dataservices', params).then(extractLabelsAndData);
