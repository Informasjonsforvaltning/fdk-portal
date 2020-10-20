import { deserialize } from 'deserialize-json-api';
import { cmsApiGet } from './host';
import { getConfig } from '../../config';

export const getArticleEntity = (id: string) =>
  cmsApiGet(
    `/node/page/${id}?include=field_modules,field_modules.field_image,field_modules.field_image.field_media_image,field_global_taxonomy,field_modules.field_remote_video`
  ).then(deserialize);

const prependAbsoluteImageLinks = (data: any) => {
  const dataWithReplacedImgSrc = JSON.stringify(data).replace(
    /(<img[^]+?src=\\")(?!https:\/\/)(.*?)"/g,
    `$1${getConfig().cmsApi.host}$2"`
  );

  return JSON.parse(dataWithReplacedImgSrc);
};
export const extractArticleData = (response: any) =>
  prependAbsoluteImageLinks(response.data) ?? [];
