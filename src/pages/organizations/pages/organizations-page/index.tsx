import React, { memo, FC, useState, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Link from '@fellesdatakatalog/link';
import { getConfig } from '../../../../config';

import localization from '../../../../lib/localization';

import withOrganizations, {
  Props as OrganizationsProps
} from '../../../../components/with-organizations';

import withOrganizationCategories, {
  Props as OrganizationCategoriesProps
} from '../../../../components/with-organization-categories';

import Spinner from '../../../../components/spinner';
import withErrorBoundary from '../../../../components/with-error-boundary';

import ErrorPage from '../../../../components/error-page';

import SC from './styled';

import { SortOrder } from '../../../../types/enums';
import CheckBox from '../../../../components/checkbox';
import {
  historyPushSearchParams,
  parseSearchParams
} from '../../../../lib/location-history-helper';

import CategoryButtons from './category-buttons';
import OrganizationList from './organization-list';
import OrganizationCategoriesList from './organization-category-list';
import env from '../../../../env';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props
  extends OrganizationsProps,
    OrganizationCategoriesProps,
    RouteComponentProps {}

type OrganizationCategoryType = 'state' | 'municipality' | undefined;

const OrganizationsPage: FC<Props> = ({
  organizations,
  organizationsActions: {
    getOrganizationsRequested: getOrganizations,
    sortOrganizations
  },
  organizationCategories,
  organizationCategoriesActions: {
    getOrganizationCategoriesRequested: getOrganizationCategories
  },
  location,
  history,
  match
}) => {
  const isTransportportal = getConfig().themeNap;

  const locationSearch = parseSearchParams(location);

  const [searchQuery, setSearchQuery] = useState('');

  const [sortState, setSortState] = useState<{
    selector: string[];
    order: SortOrder;
  }>({
    selector: ['prefLabel'],
    order: SortOrder.ASC
  });

  const [includeEmptyOrganizations, setIncludeEmptyOrganizations] = useState(
    locationSearch.includeEmpty
      ? locationSearch.includeEmpty.toString() === 'true'
      : true
  );

  const toggleShowEmptyOrganizations = () => {
    const active = !includeEmptyOrganizations;
    setIncludeEmptyOrganizations(active);
    const oldSearchParams = parseSearchParams(location);
    const searchParams = {
      ...oldSearchParams,
      includeEmpty: active.toString()
    };
    historyPushSearchParams(history, searchParams);
  };

  const [currentCategory, setCurrentCategory] =
    useState<OrganizationCategoryType>(
      locationSearch.category === 'state' ||
        locationSearch.category === 'municipality'
        ? locationSearch.category
        : undefined
    );

  const onCategoryChange = (category: OrganizationCategoryType) => {
    setCurrentCategory(category);
    const oldSearchParams = parseSearchParams(location);
    const searchParams = {
      ...oldSearchParams,
      category
    };
    historyPushSearchParams(history, searchParams);
  };

  useEffect(() => {
    currentCategory
      ? getOrganizationCategories(currentCategory, includeEmptyOrganizations)
      : getOrganizations(
          isTransportportal ? 'transportportal' : undefined,
          includeEmptyOrganizations.toString()
        );
  }, [includeEmptyOrganizations, currentCategory]);

  const entries = () =>
    currentCategory ? organizationCategories : organizations;

  return entries().length > 0 ? (
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
      <CategoryButtons
        selectedCategory={currentCategory}
        onCategoryChange={onCategoryChange}
      />
      <SC.CheckBoxAndLinkWrapper>
        <CheckBox
          id='showAllCheckbox'
          active={!includeEmptyOrganizations}
          onClick={toggleShowEmptyOrganizations}
          textLabel={
            localization.organizationsPage.onlyShowOrganizationsWithContent
          }
          displayClass=''
        />
        <Link
          href={`${FDK_COMMUNITY_BASE_URI}/topic/56/tips-til-å-etterspørre-datasett-og-api-er`}
          external
        >
          {localization.organizationsPage.requestsLink}
        </Link>
      </SC.CheckBoxAndLinkWrapper>
      {currentCategory ? (
        <OrganizationCategoriesList
          organizationCategories={organizationCategories}
          searchQuery={searchQuery}
          history={history}
          location={location}
          match={match}
        />
      ) : (
        <OrganizationList
          organizations={organizations}
          sortState={sortState}
          setSortState={setSortState}
          sort={sortOrganizations}
          searchQuery={searchQuery}
          history={history}
          location={location}
          match={match}
        />
      )}
    </main>
  ) : (
    <Spinner />
  );
};

export default compose<FC>(
  memo,
  withOrganizations,
  withOrganizationCategories,
  withRouter,
  withErrorBoundary(ErrorPage)
)(OrganizationsPage);
