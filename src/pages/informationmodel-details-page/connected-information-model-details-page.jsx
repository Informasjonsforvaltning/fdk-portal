import { connect } from 'react-redux';
import { fetchPublishersIfNeededAction } from '../../redux/modules/publishers';
import { fetchReferenceDataIfNeededAction } from '../../redux/modules/referenceData';
import { fetchRDFDataIfNeededAction } from '../../redux/modules/rdfData';
import { ResolvedInformationModelDetailsPage } from './resolved-information-model-details-page';

const mapStateToProps = ({
  referenceData,
  publishers,
  rdfData: { data: rdfData }
}) => {
  const { publisherItems } = publishers || {
    publisherItems: null
  };

  return {
    publisherItems,
    referenceData,
    rdfData
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPublishersIfNeeded: () => dispatch(fetchPublishersIfNeededAction()),
  fetchReferenceDataIfNeeded: path =>
    dispatch(fetchReferenceDataIfNeededAction(path)),
  fetchRdfDataIfNeeded: id => dispatch(fetchRDFDataIfNeededAction(id))
});

export const ConnectedInformationModelDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolvedInformationModelDetailsPage);
