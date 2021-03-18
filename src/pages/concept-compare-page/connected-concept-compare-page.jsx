import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  fetchConceptsToCompareIfNeededAction,
  removeConceptAction
} from '../../redux/modules/conceptsCompare';

import ErrorPage from '../../components/error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import { ConceptComparePage } from './concept-compare-page';

const mapStateToProps = ({ conceptsCompare }) => {
  const { items } = conceptsCompare || {
    items: {}
  };

  return {
    conceptsCompare: items
  };
};

const mapDispatchToProps = dispatch => ({
  fetchConceptsToCompareIfNeeded: iDs =>
    dispatch(fetchConceptsToCompareIfNeededAction(iDs)),
  removeConcept: uri => dispatch(removeConceptAction(uri))
});

export const ConnectedConceptComparePage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withErrorBoundary(ErrorPage)
)(ConceptComparePage);
