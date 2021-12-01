import axios from 'axios';
import { getConfig } from '../config';
import env from '../env';

const { FDK_DATASET_PREVIEW_API_KEY } = env;

export const getDatasetPreview = (url, rows) =>
  axios
    .post(
      `${getConfig().searchHost.host}/dataset/preview`,
      { url, rows },
      {
        ...getConfig().searchHost.config,
        headers: {
          'X-API-KEY': FDK_DATASET_PREVIEW_API_KEY
        }
      }
    )
    .then(r => r.data);
