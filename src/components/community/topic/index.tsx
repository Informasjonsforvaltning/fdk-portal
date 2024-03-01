import React, { FC } from 'react';

import _ from 'lodash';
import translations from '../../../lib/localization';
import env from '../../../env';

import Tag from '../tag';
import TimeAgo from '../time-ago';
import User from '../user';

import SC from './styled';
import type { CommunityTopic } from '../../../types';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  topic: CommunityTopic;
}

const Topic: FC<Props> = ({ topic }) => {
  const topicOwner = topic?.posts?.[0]?.user;
  return (
    <SC.Topic>
      <SC.Info>
        <h3>
          <SC.TopicTitle href={`${FDK_COMMUNITY_BASE_URI}/topic/${topic.slug}`}>
            {topic.title}
          </SC.TopicTitle>
        </h3>
        <div>
          {topic && (
            <SC.TopicTags>
              {topic.tags?.map(tag => (
                <li key={_.uniqueId('li-')}>
                  <Tag key={_.uniqueId('tag-')} {...tag} />
                </li>
              ))}
            </SC.TopicTags>
          )}
          <TimeAgo startTime={topic.timestamp} />
          <User user={topicOwner} />
        </div>
      </SC.Info>
      <SC.Statistics>
        <li>
          <SC.BigNumber>{topic.votes}</SC.BigNumber>
          {translations.community.votes}
        </li>
        <li>
          <SC.BigNumber>{topic.postcount}</SC.BigNumber>
          {translations.community.replies}
        </li>
        <li>
          <SC.BigNumber>{topic.viewcount}</SC.BigNumber>
          {translations.community.views}
        </li>
      </SC.Statistics>
    </SC.Topic>
  );
};

export default Topic;
