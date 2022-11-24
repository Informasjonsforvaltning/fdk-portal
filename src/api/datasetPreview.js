import axios from 'axios';
import { getConfig } from '../config';
import env from '../env';
import { cookieValue } from '../utils/common';

const { FDK_DATASET_PREVIEW_API_KEY } = env;

export const setCsrf = () =>
  axios
    .get('/dataset/preview', {
      ...getConfig().searchHost.config,
      withCredentials: true,
      headers: {
        'X-API-KEY': FDK_DATASET_PREVIEW_API_KEY
      }
    })
    .then(r => r.data);

export const getDatasetPreview = (url, rows) =>
  axios
    .post(
      '/dataset/preview',
      { url, rows },
      {
        ...getConfig().searchHost.config,
        withCredentials: true,
        headers: {
          'X-API-KEY': FDK_DATASET_PREVIEW_API_KEY,
          'X-XSRF-TOKEN': cookieValue('DATASET-PREVIEW-CSRF-TOKEN')
        }
      }
    )
    .then(r => r.data);
