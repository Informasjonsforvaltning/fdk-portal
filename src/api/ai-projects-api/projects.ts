import axios from 'axios';

import env from '../../env';

const { AI_PROJECT_SERVICE_BASE_URI } = env;

export const getAiProjects = () =>
  axios.get(`${AI_PROJECT_SERVICE_BASE_URI}/projects`).then(({ data }) => data);
