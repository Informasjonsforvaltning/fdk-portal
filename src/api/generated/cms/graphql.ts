import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** Input type for dynamic zone Content of FancyArticle */
  FancyArticleContentDynamicZoneInput: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type Article = {
  __typename?: 'Article';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  excerpt: Scalars['String'];
  featureImage?: Maybe<UploadFile>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Article>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type ArticleLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type ArticleAggregator = {
  __typename?: 'ArticleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  aggregate?: Maybe<ArticleAggregator>;
  groupBy?: Maybe<ArticleGroupBy>;
  values?: Maybe<Array<Maybe<Article>>>;
};

export type ArticleConnectionContent = {
  __typename?: 'ArticleConnectionContent';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ArticleConnectionCreated_At = {
  __typename?: 'ArticleConnectionCreated_at';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ArticleConnectionExcerpt = {
  __typename?: 'ArticleConnectionExcerpt';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ArticleConnectionFeatureImage = {
  __typename?: 'ArticleConnectionFeatureImage';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ArticleConnectionId = {
  __typename?: 'ArticleConnectionId';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ArticleConnectionLocale = {
  __typename?: 'ArticleConnectionLocale';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ArticleConnectionPublished_At = {
  __typename?: 'ArticleConnectionPublished_at';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ArticleConnectionTitle = {
  __typename?: 'ArticleConnectionTitle';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ArticleConnectionUpdated_At = {
  __typename?: 'ArticleConnectionUpdated_at';
  connection?: Maybe<ArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ArticleGroupBy = {
  __typename?: 'ArticleGroupBy';
  content?: Maybe<Array<Maybe<ArticleConnectionContent>>>;
  created_at?: Maybe<Array<Maybe<ArticleConnectionCreated_At>>>;
  excerpt?: Maybe<Array<Maybe<ArticleConnectionExcerpt>>>;
  featureImage?: Maybe<Array<Maybe<ArticleConnectionFeatureImage>>>;
  id?: Maybe<Array<Maybe<ArticleConnectionId>>>;
  locale?: Maybe<Array<Maybe<ArticleConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<ArticleConnectionPublished_At>>>;
  title?: Maybe<Array<Maybe<ArticleConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<ArticleConnectionUpdated_At>>>;
};

export type ArticleInput = {
  content: Scalars['String'];
  created_by?: InputMaybe<Scalars['ID']>;
  excerpt: Scalars['String'];
  featureImage?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type ComponentBasicImage = {
  __typename?: 'ComponentBasicImage';
  alternativeText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<Array<Maybe<UploadFile>>>;
  style?: Maybe<Enum_Componentbasicimage_Style>;
};

export type ComponentBasicImageMediaArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type ComponentBasicImageInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  style?: InputMaybe<Enum_Componentbasicimage_Style>;
};

export type ComponentBasicParagraph = {
  __typename?: 'ComponentBasicParagraph';
  Content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentBasicParagraphInput = {
  Content?: InputMaybe<Scalars['String']>;
};

export type ComponentBasicQuote = {
  __typename?: 'ComponentBasicQuote';
  author?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ComponentBasicQuoteInput = {
  author?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
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

export type FancyArticle = {
  __typename?: 'FancyArticle';
  Content?: Maybe<Array<Maybe<FancyArticleContentDynamicZone>>>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<FancyArticle>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type FancyArticleLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type FancyArticleAggregator = {
  __typename?: 'FancyArticleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FancyArticleConnection = {
  __typename?: 'FancyArticleConnection';
  aggregate?: Maybe<FancyArticleAggregator>;
  groupBy?: Maybe<FancyArticleGroupBy>;
  values?: Maybe<Array<Maybe<FancyArticle>>>;
};

export type FancyArticleConnectionCreated_At = {
  __typename?: 'FancyArticleConnectionCreated_at';
  connection?: Maybe<FancyArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FancyArticleConnectionId = {
  __typename?: 'FancyArticleConnectionId';
  connection?: Maybe<FancyArticleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FancyArticleConnectionLocale = {
  __typename?: 'FancyArticleConnectionLocale';
  connection?: Maybe<FancyArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FancyArticleConnectionPublished_At = {
  __typename?: 'FancyArticleConnectionPublished_at';
  connection?: Maybe<FancyArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FancyArticleConnectionSubtitle = {
  __typename?: 'FancyArticleConnectionSubtitle';
  connection?: Maybe<FancyArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FancyArticleConnectionTitle = {
  __typename?: 'FancyArticleConnectionTitle';
  connection?: Maybe<FancyArticleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FancyArticleConnectionUpdated_At = {
  __typename?: 'FancyArticleConnectionUpdated_at';
  connection?: Maybe<FancyArticleConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FancyArticleContentDynamicZone =
  | ComponentBasicImage
  | ComponentBasicParagraph
  | ComponentBasicQuote;

export type FancyArticleGroupBy = {
  __typename?: 'FancyArticleGroupBy';
  created_at?: Maybe<Array<Maybe<FancyArticleConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<FancyArticleConnectionId>>>;
  locale?: Maybe<Array<Maybe<FancyArticleConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<FancyArticleConnectionPublished_At>>>;
  subtitle?: Maybe<Array<Maybe<FancyArticleConnectionSubtitle>>>;
  title?: Maybe<Array<Maybe<FancyArticleConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<FancyArticleConnectionUpdated_At>>>;
};

export type FancyArticleInput = {
  Content?: InputMaybe<Array<Scalars['FancyArticleContentDynamicZoneInput']>>;
  created_by?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: InputMaybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  size: Scalars['Float'];
  updated_by?: InputMaybe<Scalars['ID']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type InputId = {
  id: Scalars['ID'];
};

export type LocaleInput = {
  code?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type Morph =
  | Article
  | ArticleAggregator
  | ArticleConnection
  | ArticleConnectionContent
  | ArticleConnectionCreated_At
  | ArticleConnectionExcerpt
  | ArticleConnectionFeatureImage
  | ArticleConnectionId
  | ArticleConnectionLocale
  | ArticleConnectionPublished_At
  | ArticleConnectionTitle
  | ArticleConnectionUpdated_At
  | ArticleGroupBy
  | ComponentBasicImage
  | ComponentBasicParagraph
  | ComponentBasicQuote
  | FancyArticle
  | FancyArticleAggregator
  | FancyArticleConnection
  | FancyArticleConnectionCreated_At
  | FancyArticleConnectionId
  | FancyArticleConnectionLocale
  | FancyArticleConnectionPublished_At
  | FancyArticleConnectionSubtitle
  | FancyArticleConnectionTitle
  | FancyArticleConnectionUpdated_At
  | FancyArticleGroupBy
  | I18NLocale
  | ServiceMessage
  | ServiceMessageAggregator
  | ServiceMessageConnection
  | ServiceMessageConnectionChannel_Adminportal
  | ServiceMessageConnectionChannel_Publiseringportal
  | ServiceMessageConnectionChannel_Registreringportal
  | ServiceMessageConnectionCreated_At
  | ServiceMessageConnectionDescription
  | ServiceMessageConnectionEnvironment
  | ServiceMessageConnectionId
  | ServiceMessageConnectionLocale
  | ServiceMessageConnectionMessage_Type
  | ServiceMessageConnectionPublished_At
  | ServiceMessageConnectionShort_Description
  | ServiceMessageConnectionTitle
  | ServiceMessageConnectionUpdated_At
  | ServiceMessageConnectionValid_From
  | ServiceMessageConnectionValid_To
  | ServiceMessageGroupBy
  | UploadFile
  | UploadFileAggregator
  | UploadFileAggregatorAvg
  | UploadFileAggregatorMax
  | UploadFileAggregatorMin
  | UploadFileAggregatorSum
  | UploadFileConnection
  | UploadFileConnectionAlternativeText
  | UploadFileConnectionCaption
  | UploadFileConnectionCreated_At
  | UploadFileConnectionExt
  | UploadFileConnectionFormats
  | UploadFileConnectionHash
  | UploadFileConnectionHeight
  | UploadFileConnectionId
  | UploadFileConnectionMime
  | UploadFileConnectionName
  | UploadFileConnectionPreviewUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionProvider_Metadata
  | UploadFileConnectionSize
  | UploadFileConnectionUpdated_At
  | UploadFileConnectionUrl
  | UploadFileConnectionWidth
  | UploadFileGroupBy
  | UserPermissionsPasswordPayload
  | UsersPermissionsLoginPayload
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionType
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsUser
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserConnection
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionCreated_At
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionRole
  | UsersPermissionsUserConnectionUpdated_At
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserGroupBy
  | CreateArticlePayload
  | CreateFancyArticlePayload
  | CreateRolePayload
  | CreateServiceMessagePayload
  | CreateUserPayload
  | DeleteArticlePayload
  | DeleteFancyArticlePayload
  | DeleteFilePayload
  | DeleteRolePayload
  | DeleteServiceMessagePayload
  | DeleteUserPayload
  | UpdateArticlePayload
  | UpdateFancyArticlePayload
  | UpdateRolePayload
  | UpdateServiceMessagePayload
  | UpdateUserPayload;

export type Mutation = {
  __typename?: 'Mutation';
  createArticle?: Maybe<CreateArticlePayload>;
  createArticleLocalization: Article;
  createFancyArticle?: Maybe<CreateFancyArticlePayload>;
  createFancyArticleLocalization: FancyArticle;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  createServiceMessage?: Maybe<CreateServiceMessagePayload>;
  createServiceMessageLocalization: ServiceMessage;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  deleteArticle?: Maybe<DeleteArticlePayload>;
  deleteFancyArticle?: Maybe<DeleteFancyArticlePayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  deleteServiceMessage?: Maybe<DeleteServiceMessagePayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFile>>;
  register: UsersPermissionsLoginPayload;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateArticle?: Maybe<UpdateArticlePayload>;
  updateFancyArticle?: Maybe<UpdateFancyArticlePayload>;
  updateFileInfo: UploadFile;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  updateServiceMessage?: Maybe<UpdateServiceMessagePayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  upload: UploadFile;
};

export type MutationCreateArticleArgs = {
  input?: InputMaybe<CreateArticleInput>;
};

export type MutationCreateArticleLocalizationArgs = {
  input: UpdateArticleInput;
};

export type MutationCreateFancyArticleArgs = {
  input?: InputMaybe<CreateFancyArticleInput>;
};

export type MutationCreateFancyArticleLocalizationArgs = {
  input: UpdateFancyArticleInput;
};

export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};

export type MutationCreateServiceMessageArgs = {
  input?: InputMaybe<CreateServiceMessageInput>;
};

export type MutationCreateServiceMessageLocalizationArgs = {
  input: UpdateServiceMessageInput;
};

export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};

export type MutationDeleteArticleArgs = {
  input?: InputMaybe<DeleteArticleInput>;
};

export type MutationDeleteFancyArticleArgs = {
  input?: InputMaybe<DeleteFancyArticleInput>;
};

export type MutationDeleteFileArgs = {
  input?: InputMaybe<DeleteFileInput>;
};

export type MutationDeleteRoleArgs = {
  input?: InputMaybe<DeleteRoleInput>;
};

export type MutationDeleteServiceMessageArgs = {
  input?: InputMaybe<DeleteServiceMessageInput>;
};

export type MutationDeleteUserArgs = {
  input?: InputMaybe<DeleteUserInput>;
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
  source?: InputMaybe<Scalars['String']>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type MutationUpdateArticleArgs = {
  input?: InputMaybe<UpdateArticleInput>;
};

export type MutationUpdateFancyArticleArgs = {
  input?: InputMaybe<UpdateFancyArticleInput>;
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};

export type MutationUpdateRoleArgs = {
  input?: InputMaybe<UpdateRoleInput>;
};

export type MutationUpdateServiceMessageArgs = {
  input?: InputMaybe<UpdateServiceMessageInput>;
};

export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>;
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
  source?: InputMaybe<Scalars['String']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles?: Maybe<Array<Maybe<Article>>>;
  articlesConnection?: Maybe<ArticleConnection>;
  fancyArticle?: Maybe<FancyArticle>;
  fancyArticles?: Maybe<Array<Maybe<FancyArticle>>>;
  fancyArticlesConnection?: Maybe<FancyArticleConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  me?: Maybe<UsersPermissionsMe>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  serviceMessage?: Maybe<ServiceMessage>;
  serviceMessages?: Maybe<Array<Maybe<ServiceMessage>>>;
  serviceMessagesConnection?: Maybe<ServiceMessageConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
};

export type QueryArticleArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryArticlesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryArticlesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFancyArticleArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryFancyArticlesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFancyArticlesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFilesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFilesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryRolesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryRolesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryServiceMessageArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryServiceMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryServiceMessagesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryUsersConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type RoleInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ServiceMessage = {
  __typename?: 'ServiceMessage';
  channel_adminportal?: Maybe<Scalars['Boolean']>;
  channel_publiseringportal?: Maybe<Scalars['Boolean']>;
  channel_registreringportal?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  environment: Enum_Servicemessage_Environment;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<ServiceMessage>>>;
  message_type: Enum_Servicemessage_Message_Type;
  published_at?: Maybe<Scalars['DateTime']>;
  short_description: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  valid_from: Scalars['DateTime'];
  valid_to?: Maybe<Scalars['DateTime']>;
};

export type ServiceMessageLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type ServiceMessageAggregator = {
  __typename?: 'ServiceMessageAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ServiceMessageConnection = {
  __typename?: 'ServiceMessageConnection';
  aggregate?: Maybe<ServiceMessageAggregator>;
  groupBy?: Maybe<ServiceMessageGroupBy>;
  values?: Maybe<Array<Maybe<ServiceMessage>>>;
};

export type ServiceMessageConnectionChannel_Adminportal = {
  __typename?: 'ServiceMessageConnectionChannel_adminportal';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type ServiceMessageConnectionChannel_Publiseringportal = {
  __typename?: 'ServiceMessageConnectionChannel_publiseringportal';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type ServiceMessageConnectionChannel_Registreringportal = {
  __typename?: 'ServiceMessageConnectionChannel_registreringportal';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type ServiceMessageConnectionCreated_At = {
  __typename?: 'ServiceMessageConnectionCreated_at';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ServiceMessageConnectionDescription = {
  __typename?: 'ServiceMessageConnectionDescription';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ServiceMessageConnectionEnvironment = {
  __typename?: 'ServiceMessageConnectionEnvironment';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ServiceMessageConnectionId = {
  __typename?: 'ServiceMessageConnectionId';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type ServiceMessageConnectionLocale = {
  __typename?: 'ServiceMessageConnectionLocale';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ServiceMessageConnectionMessage_Type = {
  __typename?: 'ServiceMessageConnectionMessage_type';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ServiceMessageConnectionPublished_At = {
  __typename?: 'ServiceMessageConnectionPublished_at';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ServiceMessageConnectionShort_Description = {
  __typename?: 'ServiceMessageConnectionShort_description';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ServiceMessageConnectionTitle = {
  __typename?: 'ServiceMessageConnectionTitle';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type ServiceMessageConnectionUpdated_At = {
  __typename?: 'ServiceMessageConnectionUpdated_at';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ServiceMessageConnectionValid_From = {
  __typename?: 'ServiceMessageConnectionValid_from';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ServiceMessageConnectionValid_To = {
  __typename?: 'ServiceMessageConnectionValid_to';
  connection?: Maybe<ServiceMessageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type ServiceMessageGroupBy = {
  __typename?: 'ServiceMessageGroupBy';
  channel_adminportal?: Maybe<
    Array<Maybe<ServiceMessageConnectionChannel_Adminportal>>
  >;
  channel_publiseringportal?: Maybe<
    Array<Maybe<ServiceMessageConnectionChannel_Publiseringportal>>
  >;
  channel_registreringportal?: Maybe<
    Array<Maybe<ServiceMessageConnectionChannel_Registreringportal>>
  >;
  created_at?: Maybe<Array<Maybe<ServiceMessageConnectionCreated_At>>>;
  description?: Maybe<Array<Maybe<ServiceMessageConnectionDescription>>>;
  environment?: Maybe<Array<Maybe<ServiceMessageConnectionEnvironment>>>;
  id?: Maybe<Array<Maybe<ServiceMessageConnectionId>>>;
  locale?: Maybe<Array<Maybe<ServiceMessageConnectionLocale>>>;
  message_type?: Maybe<Array<Maybe<ServiceMessageConnectionMessage_Type>>>;
  published_at?: Maybe<Array<Maybe<ServiceMessageConnectionPublished_At>>>;
  short_description?: Maybe<
    Array<Maybe<ServiceMessageConnectionShort_Description>>
  >;
  title?: Maybe<Array<Maybe<ServiceMessageConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<ServiceMessageConnectionUpdated_At>>>;
  valid_from?: Maybe<Array<Maybe<ServiceMessageConnectionValid_From>>>;
  valid_to?: Maybe<Array<Maybe<ServiceMessageConnectionValid_To>>>;
};

export type ServiceMessageInput = {
  channel_adminportal?: InputMaybe<Scalars['Boolean']>;
  channel_publiseringportal?: InputMaybe<Scalars['Boolean']>;
  channel_registreringportal?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  environment?: InputMaybe<Enum_Servicemessage_Environment>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  message_type: Enum_Servicemessage_Message_Type;
  published_at?: InputMaybe<Scalars['DateTime']>;
  short_description: Scalars['String'];
  title: Scalars['String'];
  updated_by?: InputMaybe<Scalars['ID']>;
  valid_from: Scalars['DateTime'];
  valid_to?: InputMaybe<Scalars['DateTime']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
  size: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileRelatedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  avg?: Maybe<UploadFileAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UploadFileAggregatorMax>;
  min?: Maybe<UploadFileAggregatorMin>;
  sum?: Maybe<UploadFileAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  aggregate?: Maybe<UploadFileAggregator>;
  groupBy?: Maybe<UploadFileGroupBy>;
  values?: Maybe<Array<Maybe<UploadFile>>>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Float']>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<
    Array<Maybe<UploadFileConnectionProvider_Metadata>>
  >;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
};

export type UserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  username: Scalars['String'];
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  controller: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  type: Scalars['String'];
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  type?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsRolePermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
};

export type CreateArticleInput = {
  data?: InputMaybe<ArticleInput>;
};

export type CreateArticlePayload = {
  __typename?: 'createArticlePayload';
  article?: Maybe<Article>;
};

export type CreateFancyArticleInput = {
  data?: InputMaybe<FancyArticleInput>;
};

export type CreateFancyArticlePayload = {
  __typename?: 'createFancyArticlePayload';
  fancyArticle?: Maybe<FancyArticle>;
};

export type CreateRoleInput = {
  data?: InputMaybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateServiceMessageInput = {
  data?: InputMaybe<ServiceMessageInput>;
};

export type CreateServiceMessagePayload = {
  __typename?: 'createServiceMessagePayload';
  serviceMessage?: Maybe<ServiceMessage>;
};

export type CreateUserInput = {
  data?: InputMaybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteArticleInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteArticlePayload = {
  __typename?: 'deleteArticlePayload';
  article?: Maybe<Article>;
};

export type DeleteFancyArticleInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteFancyArticlePayload = {
  __typename?: 'deleteFancyArticlePayload';
  fancyArticle?: Maybe<FancyArticle>;
};

export type DeleteFileInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteRoleInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteServiceMessageInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteServiceMessagePayload = {
  __typename?: 'deleteServiceMessagePayload';
  serviceMessage?: Maybe<ServiceMessage>;
};

export type DeleteUserInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type EditArticleInput = {
  content?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  excerpt?: InputMaybe<Scalars['String']>;
  featureImage?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditComponentBasicImageInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  style?: InputMaybe<Enum_Componentbasicimage_Style>;
};

export type EditComponentBasicParagraphInput = {
  Content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type EditComponentBasicQuoteInput = {
  author?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type EditFancyArticleInput = {
  Content?: InputMaybe<Array<Scalars['FancyArticleContentDynamicZoneInput']>>;
  created_by?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  size?: InputMaybe<Scalars['Float']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type EditLocaleInput = {
  code?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditRoleInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type EditServiceMessageInput = {
  channel_adminportal?: InputMaybe<Scalars['Boolean']>;
  channel_publiseringportal?: InputMaybe<Scalars['Boolean']>;
  channel_registreringportal?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  environment?: InputMaybe<Enum_Servicemessage_Environment>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  message_type?: InputMaybe<Enum_Servicemessage_Message_Type>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  short_description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  valid_from?: InputMaybe<Scalars['DateTime']>;
  valid_to?: InputMaybe<Scalars['DateTime']>;
};

export type EditUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateArticleInput = {
  data?: InputMaybe<EditArticleInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateArticlePayload = {
  __typename?: 'updateArticlePayload';
  article?: Maybe<Article>;
};

export type UpdateFancyArticleInput = {
  data?: InputMaybe<EditFancyArticleInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateFancyArticlePayload = {
  __typename?: 'updateFancyArticlePayload';
  fancyArticle?: Maybe<FancyArticle>;
};

export type UpdateRoleInput = {
  data?: InputMaybe<EditRoleInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateServiceMessageInput = {
  data?: InputMaybe<EditServiceMessageInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateServiceMessagePayload = {
  __typename?: 'updateServiceMessagePayload';
  serviceMessage?: Maybe<ServiceMessage>;
};

export type UpdateUserInput = {
  data?: InputMaybe<EditUserInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type GetFancyArticleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetFancyArticleQuery = {
  __typename?: 'Query';
  fancyArticle?: {
    __typename?: 'FancyArticle';
    title?: string | null;
    subtitle?: string | null;
    Content?: Array<
      | {
          __typename: 'ComponentBasicImage';
          style?: Enum_Componentbasicimage_Style | null;
          media?: Array<{
            __typename?: 'UploadFile';
            alternativeText?: string | null;
            url: string;
            caption?: string | null;
          } | null> | null;
        }
      | { __typename: 'ComponentBasicParagraph'; Content?: string | null }
      | { __typename?: 'ComponentBasicQuote' }
      | null
    > | null;
  } | null;
};

export type GetArticleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetArticleQuery = {
  __typename?: 'Query';
  article?: {
    __typename?: 'Article';
    title: string;
    content: string;
    locale?: string | null;
    published_at?: any | null;
    updated_at: any;
    featureImage?: { __typename?: 'UploadFile'; url: string } | null;
  } | null;
};

export type GetServiceMessagesQueryVariables = Exact<{
  today?: InputMaybe<Scalars['DateTime']>;
  channelPubliseringPortal?: InputMaybe<Scalars['Boolean']>;
  env?: InputMaybe<Scalars['String']>;
}>;

export type GetServiceMessagesQuery = {
  __typename?: 'Query';
  serviceMessages?: Array<{
    __typename?: 'ServiceMessage';
    id: string;
    title: string;
    valid_from: any;
    valid_to?: any | null;
    message_type: Enum_Servicemessage_Message_Type;
    short_description: string;
    description?: string | null;
    environment: Enum_Servicemessage_Environment;
    channel_publiseringportal?: boolean | null;
  } | null> | null;
};

export type GetServiceMessageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type GetServiceMessageQuery = {
  __typename?: 'Query';
  serviceMessage?: {
    __typename?: 'ServiceMessage';
    id: string;
    title: string;
    valid_from: any;
    valid_to?: any | null;
    message_type: Enum_Servicemessage_Message_Type;
    short_description: string;
    description?: string | null;
  } | null;
};

export const GetFancyArticleDocument = gql`
  query GetFancyArticle($id: ID!) {
    fancyArticle(id: $id) {
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
            alternativeText
            url
            caption
          }
          style
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
export const GetArticleDocument = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      title
      featureImage {
        url
      }
      content
      locale
      published_at
      updated_at
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
      where: {
        valid_from_lte: $today
        valid_to_gte: $today
        channel_publiseringportal: $channelPubliseringPortal
        environment: $env
      }
      sort: "valid_from:desc"
    ) {
      id
      title
      valid_from
      valid_to
      message_type
      short_description
      description
      environment
      channel_publiseringportal
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
      id
      title
      valid_from
      valid_to
      message_type
      short_description
      description
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
