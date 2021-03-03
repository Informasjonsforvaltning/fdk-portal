import React, { memo, FC } from 'react';

import SC from './styled';

import testIds from './test-ids';

import formatIcons from './format-icons';

import { DataFormat } from '../../../../types/enums';

interface Props {
  title: string;
  formats: string[];
}

const toDataFormat = (format: string) =>
  Object.values(DataFormat).find(
    v =>
      format.toLowerCase().includes(v) ||
      format.toLowerCase().includes(v.replace('text/', '')) ||
      format.toLowerCase().includes(v.replace('application/', '')) ||
      format.toLowerCase().includes(v.replace('application/vnd.', ''))
  ) ?? DataFormat.UNKNOWN;

const Summary: FC<Props> = ({ title, formats, ...props }) => (
  <SC.Summary data-testid={testIds.root} {...props}>
    <SC.Title data-testid={testIds.title}>{title}</SC.Title>
    <SC.Formats data-testid={testIds.formats}>
      {formats.map(format => {
        const Icon = formatIcons[toDataFormat(format)];
        return (
          <SC.Format key={format} data-testid={testIds.format}>
            <Icon />
          </SC.Format>
        );
      })}
    </SC.Formats>
  </SC.Summary>
);

export default memo(Summary);
