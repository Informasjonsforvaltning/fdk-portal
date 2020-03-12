import React, { memo, FC } from 'react';

import JsonIcon from '../../../../images/icon-format-json-lg.svg';
import XmlIcon from '../../../../images/icon-format-xml-lg.svg';
import CsvIcon from '../../../../images/icon-format-csv-lg.svg';
import UnknownIcon from '../../../../images/icon-format-unknown-lg.svg';

import SC from './styled';

import testIds from './test-ids';

import { DataFormat } from '../../../../types/enums';

interface Props {
  title: string;
  formats: DataFormat[];
}

const Summary: FC<Props> = ({ title, formats, ...props }) => {
  const renderFormat = (format: DataFormat) => {
    let Icon = UnknownIcon;
    switch (format) {
      case DataFormat.JSON: {
        Icon = JsonIcon;
        break;
      }
      case DataFormat.XML: {
        Icon = XmlIcon;
        break;
      }
      case DataFormat.CSV: {
        Icon = CsvIcon;
        break;
      }
      default: {
        break;
      }
    }
    return (
      <SC.Format key={format} data-testid={testIds.format}>
        <Icon />
      </SC.Format>
    );
  };

  return (
    <SC.Summary data-testid={testIds.root} {...props}>
      <SC.Title data-testid={testIds.title}>{title}</SC.Title>
      <SC.Formats data-testid={testIds.formats}>
        {formats.map(renderFormat)}
      </SC.Formats>
    </SC.Summary>
  );
};

export default memo(Summary);
