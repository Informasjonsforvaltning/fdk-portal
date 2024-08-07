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
  PATHNAME_PUBLIC_SERVICES_AND_EVENTS
} from '../../../../../constants/constants';
import { getLinkForTab } from '../../../search-location-helper';

const Tabs: FC<RouteComponentProps> = ({ location }) => (
  <div className='container'>
    <SC.Tabs>
      <Tab
        active={location.pathname === PATHNAME_SEARCH}
        tabLink={getLinkForTab(location, PATHNAME_SEARCH)}
        label={`${localization.page.resultsTab}`}
      >
        <SC.Label>{localization.page.resultsTab}</SC.Label>
      </Tab>
      <Tab
        active={location.pathname === PATHNAME_DATASETS}
        tabLink={getLinkForTab(location, PATHNAME_DATASETS)}
        label={`${localization.page.datasetTab}`}
      >
        <SC.Label>{localization.page.datasetTab}</SC.Label>
      </Tab>

      <Tab
        active={location.pathname === PATHNAME_DATA_SERVICES}
        tabLink={getLinkForTab(location, PATHNAME_DATA_SERVICES)}
        label={`${localization.page.apiTab}`}
      >
        <SC.Label>{localization.page.apiTab}</SC.Label>
      </Tab>

      <Tab
        active={location.pathname === PATHNAME_CONCEPTS}
        tabLink={getLinkForTab(location, PATHNAME_CONCEPTS)}
        label={`${localization.page.termTab}`}
      >
        <SC.Label>{localization.page.termTab}</SC.Label>
      </Tab>

      <Tab
        active={location.pathname === PATHNAME_INFORMATIONMODELS}
        tabLink={getLinkForTab(location, PATHNAME_INFORMATIONMODELS)}
        label={`${localization.page.informationModelTab} (
        `}
      >
        <SC.Label>{localization.page.informationModelTab}</SC.Label>
      </Tab>
      <Tab
        active={location.pathname === PATHNAME_PUBLIC_SERVICES_AND_EVENTS}
        tabLink={getLinkForTab(location, PATHNAME_PUBLIC_SERVICES_AND_EVENTS)}
        label={`${localization.page.serviceTab} `}
      >
        <SC.Label>{localization.page.serviceTab}</SC.Label>
      </Tab>
    </SC.Tabs>
  </div>
);

export default withRouter(memo(Tabs));
