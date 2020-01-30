import { connect } from 'react-redux';
import { fetchPublishersIfNeededAction } from '../../redux/modules/publishers';
import { fetchConceptReferencesAction } from '../../redux/modules/concepts';
import { ResolvedConceptDetailsPage } from './resolved-concept-details-page';

const mapStateToProps = ({
  publishers,
  concepts: { conceptReferences = null }
}) => {
  const { publisherItems } = publishers || {
    publisherItems: null
  };

  return {
    publisherItems,
    conceptReferences
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPublishersIfNeeded: () => dispatch(fetchPublishersIfNeededAction()),
  fetchConceptReferences: query => dispatch(fetchConceptReferencesAction(query))
});

export const ConnectedConceptDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolvedConceptDetailsPage);
