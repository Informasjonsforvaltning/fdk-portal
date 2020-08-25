import { connect } from 'react-redux';
import { fetchPublishersIfNeededAction } from '../../redux/modules/publishers';
import { fetchReferenceDataIfNeededAction } from '../../redux/modules/referenceData';

const mapStateToProps = ({ publishers, referenceData }: any) => ({
  publishers: publishers?.publisherItems ?? [],
  referenceData
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchPublishersIfNeeded: () => dispatch(fetchPublishersIfNeededAction()),
  fetchReferenceDataIfNeeded: (path: string) =>
    dispatch(fetchReferenceDataIfNeededAction(path))
});

export const reportPageConnector = connect(mapStateToProps, mapDispatchToProps);
