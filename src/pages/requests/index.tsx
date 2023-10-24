import React, { FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import Link from '@fellesdatakatalog/link';
import Button from '@fellesdatakatalog/button';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import { Breadcrumb } from 'reactstrap';
import withCommunity, {
  Props as CommunityProps
} from '../../components/with-community';
import withErrorBoundary from '../../components/with-error-boundary';
import ErrorPage from '../error-page';
import SC from './styled';
import { formatDate } from '../../lib/date-utils';
import Banner from '../../components/banner';
import localization from '../../lib/localization';
import env from '../../env';
import { CommunityTopic, SelectOption } from '../../types';
import { SearchField } from '../../components/search-field/search-field';

const { FDK_COMMUNITY_BASE_URI } = env;
interface Props extends CommunityProps {}

const RequestsPage: FC<Props> = ({
  requests,
  pagination,
  requestCategory,
  communityActions: { searchRequestsRequested, getRequestCategoryRequested }
}) => {
  useEffect(() => {
    searchRequestsRequested(undefined, '1', undefined);
    getRequestCategoryRequested();
  }, []);

  const notDeletedRequests = (topics: CommunityTopic[]) =>
    topics?.filter(topic => topic.deleted === 0);

  const [search, setSearch] = useState<string>();
  const [sortOption, setSortOption] = useState<string>();
  const [showAll, setShowAll] = useState<boolean>(false);

  const sortOptions: SelectOption[] = [
    {
      value: 'timestamp',
      label: localization.requestsPage.newestToOldest
    },
    {
      value: 'upvotes',
      label: localization.requestsPage.mostVotes
    },
    {
      value: 'topic.viewcount',
      label: localization.requestsPage.mostViews
    }
  ];

  return (
    <>
      <Breadcrumb />
      <Banner title={localization.requestsPage.title} />
      <main id='content' className='container'>
        <SC.FirstRow>
          <SC.InfoText>
            <p>
              {localization.formatString(localization.requestsPage.ingress, {
                lenke: (
                  <Link href={FDK_COMMUNITY_BASE_URI} external>
                    {localization.community.title}
                  </Link>
                )
              })}
            </p>
          </SC.InfoText>
          <SC.Button>
            <Button
              onClick={() => {
                window.open(
                  `${FDK_COMMUNITY_BASE_URI}/topic/56/etterspørr-data-api`
                );
              }}
            >
              {localization.requestsPage.createRequest}
            </Button>
          </SC.Button>
        </SC.FirstRow>
        <SC.FirstRow>
          <div>
            <p>{localization.requestsPage.sort}</p>
            <Select
              aria-label={localization.requestsPage.sort}
              options={sortOptions}
              onChange={value => {
                searchRequestsRequested(search, undefined, value?.value);
                setSortOption(value?.value);
              }}
              defaultValue={sortOptions[0]}
            />
          </div>
          <div>
            <p>{localization.requestsPage.search}</p>
            <SC.Row>
              <SearchField
                onSearchSubmit={s => {
                  searchRequestsRequested(s, undefined, sortOption);
                  setSearch(s);
                  setShowAll(false);
                }}
                ariaLabel={localization.facet.search}
                placeholder={localization.facet.search}
              />
            </SC.Row>
          </div>
        </SC.FirstRow>
        <SC.RequestsTitleRow>
          <SC.RequestTitle>
            {localization.requestsPage.requests}
          </SC.RequestTitle>
          <SC.RequestInfo>{localization.date}</SC.RequestInfo>
          <SC.RequestInfo>{localization.requestsPage.votes}</SC.RequestInfo>
          <SC.RequestInfo>{localization.requestsPage.views}</SC.RequestInfo>
        </SC.RequestsTitleRow>
        {notDeletedRequests(showAll ? requestCategory.topics : requests)
          .length > 0 &&
          notDeletedRequests(showAll ? requestCategory.topics : requests).map(
            topic => (
              <SC.RequestRow role='table' key={topic.cid}>
                <SC.RequestLink
                  href={`${FDK_COMMUNITY_BASE_URI}/topic/${topic.slug}`}
                >
                  {topic.title}
                </SC.RequestLink>
                <SC.RequestInfo>
                  {formatDate(new Date(topic.timestampISO))}
                </SC.RequestInfo>
                <SC.RequestInfo>{topic.upvotes}</SC.RequestInfo>
                <SC.RequestInfo>{topic.viewcount}</SC.RequestInfo>
              </SC.RequestRow>
            )
          )}
        {showAll && (
          <SC.Pagination>
            <Button onClick={() => setShowAll(false)}>
              {localization.facet.showfewer} <SC.ChevronUpIcon />
            </Button>
          </SC.Pagination>
        )}
        {!showAll && !search && (
          <SC.Pagination>
            <SC.Button>
              <Button onClick={() => setShowAll(true)}>
                {localization.facet.showAll}
                <SC.ChevronDownIcon />
              </Button>
            </SC.Button>

            <ReactPaginate
              pageCount={pagination.pageCount ? pagination.pageCount : 0}
              activeClassName='active'
              onPageChange={data => {
                searchRequestsRequested(
                  search,
                  (data.selected + 1).toString(),
                  sortOption
                );
              }}
              previousLabel={
                <>
                  <SC.ArrowLeftIcon />
                  {localization.page.prev}
                </>
              }
              nextLabel={
                <>
                  {localization.page.next}
                  <SC.ArrowRightIcon />
                </>
              }
            />
          </SC.Pagination>
        )}

        <SC.InfoBox>
          <SC.Text>
            <h3>{localization.requestsPage.requestData}</h3>
            <p>{localization.requestsPage.requestDataInfo}</p>
          </SC.Text>
          <Button
            onClick={() => {
              window.open(
                `${FDK_COMMUNITY_BASE_URI}/topic/56/etterspørr-data-api`
              );
            }}
          >
            {localization.requestsPage.createRequest}
          </Button>
        </SC.InfoBox>
      </main>
    </>
  );
};

const enhance = compose(withCommunity, withErrorBoundary(ErrorPage));
export default enhance(RequestsPage);
