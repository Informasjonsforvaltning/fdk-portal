import axios from 'axios';
import { getConfig } from '../config';

export const getDatasetPreview = (url, rows) =>
  axios
    .post(
      `${getConfig().datasetPreviewApi.host}/preview`,
      { url, rows },
      getConfig().datasetPreviewApi.config
    )
    .then(r => r.data);
