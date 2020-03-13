import { DataFormat } from './enums';

export interface InformationModelDocument {
  id: string;
  identifier?: string;
  publisher?: Partial<Publisher>;
  harvestSourceUri?: string;
  harvest?: Partial<Harvest>;
  title?: Partial<TextLanguage>;
  name?: Partial<TextLanguage>;
  version?: string;
  schema?: string;
  objectTypes?: Partial<Node>[];
  codeTypes?: Partial<Node>[];
  dataTypes?: Partial<Node>[];
  simpleTypes?: Partial<Node>[];
  description?: Partial<TextLanguage>;
  modelDescription?: Partial<TextLanguage>;
  isDescribedByUri?: string;
  concept?: Partial<Concept>;
  themes?: any;
}

export interface Node {
  identifier: string;
  name: Partial<TextLanguage>;
  roles: Partial<Property>[];
  attributes: Partial<Property>[];
  properties: Partial<Property>[];
  isSubclassOf?: Partial<Type>;
  modelElementType: string;
  isDescribedByUri: string;
  typeDefinitionReference: string;
  concept?: Partial<Concept>;
  codeListReference?: string;
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
  identifier: string;
  name: Partial<TextLanguage>;
  parameters: any;
  type: Partial<Type>;
  isDescribedByUri: string;
  concept?: Partial<Concept>;
}

export interface Concept {
  id: string;
  uri: string;
  identifier: string;
  prefLabel: Partial<TextLanguage>;
  definition: any;
  publisher: Partial<Publisher>;
  example: Partial<TextLanguage>;
}

export interface Dataset {
  id: string;
  type: any;
  publisher: Partial<Publisher>;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  theme: string[];
  distribution: any;
  accessRights: any;
  provenance: any;
}

export interface Api {
  id: string;
  uri: string;
  publisher: Partial<Publisher>;
  title: Partial<TextLanguage>;
  description?: Partial<TextLanguage>;
  nationalComponent: boolean;
  isOpenAccess: boolean;
  isOpenLicense: boolean;
  isFree: boolean;
}

interface License {
  uri: string;
  prefLabel?: Partial<TextLanguage>;
}

interface ConformsTo {
  uri: string;
  prefLabel?: Partial<TextLanguage>;
}

interface Page {
  uri: string;
}

export interface Distribution {
  uri: string;
  type: string;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  format: DataFormat[];
  license: License;
  openLicense: boolean;
  accessURL: string[];
  downloadURL: string[];
  conformsTo: ConformsTo[];
  page?: Page[];
}
