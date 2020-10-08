import axios from 'axios';

export const getEnhetsregisteretOrganization = async (id: string) =>
  axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${id}`);
