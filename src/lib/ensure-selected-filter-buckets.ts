type BucketItem = {
  key: string;
  count: number;
  [key: string]: unknown;
};

type ForestNode = BucketItem & {
  children?: ForestNode[];
};

const parseActiveKeys = (activeFilter?: string): string[] =>
  activeFilter?.split(',').filter(Boolean) ?? [];

const collectForestKeys = (nodes: ForestNode[] = []): Set<string> => {
  const keys = new Set<string>();
  const walk = (items: ForestNode[]) => {
    items.forEach(item => {
      keys.add(item.key);
      if (item.children?.length) {
        walk(item.children);
      }
    });
  };
  walk(nodes);
  return keys;
};

/** Ensures selected filter values remain visible even when aggregations return 0 hits. */
export const ensureSelectedFilterBuckets = <T extends BucketItem>(
  buckets: T[] | undefined,
  activeFilter?: string
): T[] => {
  const items = [...(buckets ?? [])];
  const existing = new Set(items.map(item => item.key));

  parseActiveKeys(activeFilter).forEach(key => {
    if (!existing.has(key)) {
      items.push({ key, count: 0 } as T);
      existing.add(key);
    }
  });

  return items;
};

/** Same as {@link ensureSelectedFilterBuckets}, for hierarchical FilterTree forests. */
export const ensureSelectedFilterForest = (
  forest: ForestNode[] | undefined,
  activeFilter?: string
): ForestNode[] => {
  const nodes = [...(forest ?? [])];
  const existing = collectForestKeys(nodes);

  parseActiveKeys(activeFilter).forEach(key => {
    if (!existing.has(key)) {
      nodes.push({ key, count: 0, children: [] });
      existing.add(key);
    }
  });

  return nodes;
};
