export interface InformationModelDocument {
  id: string;
  publisher?: Partial<Publisher>;
  harvestSourceUri?: string;
  harvest?: Partial<Harvest>;
  title?: Partial<TextLanguage>;
  schema?: string;
  objectTypes?: Partial<Node>[];
  codeTypes?: Partial<Node>[];
  dataTypes?: Partial<Node>[];
  simpleTypes?: Partial<Node>[];
  description?: Partial<TextLanguage>;
}

export interface Node {
  identifier: string;
  name: Partial<TextLanguage>;
  roles: Partial<Property>[];
  attributes: Partial<Property>[];
  properties: Partial<Property>[];
  isSubClassOf: string;
  modelElementType: string;
  isDescribedByUrl: string;
  typeDefinitionReference: string;
}

export interface TextLanguage {
  nb: string;
  nn: string;
  en: string;
}

export interface Publisher {
  uri: string;
  id: string;
  name: string;
  orgPath: string;
  prefLabel: Partial<TextLanguage>;
}

export interface Harvest {
  firstHarvested: string;
  lastHarvested: string;
}

export interface LosTheme {
  uri: string;
}

export interface Type {
  identifier: string;
  name: Partial<TextLanguage>;
}

export interface Property {
  name: Partial<TextLanguage>;
  parameters: any;
  type: Partial<Type>;
  isDescribedByUri: string;
}
