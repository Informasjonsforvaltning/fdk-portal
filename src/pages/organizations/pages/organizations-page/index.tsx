import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { getConfig } from '../../../../config';

import localization from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import withOrganizations, {
  Props as OrganizationsProps
} from '../../../../components/with-organizations';
import Spinner from '../../../../components/spinner';
import withErrorBoundary from '../../../../components/with-error-boundary';

import ErrorPage from '../../../../components/error-page';

import SC from './styled';

import type { OrganizationSummary } from '../../../../types';
import { Entity, SortOrder } from '../../../../types/enums';
import CheckBox from '../../../../components/checkbox';
import {
  historyPushSearchParams,
  parseSearchParams
} from '../../../../lib/location-history-helper';

import SortButtons from './category-buttons';

interface Props extends OrganizationsProps, RouteComponentProps {}

const OrganizationsPage: FC<Props> = ({
  organizations,
  organizationsActions: {
    getOrganizationsRequested: getOrganizations,
    sortOrganizations
  },
  match: { url },
  location,
  history
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const [sortState, setSortState] = useState<{
    selector: string[];
    order: SortOrder;
  }>({
    selector: ['prefLabel'],
    order: SortOrder.ASC
  });

  const determineNextSortOrder = (nextSelector: string[]) => {
    const { selector, order } = sortState;
    const isSameSelector = selector.every(i => nextSelector.includes(i));

    if (!isSameSelector && !nextSelector.includes('prefLabel')) {
      return SortOrder.DSC;
    }

    return isSameSelector && order === SortOrder.ASC
      ? SortOrder.DSC
      : SortOrder.ASC;
  };

  const applySort = (selector: string[], nextOrder?: SortOrder) => () => {
    const order = nextOrder ?? determineNextSortOrder(selector);

    sortOrganizations(selector, order);
    setSortState({ selector, order });
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

  const renderCaret = (selector: string[]) => {
    if (sortState.selector.every(i => selector.includes(i))) {
      return sortState.order === SortOrder.ASC ? (
        <SC.CaretUp />
      ) : (
        <SC.CaretDown />
      );
    }
    return <SC.CaretBoth />;
  };

  const locationSearch = parseSearchParams(location);
  const [includeEmptyOrganizations, setIncludeEmptyOrganizations] = useState(
    locationSearch.includeEmpty
      ? locationSearch.includeEmpty.toString() === 'true'
      : true
  );

  const toggleShowEmptyOrganizations = () => {
    const active = !includeEmptyOrganizations;
    setIncludeEmptyOrganizations(active);
    historyPushSearchParams(history, {
      includeEmpty: active.toString()
    });
  };

  useEffect(() => {
    getOrganizations(
      isTransportportal ? 'transportportal' : undefined,
      includeEmptyOrganizations.toString()
    );
  }, [includeEmptyOrganizations]);

  return organizations.length > 0 ? (
    <main id='content' className='container'>
      <div className='row mb-5'>
        <div className='col-12'>
          <SC.Header>{localization.searchOrganizations}</SC.Header>
        </div>
      </div>
      <div className='row mb-5'>
        <SC.SearchBox className='col-12'>
          <SC.Filter>
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
      <div className='row mb-5'>
        <CheckBox
          id='showAllCheckbox'
          active={!includeEmptyOrganizations}
          onClick={toggleShowEmptyOrganizations}
          textLabel={
            localization.organizationsPage.onlyShowOrganizationsWithContent
          }
          displayClass='col-12'
        />
      </div>
      <SortButtons />
      <div className='row'>
        <SC.SortRow className='col-12'>
          <SC.Title>
            <SC.TitleSortButton
              type='button'
              onClick={applySort(['prefLabel'])}
            >
              {localization.organizationsPage.organization}
              {renderCaret(['prefLabel'])}
            </SC.TitleSortButton>
          </SC.Title>
          <SC.Info>
            <SC.SortButton
              type='button'
              onClick={applySort(['datasetCount'])}
              title={localization.organizationsPage.datasetsDescription}
            >
              <SC.DatasetIcon />
              {renderCaret(['datasetCount'])}
            </SC.SortButton>
            {!isTransportportal && (
              <>
                <SC.SortButton
                  type='button'
                  onClick={applySort(['dataserviceCount'])}
                  title={localization.organizationsPage.dataserviceDescription}
                >
                  <SC.ApiIcon />
                  {renderCaret(['dataserviceCount'])}
                </SC.SortButton>
                <SC.SortButton
                  type='button'
                  onClick={applySort(['conceptCount'])}
                  title={localization.organizationsPage.conceptsDescription}
                >
                  <SC.ConceptIcon />
                  {renderCaret(['conceptCount'])}
                </SC.SortButton>
                <SC.SortButton
                  type='button'
                  onClick={applySort(['informationmodelCount'])}
                  title={
                    localization.organizationsPage.informationModelsDescription
                  }
                >
                  <SC.InfomodelIcon />
                  {renderCaret(['informationmodelCount'])}
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
            organizationSummaries: OrganizationSummary[]
          ) => {
            let sortLabel = '';
            const previousOrganizationName =
              translate(organizationSummaries[index - 1]?.prefLabel) ||
              organizationSummaries[index - 1]?.name;
            const currentOrganizationName = translate(prefLabel) || name;

            if (
              sortState.selector.includes('prefLabel') &&
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
  ) : (
    <Spinner />
  );
};

export default compose<FC>(
  memo,
  withOrganizations,
  withRouter,
  withErrorBoundary(ErrorPage)
)(OrganizationsPage);
