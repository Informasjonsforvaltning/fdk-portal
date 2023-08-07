import axios from 'axios';
import { getConfig } from '../config';
import env from '../env';

const { FDK_DATASET_PREVIEW_API_KEY } = env;

export const getCsrf = () =>
  axios
    .get('/dataset/preview/csrf', {
      ...getConfig().searchHost.config,
      withCredentials: true,
      headers: {
        'X-API-KEY': FDK_DATASET_PREVIEW_API_KEY
      }
    })
    .then(r => r.data);

export const getDatasetPreview = (url, rows, csrf) =>
  axios
    .post(
      '/dataset/preview',
      { url, rows },
      {
        ...getConfig().searchHost.config,
        withCredentials: true,
        headers: {
          'X-API-KEY': FDK_DATASET_PREVIEW_API_KEY,
          'X-XSRF-TOKEN': csrf
        }
      }
    )
    .then(r => r.data);
