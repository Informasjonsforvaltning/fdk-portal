import { DataFormat } from '../../../../types/enums';

const priorities: { [key: string]: number } = {
  [DataFormat.JSON]: 1,
  [DataFormat.XML]: 2,
  [DataFormat.CSV]: 3
};

export const formatSorter = (a: DataFormat, b: DataFormat): number => {
  if (!(a in priorities)) {
    return 1;
  }
  if (!(b in priorities)) {
    return -1;
  }
  return priorities[a] > priorities[b] ? 1 : -1;
};
