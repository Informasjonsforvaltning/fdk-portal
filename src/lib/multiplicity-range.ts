interface RestrictionParameters {
  minOccurs: string;
  maxOccurs: string;
}
export const createMultiplicityRange = ({
  minOccurs,
  maxOccurs
}: Partial<RestrictionParameters>): string => {
  if (minOccurs && minOccurs === maxOccurs) {
    return minOccurs;
  }
  if (minOccurs && !maxOccurs) {
    return `${minOccurs}..*`;
  }
  if (!minOccurs && maxOccurs) {
    return `0..${maxOccurs}`;
  }
  return '';
};
