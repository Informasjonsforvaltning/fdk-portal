const PARAGRAPH__BODY = 'paragraph--body';
const PARAGRAPH__IMAGE = 'paragraph--image';
const PARAGRAPH__VIDEO = 'paragraph--video';

export const getParagraphBodyValue = (fields: any) =>
  fields?.find((item: any) => item.type === PARAGRAPH__BODY)?.field_body?.value;

export const getParagraphImage = (fields: any) =>
  fields?.find((item: any) => item.type === PARAGRAPH__IMAGE)?.field_image
    ?.field_media_image;

export const getParagraphVideoValue = (fields: any) =>
  fields?.find((item: any) => item.type === PARAGRAPH__VIDEO)
    ?.field_remote_video?.field_media_oembed_video;
