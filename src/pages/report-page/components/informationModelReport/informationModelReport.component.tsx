/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/function-component-definition */
import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';

import BoxRegular from '../../../../components/box-regular/box-regular.component';
import {
  StatisticsRegular,
  IllustrationWithCount,
  SC,
  FontVariant
} from '../../../../components/statistics-regular/statistics-regular';
import { themeFDK as theme } from '../../../../app/theme';
import { Entity, Filter } from '../../../../types/enums';

import InfoModIcon from '../../../../images/icon-catalog-infomod-md.svg';
import NewIcon from '../../../../images/icon-new-md.svg';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';
import { PATHNAME_INFORMATIONMODELS } from '../../../../constants/constants';
import localization from '../../../../lib/localization';
import { Line } from '../../../../components/charts';
import { Report } from '../../../../types';
import { ContainerBoxRegular, ContainerPaneContent } from '../../styled';

interface Props extends RouteComponentProps {
  informationModelsReport?: Partial<Report>;
  informationModelsTimeSeries: any;
}

const InformationModelReport: FC<Props> = ({
  location: { search: searchParams } = {},
  informationModelsReport: {
    totalObjects = 0,
    newLastWeek = 0,
    organizationCount = 0
  } = {},
  informationModelsTimeSeries: { timeSeriesData = [] } = {}
}) => {
  timeSeriesData.push([Date.now(), totalObjects]);
  return (
    <ThemeProvider theme={theme.extendedColors[Entity.INFORMATION_MODEL]}>
      <main id='content'>
        <ContainerPaneContent>
          <ContainerBoxRegular>
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_INFORMATIONMODELS}${searchParams}`}
              >
                <IllustrationWithCount
                  icon={<InfoModIcon />}
                  count={totalObjects}
                />
                <SC.StatisticsRegular.Label>
                  {localization.report.informationModelsDescription}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </ContainerBoxRegular>
          <ContainerBoxRegular>
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_INFORMATIONMODELS}${patchSearchQuery(
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
                  icon={<InfoModIcon />}
                  count={organizationCount}
                />
                <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                  {localization.report.organizationsInformationModel}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <BoxRegular
              header={localization.report.growth}
              subHeader={
                localization.report.informationModelGrowthFromFirstPublish
              }
            >
              <Line
                name={localization.informationModelLabel}
                data={timeSeriesData}
                lineColor={theme.extendedColors[Entity.INFORMATION_MODEL].dark}
              />
            </BoxRegular>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(memo(InformationModelReport));
