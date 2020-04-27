export const getParagraphBodyValue = (fieldModule: any) =>
  fieldModule?.field_body?.value;

export const getParagraphImage = (fieldModule: any) =>
  fieldModule.field_image?.field_media_image;

export const getParagraphVideoValue = (fieldModule: any) =>
  fieldModule?.field_remote_video?.field_media_oembed_video;
