import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

import {
  ServiceMessageEntity,
  useGetServiceMessageQuery
} from '../../../../../../api/generated/cms/graphql';

import SC from './styled';
import Markdown from '../../../../../../components/markdown';

interface Props {}

const renderServiceMessage = (entity: ServiceMessageEntity | undefined) => {
  const { attributes } = entity || {};
  if (attributes) {
    const { title, short_description, description } = attributes;
    return (
      <SC.ServiceMessagePage>
        <SC.Title>{title}</SC.Title>
        <SC.Description>{short_description}</SC.Description>
        <SC.Body>
          <Markdown>{description ?? ''}</Markdown>
        </SC.Body>
      </SC.ServiceMessagePage>
    );
  }

  return null;
};

const ServiceMessagePage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetServiceMessageQuery({ variables: { id } });
  return renderServiceMessage(
    data?.serviceMessage?.data as ServiceMessageEntity | undefined
  );
};

export default memo(ServiceMessagePage);
