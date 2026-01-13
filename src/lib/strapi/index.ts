import {
  Article,
  ComponentBasicImage,
  ComponentBasicParagraph,
  ComponentBasicYoutube,
  FancyArticle,
  TransportArticle
} from '../../api/generated/cms/graphql';

export function isBasicParagraph(obj?: any): obj is ComponentBasicParagraph {
  return (
    obj &&
    (obj?.__component === 'basic.paragraph' ||
      obj?.__typename === 'ComponentBasicParagraph')
  );
}

export function isBasicImage(obj?: any): obj is ComponentBasicImage {
  return (
    obj &&
    (obj?.__component === 'basic.image' ||
      obj?.__typename === 'ComponentBasicImage')
  );
}

export function isBasicYoutube(obj?: any): obj is ComponentBasicYoutube {
  return (
    obj &&
    (obj?.__component === 'basic.youtube' ||
      obj?.__typename === 'ComponentBasicYoutube')
  );
}

export function getLocalizedAttributes<
  T extends Article | FancyArticle | TransportArticle
>(entity: T | null | undefined, language?: string): T | null | undefined {
  let locale = 'nb-NO';
  if (language === 'nn') {
    locale = 'nn-NO';
  }

  if (language === 'en') {
    locale = 'en';
  }

  let localization = null;
  if (entity?.__typename === 'Article') {
    localization = (entity as Article)?.localizations?.find(
      (loc: any) => loc.locale === locale
    );
  } else if (entity?.__typename === 'FancyArticle') {
    localization = (entity as FancyArticle)?.localizations?.find(
      (loc: any) => loc.locale === locale
    );
  } else if (entity?.__typename === 'TransportArticle') {
    localization = (entity as TransportArticle)?.localizations?.find(
      (loc: any) => loc.locale === locale
    );
  }

  if (localization) {
    return localization as T;
  }

  return entity as T;
}
