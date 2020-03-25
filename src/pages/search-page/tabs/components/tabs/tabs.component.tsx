import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import SC from './styled';
import Tab from '../tab/tab.component';
import localization from '../../../../../lib/localization';
import {
  PATHNAME_APIS,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS
} from '../../../../../constants/constants';
import { getLinkForTab } from '../../../search-location-helper';

interface Props {
  countDatasets: number;
  countConcepts: number;
  countApis: number;
  countInformationModels: number;
}

const Tabs: FC<Props & RouteComponentProps> = ({
  countDatasets,
  countApis,
  countConcepts,
  countInformationModels,
  location
}) => (
  <SC.Tabs>
    <Tab
      active={location.pathname === PATHNAME_DATASETS}
      tabLink={getLinkForTab(location, PATHNAME_DATASETS)}
      label={localization.datasetLabel}
    >
      <SC.DatasetIcon />
      <SC.Label>
        {localization.page.datasetTab}&nbsp;({countDatasets})
      </SC.Label>
    </Tab>

    <Tab
      active={location.pathname === PATHNAME_APIS}
      tabLink={getLinkForTab(location, PATHNAME_APIS)}
      label={localization.apiLabel}
    >
      <SC.ApiIcon />
      <SC.Label>
        {localization.page.apiTab}&nbsp;({countApis})
      </SC.Label>
    </Tab>

    <Tab
      active={location.pathname === PATHNAME_CONCEPTS}
      tabLink={getLinkForTab(location, PATHNAME_CONCEPTS)}
      label={localization.conceptLabel}
    >
      <SC.ConceptIcon />
      <SC.Label>
        {localization.page.termTab}&nbsp;({countConcepts})
      </SC.Label>
    </Tab>

    <Tab
      active={location.pathname === PATHNAME_INFORMATIONMODELS}
      tabLink={getLinkForTab(location, PATHNAME_INFORMATIONMODELS)}
      label={localization.informationModelLabel}
    >
      <SC.InfomodIcon />
      <SC.Label>
        {localization.page.informationModelTab}&nbsp;(
        {countInformationModels})
      </SC.Label>
    </Tab>
  </SC.Tabs>
);

export default withRouter(memo(Tabs));
