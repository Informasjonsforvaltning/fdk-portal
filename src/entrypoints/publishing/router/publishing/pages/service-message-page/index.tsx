import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

import { ServiceMessage } from '../../../../../../api/generated/cms/graphql';

import SC from './styled';
import Markdown from '../../../../../../components/markdown';
import { getServiceMessage } from '../../../../../../api/cms/service-message';

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
  const [serviceMessage, setServiceMessage] = React.useState<
    ServiceMessage | undefined
  >(undefined);

  React.useEffect(() => {
    if (!id) return;

    const fetchMessage = async () => {
      try {
        const response = await getServiceMessage(id);
        setServiceMessage(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessage();
  }, [id]);

  return renderServiceMessage(serviceMessage);
};

export default memo(ServiceMessagePage);
