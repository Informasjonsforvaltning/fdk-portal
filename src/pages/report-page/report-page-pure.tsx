import React, { FC, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'qs';
import capitalize from 'lodash/capitalize';
import Tabs, { Tab, Pane } from '@fellesdatakatalog/tabs';
import ThemeProvider from '@fellesdatakatalog/theme';

import SC from './styled';
import localization from '../../lib/localization';
import { PublishersSelect } from './publishers-select/publishers-select.component';
import { getParamFromLocation } from '../../lib/addOrReplaceUrlParam';
import { isFilterActive } from './filter-helper';
import { getConfig } from '../../config';
import { themeFDK, themeNAP } from '../../app/theme';
import { Entity } from '../../types/enums';
import DatasetReport from './components/datasetReport/datasetReport.component';
import DataserviceReport from './components/dataserviceReport/dataserviceReport.component';
import ConceptReport from './components/conceptReport/conceptReport.component';
import InformationModelReport from './components/informationModelReport/informationModelReport.component';
import TabContent, { Variant } from '../../components/tab/tab.component';
import { FilterTree } from '../search-page/filter-tree/filter-tree.component';
import { setFilter } from '../search-page/search-location-helper';
import { getTranslateText as translate } from '../../lib/translateText';
import { keyPrefixForest } from '../../lib/key-prefix-forest';
import { FilterChange } from '../../components/filter-box/filter-box.component';

interface Props {
  fetchPublishersIfNeeded: () => void;
  publishers?: any;
  dataServicesReport?: any;
  informationModelsReport?: any;
  datasetsReport?: any;
  conceptsReport?: any;
  datasetsTimeSeries?: any;
  dataServicesTimeSeries?: any;
  informationModelsTimeSeries?: any;
  conceptsTimeSeries?: any;
}

export const ReportPagePure: FC<Props> = ({
  fetchPublishersIfNeeded,
  publishers = {},
  dataServicesReport,
  informationModelsReport,
  datasetsReport,
  conceptsReport,
  datasetsTimeSeries,
  dataServicesTimeSeries,
  informationModelsTimeSeries,
  conceptsTimeSeries
}) => {
  const history = useHistory();
  const { search } = useLocation();

  const [activeTab, setActiveTab] = useState(Variant.DATASET);

  const selectPublisher = useCallback((publisher: any) => {
    const orgPath = publisher?.orgPath;
    const currentSearch = qs.parse(search, {
      ignoreQueryPrefix: true
    });
    const newSearch = { ...currentSearch, orgPath };
    const newSearchStr = qs.stringify(newSearch, {
      addQueryPrefix: true,
      skipNulls: true,
      encode: false
    });

    // This is react-router browserHistory object
    // https://github.com/ReactTraining/history
    history.push({ search: newSearchStr });
  }, []);

  const clearSearch = useCallback(() => {
    selectPublisher(null);
  }, []);

  fetchPublishersIfNeeded();

  const orgPath = (getParamFromLocation(location, 'orgPath') ?? '') as string;
  const selectedPublisher = publishers && publishers[orgPath];

  const handleFilterPublisherHierarchy = ({ value, checked }: FilterChange) => {
    if (checked) {
      setFilter(history, location, { orgPath: value });
    } else {
      setFilter(history, location, { orgPath: null });
    }
  };

  const orgPaths = {
    [Variant.DATASET]: datasetsReport?.orgPaths ?? [],
    [Variant.DATA_SERVICE]: dataServicesReport?.orgPaths ?? [],
    [Variant.CONCEPT]: conceptsReport?.orgPaths ?? [],
    [Variant.INFORMATION_MODEL]: informationModelsReport?.orgPaths ?? [],
    [Variant.PUBLIC_SERVICE]: [],
    [Variant.EVENT]: []
  };

  return (
    <ThemeProvider
      theme={
        (getConfig().isNapProfile ? themeNAP : themeFDK).extendedColors[
          Entity.DATASET
        ]
      }
    >
      <main id='content' className='container'>
        <div className='row'>
          <div className='col-md-4'>
            {isFilterActive({ orgPath }) && (
              <SC.ClearButton
                className='fdk-button fade-in-500'
                onClick={clearSearch}
              >
                {localization.query.clear}
              </SC.ClearButton>
            )}
            <PublishersSelect
              publishers={publishers}
              onChange={selectPublisher}
              value={selectedPublisher}
            />

            <FilterTree
              title={localization.organization}
              aggregationsForest={keyPrefixForest(orgPaths[activeTab])}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPath}
              referenceDataItems={publishers}
            />
          </div>
          <div className='col-md-8'>
            <div className='row'>
              <div className='col-12'>
                <SC.Title>{localization.menu.reports}</SC.Title>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <SC.SubTitle>
                  {localization.report.title}{' '}
                  {orgPath
                    ? capitalize(
                        translate(publishers[orgPath]?.prefLabel) ??
                          publishers[orgPath]?.name ??
                          orgPath.substr(
                            orgPath.lastIndexOf('/') + 1,
                            orgPath.length
                          )
                      )
                    : localization.report.allEntities}
                </SC.SubTitle>
              </div>
            </div>
            <div className='row mb-5'>
              <div className='col-12'>
                {getConfig().isNapProfile ? (
                  <DatasetReport
                    datasetsReport={datasetsReport}
                    datasetsTimeSeries={datasetsTimeSeries}
                  />
                ) : (
                  <Tabs>
                    <Tab for='pane-1' active>
                      <TabContent
                        variant={Variant.DATASET}
                        label={localization.page.datasetTab}
                        onClick={() => setActiveTab(Variant.DATASET)}
                        active={activeTab === Variant.DATASET}
                      />
                    </Tab>
                    <Tab for='pane-2'>
                      <TabContent
                        variant={Variant.DATA_SERVICE}
                        label={localization.page.apiTab}
                        onClick={() => setActiveTab(Variant.DATA_SERVICE)}
                        active={activeTab === Variant.DATA_SERVICE}
                      />
                    </Tab>
                    <Tab for='pane-3'>
                      <TabContent
                        variant={Variant.CONCEPT}
                        label={localization.page.termTab}
                        onClick={() => setActiveTab(Variant.CONCEPT)}
                        active={activeTab === Variant.CONCEPT}
                      />
                    </Tab>
                    <Tab for='pane-4'>
                      <TabContent
                        variant={Variant.INFORMATION_MODEL}
                        label={localization.page.informationModelTab}
                        onClick={() => setActiveTab(Variant.INFORMATION_MODEL)}
                        active={activeTab === Variant.INFORMATION_MODEL}
                      />
                    </Tab>
                    <Pane id='pane-1'>
                      <DatasetReport
                        datasetsReport={datasetsReport}
                        datasetsTimeSeries={datasetsTimeSeries}
                      />
                    </Pane>
                    <Pane id='pane-2'>
                      <DataserviceReport
                        dataServicesReport={dataServicesReport}
                        dataServicesTimeSeries={dataServicesTimeSeries}
                      />
                    </Pane>
                    <Pane id='pane-3'>
                      <ConceptReport
                        conceptsReport={conceptsReport}
                        conceptsTimeSeries={conceptsTimeSeries}
                      />
                    </Pane>
                    <Pane id='pane-4'>
                      <InformationModelReport
                        informationModelsReport={informationModelsReport}
                        informationModelsTimeSeries={
                          informationModelsTimeSeries
                        }
                      />
                    </Pane>
                  </Tabs>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
};
