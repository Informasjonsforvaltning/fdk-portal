import {
  ComponentBasicImage,
  ComponentBasicParagraph,
  ComponentBasicYoutube
} from '../../api/generated/cms/graphql';

export function isBasicParagraph(obj?: any): obj is ComponentBasicParagraph {
  return obj && obj?.__typename === 'ComponentBasicParagraph';
}

export function isBasicImage(obj?: any): obj is ComponentBasicImage {
  return obj && obj?.__typename === 'ComponentBasicImage';
}

export function isBasicYoutube(obj?: any): obj is ComponentBasicYoutube {
  return obj && obj?.__typename === 'ComponentBasicYoutube';
}
