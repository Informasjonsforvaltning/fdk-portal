import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';

import BoxRegular from '../../../../components/box-regular/box-regular.component';
import {
  StatisticsRegular,
  IllustrationWithCount,
  SC
} from '../../../../components/statistics-regular/statistics-regular';
import { themeFDK as theme } from '../../../../app/theme';
import { Entity } from '../../../../types/enums';

import ConceptIcon from '../../../../images/icon-catalog-concept-md.svg';
import { PATHNAME_CONCEPTS } from '../../../../constants/constants';
import localization from '../../../../lib/localization';

interface Props extends RouteComponentProps {
  conceptReport?: number;
}

const ConceptReport: FC<Props> = ({ location, conceptReport = 0 }) => {
  const { search: searchParams } = location;
  return (
    <ThemeProvider theme={theme.extendedColors[Entity.CONCEPT]}>
      <main id="content">
        <div className="row">
          <div className="col-12">
            <BoxRegular>
              <StatisticsRegular to={`${PATHNAME_CONCEPTS}${searchParams}`}>
                <IllustrationWithCount
                  icon={<ConceptIcon />}
                  count={conceptReport}
                />
                <SC.StatisticsRegular.Label>
                  {localization.report.conceptsDescription}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(memo(ConceptReport));
