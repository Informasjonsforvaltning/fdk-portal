import { KeyWithCountObject } from '../../types';

export function sortKeyWithCount(keyWithCountArray: KeyWithCountObject[]) {
  if (!Array.isArray(keyWithCountArray)) {
    return [];
  }
  return keyWithCountArray.sort(({ count: a }, { count: b }) => b - a);
}
