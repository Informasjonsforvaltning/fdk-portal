import { deserialize } from 'deserialize-json-api';
import { cmsApiGet } from './host';

export const getRecentNewsEntities = (pageLimit: number) =>
  cmsApiGet(
    `/node/news?fields[node--news]=title,field_ingress,created,changed&page[limit]=${pageLimit}&sort=-created`
  ).then(deserialize);

export const getNewsEntity = (id: string) =>
  cmsApiGet(
    `/node/news/${id}?include=field_modules,field_modules.field_image,field_modules.field_image.field_media_image,field_global_taxonomy`
  ).then(deserialize);

export const extractNewsData = (response: any) => response.data ?? [];
