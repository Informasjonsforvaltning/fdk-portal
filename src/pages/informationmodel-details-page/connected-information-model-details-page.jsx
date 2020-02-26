import { connect } from 'react-redux';
import { fetchPublishersIfNeededAction } from '../../redux/modules/publishers';
import { fetchReferenceDataIfNeededAction } from '../../redux/modules/referenceData';
import { ResolvedInformationModelDetailsPage } from './resolved-information-model-details-page';

const mapStateToProps = ({ referenceData, publishers }) => {
  const { publisherItems } = publishers || {
    publisherItems: null
  };

  return {
    publisherItems,
    referenceData
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPublishersIfNeeded: () => dispatch(fetchPublishersIfNeededAction()),
  fetchReferenceDataIfNeeded: path =>
    dispatch(fetchReferenceDataIfNeededAction(path))
});

export const ConnectedInformationModelDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolvedInformationModelDetailsPage);
