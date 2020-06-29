import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { Button } from 'reactstrap';
import capitalize from 'lodash/capitalize';
import Tabs, { Tab, Pane } from '@fellesdatakatalog/tabs';
import ThemeProvider from '@fellesdatakatalog/theme';

import SC from './styled';
import localization from '../../lib/localization';
import { PublishersSelect } from './publishers-select/publishers-select.component';
import { PublishersTree } from './publishers-tree/publishers-tree.component';
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

export function ReportPagePure({
  location,
  history,
  fetchPublishersIfNeeded,
  publishers,
  dataServiceStats,
  conceptStats,
  informationModelsReport,
  datasetsReport,
  datasetsTimeSeries
}) {
  function selectPublisher(publisher) {
    const orgPath = publisher && publisher.orgPath;
    const currentSearch = qs.parse(location.search, {
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
  }

  function clearSearch() {
    selectPublisher(null);
  }

  fetchPublishersIfNeeded();

  const orgPath = getParamFromLocation(location, 'orgPath');
  const selectedPublisher = publishers && publishers[orgPath];

  return (
    <ThemeProvider
      theme={
        (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
          Entity.DATASET
        ]
      }
    >
      <section className="container">
        <div className="row">
          <div className="col-12">
            <SC.Title>{localization.menu.reports}</SC.Title>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {isFilterActive({ orgPath }) && (
              <Button
                className="fdk-button fade-in-500"
                onClick={clearSearch}
                color="primary"
              >
                {localization.query.clear}
              </Button>
            )}
            <PublishersSelect
              publishers={publishers}
              onChange={selectPublisher}
              value={selectedPublisher}
            />
            <PublishersTree
              onChange={selectPublisher}
              value={selectedPublisher}
            />
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-12">
                <SC.SubTitle>
                  {localization.report.title}{' '}
                  {selectedPublisher && selectedPublisher.name
                    ? capitalize(
                        localization.facet.publishers[selectedPublisher.name] ||
                          selectedPublisher.name
                      )
                    : localization.report.allEntities}
                </SC.SubTitle>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {getConfig().themeNap ? (
                  <DatasetReport
                    datasetsReport={datasetsReport}
                    datasetsTimeSeries={datasetsTimeSeries}
                    publishers={publishers}
                  />
                ) : (
                  <Tabs>
                    <Tab for="pane-1" active>
                      <TabContent
                        variant={Variant.DATASET}
                        label={localization.page.datasetTab}
                      />
                    </Tab>
                    <Tab for="pane-2">
                      <TabContent
                        variant={Variant.DATA_SERVICE}
                        label={localization.page.apiTab}
                      />
                    </Tab>
                    <Tab for="pane-3">
                      <TabContent
                        variant={Variant.CONCEPT}
                        label={localization.page.termTab}
                      />
                    </Tab>
                    <Tab for="pane-4">
                      <TabContent
                        variant={Variant.INFORMATION_MODEL}
                        label={localization.page.informationModelTab}
                      />
                    </Tab>
                    <Pane id="pane-1">
                      <DatasetReport
                        datasetsReport={datasetsReport}
                        datasetsTimeSeries={datasetsTimeSeries}
                        publishers={publishers}
                      />
                    </Pane>
                    <Pane id="pane-2">
                      <DataserviceReport dataserviceReport={dataServiceStats} />
                    </Pane>
                    <Pane id="pane-3">
                      <ConceptReport conceptReport={conceptStats} />
                    </Pane>
                    <Pane id="pane-4">
                      <InformationModelReport
                        informationModelsReport={informationModelsReport}
                      />
                    </Pane>
                  </Tabs>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}

ReportPagePure.defaultProps = {
  fetchPublishersIfNeeded: PropTypes.func,
  publishers: {},
  datasetsTimeSeries: {}
};

ReportPagePure.propTypes = {
  fetchPublishersIfNeeded: PropTypes.func,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  publishers: PropTypes.object,
  datasetsTimeSeries: PropTypes.object
};
