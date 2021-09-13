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

const getFormatIcon = (str: string) => {
  if (str.toLowerCase().includes('csv')) {
    return CsvIcon;
  }
  if (str.toLowerCase().includes('yaml')) {
    return YamlIcon;
  }
  if (str.toLowerCase().includes('geo+json')) {
    return GeoJsonIcon;
  }
  if (str.toLowerCase().includes('html')) {
    return HtmlIcon;
  }
  if (str.toLowerCase().includes('sosi')) {
    return SosiIcon;
  }
  if (
    str
      .toLowerCase()
      .includes('openxmlformats-officedocument.spreadsheetml.sheet')
  ) {
    return XlsxIcon;
  }
  if (str.toLowerCase().includes('sealed-xls')) {
    return XlsIcon;
  }
  if (str.toLowerCase().includes('rss')) {
    return RssIcon;
  }
  if (str.toLowerCase().includes('rdf+xml')) {
    return RdfXmlIcon;
  }
  if (str.toLowerCase().includes('turtle')) {
    return TurtleIcon;
  }
  if (str.toLowerCase().includes('json+ld')) {
    return JsonLdIcon;
  }
  if (str.toLowerCase().includes('txt')) {
    return TxtIcon;
  }
  if (str.toLowerCase().includes('siri')) {
    return SiriIcon;
  }
  if (str.toLowerCase().includes('xml')) {
    return XmlIcon;
  }
  if (str.toLowerCase().includes('json')) {
    return JsonIcon;
  }

  return UnknownIcon;
};

export default getFormatIcon;
