import { connect } from 'react-redux';
import { fetchDatasetsIfNeededAction } from '../../redux/modules/datasets';
import { fetchDataServicesIfNeededAction } from '../../redux/modules/dataservices';
import { fetchConceptsIfNeededAction } from '../../redux/modules/concepts';
import { fetchInformationModelsIfNeededAction } from '../../redux/modules/informationModels';
import { fetchPublishersIfNeededAction } from '../../redux/modules/publishers';
import {
  addConceptAction,
  removeConceptAction
} from '../../redux/modules/conceptsCompare';
import { fetchReferenceDataIfNeededAction } from '../../redux/modules/referenceData';

const mapStateToProps = ({
  datasets,
  dataServices,
  concepts,
  informationModels,
  publishers,
  referenceData,
  conceptsCompare,
  searchQuery
}) => {
  const { datasetItems, datasetAggregations, datasetTotal } = datasets || {
    datasetItems: null,
    datasetAggregations: null,
    datasetTotal: null
  };

  const {
    dataServiceItems,
    dataServiceAggregations,
    dataServiceTotal
  } = dataServices || {
    dataServiceItems: null,
    dataServiceAggregations: null,
    dataServiceTotal: null
  };

  const { conceptItems, conceptAggregations, conceptTotal } = concepts || {
    conceptItems: null,
    conceptAggregations: null,
    conceptTotal: null
  };

  const {
    informationModelItems,
    informationModelAggregations,
    informationModelTotal
  } = informationModels || {
    informationModelItems: null,
    informationModelAggregations: null,
    informationModelTotal: null
  };

  const { publisherItems, isFetchingPublishers } = publishers || {
    publisherItems: null
  };

  const { items } = conceptsCompare || {
    items: {}
  };

  return {
    datasetItems,
    datasetAggregations,
    datasetTotal,
    dataServiceItems,
    dataServiceAggregations,
    dataServiceTotal,
    conceptItems,
    conceptAggregations,
    conceptTotal,
    informationModelItems,
    informationModelAggregations,
    informationModelTotal,
    publisherItems,
    isFetchingPublishers,
    referenceData,
    conceptsCompare: items,
    searchQuery
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDatasetsIfNeeded: query => dispatch(fetchDatasetsIfNeededAction(query)),
  fetchDataServicesIfNeeded: query =>
    dispatch(fetchDataServicesIfNeededAction(query)),
  fetchConceptsIfNeeded: query => dispatch(fetchConceptsIfNeededAction(query)),
  fetchPublishersIfNeeded: () => dispatch(fetchPublishersIfNeededAction()),
  fetchReferenceDataIfNeeded: path =>
    dispatch(fetchReferenceDataIfNeededAction(path)),
  addConcept: item => dispatch(addConceptAction(item)),
  removeConcept: uri => dispatch(removeConceptAction(uri)),
  fetchInformationModelsIfNeeded: query =>
    dispatch(fetchInformationModelsIfNeededAction(query))
});

export const searchPageConnector = connect(mapStateToProps, mapDispatchToProps);
