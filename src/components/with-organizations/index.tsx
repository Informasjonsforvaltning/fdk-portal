import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';
import { Organization } from '../../types';

export interface Props {
  organizations: Organization[];
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

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withOrganizations;
