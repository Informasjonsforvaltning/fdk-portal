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

import InfoModIcon from '../../../../images/icon-catalog-infomod-md.svg';
import { PATHNAME_INFORMATIONMODELS } from '../../../../constants/constants';
import localization from '../../../../lib/localization';

interface Props extends RouteComponentProps {
  informationModelsReport?: any;
}

const InformationModelReport: FC<Props> = ({
  location,
  informationModelsReport: { page: { totalElements = '0' } } = {}
}) => {
  const { search: searchParams } = location;
  return (
    <ThemeProvider theme={theme.extendedColors[Entity.INFORMATION_MODEL]}>
      <main id="content">
        <div className="row">
          <div className="col-12">
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_INFORMATIONMODELS}${searchParams}`}
              >
                <IllustrationWithCount
                  icon={<InfoModIcon />}
                  count={totalElements}
                />
                <SC.StatisticsRegular.Label>
                  {localization.report.informationModelsDescription}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(memo(InformationModelReport));
