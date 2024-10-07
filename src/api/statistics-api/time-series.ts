import { statisticsApiPost } from './host';
import type { TimeSeriesPoint, TimeSeriesRequest } from '../../types';
import { getConfig } from '../../config';

const timeSeriesBody = (
  resourceType: string,
  orgPath: string | undefined
): TimeSeriesRequest => {
  let start = '2023-02-01';
  if (resourceType === 'DATASET') {
    start = '2022-11-01';
  }
  if (resourceType === 'INFORMATION_MODEL') {
    start = '2024-01-01';
  }
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 12)
    .toISOString()
    .split('T')[0];
  const body: TimeSeriesRequest = {
    start,
    end: firstDayOfMonth,
    interval: 'MONTH',
    filters: {
      resourceType: { value: resourceType },
      orgPath: null,
      transport: null
    }
  };

  if (orgPath !== undefined) {
    body.filters.orgPath = { value: orgPath };
  }

  if (getConfig().isNapProfile) {
    body.filters.transport = { value: true };
  }

  return body;
};

const extractLabelsAndData = (
  timeSeries: Partial<TimeSeriesPoint> | null
): number[][] => {
  let timeSeriesData: number[][] = [];
  if (Array.isArray(timeSeries)) {
    timeSeriesData = timeSeries.map(({ date, count }) => [
      Date.parse(date),
      count
    ]);
  }
  return timeSeriesData;
};

const timeSeriesRequest = (body: TimeSeriesRequest) =>
  statisticsApiPost('time-series', body);

export const conceptTimeSeriesRequest = (orgPath: string | undefined) =>
  timeSeriesRequest(timeSeriesBody('CONCEPT', orgPath)).then(
    extractLabelsAndData
  );

export const dataServiceTimeSeriesRequest = (orgPath: string | undefined) =>
  timeSeriesRequest(timeSeriesBody('DATA_SERVICE', orgPath)).then(
    extractLabelsAndData
  );

export const datasetTimeSeriesRequest = (orgPath: string | undefined) =>
  timeSeriesRequest(timeSeriesBody('DATASET', orgPath)).then(
    extractLabelsAndData
  );

export const infoModelTimeSeriesRequest = (orgPath: string | undefined) =>
  timeSeriesRequest(timeSeriesBody('INFORMATION_MODEL', orgPath)).then(
    extractLabelsAndData
  );
