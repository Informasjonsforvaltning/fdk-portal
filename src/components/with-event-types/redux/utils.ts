import { Namespace, Fetcher, graph, isLiteral, Literal } from 'rdflib';

import type { EventType } from '../../../types';
import { getConfig } from '../../../config';

const rdf = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const skos = Namespace('http://www.w3.org/2004/02/skos/core#');

export const getEventTypes = async (): Promise<EventType[]> => {
  const fetcher = new Fetcher(graph(), {});

  await fetcher.load(`${getConfig().searchHost.host}/api/events`, {
    withCredentials: false
  });

  const eventTypes = fetcher.store.statementsMatching(
    null,
    rdf('type'),
    skos('Concept')
  );

  return eventTypes.map((item: any) => ({
    uri: item.subject.value ?? '',
    prefLabel: fetcher.store
      .statementsMatching(item.subject, skos('prefLabel'))
      .map(({ object }) => object as Literal)
      .filter(isLiteral)
      .reduce(
        (previous, { value, language }) => ({
          ...previous,
          [language]: value
        }),
        {}
      ),
    broader: fetcher.store
      .statementsMatching(item.subject, skos('broader'))
      .map(({ object }) => object.value)
  }));
};
