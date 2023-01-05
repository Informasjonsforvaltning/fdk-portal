/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';

import ConceptReportSC from './styled';
import BoxRegular from '../../../../components/box-regular/box-regular.component';
import {
  StatisticsRegular,
  IllustrationWithCount,
  SC,
  FontVariant
} from '../../../../components/statistics-regular/statistics-regular';
import { themeFDK as theme } from '../../../../app/theme';
import { Entity, Filter } from '../../../../types/enums';
import { ConceptsReport, Concept } from '../../../../types';

import ConceptIcon from '../../../../images/icon-catalog-concept-md.svg';
import NewIcon from '../../../../images/icon-new-md.svg';
import { PATHNAME_CONCEPTS } from '../../../../constants/constants';
import { patchSearchQuery } from '../../../../lib/addOrReplaceUrlParam';
import localization from '../../../../lib/localization';
import { Line } from '../../../../components/charts';
import { getTranslateText } from '../../../../lib/translateText';
import { ContainerBoxRegular, ContainerPaneContent } from '../../styled';

interface AllReferencedConceptIdentifiers {
  allReferencedConcepts: any;
}
interface Props extends RouteComponentProps {
  conceptsReport?: Partial<ConceptsReport> & AllReferencedConceptIdentifiers;
  conceptsTimeSeries: any;
}

const ConceptReport: FC<Props> = ({
  location: { search: searchParams } = {},
  conceptsReport: {
    totalObjects = 0,
    newLastWeek = 0,
    organizationCount = 0,
    allReferencedConcepts = []
  } = {},
  conceptsTimeSeries: { timeSeriesData = [] } = {}
}) => {
  timeSeriesData.push([Date.now(), totalObjects]);
  return (
    <ThemeProvider theme={theme.extendedColors[Entity.CONCEPT]}>
      <main id='content'>
        <ContainerPaneContent>
          <ContainerBoxRegular>
            <BoxRegular>
              <StatisticsRegular to={`${PATHNAME_CONCEPTS}${searchParams}`}>
                <IllustrationWithCount
                  icon={<ConceptIcon />}
                  count={totalObjects}
                />
                <SC.StatisticsRegular.Label>
                  {localization.report.conceptsDescription}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </ContainerBoxRegular>
          <ContainerBoxRegular>
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_CONCEPTS}${patchSearchQuery(
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
                  icon={<ConceptIcon />}
                  count={organizationCount}
                />
                <SC.StatisticsRegular.Label variant={FontVariant.LARGE}>
                  {localization.report.organizationsConcept}
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
                subHeader={localization.report.conceptGrowthFromFirstPublish}
              >
                <Line
                  name={localization.conceptLabel}
                  data={timeSeriesData}
                  lineColor={theme.extendedColors[Entity.CONCEPT].dark}
                />
              </BoxRegular>
            </div>
          </div>
        )}

        {allReferencedConcepts?.length > 0 && (
          <div className='row'>
            <div className='col-12'>
              <BoxRegular header={localization.report.conceptReferenced}>
                {allReferencedConcepts.map(
                  ({ id, prefLabel }: Partial<Concept>) => (
                    <ConceptReportSC.ConceptLink
                      key={id}
                      to={`/concepts/${id}`}
                    >
                      {getTranslateText(prefLabel)}
                    </ConceptReportSC.ConceptLink>
                  )
                )}
              </BoxRegular>
            </div>
          </div>
        )}
      </main>
    </ThemeProvider>
  );
};

export default withRouter(memo(ConceptReport));
