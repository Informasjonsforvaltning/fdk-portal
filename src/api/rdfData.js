import axios from 'axios';
import { getConfig } from '../config';
import { DataFormat } from '../types/enums';

const acceptHeader = header => ({
  headers: {
    accept: header
  }
});

export const getRdfData = id => {
  const url = `${
    getConfig().informationmodelHarvester
  }/informationmodels/${id}`;

  const turtle = axios.get(url, acceptHeader(DataFormat.TURTLE));
  const jsonld = axios.get(url, acceptHeader(DataFormat.JSONLD));
  const rdfxml = axios.get(url, acceptHeader(DataFormat.RDF_XML));

  return Promise.all([turtle, jsonld, rdfxml]).then(
    ([{ data: turtle }, { data: jsonld }, { data: rdfxml }]) => ({
      turtle,
      jsonld,
      rdfxml
    })
  );
};
