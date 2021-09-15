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
  const containsFormat = (format: string) =>
    str?.toLowerCase().includes(format);

  if (containsFormat('csv')) {
    return CsvIcon;
  }
  if (containsFormat('yaml')) {
    return YamlIcon;
  }
  if (containsFormat('geo+json')) {
    return GeoJsonIcon;
  }
  if (containsFormat('html')) {
    return HtmlIcon;
  }
  if (containsFormat('sosi')) {
    return SosiIcon;
  }
  if (containsFormat('openxmlformats-officedocument.spreadsheetml.sheet')) {
    return XlsxIcon;
  }
  if (containsFormat('sealed-xls')) {
    return XlsIcon;
  }
  if (containsFormat('rss')) {
    return RssIcon;
  }
  if (containsFormat('rdf+xml')) {
    return RdfXmlIcon;
  }
  if (containsFormat('turtle')) {
    return TurtleIcon;
  }
  if (containsFormat('json+ld')) {
    return JsonLdIcon;
  }
  if (containsFormat('txt')) {
    return TxtIcon;
  }
  if (containsFormat('siri')) {
    return SiriIcon;
  }
  if (containsFormat('xml')) {
    return XmlIcon;
  }
  if (containsFormat('json')) {
    return JsonIcon;
  }

  return UnknownIcon;
};

export default getFormatIcon;
