import { getConfig } from '../config';

export const PATHNAME_MAIN_PAGE = '/';
export const PATHNAME_SEARCH = '/search-all';
export const PATHNAME_DATASETS = '/datasets';
export const PATHNAME_DATASET_DETAILS = '/datasets';
export const PATHNAME_DATA_SERVICES = '/data-services';
export const PATHNAME_CONCEPTS = '/concepts';
export const PATHNAME_CONCEPTS_COMPARE = '/compare';
export const PATHNAME_INFORMATIONMODELS = '/information-models';
export const PATHNAME_PUBLIC_SERVICES_AND_EVENTS =
  '/public-services-and-events';
export const PATHNAME_PUBLIC_SERVICES = '/public-services';
export const PATHNAME_SERVICES = '/services';
export const PATHNAME_EVENTS = '/events';
export const PATHNAME_REPORTS = '/reports';
export const PATHNAME_ABOUT = `${
  getConfig().fdkPortalBaseUri.host
}/:lang/about`;
export const PATHNAME_ABOUT_DATASETS = `${
  getConfig().fdkPortalBaseUri.host
}/:lang/catalogs/datasets`;
export const PATHNAME_ABOUT_CONCEPTS = `${
  getConfig().fdkPortalBaseUri.host
}/:lang/catalogs/concepts`;
export const PATHNAME_ABOUT_DATA_SERVICES = `${
  getConfig().fdkPortalBaseUri.host
}/:lang/catalogs/data-services`;
export const PATHNAME_ABOUT_INFORMATIONMODELS = `${
  getConfig().fdkPortalBaseUri.host
}/:lang/catalogs/information-models`;
export const PATHNAME_ABOUT_REGISTRATION = '/about-registration';
export const PATHNAME_ABOUT_HARVESTING = '/about-harvesting';
export const PATHNAME_CONTACT_PAGE = '/contact';
export const PATHNAME_SERVICE_MESSAGES = '/service-messages';
export const PATHNAME_TERMS_OF_USE = '/terms-of-use';
export const PATHNAME_FANCY_ARTICLE_V2 = '/fancy-article-v2';
export const PATHNAME_NEWS_ARTICLE_V2 = '/news-v2';
export const PATHNAME_DOCS = '/docs';
export const PATHNAME_GUIDANCE_METADATA = '/docs/metadata-quality';
export const PATHNAME_ORGANIZATIONS = '/organizations';
export const PATHNAME_PUBLISHING = '/publishing';
export const PATHNAME_ABOUT_CREATING_DESCRIPTIONS_SELF =
  '/getting-started/creating-descriptions-self';
export const PATHNAME_ABOUT_CREATING_DESCRIPTIONS_REGISTRATION =
  '/getting-started/creating-descriptions-registration';
export const PATHNAME_ABOUT_PUBLISHING_DESCRIPTIONS =
  '/getting-started/publishing-descriptions';
export const PATHNAME_ABOUT_TRIGGERING_HARVEST =
  '/getting-started/triggering-harvest';
export const PATHNAME_ABOUT_RESOURCES = '/getting-started/resources';
export const PATHNAME_SPARQL = '/sparql';
export const PATHNAME_DATA_HUNTER = '/nb/data-hunter';

export const PATHNAME_COMMUNITY_COMMENTS = '/category/12/kommentartråder';
export const PATHNAME_AI = '/kunstig-intelligens';
export const EXTERNAL_AI_PAGE =
  'https://www.digdir.no/kunstig-intelligens/kunstig-intelligens-i-offentlig-sektor/4276';
export const PATHNAME_REQUESTS = '/requests';
export const PATHNAME_TRANSPORT = '/transport';
export const PATHNAME_TRANSPORT_GENERAL = `${PATHNAME_TRANSPORT}/general`;
export const PATHNAME_TRANSPORT_ROLES = `${PATHNAME_TRANSPORT}/roles-and-responsibilities`;
export const PATHNAME_TRANSPORT_ITS = `${PATHNAME_TRANSPORT}/its-directive-and-delegated-regulations`;
export const PATHNAME_TRANSPORT_NEWS = `${PATHNAME_TRANSPORT}/news`;
export const PATHNAME_TRANSPORT_ADD = `${PATHNAME_TRANSPORT}/add-data`;
export const PATHNAME_TRANSPORT_COMPLIANCE = `${PATHNAME_TRANSPORT}/declaration-of-compliance`;

export const PATHNAME_GETTING_STARTED = `${
  getConfig().fdkPortalBaseUri.host
}/:lang/docs`;

export const PARAGRAPH__BODY = 'paragraph--body';
export const PARAGRAPH__IMAGE = 'paragraph--image';
export const PARAGRAPH__VIDEO = 'paragraph--video';

export const HITS_PER_PAGE = 10;
