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
  DATASET = 'DATASET',
  DATA_SERVICE = 'DATA_SERVICE',
  CONCEPT = 'CONCEPT',
  INFORMATION_MODEL = 'INFORMATION_MODEL',
  PUBLIC_SERVICE = 'SERVICE',
  EVENT = 'EVENT'
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
  LASTXDAYS = 'lastXDays',
  OPENDATA = 'opendata',
  ACCESSRIGHTS = 'accessrights',
  PROVENANCE = 'provenance',
  SUBJECTEXISTS = 'subjectExists',
  FORMAT = 'format',
  LOS = 'losTheme',
  ORGPATH = 'orgPath',
  THEME = 'theme',
  Q = 'q',
  PAGE = 'page',
  SORTFIELD = 'sortfield',
  CATALOGNAME = 'catalog_name',
  EVENT_TYPE = 'eventType'
}

export enum MetadataQualityRatingCategory {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  SUFFICIENT = 'sufficient',
  POOR = 'poor'
}

export enum MetadataQualityDimension {
  ACCESSIBILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#accessibility',
  FINDABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#findability',
  INTEROPERABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#interoperability',
  CONTEXTUALITY = 'https://data.norge.no/vocabulary/dcatno-mqa#contextuality',
  REUSABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#reusability'
}

export enum MetadataQualityMetric {
  ACCESS_RIGHTS_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#accessRightsAvailability',
  ACCESS_RIGHTS_VOCABULARY_ALIGNMENT = 'https://data.norge.no/vocabulary/dcatno-mqa#accessRightsVocabularyAlignment',
  ACCESS_URL_STATUS_CODE = 'https://data.norge.no/vocabulary/dcatno-mqa#accessUrlStatusCode',
  BYTE_SIZE_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#byteSizeAvailability',
  CATEGORY_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#categoryAvailability',
  CONTACT_POINT_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#contactPointAvailability',
  DATE_ISSUED_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#dateIssuedAvailability',
  DATE_MODIFIED_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#dateModifiedAvailability',
  DCAT_AP_COMPLIANCE = 'https://data.norge.no/vocabulary/dcatno-mqa#dcatApCompliance',
  DOWNLOAD_URL_AVAILABLITY = 'https://data.norge.no/vocabulary/dcatno-mqa#downloadUrlAvailability',
  DOWNLOAD_URL_STATUS_CODE = 'https://data.norge.no/vocabulary/dcatno-mqa#downloadUrlStatusCode',
  FORMAT_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#formatAvailability',
  FORMAT_MATCH = 'https://data.norge.no/vocabulary/dcatno-mqa#formatMatch',
  FORMAT_MEDIA_TYPE_MACHINE_INTERPRETABLE = 'https://data.norge.no/vocabulary/dcatno-mqa#formatMediaTypeMachineInterpretable',
  FORMAT_MEDIA_TYPE_NON_PROPRIETARY = 'https://data.norge.no/vocabulary/dcatno-mqa#formatMediaTypeNonProprietary',
  FORMAT_MEDIA_TYPE_VOCABULARY_ALIGNMENT = 'https://data.norge.no/vocabulary/dcatno-mqa#formatMediaTypeVocabularyAlignment',
  KEYWORD_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#keywordAvailability',
  KNOWN_LICENSE = 'https://data.norge.no/vocabulary/dcatno-mqa#knownLicense',
  LICENSE_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#licenseAvailability',
  MEDIA_TYPE_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#mediaTypeAvailability',
  OPEN_LICENSE = 'https://data.norge.no/vocabulary/dcatno-mqa#openLicense',
  PUBLISHER_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#publisherAvailability',
  RIGHTS_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#rightsAvailability',
  SPATIAL_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#spatialAvailability',
  SYNTAX_VALID = 'https://data.norge.no/vocabulary/dcatno-mqa#syntaxValid',
  TEMPORAL_AVAILABILITY = 'https://data.norge.no/vocabulary/dcatno-mqa#temporalAvailability'
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

export enum SpecializedDatasetType {
  DATASET_SERIES = 'datasetSeries'
}

export enum CommunityTerm {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  ALL = ''
}

export enum SuggestionIndexEnum {
  '/datasets' = '/datasets',
  '/data-services' = '/data-services',
  '/concepts' = '/concepts',
  '/information-models' = '/information-models',
  '/public-services-and-events' = '/services-and-events'
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

export enum SearchObjectRelationType {
  associativeRelation = 'associativeRelation',
  closeMatch = 'closeMatch',
  exactMatch = 'exactMatch',
  generalizes = 'generalizes',
  specializes = 'specializes',
  isReplacedBy = 'isReplacedBy',
  memberOf = 'memberOf',
  replaces = 'replaces',
  seeAlso = 'seeAlso',
  conformsTo = 'conformsTo',
  servesDataset = 'servesDataset',
  inSeries = 'inSeries',
  subject = 'subject',
  hasPart = 'hasPart',
  isPartOf = 'isPartOf',
  isGroupedBy = 'isGroupedBy',
  isClassifiedBy = 'isClassifiedBy',
  isDescribedAt = 'isDescribedAt',
  relation = 'relation',
  hasVersion = 'hasVersion',
  isVersionOf = 'isVersionOf',
  references = 'references',
  isReferencedBy = 'isReferencedBy',
  requires = 'requires',
  isRequiredBy = 'isRequiredBy',
  source = 'source'
}

export enum MomentFormat {
  DD_MM_YYYY_HH_mm = 'DD.MM.YYYY HH:mm'
}

export enum Vocabulary {
  DATASET = 'http://www.w3.org/ns/dcat#Dataset'
}
