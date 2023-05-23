import React, { FC } from 'react';

import { RouteComponentProps } from 'react-router-dom';
import SC from '../styled';

import type { OrganizationCatalogSummary } from '../../../../../types';

import { getTranslateText as translate } from '../../../../../lib/translateText';

import { Entity, SortOrder } from '../../../../../types/enums';
import { getConfig } from '../../../../../config';
import localization from '../../../../../lib/localization';

interface Props extends RouteComponentProps {
  organizations: OrganizationCatalogSummary[];
  sortState: {
    selector: string[];
    order: SortOrder;
  };
  sort: any;
  setSortState: any;
  searchQuery: string;
}

const OrganizationList: FC<Props> = ({
  organizations,
  sortState,
  sort,
  setSortState,
  searchQuery,
  match: { url }
}) => {
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

    sort(selector, order);
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

  return (
    <div className='row'>
      <SC.SortRow className='col-12'>
        <SC.Title>
          <SC.TitleSortButton type='button' onClick={applySort(['prefLabel'])}>
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
          organizationSummaries: OrganizationCatalogSummary[]
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
                <SC.CountTag $type={Entity.DATASET} $zero={datasetCount <= 0}>
                  {datasetCount}
                </SC.CountTag>
                {!isTransportportal && (
                  <>
                    <SC.CountTag
                      $type={Entity.DATA_SERVICE}
                      $zero={dataserviceCount <= 0}
                    >
                      {dataserviceCount}
                    </SC.CountTag>
                    <SC.CountTag
                      $type={Entity.CONCEPT}
                      $zero={conceptCount <= 0}
                    >
                      {conceptCount}
                    </SC.CountTag>
                    <SC.CountTag
                      $type={Entity.INFORMATION_MODEL}
                      $zero={informationmodelCount <= 0}
                    >
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
  );
};

export default OrganizationList;
