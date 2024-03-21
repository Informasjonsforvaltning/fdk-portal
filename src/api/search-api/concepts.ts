import { searchApiPost } from './host';
import { Concept } from '../../types';

export const searchConcepts = (body: any) => searchApiPost('/concepts', body);

export const extractConcepts = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractConceptAggregations = (searchResponse: any) =>
  searchResponse.aggregations ?? [];

export const extractConceptsTotal = (searchResponse: any) =>
  searchResponse?.page?.totalElements ?? 0;

export const extractFirstConcept = (searchResponse: any): Concept | undefined =>
  searchResponse?.hits?.[0];
