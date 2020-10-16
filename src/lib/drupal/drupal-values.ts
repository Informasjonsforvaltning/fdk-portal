import { PARAGRAPH__IMAGE } from '../../constants/constants';

export const getParagraphBodyProcessed = (fieldModule: any) =>
  fieldModule?.field_body?.processed;

export const getParagraphImage = (fieldModule: any) =>
  fieldModule.field_image?.field_media_image;

export const getParagraphVideoValue = (fieldModule: any) =>
  fieldModule?.field_remote_video?.field_media_oembed_video;

export const findParagraphImage = (fields: any) =>
  fields?.find((item: any) => item.type === PARAGRAPH__IMAGE)?.field_image
    ?.field_media_image;
