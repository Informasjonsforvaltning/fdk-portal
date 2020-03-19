import { DataFormat } from '../../../../types/enums';

const priorities: { [key: string]: number } = {
  [DataFormat.JSON]: 1,
  [DataFormat.CSV]: 2,
  [DataFormat.XML]: 3,
  [DataFormat.YAML]: 4,
  [DataFormat.GEOJSON]: 5,
  [DataFormat.HTML]: 6,
  [DataFormat.SOSI]: 7,
  [DataFormat.XLSX]: 8,
  [DataFormat.XLS]: 9,
  [DataFormat.RSS]: 10,
  [DataFormat.RDF_XML]: 11,
  [DataFormat.TURTLE]: 12,
  [DataFormat.JSONLD]: 13,
  [DataFormat.TXT]: 14,
  [DataFormat.SIRI]: 15
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
