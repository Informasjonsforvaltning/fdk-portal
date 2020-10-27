import {
  GET_INFORMATION_MODEL_REQUESTED,
  GET_INFORMATION_MODEL_SUCCEEDED,
  GET_INFORMATION_MODEL_FAILED,
  GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_REQUESTED,
  GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_SUCCEEDED,
  GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_FAILED,
  RESET_INFORMATION_MODEL
} from './action-types';

import type { InformationModel } from '../../../types';
import { DataFormat } from '../../../types/enums';

export function getInformationModelRequested(id: string) {
  return {
    type: GET_INFORMATION_MODEL_REQUESTED,
    payload: {
      id
    }
  };
}

export function getInformationModelSucceeded(
  informationModel: InformationModel
) {
  return {
    type: GET_INFORMATION_MODEL_SUCCEEDED,
    payload: {
      informationModel
    }
  };
}

export function getInformationModelFailed(message: string) {
  return {
    type: GET_INFORMATION_MODEL_FAILED,
    payload: {
      message
    }
  };
}

export function getInformationModelRdfRepresentationsRequested(
  id: string,
  formats: DataFormat[]
) {
  return {
    type: GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_REQUESTED,
    payload: {
      id,
      formats
    }
  };
}

export function getInformationModelRdfRepresentationsSucceeded(
  representations: Partial<{ [key in DataFormat]: string }>
) {
  return {
    type: GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_SUCCEEDED,
    payload: {
      representations
    }
  };
}

export function getInformationModelRdfRepresentationsFailed(message: string) {
  return {
    type: GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_FAILED,
    payload: {
      message
    }
  };
}

export function resetInformationModel() {
  return {
    type: RESET_INFORMATION_MODEL
  };
}
