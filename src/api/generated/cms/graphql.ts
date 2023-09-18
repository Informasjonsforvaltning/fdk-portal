import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  FancyArticleContentDynamicZoneInput: { input: any; output: any };
  I18NLocaleCode: { input: any; output: any };
  JSON: { input: any; output: any };
  TransportArticleContentDynamicZoneInput: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type Article = {
  __typename?: 'Article';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  excerpt: Scalars['String']['output'];
  featureImage?: Maybe<UploadFileEntityResponse>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<ArticleRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ArticleLocalizationsArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleEntity = {
  __typename?: 'ArticleEntity';
  attributes?: Maybe<Article>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ArticleEntityResponse = {
  __typename?: 'ArticleEntityResponse';
  data?: Maybe<ArticleEntity>;
};

export type ArticleEntityResponseCollection = {
  __typename?: 'ArticleEntityResponseCollection';
  data: Array<ArticleEntity>;
  meta: ResponseCollectionMeta;
};

export type ArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  excerpt?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ArticleFiltersInput>;
  not?: InputMaybe<ArticleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  featureImage?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ArticleRelationResponseCollection = {
  __typename?: 'ArticleRelationResponseCollection';
  data: Array<ArticleEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponentBasicImage = {
  __typename?: 'ComponentBasicImage';
  alternativeText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  media?: Maybe<UploadFileEntityResponse>;
  style?: Maybe<Enum_Componentbasicimage_Style>;
};

export type ComponentBasicParagraph = {
  __typename?: 'ComponentBasicParagraph';
  Content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentBasicQuote = {
  __typename?: 'ComponentBasicQuote';
  author?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ComponentBasicYoutube = {
  __typename?: 'ComponentBasicYoutube';
  id: Scalars['ID']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum Enum_Componentbasicimage_Style {
  FullSize = 'fullSize',
  Left = 'left',
  None = 'none',
  Right = 'right'
}

export enum Enum_Servicemessage_Environment {
  Production = 'production',
  Staging = 'staging'
}

export enum Enum_Servicemessage_Message_Type {
  Error = 'ERROR',
  Info = 'INFO',
  Warning = 'WARNING'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type FancyArticle = {
  __typename?: 'FancyArticle';
  Content?: Maybe<Array<Maybe<FancyArticleContentDynamicZone>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<FancyArticleRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FancyArticleLocalizationsArgs = {
  filters?: InputMaybe<FancyArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type FancyArticleContentDynamicZone =
  | ComponentBasicImage
  | ComponentBasicParagraph
  | ComponentBasicQuote
  | Error;

export type FancyArticleEntity = {
  __typename?: 'FancyArticleEntity';
  attributes?: Maybe<FancyArticle>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type FancyArticleEntityResponse = {
  __typename?: 'FancyArticleEntityResponse';
  data?: Maybe<FancyArticleEntity>;
};

export type FancyArticleEntityResponseCollection = {
  __typename?: 'FancyArticleEntityResponseCollection';
  data: Array<FancyArticleEntity>;
  meta: ResponseCollectionMeta;
};

export type FancyArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FancyArticleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<FancyArticleFiltersInput>;
  not?: InputMaybe<FancyArticleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FancyArticleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FancyArticleInput = {
  Content?: InputMaybe<
    Array<Scalars['FancyArticleContentDynamicZoneInput']['input']>
  >;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FancyArticleRelationResponseCollection = {
  __typename?: 'FancyArticleRelationResponseCollection';
  data: Array<FancyArticleEntity>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph =
  | Article
  | ComponentBasicImage
  | ComponentBasicParagraph
  | ComponentBasicQuote
  | ComponentBasicYoutube
  | FancyArticle
  | I18NLocale
  | ServiceMessage
  | TransportArticle
  | UploadFile
  | UploadFolder
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createArticle?: Maybe<ArticleEntityResponse>;
  createArticleLocalization?: Maybe<ArticleEntityResponse>;
  createFancyArticle?: Maybe<FancyArticleEntityResponse>;
  createFancyArticleLocalization?: Maybe<FancyArticleEntityResponse>;
  createServiceMessage?: Maybe<ServiceMessageEntityResponse>;
  createServiceMessageLocalization?: Maybe<ServiceMessageEntityResponse>;
  createTransportArticle?: Maybe<TransportArticleEntityResponse>;
  createTransportArticleLocalization?: Maybe<TransportArticleEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteArticle?: Maybe<ArticleEntityResponse>;
  deleteFancyArticle?: Maybe<FancyArticleEntityResponse>;
  deleteServiceMessage?: Maybe<ServiceMessageEntityResponse>;
  deleteTransportArticle?: Maybe<TransportArticleEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateArticle?: Maybe<ArticleEntityResponse>;
  updateFancyArticle?: Maybe<FancyArticleEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateServiceMessage?: Maybe<ServiceMessageEntityResponse>;
  updateTransportArticle?: Maybe<TransportArticleEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};

export type MutationCreateArticleArgs = {
  data: ArticleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationCreateArticleLocalizationArgs = {
  data?: InputMaybe<ArticleInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationCreateFancyArticleArgs = {
  data: FancyArticleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationCreateFancyArticleLocalizationArgs = {
  data?: InputMaybe<FancyArticleInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationCreateServiceMessageArgs = {
  data: ServiceMessageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationCreateServiceMessageLocalizationArgs = {
  data?: InputMaybe<ServiceMessageInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationCreateTransportArticleArgs = {
  data: TransportArticleInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationCreateTransportArticleLocalizationArgs = {
  data?: InputMaybe<TransportArticleInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationDeleteFancyArticleArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationDeleteServiceMessageArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationDeleteTransportArticleArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  files: Array<InputMaybe<Scalars['Upload']['input']>>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};

export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};

export type MutationUpdateArticleArgs = {
  data: ArticleInput;
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationUpdateFancyArticleArgs = {
  data: FancyArticleInput;
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateServiceMessageArgs = {
  data: ServiceMessageInput;
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationUpdateTransportArticleArgs = {
  data: TransportArticleInput;
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  article?: Maybe<ArticleEntityResponse>;
  articles?: Maybe<ArticleEntityResponseCollection>;
  fancyArticle?: Maybe<FancyArticleEntityResponse>;
  fancyArticles?: Maybe<FancyArticleEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  serviceMessage?: Maybe<ServiceMessageEntityResponse>;
  serviceMessages?: Maybe<ServiceMessageEntityResponseCollection>;
  transportArticle?: Maybe<TransportArticleEntityResponse>;
  transportArticles?: Maybe<TransportArticleEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};

export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type QueryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryFancyArticleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type QueryFancyArticlesArgs = {
  filters?: InputMaybe<FancyArticleFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryServiceMessageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type QueryServiceMessagesArgs = {
  filters?: InputMaybe<ServiceMessageFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryTransportArticleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
};

export type QueryTransportArticlesArgs = {
  filters?: InputMaybe<TransportArticleFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type ServiceMessage = {
  __typename?: 'ServiceMessage';
  channel_adminportal?: Maybe<Scalars['Boolean']['output']>;
  channel_publiseringportal?: Maybe<Scalars['Boolean']['output']>;
  channel_registreringportal?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  environment: Enum_Servicemessage_Environment;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<ServiceMessageRelationResponseCollection>;
  message_type: Enum_Servicemessage_Message_Type;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  short_description: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  valid_from: Scalars['DateTime']['output'];
  valid_to?: Maybe<Scalars['DateTime']['output']>;
};

export type ServiceMessageLocalizationsArgs = {
  filters?: InputMaybe<ServiceMessageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ServiceMessageEntity = {
  __typename?: 'ServiceMessageEntity';
  attributes?: Maybe<ServiceMessage>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ServiceMessageEntityResponse = {
  __typename?: 'ServiceMessageEntityResponse';
  data?: Maybe<ServiceMessageEntity>;
};

export type ServiceMessageEntityResponseCollection = {
  __typename?: 'ServiceMessageEntityResponseCollection';
  data: Array<ServiceMessageEntity>;
  meta: ResponseCollectionMeta;
};

export type ServiceMessageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ServiceMessageFiltersInput>>>;
  channel_adminportal?: InputMaybe<BooleanFilterInput>;
  channel_publiseringportal?: InputMaybe<BooleanFilterInput>;
  channel_registreringportal?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  environment?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<ServiceMessageFiltersInput>;
  message_type?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ServiceMessageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ServiceMessageFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  short_description?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  valid_from?: InputMaybe<DateTimeFilterInput>;
  valid_to?: InputMaybe<DateTimeFilterInput>;
};

export type ServiceMessageInput = {
  channel_adminportal?: InputMaybe<Scalars['Boolean']['input']>;
  channel_publiseringportal?: InputMaybe<Scalars['Boolean']['input']>;
  channel_registreringportal?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  environment?: InputMaybe<Enum_Servicemessage_Environment>;
  message_type?: InputMaybe<Enum_Servicemessage_Message_Type>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  short_description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  valid_from?: InputMaybe<Scalars['DateTime']['input']>;
  valid_to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ServiceMessageRelationResponseCollection = {
  __typename?: 'ServiceMessageRelationResponseCollection';
  data: Array<ServiceMessageEntity>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TransportArticle = {
  __typename?: 'TransportArticle';
  Content?: Maybe<Array<Maybe<TransportArticleContentDynamicZone>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  locale?: Maybe<Scalars['String']['output']>;
  localizations?: Maybe<TransportArticleRelationResponseCollection>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TransportArticleLocalizationsArgs = {
  filters?: InputMaybe<TransportArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TransportArticleContentDynamicZone =
  | ComponentBasicImage
  | ComponentBasicParagraph
  | ComponentBasicQuote
  | ComponentBasicYoutube
  | Error;

export type TransportArticleEntity = {
  __typename?: 'TransportArticleEntity';
  attributes?: Maybe<TransportArticle>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TransportArticleEntityResponse = {
  __typename?: 'TransportArticleEntityResponse';
  data?: Maybe<TransportArticleEntity>;
};

export type TransportArticleEntityResponseCollection = {
  __typename?: 'TransportArticleEntityResponseCollection';
  data: Array<TransportArticleEntity>;
  meta: ResponseCollectionMeta;
};

export type TransportArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TransportArticleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<TransportArticleFiltersInput>;
  not?: InputMaybe<TransportArticleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TransportArticleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TransportArticleInput = {
  Content?: InputMaybe<
    Array<Scalars['TransportArticleContentDynamicZoneInput']['input']>
  >;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TransportArticleRelationResponseCollection = {
  __typename?: 'TransportArticleRelationResponseCollection';
  data: Array<TransportArticleEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  ext?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['ID']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  formats?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String']['output'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String']['output'];
  pathId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  pathId?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type GetFancyArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetFancyArticleQuery = {
  __typename?: 'Query';
  fancyArticle?: {
    __typename?: 'FancyArticleEntityResponse';
    data?: {
      __typename?: 'FancyArticleEntity';
      attributes?: {
        __typename?: 'FancyArticle';
        title?: string | null;
        subtitle?: string | null;
        locale?: string | null;
        localizations?: {
          __typename?: 'FancyArticleRelationResponseCollection';
          data: Array<{
            __typename?: 'FancyArticleEntity';
            attributes?: {
              __typename?: 'FancyArticle';
              title?: string | null;
              subtitle?: string | null;
              Content?: Array<
                | {
                    __typename: 'ComponentBasicImage';
                    style?: Enum_Componentbasicimage_Style | null;
                    media?: {
                      __typename?: 'UploadFileEntityResponse';
                      data?: {
                        __typename?: 'UploadFileEntity';
                        attributes?: {
                          __typename?: 'UploadFile';
                          alternativeText?: string | null;
                          url: string;
                          caption?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename: 'ComponentBasicParagraph';
                    Content?: string | null;
                  }
                | { __typename?: 'ComponentBasicQuote' }
                | { __typename?: 'Error' }
                | null
              > | null;
            } | null;
          }>;
        } | null;
        Content?: Array<
          | {
              __typename: 'ComponentBasicImage';
              style?: Enum_Componentbasicimage_Style | null;
              media?: {
                __typename?: 'UploadFileEntityResponse';
                data?: {
                  __typename?: 'UploadFileEntity';
                  attributes?: {
                    __typename?: 'UploadFile';
                    alternativeText?: string | null;
                    url: string;
                    caption?: string | null;
                  } | null;
                } | null;
              } | null;
            }
          | { __typename: 'ComponentBasicParagraph'; Content?: string | null }
          | { __typename?: 'ComponentBasicQuote' }
          | { __typename?: 'Error' }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetFancyArticleTitleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetFancyArticleTitleQuery = {
  __typename?: 'Query';
  fancyArticle?: {
    __typename?: 'FancyArticleEntityResponse';
    data?: {
      __typename?: 'FancyArticleEntity';
      attributes?: {
        __typename?: 'FancyArticle';
        title?: string | null;
        localizations?: {
          __typename?: 'FancyArticleRelationResponseCollection';
          data: Array<{
            __typename?: 'FancyArticleEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'FancyArticle';
              title?: string | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetArticleQuery = {
  __typename?: 'Query';
  article?: {
    __typename?: 'ArticleEntityResponse';
    data?: {
      __typename?: 'ArticleEntity';
      attributes?: {
        __typename?: 'Article';
        title: string;
        content: string;
        publishedAt?: any | null;
        updatedAt?: any | null;
        locale?: string | null;
        featureImage?: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            attributes?: { __typename?: 'UploadFile'; url: string } | null;
          } | null;
        } | null;
        localizations?: {
          __typename?: 'ArticleRelationResponseCollection';
          data: Array<{
            __typename?: 'ArticleEntity';
            attributes?: {
              __typename?: 'Article';
              title: string;
              content: string;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetServiceMessagesQueryVariables = Exact<{
  today?: InputMaybe<Scalars['DateTime']['input']>;
  channelPubliseringPortal?: InputMaybe<Scalars['Boolean']['input']>;
  env?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetServiceMessagesQuery = {
  __typename?: 'Query';
  serviceMessages?: {
    __typename?: 'ServiceMessageEntityResponseCollection';
    data: Array<{
      __typename?: 'ServiceMessageEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'ServiceMessage';
        title: string;
        valid_from: any;
        valid_to?: any | null;
        message_type: Enum_Servicemessage_Message_Type;
        short_description: string;
        description?: string | null;
        environment: Enum_Servicemessage_Environment;
        channel_publiseringportal?: boolean | null;
        locale?: string | null;
        localizations?: {
          __typename?: 'ServiceMessageRelationResponseCollection';
          data: Array<{
            __typename?: 'ServiceMessageEntity';
            attributes?: {
              __typename?: 'ServiceMessage';
              title: string;
              short_description: string;
              description?: string | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetServiceMessageQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetServiceMessageQuery = {
  __typename?: 'Query';
  serviceMessage?: {
    __typename?: 'ServiceMessageEntityResponse';
    data?: {
      __typename?: 'ServiceMessageEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'ServiceMessage';
        title: string;
        valid_from: any;
        valid_to?: any | null;
        message_type: Enum_Servicemessage_Message_Type;
        short_description: string;
        description?: string | null;
        locale?: string | null;
        localizations?: {
          __typename?: 'ServiceMessageRelationResponseCollection';
          data: Array<{
            __typename?: 'ServiceMessageEntity';
            attributes?: {
              __typename?: 'ServiceMessage';
              title: string;
              short_description: string;
              description?: string | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetTransportArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetTransportArticleQuery = {
  __typename?: 'Query';
  transportArticle?: {
    __typename?: 'TransportArticleEntityResponse';
    data?: {
      __typename?: 'TransportArticleEntity';
      attributes?: {
        __typename?: 'TransportArticle';
        title?: string | null;
        subtitle?: string | null;
        locale?: string | null;
        localizations?: {
          __typename?: 'TransportArticleRelationResponseCollection';
          data: Array<{
            __typename?: 'TransportArticleEntity';
            attributes?: {
              __typename?: 'TransportArticle';
              title?: string | null;
              subtitle?: string | null;
              Content?: Array<
                | {
                    __typename: 'ComponentBasicImage';
                    style?: Enum_Componentbasicimage_Style | null;
                    media?: {
                      __typename?: 'UploadFileEntityResponse';
                      data?: {
                        __typename?: 'UploadFileEntity';
                        attributes?: {
                          __typename?: 'UploadFile';
                          alternativeText?: string | null;
                          url: string;
                          caption?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename: 'ComponentBasicParagraph';
                    Content?: string | null;
                  }
                | { __typename?: 'ComponentBasicQuote' }
                | { __typename: 'ComponentBasicYoutube'; url?: string | null }
                | { __typename?: 'Error' }
                | null
              > | null;
            } | null;
          }>;
        } | null;
        Content?: Array<
          | {
              __typename: 'ComponentBasicImage';
              style?: Enum_Componentbasicimage_Style | null;
              media?: {
                __typename?: 'UploadFileEntityResponse';
                data?: {
                  __typename?: 'UploadFileEntity';
                  attributes?: {
                    __typename?: 'UploadFile';
                    alternativeText?: string | null;
                    url: string;
                    caption?: string | null;
                  } | null;
                } | null;
              } | null;
            }
          | { __typename: 'ComponentBasicParagraph'; Content?: string | null }
          | { __typename?: 'ComponentBasicQuote' }
          | { __typename: 'ComponentBasicYoutube'; url?: string | null }
          | { __typename?: 'Error' }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetTransportArticleTitleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetTransportArticleTitleQuery = {
  __typename?: 'Query';
  transportArticle?: {
    __typename?: 'TransportArticleEntityResponse';
    data?: {
      __typename?: 'TransportArticleEntity';
      attributes?: {
        __typename?: 'TransportArticle';
        title?: string | null;
        localizations?: {
          __typename?: 'TransportArticleRelationResponseCollection';
          data: Array<{
            __typename?: 'TransportArticleEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'TransportArticle';
              title?: string | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export const GetFancyArticleDocument = gql`
  query GetFancyArticle($id: ID!) {
    fancyArticle(id: $id) {
      data {
        attributes {
          title
          subtitle
          locale
          localizations {
            data {
              attributes {
                title
                subtitle
                Content {
                  ... on ComponentBasicParagraph {
                    __typename
                    Content
                  }
                  ... on ComponentBasicImage {
                    __typename
                    media {
                      data {
                        attributes {
                          alternativeText
                          url
                          caption
                        }
                      }
                    }
                    style
                  }
                }
              }
            }
          }
          Content {
            ... on ComponentBasicParagraph {
              __typename
              Content
            }
            ... on ComponentBasicImage {
              __typename
              media {
                data {
                  attributes {
                    alternativeText
                    url
                    caption
                  }
                }
              }
              style
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetFancyArticleQuery__
 *
 * To run a query within a React component, call `useGetFancyArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFancyArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFancyArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFancyArticleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFancyArticleQuery,
    GetFancyArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFancyArticleQuery, GetFancyArticleQueryVariables>(
    GetFancyArticleDocument,
    options
  );
}
export function useGetFancyArticleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFancyArticleQuery,
    GetFancyArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFancyArticleQuery,
    GetFancyArticleQueryVariables
  >(GetFancyArticleDocument, options);
}
export type GetFancyArticleQueryHookResult = ReturnType<
  typeof useGetFancyArticleQuery
>;
export type GetFancyArticleLazyQueryHookResult = ReturnType<
  typeof useGetFancyArticleLazyQuery
>;
export type GetFancyArticleQueryResult = Apollo.QueryResult<
  GetFancyArticleQuery,
  GetFancyArticleQueryVariables
>;
export const GetFancyArticleTitleDocument = gql`
  query GetFancyArticleTitle($id: ID!) {
    fancyArticle(id: $id) {
      data {
        attributes {
          title
          localizations {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetFancyArticleTitleQuery__
 *
 * To run a query within a React component, call `useGetFancyArticleTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFancyArticleTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFancyArticleTitleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFancyArticleTitleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFancyArticleTitleQuery,
    GetFancyArticleTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFancyArticleTitleQuery,
    GetFancyArticleTitleQueryVariables
  >(GetFancyArticleTitleDocument, options);
}
export function useGetFancyArticleTitleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFancyArticleTitleQuery,
    GetFancyArticleTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFancyArticleTitleQuery,
    GetFancyArticleTitleQueryVariables
  >(GetFancyArticleTitleDocument, options);
}
export type GetFancyArticleTitleQueryHookResult = ReturnType<
  typeof useGetFancyArticleTitleQuery
>;
export type GetFancyArticleTitleLazyQueryHookResult = ReturnType<
  typeof useGetFancyArticleTitleLazyQuery
>;
export type GetFancyArticleTitleQueryResult = Apollo.QueryResult<
  GetFancyArticleTitleQuery,
  GetFancyArticleTitleQueryVariables
>;
export const GetArticleDocument = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      data {
        attributes {
          title
          featureImage {
            data {
              attributes {
                url
              }
            }
          }
          content
          publishedAt
          updatedAt
          locale
          localizations {
            data {
              attributes {
                title
                content
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetArticleQuery__
 *
 * To run a query within a React component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArticleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetArticleQuery,
    GetArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetArticleQuery, GetArticleQueryVariables>(
    GetArticleDocument,
    options
  );
}
export function useGetArticleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetArticleQuery,
    GetArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetArticleQuery, GetArticleQueryVariables>(
    GetArticleDocument,
    options
  );
}
export type GetArticleQueryHookResult = ReturnType<typeof useGetArticleQuery>;
export type GetArticleLazyQueryHookResult = ReturnType<
  typeof useGetArticleLazyQuery
>;
export type GetArticleQueryResult = Apollo.QueryResult<
  GetArticleQuery,
  GetArticleQueryVariables
>;
export const GetServiceMessagesDocument = gql`
  query GetServiceMessages(
    $today: DateTime
    $channelPubliseringPortal: Boolean
    $env: String
  ) {
    serviceMessages(
      filters: {
        valid_from: { lte: $today }
        valid_to: { gte: $today }
        channel_publiseringportal: { eq: $channelPubliseringPortal }
        environment: { eq: $env }
      }
      sort: "valid_from:desc"
    ) {
      data {
        id
        attributes {
          title
          valid_from
          valid_to
          message_type
          short_description
          description
          environment
          channel_publiseringportal
          locale
          localizations {
            data {
              attributes {
                title
                short_description
                description
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetServiceMessagesQuery__
 *
 * To run a query within a React component, call `useGetServiceMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceMessagesQuery({
 *   variables: {
 *      today: // value for 'today'
 *      channelPubliseringPortal: // value for 'channelPubliseringPortal'
 *      env: // value for 'env'
 *   },
 * });
 */
export function useGetServiceMessagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetServiceMessagesQuery,
    GetServiceMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetServiceMessagesQuery,
    GetServiceMessagesQueryVariables
  >(GetServiceMessagesDocument, options);
}
export function useGetServiceMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetServiceMessagesQuery,
    GetServiceMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetServiceMessagesQuery,
    GetServiceMessagesQueryVariables
  >(GetServiceMessagesDocument, options);
}
export type GetServiceMessagesQueryHookResult = ReturnType<
  typeof useGetServiceMessagesQuery
>;
export type GetServiceMessagesLazyQueryHookResult = ReturnType<
  typeof useGetServiceMessagesLazyQuery
>;
export type GetServiceMessagesQueryResult = Apollo.QueryResult<
  GetServiceMessagesQuery,
  GetServiceMessagesQueryVariables
>;
export const GetServiceMessageDocument = gql`
  query GetServiceMessage($id: ID!) {
    serviceMessage(id: $id) {
      data {
        id
        attributes {
          title
          valid_from
          valid_to
          message_type
          short_description
          description
          locale
          localizations {
            data {
              attributes {
                title
                short_description
                description
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetServiceMessageQuery__
 *
 * To run a query within a React component, call `useGetServiceMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceMessageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceMessageQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetServiceMessageQuery,
    GetServiceMessageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetServiceMessageQuery,
    GetServiceMessageQueryVariables
  >(GetServiceMessageDocument, options);
}
export function useGetServiceMessageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetServiceMessageQuery,
    GetServiceMessageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetServiceMessageQuery,
    GetServiceMessageQueryVariables
  >(GetServiceMessageDocument, options);
}
export type GetServiceMessageQueryHookResult = ReturnType<
  typeof useGetServiceMessageQuery
>;
export type GetServiceMessageLazyQueryHookResult = ReturnType<
  typeof useGetServiceMessageLazyQuery
>;
export type GetServiceMessageQueryResult = Apollo.QueryResult<
  GetServiceMessageQuery,
  GetServiceMessageQueryVariables
>;
export const GetTransportArticleDocument = gql`
  query GetTransportArticle($id: ID!) {
    transportArticle(id: $id) {
      data {
        attributes {
          title
          subtitle
          locale
          localizations {
            data {
              attributes {
                title
                subtitle
                Content {
                  ... on ComponentBasicParagraph {
                    __typename
                    Content
                  }
                  ... on ComponentBasicImage {
                    __typename
                    media {
                      data {
                        attributes {
                          alternativeText
                          url
                          caption
                        }
                      }
                    }
                    style
                  }
                  ... on ComponentBasicYoutube {
                    __typename
                    url
                  }
                }
              }
            }
          }
          Content {
            ... on ComponentBasicParagraph {
              __typename
              Content
            }
            ... on ComponentBasicImage {
              __typename
              media {
                data {
                  attributes {
                    alternativeText
                    url
                    caption
                  }
                }
              }
              style
            }
            ... on ComponentBasicYoutube {
              __typename
              url
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetTransportArticleQuery__
 *
 * To run a query within a React component, call `useGetTransportArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransportArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransportArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTransportArticleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTransportArticleQuery,
    GetTransportArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTransportArticleQuery,
    GetTransportArticleQueryVariables
  >(GetTransportArticleDocument, options);
}
export function useGetTransportArticleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTransportArticleQuery,
    GetTransportArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTransportArticleQuery,
    GetTransportArticleQueryVariables
  >(GetTransportArticleDocument, options);
}
export type GetTransportArticleQueryHookResult = ReturnType<
  typeof useGetTransportArticleQuery
>;
export type GetTransportArticleLazyQueryHookResult = ReturnType<
  typeof useGetTransportArticleLazyQuery
>;
export type GetTransportArticleQueryResult = Apollo.QueryResult<
  GetTransportArticleQuery,
  GetTransportArticleQueryVariables
>;
export const GetTransportArticleTitleDocument = gql`
  query GetTransportArticleTitle($id: ID!) {
    transportArticle(id: $id) {
      data {
        attributes {
          title
          localizations {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetTransportArticleTitleQuery__
 *
 * To run a query within a React component, call `useGetTransportArticleTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransportArticleTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransportArticleTitleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTransportArticleTitleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTransportArticleTitleQuery,
    GetTransportArticleTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTransportArticleTitleQuery,
    GetTransportArticleTitleQueryVariables
  >(GetTransportArticleTitleDocument, options);
}
export function useGetTransportArticleTitleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTransportArticleTitleQuery,
    GetTransportArticleTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTransportArticleTitleQuery,
    GetTransportArticleTitleQueryVariables
  >(GetTransportArticleTitleDocument, options);
}
export type GetTransportArticleTitleQueryHookResult = ReturnType<
  typeof useGetTransportArticleTitleQuery
>;
export type GetTransportArticleTitleLazyQueryHookResult = ReturnType<
  typeof useGetTransportArticleTitleLazyQuery
>;
export type GetTransportArticleTitleQueryResult = Apollo.QueryResult<
  GetTransportArticleTitleQuery,
  GetTransportArticleTitleQueryVariables
>;
