import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '@fellesdatakatalog/expansion-panel';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import ExternalLink from '../../../link-external';

import Summary from '../summary';
import Detail from '../detail';
import Preview from '../preview';

import DownloadIcon from '../../../../images/icon-download-sm.svg';
import EyeIcon from '../../../../images/icon-eye.svg';

import SC from './styled';

import testIds from './test-ids';

import {
  AccessService,
  Distribution,
  License,
  TextLanguage
} from '../../../../types';

interface ExternalProps {
  accessServices?: AccessService[];
  datasetTitle: Partial<TextLanguage>;
  distribution: Partial<Distribution>;
  endpointDescriptions?: string[];
}

interface Props extends ExternalProps {}

const DatasetDistribution: FC<Props> = ({
  datasetTitle,
  distribution: {
    title,
    description,
    license: licenses = [],
    fdkFormat: formats = [],
    downloadURL: [downloadURL] = [],
    accessURL: [accessURL] = [],
    conformsTo: [
      { uri: conformsToUri = null, prefLabel: conformsToPrefLabel = null } = {}
    ] = [],
    page: [{ uri: pageUri = null } = {}] = []
  },
  accessServices = [],
  endpointDescriptions = []
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleShowPreview = (show: boolean) => {
    setShowPreview(show);
  };

  return (
    <SC.DatasetDistribution data-testid={testIds.root}>
      <ExpansionPanelHead>
        <Summary
          title={
            translate(title) ??
            translate(description) ??
            translate(accessServices[0]?.description) ??
            accessURL
          }
          formats={formats}
          data-testid={testIds.summary}
          hasDataservice={!!accessServices?.length}
        />
      </ExpansionPanelHead>
      <ExpansionPanelBody>
        {formats.length > 0 && (
          <Detail
            property={translations.dataset.distribution.format}
            value={formats
              .map(format => format.name || format.code)
              .sort()
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
                prefLabel={accessURL}
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
        {accessServices.length > 0 && (
          <Detail
            property={translations.dataset.distribution.dataService}
            value={
              <SC.ColumnData>
                {accessServices?.map(
                  ({
                    description: accessServiceDescription,
                    uri: accessServiceUri
                  }) => (
                    <SC.ColumnRow>
                      <Link to={accessServiceUri} key={accessServiceUri}>
                        {translate(accessServiceDescription)}
                      </Link>
                    </SC.ColumnRow>
                  )
                )}
              </SC.ColumnData>
            }
            data-testid={testIds.detail}
          />
        )}
        {endpointDescriptions.length > 0 && (
          <Detail
            property={translations.dataset.distribution.endpointDescription}
            value={
              <SC.ColumnData>
                {endpointDescriptions?.map(endpointDescription => (
                  <SC.ColumnRow>
                    <ExternalLink
                      uri={endpointDescription}
                      key={endpointDescription}
                      prefLabel={endpointDescription}
                      openInNewTab
                    />
                  </SC.ColumnRow>
                ))}
              </SC.ColumnData>
            }
            data-testid={testIds.detail}
          />
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
        {downloadURL && (
          <SC.Section>
            <SC.DownloadLink href={downloadURL} icon={<DownloadIcon />}>
              {translations.dataset.distribution.download}
            </SC.DownloadLink>
            <SC.PreviewLink
              onClick={() => handleShowPreview(true)}
              icon={<EyeIcon />}
            >
              {translations.dataset.distribution.preview}
            </SC.PreviewLink>
          </SC.Section>
        )}
        {downloadURL && showPreview && (
          <Preview
            title={translate(datasetTitle) ?? ''}
            subtitle={
              translate(title) ??
              translate(description) ??
              translate(accessServices[0]?.description) ??
              accessURL
            }
            downloadURL={downloadURL}
            rowCount={100}
            isOpen={showPreview}
            onClose={() => handleShowPreview(false)}
          />
        )}
      </ExpansionPanelBody>
    </SC.DatasetDistribution>
  );
};

export default compose<FC<ExternalProps>>(memo)(DatasetDistribution);
