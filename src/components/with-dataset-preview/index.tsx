import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { DatasetPreview } from '../../types';

export interface Props {
  datasetPreview: DatasetPreview;
  isLoadingDatasetPreview: boolean;
  datasetPreviewActions: typeof actions;
}

const withDatasetPreview = (Component: ComponentType<any>) => {
  const WrappedComponent: FC<Props> = props => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    datasetPreview:
      state.DatasetPreviewReducer.get('datasetPreview')?.toJS() ?? null,
    isLoadingDatasetPreview: state.DatasetPreviewReducer.get(
      'isLoadingDatasetPreview'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetPreviewActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withDatasetPreview;
