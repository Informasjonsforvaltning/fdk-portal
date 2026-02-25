import { cmsApiGet } from './host';

/**
 * Strapi v4 REST returns { data: [ { id, documentId, attributes: {...} } ] }.
 * Flatten to match GraphQL shape for compatibility with existing components.
 */
function normalizeStrapiResponse(response: any): any[] {
  const raw = response?.data;
  if (!Array.isArray(raw)) return [];
  return raw.map((item: any) => {
    const attrs = item?.attributes ?? {};
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
