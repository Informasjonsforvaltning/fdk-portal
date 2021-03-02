import { EventType, KeyWithCountObject } from '../types';

interface TreeObject extends KeyWithCountObject, Partial<EventType> {
  hasParent?: boolean;
  children?: any;
}

export function eventTypesKeyPrefixForest(
  list: KeyWithCountObject[],
  eventTypes: Record<string, EventType>
): Array<TreeObject> {
  if (!Array.isArray(list)) {
    return [];
  }

  const enhancedList: Array<TreeObject> = list.map(item =>
    eventTypes?.[item.key]
      ? {
          ...item,
          prefLabel: eventTypes[item.key].prefLabel,
          broader: eventTypes[item.key].broader
        }
      : item
  );

  const getChildren = (item: TreeObject) =>
    enhancedList.filter(g => g.broader?.includes(item.key));

  enhancedList.forEach(item => {
    const children = getChildren(item);

    children.forEach(item => {
      item.hasParent = true;
    });

    item.children = children;
  });

  return enhancedList.filter(tree => !tree.hasParent) as Array<TreeObject>;
}
