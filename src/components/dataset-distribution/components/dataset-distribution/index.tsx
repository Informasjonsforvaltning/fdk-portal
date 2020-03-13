import React, { memo, FC } from 'react';

import tranlations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '../../../expansion-panel';
import ExternalLink from '../../../link-external';

import Summary from '../summary';
import Detail from '../detail';

import SC from './styled';

import testIds from './test-ids';

import { formatSorter } from './utils';

import { Distribution } from '../../../../types';

interface Props {
  distribution: Partial<Distribution>;
}

const DatasetDistribution: FC<Props> = ({
  distribution: {
    title,
    description,
    license: { uri: licenseUri, prefLabel: licensePrefLabel } = {},
    format: formats = [],
    downloadURL: [downloadURL] = [],
    accessURL: [accessURL] = [],
    conformsTo: [
      { uri: conformsToUri = null, prefLabel: conformsToPrefLabel = null } = {}
    ] = [],
    page: [{ uri: pageUri = null } = {}] = []
  }
}) => (
  <SC.DatasetDistribution data-testid={testIds.root}>
    <ExpansionPanelHead>
      <Summary
        title={translate(title) || translate(description)}
        formats={formats.sort(formatSorter)}
        data-testid={testIds.summary}
      />
    </ExpansionPanelHead>
    <ExpansionPanelBody>
      {licenseUri && (
        <Detail
          property={tranlations.dataset.distribution.licenseLinkDefault}
          value={
            <ExternalLink
              uri={licenseUri}
              prefLabel={translate(licensePrefLabel) || licenseUri}
              openInNewTab
            />
          }
          data-testid={testIds.detail}
        />
      )}
      {formats.length > 0 && (
        <Detail
          property={tranlations.dataset.distribution.format}
          value={formats.sort(formatSorter).join(', ')}
          data-testid={testIds.detail}
        />
      )}
      <Detail
        property={tranlations.dataset.distribution.description}
        value={translate(description)}
        data-testid={testIds.detail}
      />
      {downloadURL && (
        <Detail
          property={tranlations.dataset.distribution.downloadUrl}
          value={
            <ExternalLink
              uri={downloadURL}
              prefLabel={downloadURL}
              openInNewTab
            />
          }
          data-testid={testIds.detail}
        />
      )}
      {accessURL && (
        <Detail
          property={tranlations.dataset.distribution.accessUrl}
          value={
            <ExternalLink uri={accessURL} prefLabel={accessURL} openInNewTab />
          }
          data-testid={testIds.detail}
        />
      )}
      {conformsToUri && (
        <Detail
          property={tranlations.dataset.distribution.conformsTo}
          value={
            <ExternalLink
              uri={conformsToUri}
              prefLabel={translate(conformsToPrefLabel) || conformsToUri}
              openInNewTab
            />
          }
          data-testid={testIds.detail}
        />
      )}
      {pageUri && (
        <ExternalLink
          uri={pageUri}
          prefLabel={tranlations.dataset.distribution.page}
          openInNewTab
          data-testid={testIds.moreInfo}
        />
      )}
    </ExpansionPanelBody>
  </SC.DatasetDistribution>
);

export default memo(DatasetDistribution);
