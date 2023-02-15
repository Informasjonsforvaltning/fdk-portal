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
    prosjekttittel,
    prosjekteier,
    departement,
    eiertype,
    kontaktperson,
    prosjektBeskrivelse,
    prosjektFormaal,
    prosjektstart,
    prosjektslutt,
    tilknyttedeOrganisasjoner,
    innleideKonsulenter,
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
          {prosjekttittel}
        </SC.Summary>
      </ExpansionPanelHead>
      <ExpansionPanelBody>
        {prosjekteier && (
          <Detail
            property={localization.aiPage.projectOwner}
            value={prosjekteier}
          />
        )}
        {prosjekttittel && (
          <Detail
            property={localization.aiPage.projectTitle}
            value={prosjekttittel}
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
        {prosjektBeskrivelse && (
          <Detail
            property={localization.aiPage.descriptionOfProject}
            value={prosjektBeskrivelse}
          />
        )}
        {prosjektFormaal && (
          <Detail
            property={localization.aiPage.purposeOfProject}
            value={prosjektFormaal}
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
        {innleideKonsulenter && (
          <Detail
            property={localization.aiPage.useOfHired}
            value={innleideKonsulenter}
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
