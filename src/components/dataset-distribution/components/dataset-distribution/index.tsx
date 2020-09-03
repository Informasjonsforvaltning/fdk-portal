import React, { memo, FC } from 'react';
import { Link } from 'react-router-dom';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import { PATHNAME_DATA_SERVICES } from '../../../../constants/constants';

import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '../../../expansion-panel';
import ExternalLink from '../../../link-external';

import Summary from '../summary';
import Detail from '../detail';

import DownloadIcon from '../../../../images/icon-download-sm.svg';

import SC from './styled';

import testIds from './test-ids';

import { formatSorter } from './utils';

import { Distribution, License } from '../../../../types';

interface Props {
  distribution: Partial<Distribution>;
}

const DatasetDistribution: FC<Props> = ({
  distribution: {
    title,
    description,
    license: licenses = [],
    format: formats = [],
    downloadURL: [downloadURL] = [],
    accessURL: [accessURL] = [],
    conformsTo: [
      { uri: conformsToUri = null, prefLabel: conformsToPrefLabel = null } = {}
    ] = [],
    page: [{ uri: pageUri = null } = {}] = [],
    accessService: accessServices = []
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
      {formats.length > 0 && (
        <Detail
          property={translations.dataset.distribution.format}
          value={formats.sort(formatSorter).join(', ')}
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
      {licenses?.map(
        ({ uri: licenseUri, prefLabel: licensePrefLabel }: License) => (
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
        )
      )}
      <Detail
        property={translations.dataset.distribution.description}
        value={translate(description)}
        data-testid={testIds.detail}
      />
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
      {accessServices?.map(
        ({ description, endpointDescription: [endpointDescription] }) => (
          <Detail
            key={endpointDescription.uri}
            property={translations.dataset.distribution.dataService}
            value={
              <Link to={`${PATHNAME_DATA_SERVICES}/${endpointDescription.uri}`}>
                {translate(description)}
              </Link>
            }
            data-testid={testIds.detail}
          />
        )
      )}
      {downloadURL && (
        <SC.Section>
          <SC.DownloadButton href={downloadURL}>
            <DownloadIcon />
            {translations.dataset.distribution.download}
          </SC.DownloadButton>
        </SC.Section>
      )}
      {pageUri && (
        <SC.Section>
          <ExternalLink
            uri={pageUri}
            prefLabel={translations.dataset.distribution.page}
            openInNewTab
            data-testid={testIds.moreInfo}
          />
        </SC.Section>
      )}
    </ExpansionPanelBody>
  </SC.DatasetDistribution>
);

export default memo(DatasetDistribution);
