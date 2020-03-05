import { Concept } from '../types';

export function addReferencedConceptToItem(
  item: any,
  concepts: Partial<Concept>[]
) {
  if (!concepts) {
    return null;
  }
  return Object.keys(item).map(key => {
    if (typeof item[key] === 'object') {
      addReferencedConceptToItem(item[key], concepts);
    }
    if (key === 'isDescribedByUri') {
      item.concept = concepts.find(
        concept => concept.identifier === item[key],
        {}
      );
    }
    return item;
  });
}
