import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import SC from './styled';
import Tab from '../tab/tab.component';
import localization from '../../../../../lib/localization';
import {
  PATHNAME_SEARCH,
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES
} from '../../../../../constants/constants';
import { getLinkForTab } from '../../../search-location-helper';
import { Entity } from '../../../../../types/enums';
import { getConfig } from '../../../../../config';

interface Props {
  countResults?: number;
  countDatasets: number;
  countConcepts: number;
  countApis: number;
  countInformationModels: number;
  countPublicServices: number;
}

const Tabs: FC<Props & RouteComponentProps> = ({
  countResults,
  countDatasets,
  countApis,
  countConcepts,
  countInformationModels,
  countPublicServices,
  location
}) => (
  <SC.Tabs>
    <Tab
      active={location.pathname === PATHNAME_SEARCH}
      tabLink={getLinkForTab(location, PATHNAME_SEARCH)}
      label={localization.resultsLabel}
    >
      <SC.IconPlaceholder>
        <SC.AllIcon />
      </SC.IconPlaceholder>
      <SC.Label>
        {localization.page.resultsTab}&nbsp;({countResults})
      </SC.Label>
    </Tab>
    <Tab
      active={location.pathname === PATHNAME_DATASETS}
      tabLink={getLinkForTab(location, PATHNAME_DATASETS)}
      label={localization.datasetLabel}
    >
      <SC.IconPlaceholder type={Entity.DATASET}>
        <SC.DatasetIcon />
      </SC.IconPlaceholder>
      <SC.Label>
        {localization.page.datasetTab}&nbsp;({countDatasets})
      </SC.Label>
    </Tab>

    <Tab
      active={location.pathname === PATHNAME_DATA_SERVICES}
      tabLink={getLinkForTab(location, PATHNAME_DATA_SERVICES)}
      label={localization.apiLabel}
    >
      <SC.IconPlaceholder type={Entity.DATA_SERVICE}>
        <SC.ApiIcon />
      </SC.IconPlaceholder>
      <SC.Label>
        {localization.page.apiTab}&nbsp;({countApis})
      </SC.Label>
    </Tab>

    <Tab
      active={location.pathname === PATHNAME_CONCEPTS}
      tabLink={getLinkForTab(location, PATHNAME_CONCEPTS)}
      label={localization.conceptLabel}
    >
      <SC.IconPlaceholder type={Entity.CONCEPT}>
        <SC.ConceptIcon />
      </SC.IconPlaceholder>
      <SC.Label>
        {localization.page.termTab}&nbsp;({countConcepts})
      </SC.Label>
    </Tab>

    <Tab
      active={location.pathname === PATHNAME_INFORMATIONMODELS}
      tabLink={getLinkForTab(location, PATHNAME_INFORMATIONMODELS)}
      label={localization.informationModelLabel}
    >
      <SC.IconPlaceholder type={Entity.INFORMATION_MODEL}>
        <SC.InfomodIcon />
      </SC.IconPlaceholder>
      <SC.Label>
        {localization.page.informationModelTab}&nbsp;(
        {countInformationModels})
      </SC.Label>
    </Tab>
    {getConfig().showPublicService && (
      <Tab
        active={location.pathname === PATHNAME_PUBLIC_SERVICES}
        tabLink={getLinkForTab(location, PATHNAME_PUBLIC_SERVICES)}
        label={localization.informationModelLabel}
      >
        <SC.BetaRibbon>BETA</SC.BetaRibbon>
        <SC.IconPlaceholder type={Entity.PUBLIC_SERVICE}>
          <SC.ServiceIcon />
        </SC.IconPlaceholder>
        <SC.Label>
          {localization.page.serviceTab}&nbsp;(
          {countPublicServices})
        </SC.Label>
      </Tab>
    )}
  </SC.Tabs>
);

export default withRouter(memo(Tabs));
