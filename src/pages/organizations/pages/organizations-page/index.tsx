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
import ReactTooltipSC from '../../../../components/tooltip/styled';

import SC from './styled';

import type { OrganizationSummary } from '../../../../types';
import { Entity, SortOrder } from '../../../../types/enums';

interface Props extends OrganizationsProps, RouteComponentProps {}

const stringCompare = (a: string, b: string, sortMode: SortOrder) =>
  a.localeCompare(b) * (sortMode === SortOrder.ASC ? 1 : -1);

const numberCompare = (a: number, b: number, sortMode: SortOrder) =>
  a - b * (sortMode === SortOrder.ASC ? 1 : -1);

const OrganizationsPage: FC<Props> = ({
  organizations,
  organizationsActions: { getOrganizationsRequested: getOrganizations },
  match: { url }
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [sortState, setSortState] = useState<{
    field: keyof OrganizationSummary;
    order: SortOrder;
  }>({
    field: 'prefLabel',
    order: SortOrder.ASC
  });

  const determineNextSortOrder = (field: keyof OrganizationSummary) =>
    field === sortState.field && sortState.order === SortOrder.ASC
      ? SortOrder.DSC
      : SortOrder.ASC;

  const compareOrganizations = (
    field: keyof OrganizationSummary,
    sortOrder: SortOrder
  ) => (a: OrganizationSummary, b: OrganizationSummary) => {
    if (typeof a[field] === 'number' && typeof b[field] === 'number') {
      return numberCompare(a[field] as number, b[field] as number, sortOrder);
    }
    return stringCompare(
      translate(a[field]) ?? a.name ?? '',
      translate(b[field]) ?? b.name ?? '',
      sortOrder
    );
  };

  const applySort = (field: keyof OrganizationSummary) => () => {
    const order = determineNextSortOrder(field);

    organizations.sort(compareOrganizations(field, order));

    setSortState({ field, order });
  };

  const isTransportportal = getConfig().themeNap;

  const filterOrganizationsByName = (query: string) =>
    query
      ? organizations.filter(({ prefLabel, name }) =>
          (translate(prefLabel) ?? name ?? '')
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : organizations;

  const renderCaret = (field: keyof OrganizationSummary) => {
    if (field === sortState.field) {
      return sortState.order === SortOrder.ASC ? (
        <SC.CaretUp />
      ) : (
        <SC.CaretDown />
      );
    }
    return <SC.CaretBoth />;
  };

  useEffect(() => {
    getOrganizations(isTransportportal ? 'transportportal' : undefined);
  }, []);

  useEffect(() => {
    applySort('prefLabel')();
  }, [organizations]);

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
        <SC.SortRow className='col-12'>
          <SC.Title>
            <SC.TitleSortButton type='button' onClick={applySort('prefLabel')}>
              {localization.organizationsPage.organization}
              {renderCaret('prefLabel')}
            </SC.TitleSortButton>
          </SC.Title>
          <SC.Info>
            <SC.SortButton
              type='button'
              onClick={applySort('datasetCount')}
              data-tip={localization.organizationsPage.datasetsDescription}
            >
              <SC.DatasetIcon />
              {renderCaret('datasetCount')}
              <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
            </SC.SortButton>
            {!isTransportportal && (
              <>
                <SC.SortButton
                  type='button'
                  onClick={applySort('dataserviceCount')}
                  data-tip={
                    localization.organizationsPage.dataserviceDescription
                  }
                >
                  <SC.ApiIcon />
                  {renderCaret('dataserviceCount')}
                  <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
                </SC.SortButton>
                <SC.SortButton
                  type='button'
                  onClick={applySort('conceptCount')}
                  data-tip={localization.organizationsPage.conceptsDescription}
                >
                  <SC.ConceptIcon />
                  {renderCaret('conceptCount')}
                  <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
                </SC.SortButton>
                <SC.SortButton
                  type='button'
                  onClick={applySort('informationmodelCount')}
                  data-tip={
                    localization.organizationsPage.informationModelsDescription
                  }
                >
                  <SC.InfomodelIcon />
                  {renderCaret('informationmodelCount')}
                  <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
                </SC.SortButton>
              </>
            )}
          </SC.Info>
        </SC.SortRow>
        {filterOrganizationsByName(searchQuery).map(
          (
            {
              id,
              name,
              prefLabel,
              datasetCount,
              dataserviceCount,
              conceptCount,
              informationmodelCount
            },
            index: number,
            organizations: OrganizationSummary[]
          ) => {
            let sortLabel = '';
            const previousOrganizationName =
              translate(organizations[index - 1]?.prefLabel) ||
              organizations[index - 1]?.name;
            const currentOrganizationName = translate(prefLabel) || name;

            if (
              sortState.field === 'prefLabel' &&
              (index === 0 ||
                (index > 0 &&
                  previousOrganizationName &&
                  currentOrganizationName &&
                  previousOrganizationName.charAt(0) !==
                    currentOrganizationName.charAt(0)))
            ) {
              sortLabel = currentOrganizationName.charAt(0);
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
                      <SC.CountTag type={Entity.CONCEPT}>
                        {conceptCount}
                      </SC.CountTag>
                      <SC.CountTag type={Entity.INFORMATION_MODEL}>
                        {informationmodelCount}
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
