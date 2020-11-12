import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_INFORMATION_MODEL_REQUESTED,
  GET_INFORMATION_MODEL_SUCCEEDED,
  GET_INFORMATION_MODEL_FAILED,
  GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_REQUESTED,
  GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_SUCCEEDED,
  GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_FAILED,
  RESET_INFORMATION_MODEL
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  informationModel: null,
  informationModelRdfRepresentations: {},
  isLoadingInformationModel: false,
  isLoadingInformationModelRdfRepresentations: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_INFORMATION_MODEL_REQUESTED:
      return state
        .set('informationModel', null)
        .set('informationModelRdfRepresentations', fromJS({}))
        .set('isLoadingInformationModel', true);
    case GET_INFORMATION_MODEL_SUCCEEDED:
      return state
        .set('informationModel', fromJS(action.payload.informationModel))
        .set('isLoadingInformationModel', false);
    case GET_INFORMATION_MODEL_FAILED:
      return state.set('isLoadingInformationModel', false);
    case GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_REQUESTED:
      return state
        .set('informationModelRdfRepresentations', fromJS({}))
        .set('isLoadingInformationModelRdfRepresentations', true);
    case GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_SUCCEEDED:
      return state
        .set(
          'informationModelRdfRepresentations',
          fromJS(action.payload.representations)
        )
        .set('isLoadingInformationModelRdfRepresentations', false);
    case GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_FAILED:
      return state
        .set('informationModelRdfRepresentations', fromJS({}))
        .set('isLoadingInformationModelRdfRepresentations', false);
    case RESET_INFORMATION_MODEL:
      return state
        .set('informationModel', null)
        .set('informationModelRdfRepresentations', fromJS({}))
        .set('isLoadingInformationModel', false)
        .set('isLoadingInformationModelRdfRepresentations', false);
    default:
      return state;
  }
}
