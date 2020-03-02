export function findAllByKey(obj, keyToFind) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      return acc.concat(findAllByKey(value, keyToFind));
    }
    if (key === keyToFind) {
      return acc.concat(value);
    }
    return acc;
  }, []);
}
