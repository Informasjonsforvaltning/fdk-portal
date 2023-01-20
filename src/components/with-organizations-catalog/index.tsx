import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import type { Organization } from '../../types';

export interface Props {
  organizations: Organization[];
  organizationsActions: typeof actions;
}

const withOrganizationsCatalog = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    organizations: state.OrganizationsCatalogReducer.get('organizations').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    organizationsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withOrganizationsCatalog;
