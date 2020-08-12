import React, { memo, FC, useState, useLayoutEffect } from 'react';
import { compose } from 'redux';
import type { RouteComponentProps } from 'react-router-dom';
import Link from '@fellesdatakatalog/link';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';
import withDatasets, {
  Props as DatasetsProps
} from '../../../../components/with-datasets';

import { getTranslateText as translate } from '../../../../lib/translateText';

import SC from './styled';

interface RouteParams {
  organizationId: string;
}

interface Props
  extends OrganizationProps,
    DatasetsProps,
    RouteComponentProps<RouteParams> {}

const DatasetsPage: FC<Props> = ({
  organization,
  datasets,
  organizationActions: { getOrganizationRequested: getOrganization },
  datasetsActions: { getDatasetsRequested: getDatasets },
  history: { push },
  match: {
    url,
    params: { organizationId }
  }
}) => {
  const [datasetsRequested, setDatasetsRequested] = useState(false);

  useLayoutEffect(() => {
    if (organization?.id !== organizationId) {
      getOrganization(organizationId);
    }
  }, []);

  useLayoutEffect(() => {
    if (organization && !datasetsRequested) {
      getDatasets({ orgPath: organization.orgPath });
      setDatasetsRequested(true);
    }
  }, [organization]);

  return (
    <SC.DatasetsPage className="container">
      <SC.Title>
        Datasettkatalog for{' '}
        {translate(organization?.prefLabel) || organization?.name}
      </SC.Title>
      <SC.Subtitle>
        Metadatakvalitet for beskrivelse av datasett i datasettkatalogen
      </SC.Subtitle>
      <SC.Section>
        <SC.SummaryBoxes>
          <SC.Box>HERE</SC.Box>
          <SC.Box>HERE</SC.Box>
        </SC.SummaryBoxes>
      </SC.Section>
      <SC.Section>
        <SC.Table>
          <SC.TableHead>
            <tr>
              <th>something</th>
              <th>something</th>
              <th>something</th>
              <th>something</th>
            </tr>
          </SC.TableHead>
          <SC.TableBody>
            {datasets.map(({ id, title }) => (
              <tr key={id} onClick={() => push(`${url}/${id}`)}>
                <td>{translate(title)}</td>
                <td>here</td>
                <td>here</td>
                <td>here</td>
              </tr>
            ))}
          </SC.TableBody>
        </SC.Table>
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
    </SC.DatasetsPage>
  );
};

export default compose<FC>(memo, withOrganization, withDatasets)(DatasetsPage);
