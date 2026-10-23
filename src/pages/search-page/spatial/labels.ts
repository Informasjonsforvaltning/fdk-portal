export type SpatialLabelMap = Readonly<Record<string, string>>;

export const formatSpatialLabel = (
  key: string,
  labels: SpatialLabelMap = {}
): string => labels[key] ?? key;
