import React, { FC, memo, useEffect, useState } from 'react';

import SC from './styled';
import { Props as OrganizationsProps } from '../../components/with-organizations';
import { Organization } from '../../types';
import { getTranslateText } from '../../lib/translateText';
import { PATHNAME_SEARCH } from '../../constants/constants';
import { Entity } from '../../types/enums';
import localization from '../../lib/localization';
import OrganizationFilter from './components/organization-filter/organization-filter.component';
import { filterOrganizationsByName } from '../../components/with-organizations/redux/reducer';

const OrganizationsPage: FC<OrganizationsProps> = ({
  organizations,
  organizationsActions: { getOrganizationsRequested: getOrganizations }
}) => {
  const [searchQuery, setSearchQuery] = useState<any>();
  useEffect(() => {
    if (!organizations || organizations.length === 0) {
      getOrganizations();
    }
  }, []);
  return (
    <main className="container">
      <div className="row mb-5">
        <div className="col-12">
          <SC.Header>{localization.searchOrganizations}</SC.Header>
        </div>
      </div>
      <div className="row mb-5">
        <SC.SearchBox className="col-12">
          <OrganizationFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </SC.SearchBox>
      </div>
      <div className="row">
        {filterOrganizationsByName(organizations, searchQuery).map(
          (
            {
              id,
              organization: { name, orgPath },
              dataset_count,
              dataservice_count,
              concept_count,
              informationmodel_count
            }: Organization,
            index: number,
            organizations: Organization[]
          ) => {
            let sortLabel = '';
            if (
              index === 0 ||
              (index > 0 &&
                getTranslateText(
                  organizations[index - 1].organization.name
                ).charAt(0) !== getTranslateText(name).charAt(0))
            ) {
              sortLabel = getTranslateText(name).charAt(0);
            }
            return (
              <SC.Box
                key={id}
                className="col-12"
                to={`${PATHNAME_SEARCH}?orgPath=${encodeURI(orgPath)}`}
              >
                <SC.SortLabel>{sortLabel}</SC.SortLabel>
                <SC.Title>{getTranslateText(name)}</SC.Title>
                <SC.Info>
                  <SC.CountTag type={Entity.DATASET}>
                    {dataset_count}
                  </SC.CountTag>
                  <SC.CountTag type={Entity.DATA_SERVICE}>
                    {dataservice_count}
                  </SC.CountTag>
                  <SC.CountTag type={Entity.CONCEPT}>
                    {concept_count}
                  </SC.CountTag>
                  <SC.CountTag type={Entity.INFORMATION_MODEL}>
                    {informationmodel_count}
                  </SC.CountTag>
                </SC.Info>
              </SC.Box>
            );
          }
        )}
      </div>
    </main>
  );
};

export default memo(OrganizationsPage);
