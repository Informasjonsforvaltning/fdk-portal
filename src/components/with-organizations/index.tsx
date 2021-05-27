import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { OrganizationSummary } from '../../types';

export interface Props {
  organizations: OrganizationSummary[];
  organizationsActions: typeof actions;
}

const withOrganizations = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    organizations: state.OrganizationsReducer.get('organizations').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    organizationsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withOrganizations;
