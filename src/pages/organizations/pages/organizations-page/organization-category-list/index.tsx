import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { OrganizationCategory } from '../../../../../types';

import SC from './styled';
import localization from '../../../../../lib/localization';

import { getTranslateText as translate } from '../../../../../lib/translateText';
import { Entity } from '../../../../../types/enums';
import { getConfig } from '../../../../../config';

interface Props extends RouteComponentProps {
  organizationCategories: OrganizationCategory[];
  searchQuery: string;
}

const OrganizationCategoriesList: FC<Props> = ({
  organizationCategories,
  searchQuery,
  match: { url }
}) => {
  const isTransportportal = getConfig().themeNap;

  const filterByOrganizationName = (query: string) =>
    query
      ? organizationCategories
          .map(({ category, organizations }) => ({
            organizations: organizations.filter(({ prefLabel, name }) =>
              (translate(prefLabel) ?? name ?? '')
                .toLowerCase()
                .includes(query.toLowerCase())
            ),
            category
          }))
          .filter(({ organizations }) => organizations.length > 0)
      : organizationCategories;

  const dummySortLabel = ' ';

  return (
    <div className='row'>
      <SC.SortRow className='col-12'>
        <SC.Title>{localization.organizationsPage.organization}</SC.Title>
        <SC.Info>
          <SC.InfoIcon>
            <SC.DatasetIcon />
          </SC.InfoIcon>
          <SC.InfoIcon>
            <SC.ApiIcon />
          </SC.InfoIcon>
          <SC.InfoIcon>
            <SC.ConceptIcon />
          </SC.InfoIcon>
          <SC.InfoIcon>
            <SC.InfomodelIcon />
          </SC.InfoIcon>
        </SC.Info>
      </SC.SortRow>
      <ol>
        {filterByOrganizationName(searchQuery).map(
          ({
            //   organizations,
            category: {
              id,
              name,
              prefLabel,
              datasetCount,
              dataserviceCount,
              conceptCount,
              informationmodelCount
            }
          }) => (
            <SC.Box key={id} className='col-12' to={`${url}/${id}`}>
              <SC.SortLabel>{dummySortLabel}</SC.SortLabel>
              <SC.Title>{translate(prefLabel) || name}</SC.Title>
              <SC.Info>
                <SC.CountTag type={Entity.DATASET}>{datasetCount}</SC.CountTag>
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
          )
        )}
      </ol>
      {/* {filterByOrganizationName(searchQuery).map(
            (
            {
                {
                id,
                name,
                prefLabel,
                datasetCount,
                dataserviceCount,
                conceptCount,
                informationmodelCount
                } = category,
            },
            index: number,
            organizationSummaries: OrganizationCatalogSummary[]
            ) => {
            const currentOrganizationName = translate(prefLabel) || name;

            return (
                <SC.Box key={id} className='col-12' to={`${url}/${id}`}>
                <SC.SortLabel>{sortLabel}</SC.SortLabel>
                <SC.Title>{translate(prefLabel) || name}</SC.Title>
                <SC.Info>
                    <SC.CountTag type={Entity.DATASET}>{datasetCount}</SC.CountTag>
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
        )} */}
    </div>
  );
};
export default OrganizationCategoriesList;
