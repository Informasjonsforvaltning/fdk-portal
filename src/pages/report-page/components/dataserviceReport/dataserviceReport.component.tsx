/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import React, { FC, memo } from 'react';
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
import { Entity, Filter, MediaTypeOrExtentType } from '../../../../types/enums';

import ApiIcon from '../../../../images/icon-catalog-api-md.svg';
import NewIcon from '../../../../images/icon-new-md.svg';

import { PATHNAME_DATA_SERVICES } from '../../../../constants/constants';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';
import localization from '../../../../lib/localization';
import { DataServiceReport, KeyWithCountObject } from '../../../../types';
import { Line } from '../../../../components/charts';
import { List } from '../../../../components/list/list';
import { sortKeyWithCount } from '../../sort-helper';
import { translatePrefixedFormat } from '../../../../utils/common';
import { ContainerBoxRegular, ContainerPaneContent } from '../../styled';

interface ExternalProps {
  dataServicesReport?: Partial<DataServiceReport>;
  dataServicesTimeSeries?: any;
}

interface Props extends ExternalProps, RouteComponentProps {}

const DataserviceReport: FC<Props> = ({
  location,
  dataServicesReport: {
    totalObjects = 0,
    newLastWeek = 0,
    organizationCount = 0,
    formats = []
  } = {},
  dataServicesTimeSeries = []
}) => {
  const { search: searchParams } = location;
  dataServicesTimeSeries.push([Date.now(), totalObjects]);

  const hasOrgPath = searchParams ? searchParams.includes('orgPath') : false;

  const topMostUsedFormats: KeyWithCountObject[] = sortKeyWithCount(formats)
    .filter(
      ({ key }: KeyWithCountObject) =>
        key !== 'MISSING' && key !== MediaTypeOrExtentType.UNKNOWN
    )
    .slice(0, 10);

  return (
    <ThemeProvider theme={theme.extendedColors[Entity.DATA_SERVICE]}>
      <main id='content'>
        <ContainerPaneContent>
          <ContainerBoxRegular>
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
          </ContainerBoxRegular>
          <ContainerBoxRegular>
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
          </ContainerBoxRegular>
        </ContainerPaneContent>

        <div className='row'>
          <div className='col-12'>
            <BoxRegular>
              <StatisticsRegular to='' as='div'>
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

        {dataServicesTimeSeries?.length > 0 &&
          dataServicesTimeSeries?.length > 0 &&
          !hasOrgPath && (
            <div className='row'>
              <div className='col-12'>
                <BoxRegular
                  header={localization.report.growth}
                  subHeader={
                    localization.report.dataServiceGrowthFromFirstPublish
                  }
                >
                  <Line
                    name={localization.dataServiceLabel}
                    data={dataServicesTimeSeries}
                    lineColor={theme.extendedColors[Entity.DATA_SERVICE].dark}
                  />
                </BoxRegular>
              </div>
            </div>
          )}

        {Array.isArray(topMostUsedFormats) &&
          topMostUsedFormats?.length > 0 && (
            <div className='row'>
              <div className='col-12'>
                <BoxRegular header={localization.report.usedFormats}>
                  <List
                    headerText1={localization.report.format}
                    headerText2={localization.report.countDataset}
                    listItems={topMostUsedFormats?.map(
                      ({ key, count }: KeyWithCountObject, index: any) => ({
                        id: index,
                        path: `${PATHNAME_DATA_SERVICES}?${
                          Filter.FORMAT
                        }=${encodeURIComponent(key)}`,
                        text1: translatePrefixedFormat(key),
                        text2: `${count}`
                      })
                    )}
                  />
                </BoxRegular>
              </div>
            </div>
          )}
      </main>
    </ThemeProvider>
  );
};

export default compose<FC<ExternalProps>>(memo, withRouter)(DataserviceReport);
