import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';

import BoxRegular from '../../../../components/box-regular/box-regular.component';
import {
  IllustrationWithCount,
  SC,
  StatisticsRegular
} from '../../../../components/statistics-regular/statistics-regular';
import { themeFDK as theme } from '../../../../app/theme';
import { Entity } from '../../../../types/enums';

import ApiIcon from '../../../../images/icon-catalog-api-md.svg';

import { PATHNAME_DATA_SERVICES } from '../../../../constants/constants';
import localization from '../../../../lib/localization';

interface Props extends RouteComponentProps {
  dataserviceReport?: any;
}

const DataserviceReport: FC<Props> = ({
  location,
  dataserviceReport: { total }
}) => {
  const { search: searchParams } = location;
  return (
    <ThemeProvider theme={theme.extendedColors[Entity.DATA_SERVICE]}>
      <main id="content">
        <div className="row">
          <div className="col-12">
            <BoxRegular>
              <StatisticsRegular
                to={`${PATHNAME_DATA_SERVICES}${searchParams}`}
              >
                <IllustrationWithCount icon={<ApiIcon />} count={total} />
                <SC.StatisticsRegular.Label>
                  {localization.report.dataserviceDescription}
                </SC.StatisticsRegular.Label>
              </StatisticsRegular>
            </BoxRegular>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(memo(DataserviceReport));
