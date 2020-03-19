import JsonIcon from '../../../../images/icon-format-json-lg.svg';
import CsvIcon from '../../../../images/icon-format-csv-lg.svg';
import XmlIcon from '../../../../images/icon-format-xml-lg.svg';
import GeoJsonIcon from '../../../../images/icon-format-geojson-lg.svg';
import YamlIcon from '../../../../images/icon-format-yaml-lg.svg';
import HtmlIcon from '../../../../images/icon-format-html-lg.svg';
import SosiIcon from '../../../../images/icon-format-sosi-lg.svg';
import XlsxIcon from '../../../../images/icon-format-xlsx-lg.svg';
import XlsIcon from '../../../../images/icon-format-xls-lg.svg';
import RssIcon from '../../../../images/icon-format-rss-lg.svg';
import RdfXmlIcon from '../../../../images/icon-format-rdfxml-lg.svg';
import TurtleIcon from '../../../../images/icon-format-turtle-lg.svg';
import JsonLdIcon from '../../../../images/icon-format-jsonld-lg.svg';
import TxtIcon from '../../../../images/icon-format-txt-lg.svg';
import SiriIcon from '../../../../images/icon-format-siri-lg.svg';
import UnknownIcon from '../../../../images/icon-format-unknown-lg.svg';

import { DataFormat } from '../../../../types/enums';

export default {
  [DataFormat.JSON]: JsonIcon,
  [DataFormat.CSV]: CsvIcon,
  [DataFormat.XML]: XmlIcon,
  [DataFormat.YAML]: YamlIcon,
  [DataFormat.GEOJSON]: GeoJsonIcon,
  [DataFormat.HTML]: HtmlIcon,
  [DataFormat.SOSI]: SosiIcon,
  [DataFormat.XLSX]: XlsxIcon,
  [DataFormat.XLS]: XlsIcon,
  [DataFormat.RSS]: RssIcon,
  [DataFormat.RDF_XML]: RdfXmlIcon,
  [DataFormat.TURTLE]: TurtleIcon,
  [DataFormat.JSONLD]: JsonLdIcon,
  [DataFormat.TXT]: TxtIcon,
  [DataFormat.SIRI]: SiriIcon,
  [DataFormat.UNKNOWN]: UnknownIcon
};
