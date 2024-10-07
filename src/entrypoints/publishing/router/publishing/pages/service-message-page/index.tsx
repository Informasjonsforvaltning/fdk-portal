import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

import {
  ServiceMessage,
  useGetServiceMessageQuery
} from '../../../../../../api/generated/cms/graphql';

import SC from './styled';
import Markdown from '../../../../../../components/markdown';

interface Props {}

const renderServiceMessage = (entity: ServiceMessage | undefined) => {
  if (entity) {
    const { title, short_description, description } = entity;
    return (
      <SC.ServiceMessagePage>
        <SC.Title>{title}</SC.Title>
        <SC.Description>{short_description}</SC.Description>
        {description && (
          <SC.Body>
            <Markdown>{description}</Markdown>
          </SC.Body>
        )}
      </SC.ServiceMessagePage>
    );
  }

  return null;
};

const ServiceMessagePage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetServiceMessageQuery({ variables: { id } });
  return renderServiceMessage(
    data?.serviceMessage as ServiceMessage | undefined
  );
};

export default memo(ServiceMessagePage);
