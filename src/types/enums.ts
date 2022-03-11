export enum Namespace {
  DEMO = 'demo',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
  PRODUCTION = 'prod'
}

export enum GoogleAnalyticsTrackingId {
  FELLESDATAKATALOG = 'UA-110098477-1',
  TRANSPORTPORTAL = 'UA-110098477-4',
  LOCALHOST = 'UA-41886511-1'
}

export enum GoogleTagManagerId {
  SVV = 'G-FPXKJ83PBS'
}

export enum SearchTypes {
  dataset,
  dataservice,
  concept,
  informationModel,
  publicService,
  event
}

export enum Entity {
  DATASET = 'dataset',
  DATA_SERVICE = 'dataservice',
  CONCEPT = 'concept',
  INFORMATION_MODEL = 'informationmodel',
  PUBLIC_SERVICE = 'public_service',
  EVENT = 'event'
}

export enum DataFormat {
  JSON = 'application/json',
  CSV = 'text/csv',
  XML = 'application/xml',
  YAML = 'application/x.yaml',
  GEOJSON = 'application/vnd.geo+json',
  HTML = 'text/html',
  SOSI = 'application/x-ogc-sosi',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLS = 'application/vnd.sealed-xls',
  RSS = 'text/xml',
  RDF_XML = 'application/rdf+xml',
  TURTLE = 'text/turtle',
  JSONLD = 'application/ld+json',
  TXT = 'text/plain',
  SIRI = 'application/x.siri',
  UNKNOWN = 'unknown'
}

export enum MediaTypeOrExtentType {
  MEDIA_TYPE = 'MEDIA_TYPE',
  FILE_TYPE = 'FILE_TYPE',
  UNKNOWN = 'UNKNOWN'
}

export enum SortOrder {
  ASC,
  DSC
}

export enum Filter {
  LASTXDAYS = 'last_x_days',
  OPENDATA = 'opendata',
  ACCESSRIGHTS = 'accessrights',
  PROVENANCE = 'provenance',
  SUBJECTEXISTS = 'subjectExists',
  FORMAT = 'format',
  LOS = 'losTheme',
  ORGPATH = 'orgPath',
  ORGANIZATION_NUMBER = 'organizationNumber',
  THEME = 'theme',
  Q = 'q',
  PAGE = 'page',
  SORTFIELD = 'sortfield',
  CATALOGNAME = 'catalog_name',
  EVENT_TYPE = 'eventType'
}

export enum RatingCategory {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  SUFFICIENT = 'sufficient',
  POOR = 'poor'
}

export enum DimensionType {
  ACCESSIBILITY = 'accessibility',
  FINDABILITY = 'findability',
  INTEROPERABILITY = 'interoperability',
  READABILITY = 'readability',
  REUSABILITY = 'reusability'
}

export enum IndicatorType {
  DISTRIBUTABLE_DATA = 'distributableData',
  KEYWORD_USAGE = 'keywordUsage',
  SUBJECT_USAGE = 'subjectUsage',
  GEO_SEARCH = 'geoSearch',
  CONTROLLED_VOCABULARY_USAGE = 'controlledVocabularyUsage',
  LICENSE_INFORMATION = 'licenseInformation',
  CONTACT_POINT = 'contactPoint',
  TITLE = 'title',
  TITLE_NO_ORG_NAME = 'titleNoOrgName',
  DESCRIPTION = 'description',
  DESCRIPTION_WITHOUT_TITLE = 'descriptionWithoutTitle'
}

export enum ModelElementType {
  ATTRIBUTE = 'attribute',
  ROLE = 'role',
  CODE_ELEMENT = 'code_element',
  ASSOCIATION = 'association',
  SPECIALIZATION = 'specialization',
  CHOICE = 'choice',
  MULTIPLE_CHOICE = 'multiple_choice',
  COLLECTION = 'collection',
  COMPOSITION = 'composition',
  BIDIR_IN = 'bidir_in',
  BIDIR_OUT = 'bidir_out'
}

export enum FeedType {
  RSS = 'rss',
  ATOM = 'atom'
}

export enum AdministrativeUnitType {
  NATION = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Nasjon',
  COUNTY = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Fylke',
  MUNICIPALITY = 'http://rdf.kartverket.no/onto/adm_enhet_4.0.owl#Kommune'
}

export enum SpecializedEventType {
  LIFEEVENT = 'life_event',
  BUSINESSEVENT = 'business_event'
}

export enum CommunityTerm {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  ALL = ''
}

export enum SuggestionIndexEnum {
  '/datasets' = '/datasets',
  '/dataservices' = '/dataservices',
  '/concepts' = '/concepts',
  '/informationmodels' = '/informationmodels',
  '/public-services-and-events' = '/public_services_and_events'
}

export enum LanguageCodes {
  nb = 'nb',
  nn = 'nn',
  en = 'en',
  no = 'no',
  none = ''
}

export enum Relation {
  ASSOSIATIV = 'assosiativ',
  GENERISK = 'generisk',
  PARTITIV = 'partitiv'
}

export enum RelationType {
  OVERORDNET = 'overordnet',
  UNDERORDNET = 'underordnet',
  ER_DEL_AV = 'erDelAv',
  OMFATTER = 'omfatter'
}
