import React, { FC, useEffect } from 'react';
import { compose } from 'redux';
import withCommunity, {
  Props as CommunityProps
} from '../../components/with-community';
import withErrorBoundary from '../../components/with-error-boundary';
import ErrorPage from '../error-page';
import SC from './styled';
import { formatDate } from '../../lib/date-utils';

interface Props extends CommunityProps {}

const RequestsPage: FC<Props> = ({
  requests,
  communityActions: { getCommunityRequests }
}) => {
  useEffect(() => {
    getCommunityRequests();
  }, []);

  return (
    <main id='content' className='container'>
      <SC.RequestsTitleRow>
        <SC.RequestTitle>Etterspørsler fra Datalandsbyen</SC.RequestTitle>
        <SC.RequestInfo>Dato</SC.RequestInfo>
        <SC.RequestInfo>Antall stemmer</SC.RequestInfo>
        <SC.RequestInfo>Antall visninger</SC.RequestInfo>
      </SC.RequestsTitleRow>
      {requests?.topics &&
        requests.topics.map(topic => (
          <SC.RequestRow key={topic.cid}>
            <SC.RequestTitle>{topic.title}</SC.RequestTitle>
            <SC.RequestInfo>
              {formatDate(new Date(topic.timestampISO))}
            </SC.RequestInfo>
            <SC.RequestInfo>{topic.upvotes}</SC.RequestInfo>
            <SC.RequestInfo>{topic.viewcount}</SC.RequestInfo>
            <p>test</p>
          </SC.RequestRow>
        ))}
    </main>
  );
};

const enhance = compose(withCommunity, withErrorBoundary(ErrorPage));
export default enhance(RequestsPage);
