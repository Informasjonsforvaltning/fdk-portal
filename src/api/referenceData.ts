import axios from 'axios';

import { getConfig } from '../config';
import { LanguageCodes } from '../types/enums';
import type { TextLanguage } from '../types';

const newReferenceDataUrlBase = () =>
  `${getConfig().referenceDataApi.host}/reference-data`;

export const getNewReferenceData = (path: string) =>
  axios.get(`${newReferenceDataUrlBase()}/${path}`).then(r => r.data);

export type ReferenceDataSearchAlternative =
  | 'ADMINISTRATIVE_ENHETER'
  | 'EU_FILE_TYPES'
  | 'EU_LANGUAGES'
  | 'EU_LOCATIONS'
  | 'GEONAMES'
  | 'IANA_MEDIA_TYPES';

export type ReferenceDataSearchHit = {
  uri: string;
  code?: string;
  type?: string;
  label: Partial<TextLanguage>;
};

const FIND_BY_URIS_QUERY = `query FindByURIs($req: FindByURIsRequest!) {
  findByURIs(req: $req) {
    uri
    code
    type
    label { nb nn no en }
  }
}`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const LABEL_LANGUAGES = [
  LanguageCodes.nb,
  LanguageCodes.nn,
  LanguageCodes.no,
  LanguageCodes.en
] as const;

/** GraphQL returns `null` for languages a reference data source does not provide. */
const parseTextLanguage = (value: unknown): Partial<TextLanguage> => {
  if (!isRecord(value)) return {};
  return LABEL_LANGUAGES.reduce<Partial<TextLanguage>>((label, language) => {
    const text = value[language];
    if (typeof text === 'string') {
      return { ...label, [language]: text };
    }
    return label;
  }, {});
};

const parseSearchHit = (value: unknown): ReferenceDataSearchHit | undefined => {
  if (!isRecord(value) || typeof value.uri !== 'string') return undefined;
  return {
    uri: value.uri,
    code: typeof value.code === 'string' ? value.code : undefined,
    type: typeof value.type === 'string' ? value.type : undefined,
    label: parseTextLanguage(value.label)
  };
};

const parseFindByUrisHits = (hits: unknown[]): ReferenceDataSearchHit[] =>
  hits.flatMap(hit => parseSearchHit(hit) ?? []);

export const findReferenceDataByUris = async (
  uris: string[],
  types: ReferenceDataSearchAlternative[]
): Promise<ReferenceDataSearchHit[]> => {
  if (uris.length === 0 || types.length === 0) return [];

  const response = await axios.post(
    `${newReferenceDataUrlBase()}/graphql`,
    { query: FIND_BY_URIS_QUERY, variables: { req: { uris, types } } },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );

  const payload: unknown = response.data;
  if (!isRecord(payload))
    throw new Error('Failed to find reference data by URIs');

  const { errors } = payload;
  if (Array.isArray(errors) && errors.length > 0) {
    throw new Error('Failed to find reference data by URIs');
  }

  if (!isRecord(payload.data) || !Array.isArray(payload.data.findByURIs)) {
    throw new Error('Failed to find reference data by URIs');
  }

  return parseFindByUrisHits(payload.data.findByURIs);
};
