import React, { FC, memo, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';

import { getTranslateText as translate } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';
import {
  patchListOfSearchQuery,
  patchSearchQuery
} from '../../../../lib/addOrReplaceUrlParam';

import {
  IllustrationWithCount,
  SC as StatisticsRegularSC,
  StatisticsRegular
} from '../../../../components/statistics-regular/statistics-regular';

import SC from './styled';

import MagnifyingGlassIcon from '../../../../images/icon-catalog-all-md.svg';
import DatasetIcon from '../../../../images/icon-catalog-dataset-lg.svg';
import AccessOpenIcon from '../../../../images/icon-access-open-md-v2.svg';
import AuthoritativeIcon from '../../../../images/icon-authoritative-md.svg';
import NewIcon from '../../../../images/icon-new-md.svg';

import {
  PATHNAME_DATASETS,
  PATHNAME_SEARCH
} from '../../../../constants/constants';

import { Entity, Filter } from '../../../../types/enums';
import { themeFDK as theme } from '../../../../app/theme';

interface RouteParams {
  organizationId: string;
}

interface Props extends OrganizationProps, RouteComponentProps<RouteParams> {}

const OrganizationPage: FC<Props> = ({
  organization,
  organizationActions: { getOrganizationRequested: getOrganization },
  match: {
    url,
    params: { organizationId }
  }
}) => {
  useLayoutEffect(() => {
    if (organization?.id !== organizationId) {
      getOrganization(organizationId);
    }
  }, []);

  return (
    <SC.OrganizationPage className="container">
      <SC.Title>
        Statistikk for{' '}
        {translate(organization?.prefLabel) || organization?.name}
      </SC.Title>
      <SC.Section>
        <SC.OrganizationInformation>
          <pre>{JSON.stringify(organization, null, 2)}</pre>
        </SC.OrganizationInformation>
      </SC.Section>
      <SC.Section>
        <SC.AllCataloguesStatistics>
          <h2>
            <MagnifyingGlassIcon />
            Statistikk for alle kataloger tilsammen
          </h2>
          <div>
            <SC.Box>
              <StatisticsRegular
                to={`${PATHNAME_SEARCH}${patchSearchQuery(
                  Filter.ORGPATH,
                  organization?.orgPath
                )}`}
              >
                <IllustrationWithCount
                  icon={<MagnifyingGlassIcon />}
                  count={218}
                />
                <StatisticsRegularSC.StatisticsRegular.Label>
                  {localization.metadataQualityPage.descriptionsTotal}
                </StatisticsRegularSC.StatisticsRegular.Label>
              </StatisticsRegular>
            </SC.Box>
            <SC.Box>
              <StatisticsRegular
                to={`${PATHNAME_SEARCH}${patchListOfSearchQuery({
                  [Filter.ORGPATH]: organization?.orgPath,
                  [Filter.LASTXDAYS]: '365'
                })}`}
              >
                <IllustrationWithCount icon={<NewIcon />} count={218} />
                <StatisticsRegularSC.StatisticsRegular.Label>
                  {localization.formatString(
                    localization.metadataQualityPage.newDescriptions,
                    localization.metadataQualityPage.lastYear
                  )}
                </StatisticsRegularSC.StatisticsRegular.Label>
              </StatisticsRegular>
            </SC.Box>
            <SC.Box>
              <StatisticsRegular
                to={`${PATHNAME_SEARCH}${patchListOfSearchQuery({
                  [Filter.ORGPATH]: organization?.orgPath,
                  [Filter.LASTXDAYS]: '30'
                })}`}
              >
                <IllustrationWithCount icon={<NewIcon />} count={218} />
                <StatisticsRegularSC.StatisticsRegular.Label>
                  {localization.formatString(
                    localization.metadataQualityPage.newDescriptions,
                    localization.metadataQualityPage.lastMonth
                  )}
                </StatisticsRegularSC.StatisticsRegular.Label>
              </StatisticsRegular>
            </SC.Box>
            <SC.Box>
              <StatisticsRegular as="div" to="">
                <IllustrationWithCount count={218} />
                <StatisticsRegularSC.StatisticsRegular.Label>
                  {localization.formatString(
                    localization.metadataQualityPage.metadataQualityIs,
                    'TODO'
                  )}
                </StatisticsRegularSC.StatisticsRegular.Label>
              </StatisticsRegular>
            </SC.Box>
          </div>
        </SC.AllCataloguesStatistics>
      </SC.Section>
      <SC.Section>
        <ThemeProvider theme={theme.extendedColors[Entity.DATASET]}>
          <SC.DatasetCataloguesStatistics>
            <h2>
              <DatasetIcon />
              Statistikk for datasettkatalog
            </h2>
            <div>
              <SC.Box>
                <StatisticsRegular
                  to={`${PATHNAME_DATASETS}${patchSearchQuery(
                    Filter.ORGPATH,
                    organization?.orgPath
                  )}`}
                >
                  <IllustrationWithCount icon={<DatasetIcon />} count={28} />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {localization.metadataQualityPage.descriptionsTotal}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
              <SC.Box>
                <StatisticsRegular
                  to={`${PATHNAME_DATASETS}${patchListOfSearchQuery({
                    [Filter.ORGPATH]: organization?.orgPath,
                    [Filter.LASTXDAYS]: '7'
                  })}`}
                >
                  <IllustrationWithCount icon={<NewIcon />} count={1} />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {localization.formatString(
                      localization.metadataQualityPage.newDescriptions,
                      localization.metadataQualityPage.lastWeek
                    )}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
              <SC.Box>
                <StatisticsRegular
                  to={`${PATHNAME_DATASETS}${patchListOfSearchQuery({
                    [Filter.ORGPATH]: organization?.orgPath,
                    [Filter.PROVENANCE]: 'NASJONAL'
                  })}`}
                >
                  <IllustrationWithCount
                    icon={<AuthoritativeIcon />}
                    count={4}
                  />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {localization.formatString(
                      localization.metadataQualityPage.datasetIs,
                      localization.metadataQualityPage.authoritativeSources
                    )}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
              <SC.Box>
                <StatisticsRegular
                  to={`${PATHNAME_DATASETS}${patchListOfSearchQuery({
                    [Filter.ORGPATH]: organization?.orgPath,
                    [Filter.OPENDATA]: 'true'
                  })}`}
                >
                  <IllustrationWithCount icon={<AccessOpenIcon />} count={4} />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {localization.formatString(
                      localization.metadataQualityPage.datasetIs,
                      localization.metadataQualityPage.open
                    )}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
            </div>
            <div>
              <SC.Box colspan={2}>
                <StatisticsRegular to={`${url}/datasets`}>
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {localization.formatString(
                      localization.metadataQualityPage.metadataQualityCatalog,
                      'TODO'
                    )}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
              <SC.Box colspan={2}>
                <StatisticsRegular to={`${url}/datasets`}>
                  <IllustrationWithCount count={67} />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {localization.metadataQualityPage.percentMetadataQuality}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
            </div>
          </SC.DatasetCataloguesStatistics>
        </ThemeProvider>
      </SC.Section>
      <SC.Section>
        <SC.FrequentlyAskedQuestions>
          <SC.Question>
            <h3>Hva er metadatakvalitet?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
              rerum iusto natus voluptate officiis quasi recusandae labore eius
              obcaecati culpa molestias illo non hic facilis voluptatibus
              adipisci vitae, mollitia consequatur?
            </p>
            <Link href="/">Lær mer om metadatakvalitet</Link>
          </SC.Question>
          <SC.Question>
            <h3>Hvordan kan jeg forbedre metadatakvaliteten?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
              rerum iusto natus voluptate officiis quasi recusandae labore eius
              obcaecati culpa molestias illo non hic facilis voluptatibus
              adipisci vitae, mollitia consequatur?
            </p>
            <Link href="/">Slik forbedrer du metadatakvaliteten</Link>
          </SC.Question>
        </SC.FrequentlyAskedQuestions>
      </SC.Section>
    </SC.OrganizationPage>
  );
};

export default compose<FC>(memo, withOrganization)(OrganizationPage);
