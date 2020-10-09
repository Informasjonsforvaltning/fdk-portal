import React, { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';

import BoxRegular from '../../../../components/box-regular/box-regular.component';
import {
  FontVariant,
  IllustrationWithCount,
  SC,
  StatisticsRegular
} from '../../../../components/statistics-regular/statistics-regular';
import { themeFDK as theme } from '../../../../app/theme';
import { Entity, Filter } from '../../../../types/enums';

import ApiIcon from '../../../../images/icon-catalog-api-md.svg';
import NewIcon from '../../../../images/icon-new-md.svg';

import { PATHNAME_DATA_SERVICES } from '../../../../constants/constants';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';
import localization from '../../../../lib/localization';
import {
  DataServiceReport,
  KeyWithCountObject,
  MediaType
} from '../../../../types';
import { Line } from '../../../../components/charts';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../../../../components/with-reference-data';
import FormatPie from '../formatPie/formatPie.component';
import { sortKeyWithCount } from '../../sort-helper';

interface Props extends RouteComponentProps, ReferenceDataProps {
  dataServicesReport?: Partial<DataServiceReport>;
  dataServicesTimeSeries?: any;
}

const DataserviceReport: FC<Props> = ({
  location,
  referenceData: { mediatypes },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  dataServicesReport: {
    totalObjects = 0,
    newLastWeek = 0,
    organizationCount = 0,
    formats = []
  } = {},
  dataServicesTimeSeries: { timeSeriesData = [] } = {}
}) => {
  const { search: searchParams } = location;
  timeSeriesData.push([Date.now(), totalObjects]);

  useEffect(() => {
    if (!mediatypes) {
      getReferenceData('mediatypes');
    }
  }, []);

  const topMostUsedFormats: KeyWithCountObject[] = sortKeyWithCount(
    formats
  ).map((item: KeyWithCountObject) => ({
    ...item,
    key:
      mediatypes?.find((mediatype: MediaType) =>
        mediatype.code.includes(
          item.key.substr(item.key.lastIndexOf('application/'), item.key.length)
        )
      )?.name || item.key.substr(item.key.length - 5)
  }));

  return (
    <ThemeProvider theme={theme.extendedColors[Entity.DATA_SERVICE]}>
      <main id="content">
        <div className="row">
          <div className="col-12 col-md-6">
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_DATA_SERVICES}${searchParams}`}
              >
                <IllustrationWithCount
                  icon={<ApiIcon />}
                  count={totalObjects}
                />
                <SC.StatisticsRegular.Label>
                  {localization.report.dataserviceDescription}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
          <div className="col-12 col-md-6">
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_DATA_SERVICES}${patchSearchQuery(
                  Filter.LASTXDAYS,
                  '7'
                )}`}
              >
                <IllustrationWithCount icon={<NewIcon />} count={newLastWeek} />
                <SC.StatisticsRegular.Label>
                  {localization.report.newPastWeek}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <BoxRegular>
              <StatisticsRegular to={`${PATHNAME_DATA_SERVICES}`}>
                <IllustrationWithCount
                  icon={<ApiIcon />}
                  count={organizationCount}
                />
                <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                  {localization.report.organizationsDataservice}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
        </div>

        {timeSeriesData?.length > 0 && timeSeriesData?.length > 0 && (
          <div className="row">
            <div className="col-12">
              <BoxRegular
                header={localization.report.growth}
                subHeader={
                  localization.report.dataServiceGrowthFromFirstPublish
                }
              >
                <Line
                  name={localization.dataServiceLabel}
                  data={timeSeriesData}
                  lineColor={theme.extendedColors[Entity.DATA_SERVICE].dark}
                />
              </BoxRegular>
            </div>
          </div>
        )}

        {Array.isArray(topMostUsedFormats) && topMostUsedFormats?.length > 0 && (
          <div className="row">
            <div className="col-12">
              <BoxRegular header={localization.report.usedFormats}>
                <FormatPie
                  formats={topMostUsedFormats.splice(0, 4)}
                  theme={theme}
                  history={history}
                  entityType={Entity.DATA_SERVICE}
                />
              </BoxRegular>
            </div>
          </div>
        )}
      </main>
    </ThemeProvider>
  );
};

export default compose<FC>(
  memo,
  withReferenceData,
  withRouter
)(DataserviceReport);
