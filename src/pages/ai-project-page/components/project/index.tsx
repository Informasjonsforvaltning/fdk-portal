import React from 'react';
import type { FC } from 'react';
import { compose } from 'redux';
import _ from 'lodash';

import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '@fellesdatakatalog/expansion-panel';
import Link from '@fellesdatakatalog/link';

import ExpansionIndicatorDefault from '../../../../components/expansion-indicator-default';

import localization from '../../../../lib/localization';

import Detail from '../detail';

import SC from './styled';

import type { AiProject } from '../../../../types';

interface ExternalProps {
  project: AiProject;
  isExpanded: boolean;
}

interface Props extends ExternalProps {}

const Project: FC<Props> = ({ project, isExpanded }) => {
  const id = _.uniqueId('ai-project');

  const {
    prosjekttitel,
    prosjekteier,
    departement,
    eiertype,
    kontaktperson,
    beskrivelseAvProsjekt,
    formaalMedProsjekt,
    prosjektstart,
    prosjektslutt,
    tilknyttedeOrganisasjoner,
    brukAvInnleide,
    lenkeTilProsjekt,
    status,
    typeData,
    datakilde,
    modellutvikling,
    klassifisering
  } = project;

  return (
    <SC.AiProject
      id={id}
      isExpanded={isExpanded}
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
        <SC.Summary>
          <h2>{prosjekteier}</h2>
          {prosjekttitel}
        </SC.Summary>
      </ExpansionPanelHead>
      <ExpansionPanelBody>
        {prosjekteier && (
          <Detail
            property={localization.aiPage.projectOwner}
            value={prosjekteier}
          />
        )}
        {prosjekttitel && (
          <Detail
            property={localization.aiPage.projectTitle}
            value={prosjekttitel}
          />
        )}
        {departement && (
          <Detail property={localization.aiPage.ministry} value={departement} />
        )}
        {eiertype && (
          <Detail property={localization.aiPage.ownerType} value={eiertype} />
        )}
        {kontaktperson && (
          <Detail
            property={localization.aiPage.contact}
            value={kontaktperson}
          />
        )}
        {beskrivelseAvProsjekt && (
          <Detail
            property={localization.aiPage.descriptionOfProject}
            value={beskrivelseAvProsjekt}
          />
        )}
        {formaalMedProsjekt && (
          <Detail
            property={localization.aiPage.purposeOfProject}
            value={formaalMedProsjekt}
          />
        )}
        {prosjektstart && (
          <Detail
            property={localization.aiPage.projectStartEnd}
            value={`${prosjektstart} ${
              prosjektslutt ? ` - ${prosjektslutt}` : ''
            }`}
          />
        )}
        {tilknyttedeOrganisasjoner && (
          <Detail
            property={localization.aiPage.connectedOrganizations}
            value={tilknyttedeOrganisasjoner}
          />
        )}
        {brukAvInnleide && (
          <Detail
            property={localization.aiPage.useOfHired}
            value={brukAvInnleide}
          />
        )}
        {lenkeTilProsjekt && (
          <Detail
            property={localization.aiPage.useOfHired}
            value={
              <Link href={lenkeTilProsjekt} external>
                {lenkeTilProsjekt}
              </Link>
            }
          />
        )}
        {status && (
          <Detail property={localization.aiPage.status} value={status} />
        )}
        {typeData && (
          <Detail property={localization.aiPage.typeOfData} value={typeData} />
        )}
        {datakilde && (
          <Detail property={localization.aiPage.datasource} value={datakilde} />
        )}
        {modellutvikling && (
          <Detail
            property={localization.aiPage.modelDevelopment}
            value={modellutvikling}
          />
        )}
        {klassifisering && (
          <Detail
            property={localization.aiPage.classification}
            value={klassifisering}
          />
        )}
      </ExpansionPanelBody>
    </SC.AiProject>
  );
};

export default compose<FC<ExternalProps>>(Project);
