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

  const filterInCategoryByOrganizationName = (query: string) =>
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
      {filterInCategoryByOrganizationName(searchQuery).map(
        ({
          category: {
            id,
            name,
            prefLabel,
            datasetCount,
            dataserviceCount,
            conceptCount,
            informationmodelCount
          },
          organizations
        }) => (
          <>
            <SC.CategoryBox key={id} className='col-12'>
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
            </SC.CategoryBox>
            {organizations.map(
              ({
                id: orgId,
                name: orgName,
                prefLabel: orgPrefLabel,
                datasetCount: orgDatasetCount,
                dataserviceCount: orgDataserviceCount,
                conceptCount: orgConceptCount,
                informationmodelCount: orgInformationmodelCount
              }) => (
                <SC.OrgBox
                  key={orgId}
                  className='col-12'
                  to={`${url}/${orgId}`}
                >
                  <SC.Title>{translate(orgPrefLabel) || orgName}</SC.Title>
                  <SC.Info>
                    <SC.CountTag
                      $type={Entity.DATASET}
                      $zero={orgDatasetCount <= 0}
                    >
                      {orgDatasetCount}
                    </SC.CountTag>
                    {!isTransportportal && (
                      <>
                        <SC.CountTag
                          $type={Entity.DATA_SERVICE}
                          $zero={orgDataserviceCount <= 0}
                        >
                          {orgDataserviceCount}
                        </SC.CountTag>
                        <SC.CountTag
                          $type={Entity.CONCEPT}
                          $zero={orgConceptCount <= 0}
                        >
                          {orgConceptCount}
                        </SC.CountTag>
                        <SC.CountTag
                          $type={Entity.INFORMATION_MODEL}
                          $zero={orgInformationmodelCount <= 0}
                        >
                          {orgInformationmodelCount}
                        </SC.CountTag>
                      </>
                    )}
                  </SC.Info>
                </SC.OrgBox>
              )
            )}
          </>
        )
      )}
    </div>
  );
};
export default OrganizationCategoriesList;
