import React, { memo, FC } from 'react';

import ApiIcon from '../../../../images/icon-format-api-lg.svg';
import DownloadIcon from '../../../../images/icon-download-lg.svg';
import SC from './styled';

import testIds from './test-ids';

import formatIcons from './format-icons';
import { MediaTypeOrExtent } from '../../../../types';

interface Props {
  title: string;
  formats: MediaTypeOrExtent[];
  hasDataservice?: boolean;
  hasDownloadUrl?: boolean;
}

const Summary: FC<Props> = ({
  title,
  formats,
  hasDataservice,
  hasDownloadUrl,
  ...props
}) => (
  <SC.Summary data-testid={testIds.root} {...props}>
    {title && <SC.Title data-testid={testIds.title}>{title}</SC.Title>}
    <SC.Formats data-testid={testIds.formats}>
      {hasDownloadUrl && (
        <SC.Format key='hasDownloadUrl'>
          <DownloadIcon />
        </SC.Format>
      )}
      {hasDataservice && (
        <SC.Format key='api'>
          <ApiIcon />
        </SC.Format>
      )}
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
