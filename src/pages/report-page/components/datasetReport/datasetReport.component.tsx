import React, { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import ThemeProvider from '@fellesdatakatalog/theme';

import BoxRegular, {
  Variant as BoxFlowVariant
} from '../../../../components/box-regular/box-regular.component';
import {
  StatisticsRegular,
  IllustrationWithCount,
  SC,
  FontVariant,
  FlowVariant
} from '../../../../components/statistics-regular/statistics-regular';
import { getConfig } from '../../../../config';
import { themeFDK, themeNAP } from '../../../../app/theme';
import { Entity, Filter } from '../../../../types/enums';
import { DatasetsReport, KeyWithCountObject } from '../../../../types';

import DatasetIcon from '../../../../images/icon-catalog-dataset-md.svg';
import AuthoritativeIcon from '../../../../images/icon-authoritative-md.svg';
import NewIcon from '../../../../images/icon-new-md.svg';
import AccessNotOpenIcon from '../../../../images/icon-access-not-open-md-v2.svg';
import AccessOpenIcon from '../../../../images/icon-access-open-md-v2.svg';
import AccessRestrictedIcon from '../../../../images/icon-access-restricted-md-v2.svg';
import AccessUnknownIcon from '../../../../images/icon-access-unknown-md-v2.svg';
import ConceptIcon from '../../../../images/icon-catalog-concept-md.svg';
import { List } from '../../../../components/list/list';
import { PATHNAME_DATASETS } from '../../../../constants/constants';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';
import localization from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';
import { Line } from '../../../../components/charts';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../../../../components/with-reference-data';
import FormatPie from '../formatPie/formatPie.component';
import { sortKeyWithCount } from '../../sort-helper';

interface ExternalProps {
  datasetsReport: Partial<DatasetsReport>;
  datasetsTimeSeries: any;
  publishers?: any;
}

interface Props
  extends ExternalProps,
    RouteComponentProps,
    ReferenceDataProps {}

const DatasetReport: FC<Props> = ({
  publishers = {},
  referenceData: { los },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  location: { search: searchParams } = {},
  history,
  datasetsReport: {
    totalObjects = 0,
    newLastWeek = 0,
    organizationCount = 0,
    nationalComponent = 0,
    withSubject = 0,
    opendata = 0,
    accessRights = [],
    formats = [],
    themesAndTopicsCount = [],
    catalogs = []
  } = {},
  datasetsTimeSeries: { timeSeriesData = [] } = {}
}) => {
  useEffect(() => {
    if (!los) {
      getReferenceData('los');
    }
  }, []);

  timeSeriesData.push([Date.now(), totalObjects]);

  const accessRightsPublic =
    accessRights?.find((item: KeyWithCountObject) => item.key === 'PUBLIC')
      ?.count || 0;
  const accessRightsRestriced =
    accessRights?.find((item: KeyWithCountObject) => item.key === 'RESTRICTED')
      ?.count || 0;
  const accessRightsNonPublic =
    accessRights?.find((item: KeyWithCountObject) => item.key === 'NON_PUBLIC')
      ?.count || 0;

  const accessRightsUnknown =
    totalObjects -
    accessRightsPublic -
    accessRightsRestriced -
    accessRightsNonPublic;

  const topMostUsedFormats: KeyWithCountObject[] = sortKeyWithCount(formats)
    .filter(({ key }: KeyWithCountObject) => key !== 'MISSING')
    .splice(0, 4);

  const topMostUsedThemes: KeyWithCountObject[] = sortKeyWithCount(
    themesAndTopicsCount.filter(
      ({ key }: KeyWithCountObject) => key !== 'MISSING'
    )
  ).splice(0, 10);

  const theme = getConfig().themeNap ? themeNAP : themeFDK;

  return (
    <ThemeProvider theme={theme}>
      <main id='content'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <BoxRegular>
              <StatisticsRegular to={`${PATHNAME_DATASETS}${searchParams}`}>
                <IllustrationWithCount
                  icon={<DatasetIcon />}
                  count={totalObjects}
                />
                <SC.StatisticsRegular.Label>
                  {localization.report.datasetsDescription}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
          <div className='col-12 col-md-6'>
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_DATASETS}${patchSearchQuery(
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

        <div className='row'>
          <div className='col-12'>
            <BoxRegular>
              <StatisticsRegular to='' as='div'>
                <IllustrationWithCount
                  icon={<DatasetIcon />}
                  count={organizationCount}
                />
                <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                  {localization.formatString(
                    localization.report.countCatalogsLabel,
                    {
                      catalog: translate(
                        getConfig().themeNap
                          ? localization.nap
                          : localization.nationalDataCatalog
                      )
                    }
                  )}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
        </div>

        {timeSeriesData?.length > 0 && timeSeriesData?.length > 0 && (
          <div className='row'>
            <div className='col-12'>
              <BoxRegular
                header={localization.report.growth}
                subHeader={localization.report.growthFromFirstPublish}
              >
                <Line
                  name={localization.datasetLabel}
                  data={timeSeriesData}
                  lineColor={theme.extendedColors[Entity.DATASET].dark}
                />
              </BoxRegular>
            </div>
          </div>
        )}

        {Number(totalObjects) > 0 && (
          <div>
            <div className='row'>
              <div className='col-12'>
                <BoxRegular header={localization.accessLevel}>
                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.OPENDATA,
                      'true'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(opendata),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value: Number(totalObjects) - Number(opendata),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <AccessOpenIcon
                              key={dataIndex}
                              x={40}
                              y={35}
                              fill={
                                theme.extendedColors[Entity.DATASET].graph.dark
                              }
                              viewBox='0 0 70 70'
                            />
                          )}
                        />
                      }
                      count={opendata}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.opendata}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>

                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.ACCESSRIGHTS,
                      'PUBLIC'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(accessRightsPublic),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value:
                                Number(totalObjects) -
                                Number(accessRightsPublic),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <AccessOpenIcon
                              key={dataIndex}
                              x={40}
                              y={35}
                              viewBox='0 0 70 70'
                            />
                          )}
                        />
                      }
                      count={accessRightsPublic}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.public}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>

                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.ACCESSRIGHTS,
                      'RESTRICTED'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(accessRightsRestriced),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value:
                                Number(totalObjects) -
                                Number(accessRightsRestriced),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <AccessRestrictedIcon
                              key={dataIndex}
                              x={37}
                              y={35}
                              viewBox='0 0 70 70'
                            />
                          )}
                        />
                      }
                      count={accessRightsRestriced}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.restricted}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>

                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.ACCESSRIGHTS,
                      'NON_PUBLIC'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(accessRightsNonPublic),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value:
                                Number(totalObjects) -
                                Number(accessRightsNonPublic),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <AccessNotOpenIcon
                              key={dataIndex}
                              x={35}
                              y={35}
                              viewBox='0 0 70 70'
                            />
                          )}
                        />
                      }
                      count={accessRightsNonPublic}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.nonPublic}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>

                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.ACCESSRIGHTS,
                      'Ukjent'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: accessRightsUnknown,
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value: Number(totalObjects) - accessRightsUnknown,
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={-90}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <AccessUnknownIcon
                              key={dataIndex}
                              x={35}
                              y={35}
                              viewBox='0 0 100 100'
                            />
                          )}
                        />
                      }
                      count={accessRightsUnknown}
                    />
                    <SC.StatisticsRegular.Label>
                      {localization.report.unknown}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </BoxRegular>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <BoxRegular>
                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.PROVENANCE,
                      'NASJONAL'
                    )}`}
                  >
                    <IllustrationWithCount
                      icon={<AuthoritativeIcon />}
                      count={nationalComponent}
                    />
                    <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                      {localization.report.authoritative}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </BoxRegular>
              </div>
            </div>

            <div className='row'>
              <div className='col-12'>
                <BoxRegular>
                  <StatisticsRegular
                    to={`${PATHNAME_DATASETS}${patchSearchQuery(
                      Filter.SUBJECTEXISTS,
                      'true'
                    )}`}
                  >
                    <IllustrationWithCount
                      variant={FlowVariant.COLUMN}
                      chart={
                        <PieChart
                          data={[
                            {
                              value: Number(withSubject),
                              color: theme.extendedColors[Entity.DATASET].dark
                            },
                            {
                              value: Number(totalObjects) - Number(withSubject),
                              color: theme.extendedColors[Entity.DATASET].light
                            }
                          ]}
                          startAngle={0}
                          lineWidth={40}
                          animate
                          label={({ dataIndex }) => (
                            <ConceptIcon
                              key={dataIndex}
                              x={37}
                              y={38}
                              viewBox='0 0 90 90'
                              fill={
                                theme.extendedColors[Entity.DATASET].graph.dark
                              }
                            />
                          )}
                        />
                      }
                      count={withSubject}
                    />
                    <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                      {localization.report.useConcepts}
                    </SC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </BoxRegular>
              </div>
            </div>

            {Array.isArray(topMostUsedFormats) &&
              topMostUsedFormats?.length > 0 && (
                <div className='row'>
                  <div className='col-12'>
                    <BoxRegular header={localization.report.usedFormats}>
                      <FormatPie
                        formats={topMostUsedFormats}
                        theme={theme}
                        history={history}
                      />
                    </BoxRegular>
                  </div>
                </div>
              )}

            {Array.isArray(topMostUsedThemes) && topMostUsedThemes?.length > 0 && (
              <div className='row'>
                <div className='col-12'>
                  <BoxRegular
                    variant={BoxFlowVariant.COLUMN}
                    header={localization.report.usedThemes}
                  >
                    <List
                      headerText1={localization.report.themeAndTopic}
                      headerText2={localization.report.countDataset}
                      listItems={topMostUsedThemes?.map(
                        ({ key, count }: KeyWithCountObject, index: any) => ({
                          id: index,
                          path: `${PATHNAME_DATASETS}?${Filter.LOS}=${key}`,
                          text1: translate(
                            los?.find((losTheme: any) =>
                              losTheme.losPaths.includes(key)
                            )?.name
                          ),
                          text2: `${count}`
                        })
                      )}
                    />
                  </BoxRegular>
                </div>
              </div>
            )}

            <div className='row'>
              <div className='col-12'>
                <BoxRegular header={localization.report.datasetCatalogs}>
                  {Array.isArray(catalogs) && catalogs?.length > 0 && (
                    <List
                      headerText1={localization.report.catalogName}
                      headerText2={localization.report.countDataset}
                      listItems={catalogs.map(
                        ({ key, count }: KeyWithCountObject, index: any) => ({
                          id: index,
                          path: `${PATHNAME_DATASETS}?${
                            Filter.CATALOGNAME
                          }=${encodeURI(key)}`,
                          text1:
                            translate(publishers[key]?.prefLabel) ??
                            publishers[key]?.name ??
                            key.substr(key.lastIndexOf('/') + 1, key.length),
                          text2: `${count}`
                        })
                      )}
                      showMoreLabel={localization.report.showAllCatalogs}
                      showLessLabel={localization.report.showLessCatalogs}
                    />
                  )}
                </BoxRegular>
              </div>
            </div>
          </div>
        )}
      </main>
    </ThemeProvider>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withRouter,
  withReferenceData
)(DatasetReport);
