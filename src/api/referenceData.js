import axios from 'axios';
import { getConfig } from '../config';

const referenceDataUrlBase = () =>
  `${getConfig().referenceDataApi.host}/reference-data`;

const newReferenceDataUrlBase = () =>
  `${getConfig().referenceDataApi.host}/new-reference-data`;

export const getReferenceData = path =>
  axios
    .get(
      `${referenceDataUrlBase()}/${path}`,
      getConfig().referenceDataApi.config
    )
    .then(r => r.data);

export const getNewReferenceData = path =>
  axios
    .get(
      `${newReferenceDataUrlBase()}/${path}`,
      getConfig().referenceDataApi.config
    )
    .then(r => r.data);
