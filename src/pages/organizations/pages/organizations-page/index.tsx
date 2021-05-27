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
import ReactTooltipSC from '../../../../components/tooltip/styled';

import type { OrganizationSummary } from '../../../../types';
import { Entity, SortOrder } from '../../../../types/enums';

interface Props extends OrganizationsProps, RouteComponentProps {}

const OrganizationsPage: FC<Props> = ({
  organizations,
  organizationsActions: {
    getOrganizationsRequested: getOrganizations,
    sortOrganizations
  },
  match: { url }
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
              data-tip={localization.organizationsPage.datasetsDescription}
            >
              <SC.DatasetIcon />
              {renderCaret(['datasetCount'])}
              <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
            </SC.SortButton>
            {!isTransportportal && (
              <>
                <SC.SortButton
                  type='button'
                  onClick={applySort(['dataserviceCount'])}
                  data-tip={
                    localization.organizationsPage.dataserviceDescription
                  }
                >
                  <SC.ApiIcon />
                  {renderCaret(['dataserviceCount'])}
                  <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
                </SC.SortButton>
                <SC.SortButton
                  type='button'
                  onClick={applySort(['conceptCount'])}
                  data-tip={localization.organizationsPage.conceptsDescription}
                >
                  <SC.ConceptIcon />
                  {renderCaret(['conceptCount'])}
                  <ReactTooltipSC.ReactTooltipStyled effect='solid' multiline />
                </SC.SortButton>
                <SC.SortButton
                  type='button'
                  onClick={applySort(['informationmodelCount'])}
                  data-tip={
                    localization.organizationsPage.informationModelsDescription
                  }
                >
                  <SC.InfomodelIcon />
                  {renderCaret(['informationmodelCount'])}
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
  );
};

export default compose<FC>(
  memo,
  withOrganizations,
  withErrorBoundary(ErrorPage)
)(OrganizationsPage);
