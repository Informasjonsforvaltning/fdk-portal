import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_CONCEPTS_COMPARE,
  PATHNAME_DATASETS,
  PATHNAME_GUIDANCE,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_MAIN_PAGE,
  PATHNAME_NEWS_ARCHIVE,
  PATHNAME_NEWS_ARTICLE,
  PATHNAME_ORGANIZATIONS
} from '../../constants/constants';
import { DatasetBreadcrumb } from './dataset-breadcrumb/dataset-breadcrumb';
import { ApiBreadcrumb } from './api-breadcrumb/api-breadcrumb';
import { ConceptBreadcrumb } from './concept-breadcrumb/concept-breadcrumb';
import { InformationModelBreadcrumb } from './informationModel-breadbrumb/information-breadcrumb';
import { PathNameBreadcrumb } from './pathname-breadcrumb/pathname-breadcrumb';
import './breadcrumbs.scss';
import { getConfig } from '../../config';
import { NewsBreadcrumb } from './news-breadcrumb/news-breadcrumb';

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  {
    path: getConfig().themeNap ? PATHNAME_DATASETS : PATHNAME_MAIN_PAGE,
    breadcrumb: () => (
      <PathNameBreadcrumb
        pathName={getConfig().themeNap ? 'homeNAP' : 'home'}
      />
    )
  },
  { path: '/datasets/:id', breadcrumb: DatasetBreadcrumb },
  { path: '/apis/:id', breadcrumb: ApiBreadcrumb },
  {
    path: `${PATHNAME_CONCEPTS}${PATHNAME_CONCEPTS_COMPARE}`,
    breadcrumb: () => <PathNameBreadcrumb pathName="conceptsCompare" />
  },
  { path: '/concepts/:id', breadcrumb: ConceptBreadcrumb },
  {
    path: `${PATHNAME_INFORMATIONMODELS}/:id`,
    breadcrumb: InformationModelBreadcrumb
  },
  { path: '/about', breadcrumb: () => <PathNameBreadcrumb pathName="about" /> },
  {
    path: '/about-registration',
    breadcrumb: () => <PathNameBreadcrumb pathName="aboutRegistration" />
  },
  {
    path: '/reports',
    breadcrumb: () => <PathNameBreadcrumb pathName="reports" />
  },
  {
    path: PATHNAME_NEWS_ARCHIVE,
    breadcrumb: () => <PathNameBreadcrumb pathName="newsArchive" />
  },
  {
    path: `${PATHNAME_NEWS_ARTICLE}/:id`,
    breadcrumb: NewsBreadcrumb
  },
  {
    path: PATHNAME_GUIDANCE,
    breadcrumb: () => <PathNameBreadcrumb pathName="guidance" />
  },
  {
    path: PATHNAME_ORGANIZATIONS,
    breadcrumb: () => <PathNameBreadcrumb pathName="organizations" />
  }
];

const options = {
  disableDefaults: true,
  excludePaths: []
};

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const PureBreadcrumbs = ({ breadcrumbs }) => {
  if (breadcrumbs && breadcrumbs.length > 1) {
    return (
      <div className="fdk-p-path">
        <div className="container">
          <p className="row col-12 col-xs-12 my-2">
            {breadcrumbs.map(({ key, match, breadcrumb }, index) => (
              <span key={key}>
                {index < breadcrumbs.length - 1 && (
                  <>
                    <NavLink to={match.url}>{breadcrumb}</NavLink>
                    <i className="fa fa-angle-right fdk-fa-path" />
                  </>
                )}
                {index === breadcrumbs.length - 1 && breadcrumb}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const Breadcrumbs = withBreadcrumbs(routes, options)(PureBreadcrumbs);
