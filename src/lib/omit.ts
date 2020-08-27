export function omit(originalObj = {}, keysToOmit: string[]) {
  return Object.fromEntries(
    Object.entries(originalObj).filter(([key]) => !keysToOmit.includes(key))
  );
}
