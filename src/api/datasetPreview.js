import axios from 'axios';
import { getConfig } from '../config';

export const getDatasetPreview = (url, rows) =>
  axios
    .post(
      `${getConfig().searchHost.host}/dataset/preview`,
      { url, rows },
      getConfig().searchHost.config
    )
    .then(r => r.data);
