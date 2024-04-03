import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  fetchFullConceptsToCompareIfNeededAction,
  removeFullConceptAction
} from '../../redux/modules/fullConceptsCompare';
import { removeConceptAction } from '../../redux/modules/conceptsCompare';

import ErrorPage from '../error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import { ConceptComparePage } from './concept-compare-page';

const mapStateToProps = ({ fullConceptsCompare }) => {
  const { items } = fullConceptsCompare || {
    items: {}
  };

  return {
    fullConceptsCompare: items
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFullConceptsToCompareIfNeeded: iDs =>
    dispatch(fetchFullConceptsToCompareIfNeededAction(iDs)),
  removeFullConcept: uri => dispatch(removeFullConceptAction(uri)),
  removeConcept: uri => dispatch(removeConceptAction(uri))
});

export const ConnectedConceptComparePage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withErrorBoundary(ErrorPage)
)(ConceptComparePage);
