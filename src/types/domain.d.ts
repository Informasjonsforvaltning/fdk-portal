import {
  DataFormat,
  Entity as EntityEnum,
  AdministrativeUnitType,
  SpecializedEventType,
  LanguageCodes,
  SearchObjectRelationType
} from './enums';

export interface SearchObject {
  id: string;
  uri: string;
  accessRights?: ReferenceDataCode;
  catalog?: Catalog;
  dataTheme?: EuDataTheme[];
  description?: Partial<TextLanguage>;
  fdkFormatPrefixed?: string[];
  metadata?: Metadata;
  isOpenData?: boolean;
  keyword?: Partial<TextLanguage>[];
  losTheme?: LosNode[];
  organization?: Organization;
  provenance?: ReferenceDataCode;
  searchType: EntityEnum;
  specializedType?: SpecializedDatasetType | SpecializedEventType;
  spatial?: ReferenceDataCode[];
  title?: Partial<TextLanguage>;
  relations?: Relation[];
  isAuthoritative?: boolean;
}

interface Catalog {
  description?: Partial<TextLanguage>;
  id?: string;
  publisher?: Organization;
  title?: Partial<TextLanguage>;
  uri?: string;
}

export interface Relation {
  uri?: string;
  type?: SearchObjectRelationType;
}

export interface InformationModel {
  id: string;
  uri: string;
  identifier?: string;
  publisher?: Partial<Organization>;
  harvestSourceUri?: string;
  harvest?: Partial<Harvest>;
  title?: Partial<TextLanguage>;
  name?: Partial<TextLanguage>;
  schema?: string;
  containsSubjects?: string[];
  subjects?: string[];
  modelElements?: Record<string, Partial<InformationModelElement>>;
  modelProperties?: Record<string, Partial<InformationModelProperty>>;
  isPartOf?: string;
  hasPart?: string;
  isReplacedBy?: string;
  replaces?: string;
  objectTypes?: Partial<Node>[];
  codeTypes?: Partial<Node>[];
  dataTypes?: Partial<Node>[];
  simpleTypes?: Partial<Node>[];
  description?: Partial<TextLanguage>;
  modelDescription?: Partial<TextLanguage>;
  isDescribedByUri?: string;
  dctType?: string;
  status?: string;
  issued?: string;
  modified?: string;
  validFromIncluding?: string;
  validToIncluding?: string;
  versionInfo?: string;
  license?: InformationModelLicense[];
  language?: InformationModelLanguage[];
  keyword?: Partial<TextLanguage>[];
  category?: string;
  homepage?: string;
  landingPage?: string;
  spatial?: SpatialRestriction[];
  concept?: Partial<Concept>;
  theme?: EuTheme[];
  losTheme?: LosTheme[];
  contactPoint?: Partial<InformationModelContactPoint>[];
  temporal?: Partial<TemporalRestriction>[];
  hasFormat?: Partial<InformationModelFormat>[];
  conformsTo?: Partial<DctStandard>[];
  isProfileOf?: Partial<DctStandard>[];
}

export interface ModelCodeElement {
  uri: string;
  identifier: string;
  prefLabel: Partial<TextLanguage> | null;
  inScheme: string[] | null;
  subject: string | null;
  notation: string | null;
  topConceptOf: string[] | null;
  definition: string[] | null;
  example: string[] | null;
  exclusionNote: Partial<TextLanguage> | null;
  previousElement: string[] | null;
  hiddenLabel: Partial<TextLanguage> | null;
  inclusionNote: Partial<TextLanguage> | null;
  note: Partial<TextLanguage> | null;
  nextElement: string[] | null;
  scopeNote: Partial<TextLanguage> | null;
  altLabel: Partial<TextLanguage> | null;
}

export interface InformationModelElement {
  uri: string;
  identifier: string;
  title: Partial<TextLanguage> | null;
  description: Partial<TextLanguage> | null;
  subject: string | null;
  belongsToModule: string | null;
  hasProperty: string[] | null;
  elementTypes: string[] | null;
  codeListReference: string | null;
  codes: Partial<ModelCodeElement>[] | null;
  typeDefinitionReference: string | null;
  length: number | null;
  minLength: number | null;
  maxLength: number | null;
  minInclusive: number | null;
  maxInclusive: number | null;
  pattern: number | null;
  totalDigits: number | null;
}

export interface InformationModelProperty {
  uri: string;
  identifier: string;
  title: Partial<TextLanguage> | null;
  description: Partial<TextLanguage> | null;
  subject: string | null;
  propertyTypes: string[] | null;
  minOccurs: number | null;
  maxOccurs: number | null;
  hasType: string[] | null;
  belongsToModule: string | null;
  isAbstractionOf: string | null;
  refersTo: string | null;
  hasDataType: string | null;
  hasSimpleType: string | null;
  hasObjectType: string | null;
  hasValueFrom: string | null;
  hasSome: string[] | null;
  hasMember: string | null;
  contains: string | null;
  hasSupplier: string | null;
  hasGeneralConcept: string | null;
  formsSymmetryWith: string | null;
  relationPropertyLabel: Partial<TextLanguage> | null;
}

interface InformationModelLicense {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

interface InformationModelLanguage {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

export interface Node {
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  belongsToModule: Partial<TextLanguage>;
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
  [LanguageCodes.nb]: string;
  [LanguageCodes.nn]: string;
  [LanguageCodes.en]: string;
  [LanguageCodes.no]: string;
  [LanguageCodes.none]: string;
}

export interface Organization {
  uri: string;
  homepage?: string;
  identifier?: string;
  name?: Partial<TextLanguage>;
  orgPath?: string;
  orgType?: PublicServiceLanguage;
  spatial?: string;
  title?: Partial<TextLanguage>;
  id: string;
  organizationId: string;
  prefLabel: Partial<TextLanguage>;
}

export interface Agent {
  homepage?: string[];
  identifier?: string;
  name?: Partial<TextLanguage>;
  orgPath?: string;
  orgType?: PublicServiceLanguage;
  playsRole: PlaysRole[];
  spatial: string[];
  title?: Partial<TextLanguage>;
  uri: string;
}

export interface PlaysRole {
  agent: string;
  description?: Partial<TextLanguage>;
  identifier: string;
  role: PublicServiceType[];
  uri: string;
}

export interface Harvest {
  firstHarvested: string;
  lastHarvested: string;
}

interface Metadata {
  firstHarvested?: string;
  modified?: string;
  deleted?: boolean;
  timestamp?: number;
}

export interface LosNodes {
  losNodes: LosTheme[];
}

export interface LosNode {
  name?: Partial<TextLanguage>;
  losPaths?: string;
}
export interface LosTheme {
  uri: string;
  name: Partial<TextLanguage>;
  losPaths?: string[];
}

export interface EuThemes {
  dataThemes: EuTheme[];
}
export interface EuTheme {
  id: string;
  label: Partial<TextLanguage>;
  title: Partial<TextLanguage>;
  code?: string;
}

export type Theme = LosTheme | EuTheme;

export interface Type {
  identifier: string;
  name: Partial<TextLanguage>;
}

export interface Property {
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  belongsToModule: string;
  parameters: any;
  type: Partial<Type>;
  isDescribedByUri: string;
  concept?: Partial<Concept>;
}

export interface AssociativeRelation {
  description: Partial<TextLanguage>;
  related: string;
}

export interface PartitiveRelation {
  description: Partial<TextLanguage>;
  hasPart: string;
  isPartOf: string;
}

export interface GenericRelation {
  divisioncriterion: Partial<TextLanguage>;
  generalizes: string;
  specializes: string;
}

export interface Concept {
  id: string;
  uri: string;
  identifier: string;
  prefLabel: Partial<TextLanguage>;
  altLabel?: Partial<TextLanguage>[];
  hiddenLabel?: Partial<TextLanguage>[];
  definition?: ConceptDefinition;
  definitions?: ConceptDefinition[];
  publisher: Partial<Organization>;
  example: Partial<TextLanguage>;
  subject?: Partial<ConceptSubject>[];
  application?: Partial<TextLanguage>[];
  harvest?: Partial<Harvest>;
  contactPoint?: Partial<ConceptContactPoint>;
  validFromIncluding?: string;
  validToIncluding?: string;
  seeAlso?: string[];
  isReplacedBy?: string[];
  replaces?: string[];
  associativeRelation?: Partial<AssociativeRelation>[];
  partitiveRelation?: Partial<PartitiveRelation>[];
  genericRelation?: Partial<GenericRelation>[];
  created?: string;
  memberOf?: string[];
  remark?: Partial<TextLanguage>;
  range?: { text?: Partial<TextLanguage>; uri?: stirng };
}

export interface ConceptDefinition {
  text?: Partial<TextLanguage>;
  remark?: Partial<TextLanguage>; // @deprecated
  targetGroup?: string;
  sources?: Array<{ text?: Partial<TextLanguage>; uri?: stirng }>;
  range?: { text?: Partial<TextLanguage>; uri?: stirng }; // @deprecated
  sourceRelationship?: string;
}

export interface ConceptSubject {
  label?: Partial<TextLanguage>;
}

export interface PublicServiceType {
  uri: string;
  prefLabel: Partial<TextLanguage>;
}

export interface PublicServiceLanguage {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

export interface PublicServiceOutput {
  uri: string;
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  type: Partial<Concept>[];
  language: PublicServiceLanguage[];
}

export interface PublicServiceCriterionRequirement {
  uri: string;
  identifier: string;
  name: Partial<TextLanguage>;
  type: Partial<Concept>[];
}

export interface PublicServiceRule {
  uri: string;
  identifier: string;
  name: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  language: PublicServiceLanguage[];
  implements: string[];
}

export interface PublicServiceRequirement {
  dctTitle: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  fulfils: string[];
  identifier: string;
  uri: string;
}

export interface PublicServiceLegalResource {
  dctTitle: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  relation: string[];
  seeAlso: string[];
  uri: string;
}

export interface PublicServiceInput {
  uri: string;
  identifier: string;
  name: Partial<TextLanguage>;
  description?: Partial<TextLanguage>;
  dctType: PublicServiceLanguage[];
  rdfType: string;
  language: PublicServiceLanguage[];
  page: string[];
}

export interface PublicServiceAgent {
  uri: string;
  identifier: string;
  title: Partial<TextLanguage>;
  name: string;
  playsRole: string[];
}

export interface PublicServiceParticipation {
  uri: string;
  identifier: string;
  description: Partial<TextLanguage>;
  role: PublicServiceType[];
  agents: PublicServiceAgent[];
}

export interface PublicServiceChannel {
  address: PublicServiceAddress[];
  channelType: PublicServiceLanguage;
  description: string;
  telephone: string[];
  email: string[];
  hasInput: string[];
  identifier: string;
  processingTime: string;
  uri: string;
  url: string[];
}

export interface PublicServiceCost {
  uri: string;
  identifier: string;
  description: Partial<TextLanguage>;
  currency: string;
  ifAccessedThrough: PublicServiceChannel;
  isDefinedBy: Partial<Organization>[];
  value: string;
}

interface PublicServiceContactPoint {
  uri: string;
  contactType: Partial<TextLanguage>;
  contactPage: string;
  email: string[];
  language: PublicServiceLanguage[];
  openingHours: Partial<TextLanguage>;
  telephone: string[];
}

export interface PublicService {
  id: string;
  type: EntityEnum.PUBLIC_SERVICE;
  specializedType?: str | null;
  uri: string;
  identifier: string;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  dctType?: PublicServiceType[];
  isDescribedAt?: Partial<PublicService>[];
  isGroupedBy?: string[];
  hasCompetentAuthority?: Partial<Organization>[];
  ownedBy?: Partial<Organization>[];
  admsStatus?: PublicServiceLanguage;
  harvest?: Partial<Harvest>;
  keyword?: Partial<TextLanguage>[];
  sector?: Partial<Concept>[];
  subject?: Partial<Concept>[];
  homepage?: string[];
  language?: PublicServiceLanguage[];
  requires?: PublicService[];
  produces?: PublicServiceOutput[];
  hasCriterion?: PublicServiceCriterionRequirement[];
  holdsRequirement?: PublicServiceRequirement[];
  follows?: PublicServiceRule[];
  hasLegalResource?: PublicServiceLegalResource[];
  hasInput?: PublicServiceInput[];
  hasParticipation?: PublicServiceParticipation[];
  hasChannel?: PublicServiceChannel[];
  processingTime?: string;
  hasCost?: PublicServiceCost[];
  relation?: PublicService[];
  contactPoint?: PublicServiceContactPoint[];
  associatedBroaderTypesByEvents?: string[];
  spatial: string[];
  participatingAgents: Partial<Agent>[];
}
export interface PublicServiceAddress {
  streetAddress: string;
  locality: string;
  postalCode: string;
  countryName: Partial<TextLanguage>;
}

export interface Event {
  id: string;
  uri: string;
  identifier: string;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  dctType?: SkosConcept[];
  harvest?: Partial<Harvest>;
  relation?: string[];
  specializedType?: SpecializedEventType;
}

export interface EventType {
  uri: string;
  prefLabel: Partial<TextLanguage>;
  broader?: string[];
}

export interface SkosConcept {
  id: string;
  uri: string;
  identifier: string;
  prefLabel: Partial<TextLanguage>;
}

export interface ESPage {
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface Provenance {
  code: string;
  prefLabel: Partial<TextLanguage>;
}

interface EuDataTheme {
  title?: Partial<TextLanguage>;
  code?: string;
}

interface AccessRights {
  code: string;
}

interface ContactPoint {
  email: string;
  uri: string;
  organizationUnit: string;
  organizationName: string;
  hasURL: string;
  hasTelephone: string;
}

interface InformationModelContactPoint {
  uri: string;
  fullname: string;
  email: string;
  organizationName: string;
  organizationUnit: string;
  hasURL: string;
  hasTelephone: string;
}

interface ConceptContactPoint {
  email: string;
  telephone: string;
}

interface SpatialRestriction {
  code: string;
  prefLabel: Partial<TextLanguage>;
  uri: string;
}

interface TemporalRestriction {
  startDate: string;
  endDate: string;
}

interface ReferenceTypes {
  referenceTypes: ReferenceType[];
}
interface ReferenceType {
  uri: string;
  code: string;
  label: Partial<TextLanguage>;
}

interface PrefLabelType {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

interface ApiSpecifications {
  apiSpecifications: ApiSpecification[];
}
interface ApiSpecification {
  uri: string;
  code: string;
  source: string;
  label: Partial<TextLanguage>;
}

interface DatasetReference {
  referenceType: PrefLabelType;
  source?: { uri?: string; prefLabel: Partial<TextLanguage> };
}

interface Annotation {
  hasBody: Partial<TextLanguage>;
}

interface AccrualPeriodicity {
  prefLabel: Partial<TextLanguage>;
}

interface DatasetType {
  uri: string;
  code: string;
  prefLabel: Partial<TextLanguage>;
}

interface Sample {
  description?: Partial<TextLanguage>;
  format: DataFormat[];
  accessURL: string[];
  downloadURL: string[];
}

interface LegalBasis {
  uri: string;
  prefLabel: Partial<TextLanguage>;
}

interface InSeries {
  uri: string;
  id: string;
  title: Partial<TextLanguage>;
}

export interface Dataset {
  id: string;
  uri: string;
  publisher: Partial<Organization>;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  descriptionFormatted: Partial<TextLanguage>;
  objective: Partial<TextLanguage>;
  keyword: Partial<TextLanguage>[];
  theme?: EuTheme[];
  losTheme?: LosTheme[];
  issued: string;
  modified: string;
  distribution: Distribution[];
  accessRights?: AccessRights;
  accrualPeriodicity?: AccrualPeriodicity;
  provenance?: Provenance;
  harvest: Partial<Harvest>;
  contactPoint: Partial<ContactPoint>[];
  spatial?: SpatialRestriction[];
  temporal?: TemporalRestriction[];
  references?: DatasetReference[];
  subject?: Partial<Concept>[];
  hasRelevanceAnnotation?: Partial<Annotation>;
  hasCompletenessAnnotation?: Partial<Annotation>;
  hasAccuracyAnnotation?: Partial<Annotation>;
  hasAvailabilityAnnotation?: Partial<Annotation>;
  hasCurrentnessAnnotation?: Partial<Annotation>;
  sample?: Sample[];
  legalBasisForRestriction?: LegalBasis[];
  legalBasisForProcessing?: LegalBasis[];
  legalBasisForAccess?: LegalBasis[];
  conformsTo: ConformsTo[];
  informationModel?: Partial<PrefLabelType>[];
  language?: Partial<PrefLabelType>[];
  landingPage: string[];
  qualifiedAttributions: QualifiedAttribution[];
  assessment?: Assessment;
  dctType?: DatasetType | string;
  specializedType?: SpecializedDatasetType;
  datasetsInSeries?: string[];
  inSeries?: InSeries;
  isOpenData: boolean;
}

export interface DataService {
  id: string;
  uri: string;
  publisher: Partial<Organization>;
  title: Partial<TextLanguage>;
  description?: Partial<TextLanguage>;
  descriptionFormatted?: Partial<TextLanguage>;
  nationalComponent: boolean;
  isOpenAccess: boolean;
  isOpenLicense: boolean;
  isFree: boolean;
  harvest?: Partial<Harvest>;
  fdkFormat?: Partial<MediaTypeOrExtent>[];
  endpointURL?: string[];
  endpointDescription?: string[];
  landingPage: string[];
  page: string[];
  conformsTo?: ConformsTo[];
  servesDataset?: string[];
  contactPoint?: Partial<ContactPoint>[];
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

export interface AccessService {
  description: Partial<TextLanguage>;
  endpointDescription?: string[];
  uri: string;
}

export interface Distribution {
  uri: string;
  title: Partial<TextLanguage>;
  description: Partial<TextLanguage>;
  fdkFormat: MediaTypeOrExtent[];
  license: License[];
  accessURL: string[];
  downloadURL: string[];
  conformsTo: ConformsTo[];
  page?: Page[];
  accessService?: AccessService[];
}

export interface MediaTypeOrExtent {
  uri?: string;
  name?: string;
  code: string;
  type: MediaTypeOrExtentType;
}

export interface ReferenceData {
  los?: LosNodes;
  themes?: EuThemes;
  referencetypes?: ReferenceTypes;
  apispecifications?: ApiSpecifications;
  audiencetypes?: AudienceTypes;
  relationshipwithsourcetypes?: RelationshipWithSourceTypes;
}

export interface ReferenceDataType {
  uri: string;
  code?: string;
  label?: Partial<TextLanguage>;
}

export interface AudienceTypes {
  audienceTypes: ReferenceDataType[];
}

export interface RelationshipWithSourceTypes {
  relationshipWithSourceTypes: ReferenceDataType[];
}

export interface ReferenceDataCode {
  uri?: string;
  code?: string;
  prefLabel?: Partial<TextLanguage>;
}

export interface Link {
  href: string;
}
export interface Links {
  next: Link;
  self: Link;
}

export interface NewsItemAttributes {
  title?: string;
  created?: string;
  changed?: string;
  field_ingress?: string;
  field_modules: any;
}

export interface News extends NewsItemAttributes {
  type: string;
  id: string;
  links: Partial<Links>;
}

export interface OrganizationCategory {
  category: OrganizationCatalogSummary;
  organizations: OrganizationCatalogSummary[];
}

export interface OrganizationCatalogSummary {
  id: string;
  name: string;
  prefLabel: Partial<TextLanguage>;
  orgPath: string;
  datasetCount: number;
  conceptCount: number;
  dataserviceCount: number;
  informationmodelCount: number;
}

interface QualifiedAttribution {
  agent: Partial<Organization>;
  role: string;
}

export interface TimeSeriesPoint {
  date: string;
  count: number;
}

export interface TimeSeriesRequest {
  start: string;
  end: string;
  interval: string;
  filters: TimeSeriesFilters;
}

interface TimeSeriesFilters {
  resourceType: { value: string } | null;
  orgPath: { value: string } | null;
  transport: { value: boolean } | null;
}

interface Report {
  totalObjects: number;
  newLastWeek: number;
  organizationCount: number;
  catalogs: CatalogWithCountObject[];
}

export interface DatasetsReport extends Report {
  formats: KeyWithCountObject[];
  nationalComponent: number;
  opendata: number;
  withSubject: number;
  accessRights: KeyWithCountObject[];
  themesAndTopicsCount: KeyWithCountObject[];
}

export interface ConceptsReport extends Report {
  mostInUse: KeyWithCountObject[];
}

export interface DataServiceReport extends Report {
  formats: KeyWithCountObject[];
}

export interface KeyWithCountObject {
  key: string;
  count: number;
}

export interface CatalogWithCountObject {
  title: TextLanguage;
  count: number;
}

export interface DatasetScoresRequest {
  datasets: string[];
}

export interface DatasetScores {
  scores: Record<string, DatasetScore>;
  aggregations: MetadataQualityAggregationScore[];
}

export interface DatasetScore {
  dataset: MetadataQualityScore;
  distributions: MetadataQualityScore[];
}

export interface MetadataQualityMetricScore {
  id: string;
  score: number;
  max_score: number;
  is_scored: boolean;
}

export interface MetadataQualityDimensionScore {
  id: string;
  metrics: MetadataQualityMetricScore[];
  score: number;
  max_score: number;
}

export interface MetadataQualityScore {
  id: string;
  dimensions: MetadataQualityDimensionScore[];
  score: number;
  max_score: number;
}

export interface MetadataQualityAggregationScore {
  id: string;
  score: number;
  max_score: number;
}

export interface OrganizationCountsAndRating {
  organization: {
    organizationId: string;
    orgType: string;
    sectorCode: string;
    industryCode: string;
    homepage: string;
    numberOfEmployees: number;
  };
  datasets: {
    totalCount: number;
    newCount: number;
    authoritativeCount: number;
    openCount: number;
    quality: {
      score: number;
      percentage: number;
    };
  };
  dataservices: {
    totalCount: number;
    newCount: number;
  };
  concepts: {
    totalCount: number;
    newCount: number;
  };
  informationmodels: {
    totalCount: number;
    newCount: number;
  };
}

interface EnhetsregisteretAdresse {
  land: string;
  landkode: string;
  postnummer: string;
  poststed: string;
  adresse: string[];
  kommune: string;
  kommunenummer: string;
}

export interface EnhetsregisteretOrganization {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform: {
    kode: string;
    beskrivelse: string;
  };
  hjemmeside: string;
  postadresse: EnhetsregisteretAdresse;
  naeringskode1: {
    beskrivelse: string;
    kode: string;
  };
  forretningsadresse: EnhetsregisteretAdresse;
  institusjonellSektorkode: {
    kode: string;
    beskrivelse: string;
  };
}

export type Entity =
  | Dataset
  | DataService
  | Concept
  | InformationModel
  | PublicService
  | Event;

export interface DropdownMenuItem {
  label: string;
}

export interface DropdownButtonItem extends DropdownMenuItem {
  onClick: () => void;
}

export interface DropdownLinkItem extends DropdownMenuItem {
  url: string;
}

export interface InvertedColorProps {
  inverted?: boolean;
}

export interface AdministrativeUnit {
  uri: string;
  type: AdministrativeUnitType;
  name: Partial<TextLanguage>;
}

export interface Language {
  code: string;
  selected?: boolean;
  disabled?: boolean;
}

export interface CommunityCategory {
  cid: number;
  name: string;
  slug: string;
  icon: string;
  backgroundImage: string;
  imageClass: string;
  bgColor: string;
  color: string;
  disabled: number;
  topics: CommunityTopic[];
}

export interface UserFeedbackPagination {
  currentPage: number;
  pageCount: number;
  totalPosts: number;
}

export interface CommunityTopic {
  tid: number;
  uid: number;
  cid: number;
  title: string;
  slug: string;
  mainPid: number;
  posts: CommunityPost[];
  postcount: number;
  viewcount: number;
  postercount: number;
  scheduled: number;
  deleted: 1 | 0;
  deleterUid: number;
  titleRaw: string;
  locked: number;
  pinned: number;
  timestamp: number;
  timestampISO: string;
  lastposttime: number;
  lastposttimeISO: string;
  pinExpiry: number;
  pinExpiryISO: string;
  upvotes: number;
  downvotes: number;
  votes: number;
  teaserPid: number;
  numThumbs: number;
  category: CommunityCategory;
  user: CommunityUser;
  teaser: CommunityTeaser;
  tags: CommunityTag[] | undefined;
  isOwner: boolean;
  ignored: boolean;
  unread: boolean;
  bookmark: number;
  unreplied: boolean;
  icons: string[];
  thumb: string;
  index: number;
  pagination: UserFeedbackPagination;
}

export interface CommunityUser {
  uid: string;
  username: string;
  displayname: string;
  fullname: string;
  userslug: string;
  reputation: number;
  postcount: number;
  picture?: string;
  signature?: string;
  banned: number;
  status: string;
  'icon:text': string;
  'icon:bgColor': string;
  banned_until_readable: string;
}

export interface CommunityPost {
  pid: string;
  tid: number;
  toPid?: string;
  content: string;
  uid: string | number;
  timestamp: number;
  deleted: boolean;
  upvotes: number;
  downvotes: number;
  votes: number;
  timestampISO: string;
  user: CommunityUser;
  topic: CommunityTopic;
  category: CommunityCategory;
  isMainPost: boolean;
  replies: number;
  index: number;
  page?: number;
  multiplePages: boolean;
  pagination: Pagination;
  posts: CommunityRequestPost[];
}

export interface CommunityRequestPost {
  category: CommunityCategory;
  deleted: boolean;
  downvotes: number;
  isMainPost: boolean;
  pid: number;
  replies: number;
  tid: number;
  timestap: number;
  timestampISO: string;
  topic: CommunityTopic;
  uid: number;
  upvotes: number;
  votes: number;
  user: CommunityUser;
}

export interface Pagination {
  currentPage: number;
  pageCount: number;
}

export interface CommunityTeaser {
  pid: number;
  uid: number;
  timestamp: number;
  tid: number;
  content: string;
  timestampISO: string;
  user: CommunityUser;
  index: number;
}

export interface CommunityTag {
  value: string;
  valueEscaped: string;
  color: string;
  bgColor: string;
  score: number;
}

export interface InformationModelFormat {
  uri: string;
  title: Partial<TextLanguage>;
  format: string;
  language: string;
  seeAlso?: string;
}

export interface DctStandard {
  uri: string;
  title: Partial<TextLanguage>;
  seeAlso: string[];
  versionInfo: string;
}

export interface DatasetPreview {
  table: PreviewTable;
  plain: PreviewPlain;
}

export interface PreviewPlain {
  value: string;
  contentType: string;
}

export interface PreviewTable {
  header: PreviewTableRow;
  rows: PreviewTableRow[];
}

export interface PreviewTableRow {
  columns: string[];
}

export interface SearchSuggestion {
  id: string;
  title?: Partial<TextLanguage>;
  description?: Partial<TextLanguage>;
  uri?: string;
  organization?: Organization;
  searchType: EntityEnum;
}

export interface Comment {
  commentId: string;
  userId: string;
  content: string;
  timestamp: string;
  toCommentId: string;
}

export interface CommentThread {
  threadId: string;
  title: string;
  comments?: Partial<Comment[]>;
  timestamp: string;
  content: string;
}
export interface SelectOption {
  value: string;
  label: string;
}

export interface AiProject {
  id: number;
  prosjekteier: string;
  prosjekttittel: string;
  departement?: string;
  eiertype?: string;
  kontaktperson?: string;
  prosjektBeskrivelse?: string;
  prosjektFormaal?: string;
  prosjektstart?: number;
  prosjektslutt?: number;
  tilknyttedeOrganisasjoner?: string;
  innleideKonsulenter?: string;
  lenkeTilProsjekt?: string;
  status?: string;
  typeData?: string;
  datakilde?: string;
  modellutvikling?: string;
  klassifisering?: string;
}

export interface SearchSort {
  field: string;
  direction: string;
}

export interface SearchFilters {
  id?: string;
  opendata?: boolean;
  accessrights?: string;
  theme?: string;
  spatial?: string;
  provenance?: string;
  losTheme?: string;
  orgPath?: string;
  format?: string;
  relations?: string;
  lastXDays?: number;
  uri?: string[];
  keyword?: string[];
}

export type SearchQuery = {
  q?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
  sortfield?: string | undefined;
} & SearchFilters;

export type AccessRequest = {
  id: string;
  requestAddress: string;
};
