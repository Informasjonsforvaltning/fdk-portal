import React, { FC, memo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import qs from 'qs';
import { Button } from 'reactstrap';

import localization from '../../lib/localization';
import { PublishersSelect } from './publishers-select/publishers-select.component';
import { PublishersTree } from './publishers-tree/publishers-tree.component';
import { getParamFromLocation } from '../../lib/addOrReplaceUrlParam';
import { ReportStats } from './report-stats/report-stats.component';
import { isFilterActive } from './filter-helper';
import { Publisher } from '../../types';

interface Props extends RouteComponentProps {
  publishers?: any;
  datasetStats: any;
  apiStats: any;
  conceptStats: any;
  catalogs: any;
  mostUsedConcepts?: any;
  fetchPublishersIfNeeded: any;
  fetchCatalogsIfNeeded: any;
}
const ReportPagePure: FC<Props> = ({
  publishers = {},
  datasetStats,
  apiStats,
  conceptStats,
  catalogs,
  mostUsedConcepts = [],
  fetchCatalogsIfNeeded,
  fetchPublishersIfNeeded,
  location,
  history
}) => {
  function selectPublisher(publisher: Partial<Publisher> | null) {
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
  fetchCatalogsIfNeeded();

  const orgPath = getParamFromLocation(location, 'orgPath')?.toString();
  const selectedPublisher = orgPath && publishers && publishers[orgPath];

  return (
    <section className="container">
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
          <ReportStats
            datasetStats={datasetStats}
            apiStats={apiStats}
            conceptStats={conceptStats}
            entityName={selectedPublisher && selectedPublisher.name}
            catalogs={catalogs}
            mostUsedConcepts={mostUsedConcepts}
          />
        </div>
      </div>
    </section>
  );
};

export default memo(ReportPagePure);
