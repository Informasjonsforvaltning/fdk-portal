import { compose } from 'redux';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ReportPagePure } from './report-page-pure';
import { reportPageConnector } from './report-page-connector';
import withErrorBoundary from '../../components/with-error-boundary';
import ErrorPage from '../error-page';

// Import the resolver functions directly
import {
  getDatasetsReport,
  getConceptsReport,
  getInformationModelsReport,
  getDataServicesReport
} from '../../api/report-api/reports';
import {
  conceptTimeSeriesRequest,
  dataServiceTimeSeriesRequest,
  datasetTimeSeriesRequest,
  infoModelTimeSeriesRequest
} from '../../api/statistics-api/time-series';
import { parseSearchParams } from '../../lib/location-history-helper';
import { extractConcepts, searchConcepts } from '../../api/search-api/concepts';
import { paramsToSearchBody } from '../../utils/common/index';
import { sortKeyWithCount } from './sort-helper';

const enhance = compose(reportPageConnector, withErrorBoundary(ErrorPage));

const ReportPageWithConnector = enhance(ReportPagePure);

// Wrapper component that renders immediately and fetches data
export const ReportPage: React.FC = props => {
  const [data, setData] = useState({
    datasetsReport: null as any,
    dataServicesReport: null as any,
    conceptsReport: null as any,
    informationModelsReport: null as any,
    datasetsTimeSeries: null as any,
    dataServicesTimeSeries: null as any,
    informationModelsTimeSeries: null as any,
    conceptsTimeSeries: null as any,
    resolved: false
  });

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { orgPath, losTheme: los } = parseSearchParams(location);

        // Fetch all data in parallel
        const [
          datasetsReport,
          datasetsTimeSeries,
          dataServicesReport,
          dataServicesTimeSeries,
          conceptsReport,
          conceptsTimeSeries,
          informationModelsReport,
          informationModelsTimeSeries
        ] = await Promise.allSettled([
          getDatasetsReport({ orgPath, los }).catch(() => ({})),
          datasetTimeSeriesRequest().catch(() => ({})),
          getDataServicesReport({ orgPath }).catch(() => ({})),
          dataServiceTimeSeriesRequest().catch(() => ({})),
          getConceptsReport({ orgPath, los }).catch(() => ({
            mostInUse: [],
            allReferencedConcepts: []
          })),
          conceptTimeSeriesRequest().catch(() => ({})),
          getInformationModelsReport({ orgPath, los }).catch(() => ({})),
          infoModelTimeSeriesRequest().catch(() => ({}))
        ]);

        // Handle concepts report specially (it has nested async operations)
        const processedConceptsReport =
          conceptsReport.status === 'fulfilled'
            ? conceptsReport.value
            : { mostInUse: [], allReferencedConcepts: [] };
        if (processedConceptsReport && processedConceptsReport.mostInUse) {
          try {
            const topReferencedConceptIdentifiers = sortKeyWithCount(
              processedConceptsReport.mostInUse
            )
              .slice(0, 10)
              .map(({ key }) => key);
            const searchResult = await searchConcepts(
              paramsToSearchBody({ uri: topReferencedConceptIdentifiers })
            ).catch(() => null);
            if (searchResult) {
              processedConceptsReport.allReferencedConcepts =
                extractConcepts(searchResult);
            }
          } catch (error) {
            console.warn('Failed to fetch referenced concepts:', error);
          }
        }

        setData({
          datasetsReport:
            datasetsReport.status === 'fulfilled' ? datasetsReport.value : {},
          datasetsTimeSeries:
            datasetsTimeSeries.status === 'fulfilled'
              ? datasetsTimeSeries.value
              : {},
          dataServicesReport:
            dataServicesReport.status === 'fulfilled'
              ? dataServicesReport.value
              : {},
          dataServicesTimeSeries:
            dataServicesTimeSeries.status === 'fulfilled'
              ? dataServicesTimeSeries.value
              : {},
          conceptsReport: processedConceptsReport,
          conceptsTimeSeries:
            conceptsTimeSeries.status === 'fulfilled'
              ? conceptsTimeSeries.value
              : {},
          informationModelsReport:
            informationModelsReport.status === 'fulfilled'
              ? informationModelsReport.value
              : {},
          informationModelsTimeSeries:
            informationModelsTimeSeries.status === 'fulfilled'
              ? informationModelsTimeSeries.value
              : {},
          resolved: true
        });
      } catch (error) {
        console.error('Error fetching report data:', error);
        setData(prev => ({ ...prev, resolved: true }));
      }
    };

    fetchData();
  }, [location]);

  return React.createElement(ReportPageWithConnector as any, {
    ...props,
    ...data
  });
};
