import React, { FC, memo, useState } from 'react';
import { compose } from 'redux';
import SvgIcon from '@fellesdatakatalog/icons';
import Button, { Variant } from '@fellesdatakatalog/button';
import ErrorPage from '../../components/error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import Project from './components/project';
import localization from '../../lib/localization';

import SC from './styled';
import { AiProject } from '../../types';

const projects: AiProject[] = [
  {
    id: 1,
    prosjekteier: 'Agder Energi',
    prosjekttitel: 'Ytelses- og helseovervåking for vannkraftverk (PHM Hydro)',
    departement: 'Nærings- og fiskeridepartementet',
    eiertype: 'Annet',
    kontaktperson: 'Kjell G. Robbersmyr',
    beskrivelseAvProsjekt:
      'Kontinuerlig overvåking av tilstanden til kritisk utstyr som turbiner og generatorer, samt effektiviteten til utstyret, sikrer at vannkraftverkene drives lønnsomt og uten uønskede driftsstans. PHMHydro har som mål å bygge grunnlaget for en slik ytelses- og tilstandsovervåkingsarkitektur for vannkraftverk som er skalerbar til flere tekniske komponenter og til flere kraftverk. Dette inkluderer evaluering av ny metodikk, utvikling av nye algoritmer ved bruk av fysikk og kunstig intelligens (AI), og en arkitektur for å håndtere algoritmene i sky/tåke-distribusjon',
    formaalMedProsjekt: '',
    prosjektstart: 2022,
    prosjektslutt: 2025,
    tilknyttedeOrganisasjoner: 'Statkraft',
    brukAvInnleide: '',
    lenkeTilProsjekt: 'https://aidirectory.no/view-project.php?id=1402',
    status: '',
    typeData: '',
    datakilde: '',
    modellutvikling: 'Ja',
    klassifisering: ''
  },
  {
    id: 2,
    prosjekteier: 'Avinor',
    prosjekttitel: 'Robotisert bagasjehåndtering på flyplasser',
    departement: 'Samferdselsdepartementet',
    eiertype: 'Annet',
    kontaktperson: 'Wilhelm Otnes',
    beskrivelseAvProsjekt:
      'I RoBa-prosjektet skal det forskes på nye og robuste metoder for robotpakking av bagasje i traller og tilstøtende automatiserte transportsystemer og mellomlagring av traller. Resultatene skal implementeres i et pilotanlegg på Gardermoen og bli et viktig grunnlag for videre utvikling både her og på andre flyplasser.',
    formaalMedProsjekt: '',
    prosjektstart: 2020,
    prosjektslutt: 2021,
    tilknyttedeOrganisasjoner: 'Oslo Lufthavn Gardermoen (OSL)',
    brukAvInnleide: '',
    lenkeTilProsjekt: '',
    status: '',
    typeData: '',
    datakilde: '',
    modellutvikling: 'Nei',
    klassifisering: ''
  }
];

const Page: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAllProjects, setOpenAllProjects] = useState(false);

  return (
    <main id='content' className='container'>
      <div className='row mb-5'>
        <div className='col-12'>
          <SC.Header>{localization.aiPage.artificialIntelligence}</SC.Header>
        </div>
      </div>
      <div className='row mb-5'>
        <SC.SearchBox className='col-12'>
          <SC.Filter>
            <input
              aria-label={localization.aiPage.searchProject}
              autoComplete='off'
              placeholder={localization.aiPage.searchProject}
              type='text'
              value={searchValue}
              onChange={({ target: { value } }) => setSearchValue(value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setSearchQuery(searchValue);
                }
              }}
            />
            <SC.SearchButton
              aria-label={localization.query.reset}
              className='search-clear'
              type='button'
              onClick={() => {
                setSearchValue('');
                setSearchQuery('');
              }}
            >
              <SC.IconWrapper>
                <SvgIcon name='crossStroke' />
              </SC.IconWrapper>
            </SC.SearchButton>
            <SC.SearchButton
              aria-label={localization.query.reset}
              className='search-clear'
              type='button'
              onClick={() => setSearchQuery(searchValue)}
            >
              <SC.IconWrapper>
                <SvgIcon name='magnifyingGlassStroke' />
              </SC.IconWrapper>
            </SC.SearchButton>
          </SC.Filter>
        </SC.SearchBox>
      </div>
      <div className='row mb-5'>
        <div className='col-12'>
          <SC.ButtonRow>
            <Button
              variant={Variant.TERTIARY}
              onClick={() => setOpenAllProjects(!openAllProjects)}
            >
              <SC.ButtonIconWrapper>
                {openAllProjects ? (
                  <SvgIcon name='chevronDoubleUpStroke' />
                ) : (
                  <SvgIcon name='chevronDoubleDownStroke' />
                )}
              </SC.ButtonIconWrapper>
              {openAllProjects
                ? localization.aiPage.hideAllFields
                : localization.aiPage.showAllFields}
            </Button>
          </SC.ButtonRow>
          {projects
            ?.filter(
              project =>
                searchQuery.length === 0 ||
                project.prosjekteier
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                project.prosjekttitel
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                project.departement
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                project.beskrivelseAvProsjekt
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                project.tilknyttedeOrganisasjoner
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                project.kontaktperson
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((project, index) => (
              <Project
                key={`ai-project-${index}`}
                project={project}
                isExpanded={openAllProjects}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

const enhance = compose(withErrorBoundary(ErrorPage));
export const AiProjectPage = enhance(memo(Page));
