import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

import {
  ServiceMessage,
  useGetServiceMessageQuery
} from '../../../../../../api/generated/cms/graphql';

import SC from './styled';
import Markdown from '../../../../../../components/markdown';

interface Props {}

const ServiceMessagePage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetServiceMessageQuery({ variables: { id } });
  const serviceMessage = data?.serviceMessage as ServiceMessage;
  return serviceMessage ? (
    <SC.ServiceMessagePage>
      <SC.Title>{serviceMessage.title}</SC.Title>
      <SC.Description>{serviceMessage.short_description}</SC.Description>
      <SC.Body>
        <Markdown>{serviceMessage.description ?? ''}</Markdown>
      </SC.Body>
    </SC.ServiceMessagePage>
  ) : null;
};

export default memo(ServiceMessagePage);
