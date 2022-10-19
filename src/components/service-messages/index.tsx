import React, { FC, memo, useEffect, useState } from 'react';

import { Severity } from '@fellesdatakatalog/alert';
import { Link as RouterLink } from 'react-router-dom';

import Translation from '../translation';

import { ServiceMessageEntity } from '../../api/generated/cms/graphql';

import SC from './styled';
import { PATHNAME_PUBLISHING } from '../../constants/constants';

interface Props {
  serviceMessages: ServiceMessageEntity[] | null;
}

const renderServiceMessage = (entity: ServiceMessageEntity | undefined) => {
  const { id, attributes } = entity || {};
  if (attributes) {
    const { message_type, title, short_description } = attributes;
    return (
      <SC.Alert
        key={id}
        severity={Severity[message_type as keyof typeof Severity]}
      >
        <SC.Content>
          <SC.Title>{title}</SC.Title>
          <SC.Description>
            <SC.Text>{short_description}</SC.Text>
            <SC.Link
              to={`${PATHNAME_PUBLISHING}/service-messages/${id}`}
              forwardedAs={RouterLink}
            >
              <Translation id='serviceMessagesPage.goToDetailsPage' />
            </SC.Link>
          </SC.Description>
        </SC.Content>
      </SC.Alert>
    );
  }
  return null;
};

const ServiceMessages: FC<Props> = ({ serviceMessages = [] }) => {
  const [extendedServiceMessages, setExtendedServiceMessages] = useState<
    ServiceMessageEntity[] | null
  >();

  useEffect(() => {
    setExtendedServiceMessages(
      serviceMessages?.map(item => ({ ...item, hide: false }))
    );
  }, [serviceMessages]);

  return (
    <SC.ServiceMessages>
      {extendedServiceMessages?.map(entity => renderServiceMessage(entity))}
    </SC.ServiceMessages>
  );
};

export default memo(ServiceMessages);
