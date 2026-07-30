/**
 * Shared consent state, stored under the same `fdk-consent` localStorage key used by the
 * consent banner in fdk-frontend. data.norge.no and transportportal.no are shared origins
 * between the two apps, so the decision carries over in both directions.
 */

export const CONSENT_STORAGE_KEY = 'fdk-consent';
/** Fired in the same document when the decision changes (storage events only fire cross-tab). */
export const CONSENT_CHANGE_EVENT = 'fdk-consent-change';
/** Fired to reopen the banner (e.g. from a footer link). */
export const CONSENT_OPEN_EVENT = 'fdk-consent-open';

const CONSENT_VERSION = 1;

export interface ConsentState {
  version: number;
  statistics: boolean;
  timestamp: string;
}

export const readConsent = (): ConsentState | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (
      parsed?.version !== CONSENT_VERSION ||
      typeof parsed?.statistics !== 'boolean'
    ) {
      return null;
    }

    return {
      version: CONSENT_VERSION,
      statistics: parsed.statistics,
      timestamp: typeof parsed.timestamp === 'string' ? parsed.timestamp : ''
    };
  } catch {
    return null;
  }
};

export const hasStatisticsConsent = (): boolean =>
  readConsent()?.statistics === true;

export const hasConsentDecision = (): boolean => readConsent() !== null;

export const saveConsent = (statistics: boolean): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const next: ConsentState = {
    version: CONSENT_VERSION,
    statistics,
    timestamp: new Date().toISOString()
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore write failures (e.g. storage disabled in the browser).
  }

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
};

export const openConsentBanner = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
  }
};
