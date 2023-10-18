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
import { SelectOption } from '../../types';
import ReactPaginate from 'react-paginate';

const { FDK_COMMUNITY_BASE_URI } = env;
interface Props extends CommunityProps {}

const RequestsPage: FC<Props> = ({
  requests,
  pagination,
  communityActions: { searchRequestsRequested }
}) => {
  useEffect(() => {
    searchRequestsRequested('', '1', undefined);
  }, []);

  const notDeletedRequests = requests?.filter(topic => topic.deleted === 0);
  const [search, setSearch] = useState('');

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
                window.location.href = `${FDK_COMMUNITY_BASE_URI}/category/6`;
              }}
            >
              {localization.requestsPage.createRequest}
            </Button>
          </SC.Button>
        </SC.FirstRow>
        <SC.FirstRow>
          <div>
            <p>{localization.requestsPage.view}</p>
            <Select
              options={sortOptions}
              onChange={value =>
                searchRequestsRequested(search, value?.value, undefined)
              }
              defaultValue={sortOptions[0]}
            />
          </div>
          <div>
            <p>Fritekssøk i titler</p>
            <SC.Row>
              <input
                type='text'
                onChange={event => setSearch(event.target.value)}
              />
              <Button
                onClick={() =>
                  searchRequestsRequested(search, undefined, undefined)
                }
              >
                Søk
              </Button>
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
        {notDeletedRequests &&
          notDeletedRequests.map(topic => (
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
          ))}
        <SC.Pagination>
          <ReactPaginate
            pageCount={pagination.pageCount}
            activeClassName='active'
            onPageChange={data => {
              searchRequestsRequested(search, (data.selected + 1).toString());
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

        <SC.InfoBox>
          <SC.Text>
            <h3>{localization.requestsPage.requestData}</h3>
            <p>{localization.requestsPage.requestDataInfo}</p>
          </SC.Text>
          <Button
            onClick={() => {
              window.location.href = `${FDK_COMMUNITY_BASE_URI}/category/6`;
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
