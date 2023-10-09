import React, { FC, useEffect } from 'react';
import { compose } from 'redux';
import { Ingress, Link } from '@digdir/design-system-react';
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

const { FDK_COMMUNITY_BASE_URI } = env;
interface Props extends CommunityProps {}

const RequestsPage: FC<Props> = ({
  requests,
  communityActions: { getCommunityRequests }
}) => {
  useEffect(() => {
    getCommunityRequests();
  }, []);

  const notDeletedRequests = requests?.topics?.filter(
    topic => topic.deleted === 0
  );

  return (
    <main id='content' className='container'>
      <Banner title={localization.requestsPage.title} />
      <SC.InfoText>
        <Ingress size='medium'>
          {localization.formatString(localization.requestsPage.ingress, {
            lenke: (
              <Link href={FDK_COMMUNITY_BASE_URI} eksternal>
                {localization.community.title}
              </Link>
            )
          })}
        </Ingress>
      </SC.InfoText>
      <SC.RequestsTitleRow>
        <SC.RequestTitle>{localization.requestsPage.requests}</SC.RequestTitle>
        <SC.RequestInfo>{localization.date}</SC.RequestInfo>
        <SC.RequestInfo>{localization.requestsPage.votes}</SC.RequestInfo>
        <SC.RequestInfo>{localization.requestsPage.views}</SC.RequestInfo>
      </SC.RequestsTitleRow>
      {notDeletedRequests &&
        notDeletedRequests.map(topic => (
          <SC.RequestRow key={topic.cid}>
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
    </main>
  );
};

const enhance = compose(withCommunity, withErrorBoundary(ErrorPage));
export default enhance(RequestsPage);
