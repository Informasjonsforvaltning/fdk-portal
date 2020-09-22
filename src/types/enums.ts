export enum SearchTypes {
  dataset,
  dataservice,
  concept,
  informationModel
}

export enum Entity {
  DATASET = 'dataset',
  DATA_SERVICE = 'dataservice',
  CONCEPT = 'concept',
  INFORMATION_MODEL = 'informationmodel'
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
  ORGPATH = 'orgPath'
}

export enum RatingCategory {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  SUFFICIENT = 'sufficient',
  POOR = 'poor'
}

export enum DimensionType {
  FINDABILITY = 'findability',
  ACCESSIBILITY = 'accessibility'
}

export enum IndicatorType {
  ACCESS_URL = 'access_url',
  KEYWORD = 'keyword',
  SUBJECT = 'subject'
}
