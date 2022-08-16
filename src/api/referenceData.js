import axios from 'axios';
import { getConfig } from '../config';

const newReferenceDataUrlBase = () =>
  `${getConfig().referenceDataApi.host}/reference-data`;

export const getNewReferenceData = path =>
  axios
    .get(
      `${newReferenceDataUrlBase()}/${path}`,
      getConfig().referenceDataApi.config
    )
    .then(r => r.data);
