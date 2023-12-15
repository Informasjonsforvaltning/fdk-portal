import {
  Article,
  ArticleEntity,
  ComponentBasicImage,
  ComponentBasicParagraph,
  ComponentBasicYoutube,
  FancyArticle,
  FancyArticleEntity,
  TransportArticle,
  TransportArticleEntity
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

export function getLocalizedAttributes<
  T extends ArticleEntity | FancyArticleEntity | TransportArticleEntity,
  R extends Article | FancyArticle | TransportArticle
>(entity: T | null | undefined, language?: string): R | null | undefined {
  let locale = 'nb-NO';
  if (language === 'nn') {
    locale = 'nn-NO';
  }

  if (language === 'en') {
    locale = 'en';
  }

  let localization = null;
  if (entity?.__typename === 'ArticleEntity') {
    localization = (
      entity as ArticleEntity
    )?.attributes?.localizations?.data.find(
      (loc: any) => loc.attributes?.locale === locale
    );
  } else if (entity?.__typename === 'FancyArticleEntity') {
    localization = (
      entity as FancyArticleEntity
    )?.attributes?.localizations?.data.find(
      (loc: any) => loc.attributes?.locale === locale
    );
  } else if (entity?.__typename === 'TransportArticleEntity') {
    localization = (
      entity as TransportArticleEntity
    )?.attributes?.localizations?.data.find(
      (loc: any) => loc.attributes?.locale === locale
    );
  }

  if (localization) {
    return localization.attributes as R;
  }

  return entity?.attributes as R;
}
