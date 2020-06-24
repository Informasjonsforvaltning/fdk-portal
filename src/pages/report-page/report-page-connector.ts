import { connect } from 'react-redux';
import { fetchPublishersIfNeededAction } from '../../redux/modules/publishers';
import { fetchCatalogsIfNeededAction } from '../../redux/modules/catalogs';

const mapStateToProps = ({ catalogs, publishers }: any) => ({
  catalogs: catalogs?.items ?? [],
  publishers: publishers?.publisherItems ?? {}
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchCatalogsIfNeeded: () => dispatch(fetchCatalogsIfNeededAction()),
  fetchPublishersIfNeeded: () => dispatch(fetchPublishersIfNeededAction())
});

export const reportPageConnector = connect(mapStateToProps, mapDispatchToProps);
