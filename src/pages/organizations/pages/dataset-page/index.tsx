import React, { memo, FC, useLayoutEffect } from 'react';
import { compose } from 'redux';
import type { RouteComponentProps } from 'react-router-dom';

import withDataset, {
  Props as DatasetProps
} from '../../../../components/with-dataset';

import SC from './styled';

interface RouteParams {
  datasetId: string;
}

interface Props extends DatasetProps, RouteComponentProps<RouteParams> {}

const DatasetPage: FC<Props> = ({
  dataset,
  datasetActions: { getDatasetRequested: getDataset },
  match: {
    params: { datasetId }
  }
}) => {
  useLayoutEffect(() => {
    if (dataset?.id !== datasetId) {
      getDataset(datasetId);
    }
  }, []);

  return (
    <SC.DatasetPage className="container">
      <pre>{JSON.stringify(dataset, null, 2)}</pre>
    </SC.DatasetPage>
  );
};

export default compose<FC>(memo, withDataset)(DatasetPage);
