import React, { memo, FC } from 'react';

import translations from '../../../../lib/localization';
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
          property={translations.dataset.distribution.licenseLinkDefault}
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
          property={translations.dataset.distribution.format}
          value={formats.sort(formatSorter).join(', ')}
          data-testid={testIds.detail}
        />
      )}
      <Detail
        property={translations.dataset.distribution.description}
        value={translate(description)}
        data-testid={testIds.detail}
      />
      {downloadURL && (
        <Detail
          property={translations.dataset.distribution.downloadUrl}
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
          property={translations.dataset.distribution.accessUrl}
          value={
            <ExternalLink uri={accessURL} prefLabel={accessURL} openInNewTab />
          }
          data-testid={testIds.detail}
        />
      )}
      {conformsToUri && (
        <Detail
          property={translations.dataset.distribution.conformsTo}
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
          prefLabel={translations.dataset.distribution.page}
          openInNewTab
          data-testid={testIds.moreInfo}
        />
      )}
    </ExpansionPanelBody>
  </SC.DatasetDistribution>
);

export default memo(DatasetDistribution);
