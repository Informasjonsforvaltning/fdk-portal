import React, { memo, FC, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { Link as RouteLink, RouteComponentProps } from 'react-router-dom';
import Link from '@fellesdatakatalog/link';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';

import { getTranslateText as translate } from '../../../../lib/translateText';

import SC from './styled';

import MagnifyingGlassIcon from '../../../../images/icon-catalog-all-md.svg';
import DatasetIcon from '../../../../images/icon-catalog-dataset-lg.svg';

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
            <SC.Box>Here</SC.Box>
            <SC.Box>Here</SC.Box>
            <SC.Box>Here</SC.Box>
            <SC.Box>Here</SC.Box>
          </div>
        </SC.AllCataloguesStatistics>
      </SC.Section>
      <SC.Section>
        <SC.DatasetCataloguesStatistics>
          <h2>
            <DatasetIcon />
            Statistikk for datasettkatalog
          </h2>
          <div>
            <SC.Box>Here</SC.Box>
            <SC.Box>Here</SC.Box>
            <SC.Box>Here</SC.Box>
            <SC.Box>Here</SC.Box>
          </div>
          <div>
            <SC.Box colspan={2}>
              <RouteLink to={`${url}/datasets`}>here</RouteLink>
            </SC.Box>
            <SC.Box colspan={2}>Here</SC.Box>
          </div>
        </SC.DatasetCataloguesStatistics>
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
