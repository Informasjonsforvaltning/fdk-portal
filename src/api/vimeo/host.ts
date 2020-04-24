import axios from 'axios';

const VIMEO_HOST = 'https://vimeo.com/api/oembed.json';

export const getVimeoData = (url: string) =>
  axios({
    url: VIMEO_HOST,
    method: 'GET',
    params: { url }
  }).then(response => response.data);
