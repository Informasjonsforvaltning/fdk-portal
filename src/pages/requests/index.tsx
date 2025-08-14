import React, { FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
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
import { CommunityRequestPost, SelectOption } from '../../types';
import { SearchField } from '../../components/search-field/search-field';
import { Pagination } from '../../components/pagination';

const { FDK_COMMUNITY_BASE_URI } = env;
interface Props extends CommunityProps {}

const RequestsPage: FC<Props> = ({
  requests,
  pagination,
  communityActions: { searchRequestsRequested, getRequestCategoryRequested }
}) => {
  useEffect(() => {
    searchRequestsRequested(undefined, '1', undefined);
    getRequestCategoryRequested();
  }, []);

  const requestDataGuideUri = 'topic/56/etterspørr-data-api';
  const notDeletedRequests = (posts: CommunityRequestPost[]) =>
    posts?.filter(post => post.deleted === false);

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
      value: 'topic.postcount',
      label: localization.requestsPage.mostComments
    }
  ];

  const onPageChange = (page: number) => {
    searchRequestsRequested(search, page.toString(), sortOption);
  };

  return (
    <>
      <Helmet>
        <title>{localization.menu.requests} - data.norge.no</title>
        <meta name='description' content={localization.head.description} />
        <meta
          property='og:title'
          content={`${localization.menu.requests} - data.norge.no`}
        />
        <meta
          property='og:description'
          content={localization.head.description}
        />
        <meta property='og:type' content='website' />
      </Helmet>
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
              {localization.requestsPage.comments}
            </SC.RequestTitleData>
          </SC.RequestsTitleRow>
          {requests.length > 0 &&
            notDeletedRequests(requests) &&
            requests.map(post => (
              <SC.RequestRow key={post.pid}>
                <SC.TableDataLink>
                  <SC.RequestLink
                    href={`${FDK_COMMUNITY_BASE_URI}/topic/${post.topic.slug}`}
                  >
                    {post.topic.title}
                  </SC.RequestLink>
                </SC.TableDataLink>
                <SC.RequestInfo>
                  {formatDate(new Date(post.timestampISO))}
                </SC.RequestInfo>
                <SC.RequestInfo>{post.upvotes}</SC.RequestInfo>
                <SC.RequestInfo>{`${post.topic.postcount - 1}`}</SC.RequestInfo>
              </SC.RequestRow>
            ))}
        </SC.Table>
        {!showAll && !search && (
          <SC.Pagination>
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
