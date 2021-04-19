import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '@fellesdatakatalog/expansion-panel';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import { PATHNAME_DATA_SERVICES } from '../../../../constants/constants';

import ExternalLink from '../../../link-external';

import Summary from '../summary';
import Detail from '../detail';

import DownloadIcon from '../../../../images/icon-download-sm.svg';

import SC from './styled';

import testIds from './test-ids';

import { toFormat, formatSorter, toMediaType } from './utils';

import { Distribution, License, MediaType } from '../../../../types';

interface ExternalProps {
  distribution: Partial<Distribution>;
  mediaTypes?: MediaType[];
}

interface Props extends ExternalProps {}

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
  },
  mediaTypes = []
}) => (
  <SC.DatasetDistribution data-testid={testIds.root}>
    <ExpansionPanelHead>
      <Summary
        title={
          translate(title) ||
          translate(description) ||
          accessURL?.toLowerCase() ||
          translate(accessServices[0]?.description)
        }
        formats={formats.map(toFormat).sort(formatSorter)}
        data-testid={testIds.summary}
      />
    </ExpansionPanelHead>
    <ExpansionPanelBody>
      {formats.length > 0 && (
        <Detail
          property={translations.dataset.distribution.format}
          value={formats
            .map(toFormat)
            .sort(formatSorter)
            .map(toMediaType(mediaTypes))
            .join(', ')}
          data-testid={testIds.detail}
        />
      )}
      {accessURL && (
        <Detail
          property={translations.dataset.distribution.accessUrl}
          value={
            <ExternalLink
              uri={accessURL}
              prefLabel={accessURL.toLowerCase()}
              openInNewTab
            />
          }
          data-testid={testIds.detail}
        />
      )}
      {licenses?.map(
        ({ uri: licenseUri, prefLabel: licensePrefLabel }: License) => (
          <Detail
            key={licenseUri}
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
        value={
          translate(description) ||
          translations.dataset.distribution.noDescription
        }
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

export default compose<FC<ExternalProps>>(memo)(DatasetDistribution);
