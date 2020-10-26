import { Language } from './enums';

export type ChangeLanguageCallback = (language: Language) => void;

export type Tokens = Record<string, string | number | undefined | null>;
