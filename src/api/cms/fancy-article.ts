import { cmsApiGet } from './host';

/**
 * Normalize REST response: support both flat (title, subtitle at top level)
 * and nested (attributes: {...}) shapes. Ensure __typename for GraphQL-compat.
 */
function normalizeStrapiResponse(response: any): any[] {
  const raw = response?.data;
  if (!Array.isArray(raw)) return [];
  return raw.map((item: any) => {
    const attrs = item?.attributes ?? item;
    return {
      __typename: 'FancyArticle',
      documentId: item.documentId ?? item.id,
      ...attrs
    };
  });
}

export const getFancyArticleBySlug = (
  slug: string,
  params: Record<string, string> = {}
) =>
  cmsApiGet('/api/fancy-articles', {
    'filters[slug][$eq]': slug,
    ...params
  }).then(normalizeStrapiResponse);
