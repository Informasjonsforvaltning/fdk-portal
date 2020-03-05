import { connect } from 'react-redux';
import { fetchPublishersIfNeededAction } from '../../redux/modules/publishers';
import {
  fetchConceptReferencesAction,
  fetchInformationModelReferencesAction
} from '../../redux/modules/concepts';
import { ResolvedConceptDetailsPage } from './resolved-concept-details-page';

const mapStateToProps = ({
  publishers,
  concepts: { conceptReferences = null, informationModelReferences = null }
}) => {
  const { publisherItems } = publishers || {
    publisherItems: null
  };

  return {
    publisherItems,
    conceptReferences,
    informationModelReferences
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPublishersIfNeeded: () => dispatch(fetchPublishersIfNeededAction()),
  fetchConceptReferences: query =>
    dispatch(fetchConceptReferencesAction(query)),
  fetchInformationModelReferences: query =>
    dispatch(fetchInformationModelReferencesAction(query))
});

export const ConnectedConceptDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolvedConceptDetailsPage);
