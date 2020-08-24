import React, { memo, FC, useLayoutEffect } from 'react';
import { compose } from 'redux';
import type { RouteComponentProps } from 'react-router-dom';
import Link from '@fellesdatakatalog/link';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';
import withDataset, {
  Props as DatasetProps
} from '../../../../components/with-dataset';

import ExpansionPanel, {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '../../../../components/expansion-panel';

import SC from './styled';
import ReactTooltipSC from '../../../../components/tooltip/styled';

interface RouteParams {
  organizationId: string;
  datasetId: string;
}

interface Props
  extends OrganizationProps,
    DatasetProps,
    RouteComponentProps<RouteParams> {}

const DatasetPage: FC<Props> = ({
  organization,
  dataset,
  organizationActions: { getOrganizationRequested: getOrganization },
  datasetActions: { getDatasetRequested: getDataset },
  match: {
    params: { organizationId, datasetId }
  }
}) => {
  useLayoutEffect(() => {
    if (organization?.id !== organizationId) {
      getOrganization(organizationId);
    }
    if (dataset?.id !== datasetId) {
      getDataset(datasetId);
    }
  }, []);

  const isAuthoritative = dataset?.provenance?.code === 'NASJONAL';

  const visibilityScore = 75;
  const availabilityScore = 54;
  const interpolarityScore = 63;
  const contextScore = 27;
  const reusabilityScore = 38;

  return (
    <SC.DatasetPage className="container">
      <SC.Banner>
        <h1>Metadatakvalitet for datasettbeskrivelsen av </h1>
        <div>
          <SC.DatasetIcon />
          <SC.Title>
            {translate(dataset?.title)}
            {isAuthoritative && (
              <div data-tip={translations.authoritativeDatasetTooltip}>
                <SC.AuthoritativeIcon />
                <ReactTooltipSC.ReactTooltipStyled effect="solid" multiline />
              </div>
            )}
          </SC.Title>
        </div>
      </SC.Banner>
      <SC.Section>
        <SC.SummaryBoxes>
          <SC.Box>here 1</SC.Box>
          <SC.Box>here 2</SC.Box>
        </SC.SummaryBoxes>
      </SC.Section>
      <SC.Section>
        <SC.Table>
          <SC.TableHead>
            <tr>
              <th>
                <p>{translations.metadataQualityPage.criterion}</p>
                <p>{translations.metadataQualityPage.metadataQuality}</p>
              </th>
            </tr>
          </SC.TableHead>
          <SC.TableBody>
            <tr className="section-row">
              <td>
                <p>{translations.metadataQualityPage.criteria.visibility}</p>
                <div>
                  {visibilityScore < 50 && <SC.PoorQualityIcon />}
                  {visibilityScore >= 50 && visibilityScore < 75 && (
                    <SC.MediumQualityIcon />
                  )}
                  {visibilityScore >= 75 && <SC.GoodQualityIcon />}
                  {visibilityScore}%
                </div>
              </td>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Nøkkelord er opggitt</p>
                  <span>
                    {visibilityScore < 50 && <SC.PoorQualityIcon />}
                    {visibilityScore >= 50 && visibilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {visibilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body1</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Tema er oppgitt</p>
                  <span>
                    {visibilityScore < 50 && <SC.PoorQualityIcon />}
                    {visibilityScore >= 50 && visibilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {visibilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body2</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Det er oppgitt fyldig nok informasjon</p>
                  <span>
                    {visibilityScore < 50 && <SC.PoorQualityIcon />}
                    {visibilityScore >= 50 && visibilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {visibilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body2</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr className="section-row">
              <td>
                <p>{translations.metadataQualityPage.criteria.availability}</p>
                <div>
                  {availabilityScore < 50 && <SC.PoorQualityIcon />}
                  {availabilityScore >= 50 && availabilityScore < 75 && (
                    <SC.MediumQualityIcon />
                  )}
                  {availabilityScore >= 75 && <SC.GoodQualityIcon />}
                  {availabilityScore}%
                </div>
              </td>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Nedlastingslenke er oppgitt</p>
                  <span>
                    {availabilityScore < 50 && <SC.PoorQualityIcon />}
                    {availabilityScore >= 50 && availabilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {availabilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body2</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr className="section-row">
              <td>
                <p>{translations.metadataQualityPage.criteria.interpolarity}</p>
                <div>
                  {interpolarityScore < 50 && <SC.PoorQualityIcon />}
                  {interpolarityScore >= 50 && interpolarityScore < 75 && (
                    <SC.MediumQualityIcon />
                  )}
                  {interpolarityScore >= 75 && <SC.GoodQualityIcon />}
                  {interpolarityScore}%
                </div>
              </td>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Format er oppgitt</p>
                  <span>
                    {interpolarityScore < 50 && <SC.PoorQualityIcon />}
                    {interpolarityScore >= 50 && interpolarityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {interpolarityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body2</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Type er oppgitt</p>
                  <span>
                    {interpolarityScore < 50 && <SC.PoorQualityIcon />}
                    {interpolarityScore >= 50 && interpolarityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {interpolarityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Format/mediatype referert fra ordliste</p>
                  <span>
                    {interpolarityScore < 50 && <SC.PoorQualityIcon />}
                    {interpolarityScore >= 50 && interpolarityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {interpolarityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>I samsvar med DCAT-AP-NO</p>
                  <span>
                    {interpolarityScore < 50 && <SC.PoorQualityIcon />}
                    {interpolarityScore >= 50 && interpolarityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {interpolarityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr className="section-row">
              <td>
                <p>{translations.metadataQualityPage.criteria.context}</p>
                <div>
                  {contextScore < 50 && <SC.PoorQualityIcon />}
                  {contextScore >= 50 && contextScore < 75 && (
                    <SC.MediumQualityIcon />
                  )}
                  {contextScore >= 75 && <SC.GoodQualityIcon />}
                  {contextScore}%
                </div>
              </td>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Utgivelsesdato er oppgitt</p>
                  <span>
                    {contextScore < 50 && <SC.PoorQualityIcon />}
                    {contextScore >= 50 && contextScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {contextScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Dato for siste oppdatering er oppgitt</p>
                  <span>
                    {contextScore < 50 && <SC.PoorQualityIcon />}
                    {contextScore >= 50 && contextScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {contextScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Rettigheter er oppgitt</p>
                  <span>
                    {contextScore < 50 && <SC.PoorQualityIcon />}
                    {contextScore >= 50 && contextScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {contextScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr className="section-row">
              <td>
                <p>{translations.metadataQualityPage.criteria.reusability}</p>
                <div>
                  {reusabilityScore < 50 && <SC.PoorQualityIcon />}
                  {reusabilityScore >= 50 && reusabilityScore < 75 && (
                    <SC.MediumQualityIcon />
                  )}
                  {reusabilityScore >= 75 && <SC.GoodQualityIcon />}
                  {reusabilityScore}%
                </div>
              </td>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Lisens er oppgitt</p>
                  <span>
                    {reusabilityScore < 50 && <SC.PoorQualityIcon />}
                    {reusabilityScore >= 50 && reusabilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {reusabilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Lisens er referert fra ordliste</p>
                  <span>
                    {reusabilityScore < 50 && <SC.PoorQualityIcon />}
                    {reusabilityScore >= 50 && reusabilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {reusabilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Informasjon om tilgansnivå og -rettigheter er oppgitt</p>
                  <span>
                    {reusabilityScore < 50 && <SC.PoorQualityIcon />}
                    {reusabilityScore >= 50 && reusabilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {reusabilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Kontaktpunkt er oppgitt</p>
                  <span>
                    {reusabilityScore < 50 && <SC.PoorQualityIcon />}
                    {reusabilityScore >= 50 && reusabilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {reusabilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
            <tr>
              <ExpansionPanel as="td">
                <ExpansionPanelHead>
                  <p>Utgiver er oppgitt</p>
                  <span>
                    {reusabilityScore < 50 && <SC.PoorQualityIcon />}
                    {reusabilityScore >= 50 && reusabilityScore < 75 && (
                      <SC.MediumQualityIcon />
                    )}
                    {reusabilityScore >= 75 && <SC.GoodQualityIcon />}
                  </span>
                </ExpansionPanelHead>
                <ExpansionPanelBody>body3</ExpansionPanelBody>
              </ExpansionPanel>
            </tr>
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
    </SC.DatasetPage>
  );
};

export default compose<FC>(memo, withOrganization, withDataset)(DatasetPage);
