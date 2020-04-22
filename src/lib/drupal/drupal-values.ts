const PARAGRAPH__BODY = 'paragraph--body';

export const getParagraphBodyValue = (fields: any) =>
  fields?.find((item: any) => item.type === PARAGRAPH__BODY)?.field_body?.value;
