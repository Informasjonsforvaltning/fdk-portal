import {
  Namespace,
  Fetcher,
  graph,
  isLiteral,
  isNamedNode,
  Literal
} from 'rdflib';

import type { AdministrativeUnit } from '../../../types';
import { AdministrativeUnitType } from '../../../types/enums';

const owl = Namespace('http://www.w3.org/2002/07/owl#');
const rdf = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const rdfs = Namespace('http://www.w3.org/2000/01/rdf-schema#');

export const getAdministrativeUnit = async (
  uri: string
): Promise<AdministrativeUnit> => {
  const fetcher = new Fetcher(graph(), { withCredentials: false });

  await fetcher.load(
    `https://rdf.kartverket.no/api/1.0/adminstrative_unit/describe?uri=${uri}&mode=CBD&format=text/turtle`,
    {}
  );

  const subject = fetcher.store.anyStatementMatching(
    null,
    rdf('type'),
    owl('NamedIndividual')
  )?.subject;

  return {
    uri: subject?.value ?? '',
    name: fetcher.store
      .statementsMatching(subject, rdfs('label'))
      .map(({ object }) => object as Literal)
      .filter(isLiteral)
      .reduce(
        (previous, { value, language }) => ({
          ...previous,
          [language]: value
        }),
        {}
      ),
    type: fetcher.store
      .statementsMatching(subject, rdf('type'))
      .map(({ object }) => object)
      .filter(isNamedNode)
      .filter(({ value }) =>
        Object.values(AdministrativeUnitType).includes(value as any)
      )
      .pop()?.value as AdministrativeUnitType
  };
};
