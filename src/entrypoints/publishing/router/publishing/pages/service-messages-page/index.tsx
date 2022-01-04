import React, { FC, memo } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import Moment from 'react-moment';
import { Severity } from '@fellesdatakatalog/alert';

import Translation from '../../../../../../components/translation';
import {
  ServiceMessage,
  useGetServiceMessagesQuery
} from '../../../../../../api/generated/cms/graphql';

import SC from './styled';
import { PATHNAME_PUBLISHING } from '../../../../../../constants/constants';

interface Props {}

const ServiceMessagesPage: FC<Props> = () => {
  const { data } = useGetServiceMessagesQuery();
  const serviceMessages = data?.serviceMessages as ServiceMessage[];
  return (
    <SC.ServiceMessagesPage>
      <SC.Title>
        <Translation id='serviceMessagesPage.title' /> (
        <Translation id='serviceMessagesPage.active' />)
      </SC.Title>
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
                <Moment format='DD.MM.YYYY'>{valid_from}</Moment> -{' '}
                <Moment format='DD.MM.YYYY'>{valid_to}</Moment>
              </SC.Date>
              <div>{short_description}</div>
            </SC.Content>
          </SC.ServiceMessage>
        )
      )}
    </SC.ServiceMessagesPage>
  );
};

export default memo(ServiceMessagesPage);
