import React, { FC, memo } from 'react';
import { Link as RouteLink, useHistory, useLocation } from 'react-router-dom';
import Moment from 'react-moment';
import { Severity } from '@fellesdatakatalog/alert';

import moment from 'moment';
import Translation from '../../../../../../components/translation';
import {
  ServiceMessage,
  useGetServiceMessagesQuery
} from '../../../../../../api/generated/cms/graphql';

import SC from './styled';
import { PATHNAME_PUBLISHING } from '../../../../../../constants/constants';

interface Props {}

const ServiceMessagesPage: FC<Props> = () => {
  const history = useHistory();
  const location = useLocation();

  const handleShowActive = () => {
    history.push(`${PATHNAME_PUBLISHING}/service-messages`);
  };

  const handleShowAll = () => {
    history.push(`${PATHNAME_PUBLISHING}/service-messages?all`);
  };
  const showAll = location.search.includes('all');
  const isStaging = window.location.hostname.match('localhost|staging');
  const { data } = useGetServiceMessagesQuery({
    variables: showAll
      ? {
          env: isStaging ? 'staging' : 'production'
        }
      : {
          today: moment(Date.now()).format(),
          env: isStaging ? 'staging' : 'production'
        },
    skip: false
  });

  const serviceMessages = data?.serviceMessages as ServiceMessage[];

  return (
    <SC.ServiceMessagesPage>
      <SC.Title>
        <Translation id='serviceMessagesPage.title' /> (
        {showAll ? (
          <Translation id='serviceMessagesPage.all' />
        ) : (
          <Translation id='serviceMessagesPage.active' />
        )}
        )
      </SC.Title>
      {(!serviceMessages || serviceMessages.length === 0) && (
        <SC.NoMessages>
          <Translation id='serviceMessagesPage.noActiveMessages' />
        </SC.NoMessages>
      )}
      {serviceMessages?.map(
        ({
          id,
          title,
          channel,
          message_type,
          valid_from,
          valid_to,
          short_description
        }) => (
          <SC.ServiceMessage
            key={id}
            severity={Severity[message_type as keyof typeof Severity]}
          >
            <SC.Content>
              <SC.ServiceMessageTitle
                to={`${PATHNAME_PUBLISHING}/service-messages/${id}`}
                forwardedAs={RouteLink}
              >
                {title} ({channel})
              </SC.ServiceMessageTitle>
              <SC.Date>
                <Moment format='DD.MM.YYYY HH:mm'>{valid_from}</Moment> -{' '}
                <Moment format='DD.MM.YYYY HH:mm'>{valid_to}</Moment>
              </SC.Date>
              <div>{short_description}</div>
            </SC.Content>
          </SC.ServiceMessage>
        )
      )}
      {showAll ? (
        <SC.Button
          type='button'
          className='fdk-button-small show-all'
          onClick={handleShowActive}
        >
          <span>
            <Translation id='serviceMessagesPage.showActive' />
            &nbsp;&gt;&gt;
          </span>
        </SC.Button>
      ) : (
        <SC.Button
          type='button'
          className='fdk-button-small show-all'
          onClick={handleShowAll}
        >
          <span>
            <Translation id='serviceMessagesPage.showAll' />
            &nbsp;&gt;&gt;
          </span>
        </SC.Button>
      )}
    </SC.ServiceMessagesPage>
  );
};

export default memo(ServiceMessagesPage);
