import { connect } from 'react-redux';
import { fetchPublishersIfNeededAction } from '../../redux/modules/publishers';
import { ResolvedDataServiceDetailsPage } from './resolved-data-service-details-page';
import {
  fetchReferenceDataIfNeededAction,
  REFERENCEDATA_PATH_APISTATUS,
  REFERENCEDATA_PATH_APISERVICETYPE
} from '../../redux/modules/referenceData';

const mapStateToProps = ({ publishers, referenceData }) => {
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
  fetchApiStatusIfNeeded: () =>
    dispatch(fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_APISTATUS)),
  fetchApiServiceTypeIfNeeded: () =>
    dispatch(
      fetchReferenceDataIfNeededAction(REFERENCEDATA_PATH_APISERVICETYPE)
    )
});

export const ConnectedDataServiceDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolvedDataServiceDetailsPage);
