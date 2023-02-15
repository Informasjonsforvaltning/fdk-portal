import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import SvgIcon from '@fellesdatakatalog/icons';
import Button, { Variant } from '@fellesdatakatalog/button';
import ErrorPage from '../../components/error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import Project from './components/project';
import localization from '../../lib/localization';

import SC from './styled';
import withAiProjects, {
  Props as AiProjectProps
} from '../../components/with-ai-projects';

interface Props extends AiProjectProps {}

const Page: FC<Props> = ({
  aiProjects,
  aiProjectActions: { getAiProjectsRequested: getAiProjects }
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAllProjects, setOpenAllProjects] = useState(false);

  useEffect(() => {
    getAiProjects();
  }, []);

  // eslint-disable-next-line no-console
  console.log({ aiProjects });

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
          {aiProjects?.length > 0 && (
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
          )}
          {aiProjects?.length === 0 && (
            <div className='text-center'>Ingen prosjekter</div>
          )}
          {aiProjects
            ?.filter(
              project =>
                searchQuery.length === 0 ||
                project.prosjekteier
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                project.prosjekttittel
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                project.departement
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                project.prosjektBeskrivelse
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

const enhance = compose(withAiProjects, withErrorBoundary(ErrorPage));
export const AiProjectPage = enhance(memo(Page));
