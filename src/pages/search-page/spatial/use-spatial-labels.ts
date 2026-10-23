import { useEffect, useMemo, useState } from 'react';

import {
  findReferenceDataByUris,
  type ReferenceDataSearchAlternative
} from '../../../api/referenceData';
import { getTranslateText } from '../../../lib/translateText';
import { useAppSelector } from '../../../redux/hooks';
import type { TextLanguage } from '../../../types';

import { type SpatialLabelMap } from './labels';

const EMPTY_LABELS: SpatialLabelMap = {};
const URI_SEPARATOR = '\n';
const SPATIAL_TYPES: ReferenceDataSearchAlternative[] = [
  'ADMINISTRATIVE_ENHETER',
  'EU_LOCATIONS',
  'GEONAMES'
];

const resolvedLabels = new Map<string, Partial<TextLanguage> | null>();
const pendingRequests = new Map<string, Promise<void>>();

const buildLabelMap = (): SpatialLabelMap =>
  Array.from(resolvedLabels.entries()).reduce<Record<string, string>>(
    (labels, [uri, label]) => {
      const localized = label ? getTranslateText(label) : undefined;
      if (localized) {
        return { ...labels, [uri]: localized };
      }
      return labels;
    },
    {}
  );

const loadLabels = (uris: string[]): Promise<void> => {
  const missing = uris.filter(
    uri => !resolvedLabels.has(uri) && !pendingRequests.has(uri)
  );

  if (missing.length > 0) {
    const request = findReferenceDataByUris(missing, SPATIAL_TYPES)
      .then(hits => {
        const labelsByUri = new Map(hits.map(hit => [hit.uri, hit.label]));
        missing.forEach(uri => {
          resolvedLabels.set(uri, labelsByUri.get(uri) ?? null);
        });
      })
      .catch(() => {
        // Leave unresolved so a later effect can retry.
      })
      .finally(() => {
        missing.forEach(uri => pendingRequests.delete(uri));
      });

    missing.forEach(uri => pendingRequests.set(uri, request));
  }

  return Promise.all(uris.map(uri => pendingRequests.get(uri))).then(
    () => undefined
  );
};

export const useSpatialLabels = (uris: string[]): SpatialLabelMap => {
  const language = useAppSelector(state => state.settings.language);
  const [labels, setLabels] = useState<SpatialLabelMap>(EMPTY_LABELS);
  const urisKey = useMemo(
    () =>
      Array.from(new Set(uris.filter(Boolean)))
        .sort()
        .join(URI_SEPARATOR),
    [uris]
  );

  useEffect(() => {
    let cancelled = false;

    loadLabels(urisKey ? urisKey.split(URI_SEPARATOR) : []).then(() => {
      if (!cancelled) setLabels(buildLabelMap());
    });

    return () => {
      cancelled = true;
    };
  }, [urisKey, language]);

  return labels;
};
