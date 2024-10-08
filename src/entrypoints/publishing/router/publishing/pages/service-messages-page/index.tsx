import React, { FC, memo } from 'react';
import { Link as RouteLink, useHistory, useLocation } from 'react-router-dom';
import Moment from 'react-moment';
import { Severity } from '@fellesdatakatalog/alert';

import moment from 'moment';
import Translation from '../../../../../../components/translation';
import {
  Enum_Servicemessage_Environment,
  ServiceMessage,
  useGetServiceMessagesQuery
} from '../../../../../../api/generated/cms/graphql';

import SC from './styled';
import { PATHNAME_PUBLISHING } from '../../../../../../constants/constants';
import { MomentFormat } from '../../../../../../types/enums';

interface Props {}

const renderServiceMessage = (entity: ServiceMessage | undefined) => {
  if (entity) {
    const {
      documentId,
      message_type,
      title,
      short_description,
      valid_from,
      valid_to
    } = entity;

    const from = (
      <Moment format={MomentFormat.DD_MM_YYYY_HH_mm}>{valid_from}</Moment>
    );
    const to = (
      <Moment format={MomentFormat.DD_MM_YYYY_HH_mm}>{valid_to}</Moment>
    );

    return (
      <SC.ServiceMessage
        key={documentId}
        severity={Severity[message_type as keyof typeof Severity]}
      >
        <SC.Content>
          <SC.ServiceMessageTitle
            to={`${PATHNAME_PUBLISHING}/service-messages/${documentId}`}
            forwardedAs={RouteLink}
          >
            {title}
          </SC.ServiceMessageTitle>
          <SC.Date>
            {from}
            {' - '}
            {to}
          </SC.Date>
          <div>{short_description}</div>
        </SC.Content>
      </SC.ServiceMessage>
    );
  }

  return null;
};

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
  let serviceMessageEnv = Enum_Servicemessage_Environment.Production;
  if (window.location.hostname.match('localhost|staging')) {
    serviceMessageEnv = Enum_Servicemessage_Environment.Staging;
  } else if (window.location.hostname.match('demo')) {
    serviceMessageEnv = Enum_Servicemessage_Environment.Demo;
  }
  const { data } = useGetServiceMessagesQuery({
    variables: showAll
      ? {
          env: serviceMessageEnv
        }
      : {
          today: moment(Date.now()).format(),
          env: serviceMessageEnv
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
      {serviceMessages?.map(entity => renderServiceMessage(entity))}
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
