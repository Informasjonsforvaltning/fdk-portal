import React, { memo, useState } from 'react';
import type { FC } from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '@fellesdatakatalog/expansion-panel';
import LinkExternal from '@fellesdatakatalog/link';

import ExpansionIndicatorDefault from '../../../expansion-indicator-default';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import Summary from '../summary';
import Detail from '../detail';
import Preview from '../preview';

import DownloadIcon from '../../../../images/icon-download-sm.svg';
import EyeIcon from '../../../../images/icon-eye.svg';

import SC from './styled';

import testIds from './test-ids';

import type {
  AccessService,
  Distribution,
  License,
  TextLanguage
} from '../../../../types';

interface ExternalProps {
  accessServices?: AccessService[];
  datasetTitle: Partial<TextLanguage>;
  distribution: Partial<Distribution>;
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
    page: [{ uri: pageUri = null } = {}] = []
  },
  accessServices = []
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const id = _.uniqueId('dataset-distribution');

  const handleShowPreview = (show: boolean) => {
    setShowPreview(show);
  };

  return (
    <SC.DatasetDistribution
      id={id}
      data-testid={testIds.root}
      expansionIndicator={{
        expand: <ExpansionIndicatorDefault />,
        collapse: (
          <ExpansionIndicatorDefault
            isExpanded
            aria-expanded='true'
            aria-controls={id}
          />
        )
      }}
    >
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
          hasDownloadUrl={!!downloadURL}
        />
      </ExpansionPanelHead>
      <ExpansionPanelBody>
        {formats.length > 0 && (
          <Detail
            property={translations.dataset.distribution.format}
            value={formats
              .map(format => format.name || format.code)
              .filter(Boolean)
              .sort()
              .join(', ')}
            data-testid={testIds.detail}
          />
        )}
        {accessURL && (
          <Detail
            property={translations.dataset.distribution.accessUrl}
            value={
              <LinkExternal href={accessURL} external>
                {accessURL}
              </LinkExternal>
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
                <LinkExternal href={licenseUri} external>
                  {translate(licensePrefLabel) || licenseUri}
                </LinkExternal>
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
        {pageUri && (
          <SC.Section>
            <LinkExternal
              href={pageUri}
              external
              data-testid={testIds.moreInfo}
            >
              {translations.dataset.distribution.page}
            </LinkExternal>
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
