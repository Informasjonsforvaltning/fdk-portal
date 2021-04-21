import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import type { RouteComponentProps } from 'react-router-dom';

import { getConfig } from '../../../../config';

import localization from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import withOrganizations, {
  Props as OrganizationsProps
} from '../../../../components/with-organizations';
import withErrorBoundary from '../../../../components/with-error-boundary';
import ErrorPage from '../../../../components/error-page';

import SC from './styled';

import type { OrganizationSummary } from '../../../../types';
import { Entity } from '../../../../types/enums';

interface Props extends OrganizationsProps, RouteComponentProps {}

const OrganizationsPage: FC<Props> = ({
  organizations,
  organizationsActions: { getOrganizationsRequested: getOrganizations },
  match: { url }
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const isTransportportal = getConfig().themeNap;

  const filterOrganizationsByName = (query: string) =>
    query
      ? organizations.filter(({ prefLabel, name }) =>
          (translate(prefLabel) ?? name ?? '')
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : organizations;

  useEffect(() => {
    getOrganizations(isTransportportal ? 'transportportal' : undefined);
  }, []);

  return (
    <main className='container'>
      <div className='row mb-5'>
        <div className='col-12'>
          <SC.Header>{localization.searchOrganizations}</SC.Header>
        </div>
      </div>
      <div className='row mb-5'>
        <SC.SearchBox className='col-12'>
          <SC.Filter>
            <label className='uu-invisible' htmlFor='searchBox'>
              {localization.searchOrganization}
            </label>
            <input
              aria-label={localization.searchOrganization}
              autoComplete='off'
              placeholder={localization.searchOrganization}
              type='text'
              value={searchQuery}
              onChange={({ target: { value } }) => setSearchQuery(value)}
            />
            <button
              aria-label={localization.query.reset}
              className='search-clear'
              type='button'
              onClick={() => setSearchQuery('')}
            >
              <SC.ClearIcon />
            </button>
          </SC.Filter>
        </SC.SearchBox>
      </div>
      <div className='row'>
        {filterOrganizationsByName(searchQuery).map(
          (
            { id, name, prefLabel, datasetCount, dataserviceCount },
            index: number,
            organizations: OrganizationSummary[]
          ) => {
            let sortLabel = '';
            const previousOrganizationName =
              translate(organizations[index - 1]?.prefLabel) ||
              organizations[index - 1]?.name;
            const currentOrganizationName = translate(prefLabel) || name;

            if (
              index === 0 ||
              (index > 0 &&
                previousOrganizationName &&
                currentOrganizationName &&
                previousOrganizationName.charAt(0) !==
                  currentOrganizationName.charAt(0))
            ) {
              sortLabel = name?.charAt(0);
            }

            return (
              <SC.Box key={id} className='col-12' to={`${url}/${id}`}>
                <SC.SortLabel>{sortLabel}</SC.SortLabel>
                <SC.Title>{translate(prefLabel) || name}</SC.Title>
                <SC.Info>
                  <SC.CountTag type={Entity.DATASET}>
                    {datasetCount}
                  </SC.CountTag>
                  {!isTransportportal && (
                    <>
                      <SC.CountTag type={Entity.DATA_SERVICE}>
                        {dataserviceCount}
                      </SC.CountTag>
                    </>
                  )}
                </SC.Info>
              </SC.Box>
            );
          }
        )}
      </div>
    </main>
  );
};

export default compose<FC>(
  memo,
  withOrganizations,
  withErrorBoundary(ErrorPage)
)(OrganizationsPage);
