import { connect } from 'react-redux';
import { fetchDatasetsIfNeededAction } from '../../redux/modules/datasets';
import { fetchDataServicesIfNeededAction } from '../../redux/modules/dataservices';
import { fetchConceptsIfNeededAction } from '../../redux/modules/concepts';
import { fetchInformationModelsIfNeededAction } from '../../redux/modules/informationModels';
import {
  addConceptAction,
  removeConceptAction
} from '../../redux/modules/conceptsCompare';

const mapStateToProps = ({
  datasets,
  dataServices,
  concepts,
  informationModels,
  conceptsCompare
}) => {
  const {
    datasetItems,
    datasetAggregations,
    datasetTotal,
    meta: datasetMeta
  } = datasets || {
    datasetItems: null,
    datasetAggregations: null,
    datasetTotal: null,
    meta: null
  };

  const {
    dataServiceItems,
    dataServiceAggregations,
    dataServiceTotal,
    meta: dataserviceMeta
  } = dataServices || {
    dataServiceItems: null,
    dataServiceAggregations: null,
    dataServiceTotal: null,
    meta: null
  };

  const {
    conceptItems,
    conceptAggregations,
    conceptTotal,
    meta: conceptMeta
  } = concepts || {
    conceptItems: null,
    conceptAggregations: null,
    conceptTotal: null,
    meta: null
  };

  const {
    informationModelItems,
    informationModelAggregations,
    informationModelTotal,
    meta: informationModelMeta
  } = informationModels || {
    informationModelItems: null,
    informationModelAggregations: null,
    informationModelTotal: null,
    meta: null
  };

  const { items } = conceptsCompare || {
    items: {}
  };

  const isFetchingDatasets = datasetMeta?.isFetching ?? false;
  const isFetchingDataservices = dataserviceMeta?.isFetching ?? false;
  const isFetchingConcepts = conceptMeta?.isFetching ?? false;
  const isFetchingInformationModels = informationModelMeta?.isFetching ?? false;

  return {
    datasetItems,
    datasetAggregations,
    datasetTotal,
    isFetchingDatasets,
    dataServiceItems,
    dataServiceAggregations,
    dataServiceTotal,
    isFetchingDataservices,
    conceptItems,
    conceptAggregations,
    conceptTotal,
    isFetchingConcepts,
    informationModelItems,
    informationModelAggregations,
    informationModelTotal,
    isFetchingInformationModels,
    conceptsCompare: items
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDatasetsIfNeeded: query => dispatch(fetchDatasetsIfNeededAction(query)),
  fetchDataServicesIfNeeded: query =>
    dispatch(fetchDataServicesIfNeededAction(query)),
  fetchConceptsIfNeeded: query => dispatch(fetchConceptsIfNeededAction(query)),
  addConcept: item => dispatch(addConceptAction(item)),
  removeConcept: uri => dispatch(removeConceptAction(uri)),
  fetchInformationModelsIfNeeded: query =>
    dispatch(fetchInformationModelsIfNeededAction(query))
});

export const searchPageConnector = connect(mapStateToProps, mapDispatchToProps);
