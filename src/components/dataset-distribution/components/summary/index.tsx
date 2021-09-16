import React, { memo, FC } from 'react';

import SC from './styled';

import testIds from './test-ids';

import formatIcons from './format-icons';
import { MediaTypeOrExtent } from '../../../../types';

interface Props {
  title: string;
  formats: MediaTypeOrExtent[];
}

const Summary: FC<Props> = ({ title, formats, ...props }) => (
  <SC.Summary data-testid={testIds.root} {...props}>
    <SC.Title data-testid={testIds.title}>{title}</SC.Title>
    <SC.Formats data-testid={testIds.formats}>
      {formats.map(format => {
        const Icon = formatIcons(format.code);
        return (
          <SC.Format key={format.code} data-testid={testIds.format}>
            <Icon />
          </SC.Format>
        );
      })}
    </SC.Formats>
  </SC.Summary>
);

export default memo(Summary);
