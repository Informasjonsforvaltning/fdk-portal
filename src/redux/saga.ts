import { all } from 'redux-saga/effects';

import datasetSaga from '../components/with-dataset/redux/saga';
import referenceDataSaga from '../components/with-reference-data/redux/saga';
import conceptsSaga from '../components/with-concepts/redux/saga';
import conceptSaga from '../components/with-concept/redux/saga';
import datasetsSaga from '../components/with-datasets/redux/saga';
import dataServicesSaga from '../components/with-data-services/redux/saga';
import dataServiceSaga from '../components/with-data-service/redux/saga';
import entitiesSaga from '../components/with-entities/redux/saga';
import organizationCategoriesSaga from '../components/with-organization-categories/redux/saga';
import organizationsSaga from '../components/with-organizations/redux/saga';
import organizationSaga from '../components/with-organization/redux/saga';
import reportSaga from '../components/with-report/redux/saga';
import datasetScoresSaga from '../components/with-dataset-scores/redux/saga';
import informationModelSaga from '../components/with-information-model/redux/saga';
import informationModelsSaga from '../components/with-information-models/redux/saga';
import organizationsCatalogSaga from '../components/with-organizations-catalog/redux/saga';
import publicServicesSaga from '../components/with-public-services/redux/saga';
import publicServiceSaga from '../components/with-public-service/redux/saga';
import publicServicesAndEventsSaga from '../components/with-public-services-and-events/redux/saga';
import eventSaga from '../components/with-event/redux/saga';
import eventsSaga from '../components/with-events/redux/saga';
import kartverketSaga from '../components/with-kartverket/redux/saga';
import eventTypesSaga from '../components/with-event-types/redux/saga';
import communitySaga from '../components/with-community/redux/saga';
import datasetPreviewSaga from '../components/with-dataset-preview/redux/saga';
import suggestionsSaga from '../components/with-suggestions/redux/saga';
import aiProjectsSaga from '../components/with-ai-projects/redux/saga';

export default function* saga() {
  yield all([
    datasetSaga(),
    referenceDataSaga(),
    conceptsSaga(),
    conceptSaga(),
    datasetsSaga(),
    dataServicesSaga(),
    dataServiceSaga(),
    entitiesSaga(),
    organizationCategoriesSaga(),
    organizationsSaga(),
    organizationSaga(),
    reportSaga(),
    datasetScoresSaga(),
    informationModelSaga(),
    informationModelsSaga(),
    organizationsCatalogSaga(),
    publicServicesSaga(),
    publicServiceSaga(),
    publicServicesAndEventsSaga(),
    eventSaga(),
    eventsSaga(),
    kartverketSaga(),
    eventTypesSaga(),
    communitySaga(),
    datasetPreviewSaga(),
    suggestionsSaga(),
    aiProjectsSaga()
  ]);
}
