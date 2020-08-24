import React, { FC, memo, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import Link from '@fellesdatakatalog/link';
import ThemeProvider from '@fellesdatakatalog/theme';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';

import { getTranslateText as translate } from '../../../../lib/translateText';

import SC from './styled';

import DatasetIcon from '../../../../images/icon-catalog-dataset-lg.svg';
import AccessOpenIcon from '../../../../images/icon-access-open-md-v2.svg';
import AuthoritativeIcon from '../../../../images/icon-authoritative-md.svg';
import { PATHNAME_DATASETS } from '../../../../constants/constants';
import {
  patchListOfSearchQuery,
  patchSearchQuery
} from '../../../../lib/addOrReplaceUrlParam';
import { Entity, Filter } from '../../../../types/enums';
import NewIcon from '../../../../images/icon-new-md.svg';
import {
  IllustrationWithCount,
  SC as StatisticsRegularSC,
  StatisticsRegular
} from '../../../../components/statistics-regular/statistics-regular';
import { themeFDK as theme } from '../../../../app/theme';
import localization from '../../../../lib/localization';

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
      <ThemeProvider theme={theme.extendedColors[Entity.DATASET]}>
        <SC.Section>
          <SC.DatasetCataloguesStatistics>
            <h2>
              <DatasetIcon />
              Statistikk for datasettkatalog
            </h2>
            <SC.StatisticsBoxes>
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
            </SC.StatisticsBoxes>
            <SC.StatisticsBoxes>
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
            </SC.StatisticsBoxes>
          </SC.DatasetCataloguesStatistics>
        </SC.Section>
      </ThemeProvider>
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
