export interface InformationModelDocument {
  id: string;
  publisher?: Partial<Publisher>;
  harvestSourceUri?: string;
  harvest?: Partial<Harvest>;
  title?: Partial<TextLanguage>;
  informationModelDescription?: Partial<ModelDescription>;
  rootObject?: Partial<ObjectType>;
  objectTypes?: Partial<ObjectType>[];
  codeTypes?: Partial<CodeType>[];
  dataTypes?: Partial<DataType>[];
  simpleTypes?: SimpleType[];
  schema?: string;
}

export interface ObjectType {
  id: string;
  modelDescription: Partial<ModelDescription>;
  attributeList: Partial<ModelElement>[];
  roleList: Partial<ModelElement>[];
  extendsFrom: ObjectType[];
}

export interface CodeType {
  id: string;
  modelDescription: ModelDescription;
  codeList: ModelElement[];
  externalCodeList: string[];
}

export interface DataType {
  id: string;
  modelDescription: Partial<ModelDescription>;
  attributeList: Partial<ModelElement>[];
  extendsFrom: ObjectType[];
}

export interface SimpleType {
  id: string;
  modelDescription: ModelDescription;
  extendsFrom: ObjectType[];
  distributionReference: string[];
}

export interface ModelElement {
  name: Partial<TextLanguage>;
  referencedObject: Partial<ReferencedObject>;
  range: string;
  elementDescription: Partial<ModelDescription>;
}

export interface ModelDescription {
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  identifier: string;
  belongsToModule?: string;
  concept: Partial<Concept>;
}

export interface ReferencedObject {
  refId: string;
  name: Partial<TextLanguage>;
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

export interface Concept {
  anbefaltTerm: Partial<TextLanguage>;
  definition: Partial<TextLanguage>;
  publisher: Partial<Publisher>;
  conceptReference: string;
}
