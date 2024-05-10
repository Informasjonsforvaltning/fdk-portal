import React, { FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import Link from '@fellesdatakatalog/link';
import Button from '@fellesdatakatalog/button';
import Select from 'react-select';
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
import { Pagination } from '../../components/pagination';

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

  const requestDataGuideUri = 'topic/56/etterspørr-data-api';
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

  const onPageChange = (page: number) => {
    searchRequestsRequested(search, page.toString(), sortOption);
  };

  return (
    <>
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
                window.open(`${FDK_COMMUNITY_BASE_URI}/${requestDataGuideUri}`);
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

        <SC.Table>
          <SC.RequestsTitleRow>
            <SC.RequestTitle>
              {localization.requestsPage.requests}
            </SC.RequestTitle>
            <SC.RequestTitleData>{localization.date}</SC.RequestTitleData>
            <SC.RequestTitleData>
              {localization.requestsPage.votes}
            </SC.RequestTitleData>
            <SC.RequestTitleData>
              {localization.requestsPage.views}
            </SC.RequestTitleData>
          </SC.RequestsTitleRow>
          {notDeletedRequests(showAll ? requestCategory.topics : requests)
            .length > 0 &&
            notDeletedRequests(showAll ? requestCategory.topics : requests).map(
              topic => (
                <SC.RequestRow key={topic.cid}>
                  <SC.TableDataLink>
                    <SC.RequestLink
                      href={`${FDK_COMMUNITY_BASE_URI}/topic/${topic.slug}`}
                    >
                      {topic.title}
                    </SC.RequestLink>
                  </SC.TableDataLink>
                  <SC.RequestInfo>
                    {formatDate(new Date(topic.timestampISO))}
                  </SC.RequestInfo>
                  <SC.RequestInfo>{topic.upvotes}</SC.RequestInfo>
                  <SC.RequestInfo>{topic.viewcount}</SC.RequestInfo>
                </SC.RequestRow>
              )
            )}
        </SC.Table>
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

            <Pagination
              totalPages={pagination.pageCount ? pagination.pageCount : 0}
              currentPage={Number(pagination.currentPage)}
              onChange={onPageChange}
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
              window.open(`${FDK_COMMUNITY_BASE_URI}/${requestDataGuideUri}}`);
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
