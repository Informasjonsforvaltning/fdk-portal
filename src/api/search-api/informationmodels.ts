import { searchApiPost } from './host';
import { InformationModel } from '../../types';

export const searchInformationModels = (body: any) =>
  searchApiPost('search/informationmodels', body);

export const extractInformationModels = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractInformationModelsAggregations = (searchResponse: any) =>
  searchResponse.aggregations ?? [];

export const extractFirstInformationModel = (
  searchResponse: any
): InformationModel | undefined => searchResponse?.hits?.[0];
