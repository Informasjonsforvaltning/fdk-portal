import React, { FC } from 'react';
import FdkLink from '@fellesdatakatalog/link';

import env from '../../../../env';

import translations from '../../../../lib/localization';

import Topic from '../../../community/topic';

import type { CommunityTopic } from '../../../../types';
import { Entity } from '../../../../types/enums';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  entityType: Entity;
  topics: CommunityTopic[];
}

const CommunityTopics: FC<Props> = ({ entityType, topics }) =>
  topics.length > 0 ? (
    <>
      <span>
        {translations.community.subtitle.content[entityType]}
        {topics.length}
        {topics.length === 1
          ? translations.community.subtitle.mention
          : translations.community.subtitle.mentionPlural}
        <FdkLink href={FDK_COMMUNITY_BASE_URI}>
          {translations.community.subtitle.link}
        </FdkLink>
      </span>
      {topics.map(topic => (
        <Topic key={`topic_${topic.tid}`} topic={topic} />
      ))}
    </>
  ) : (
    <span>
      {translations.community.subtitle.empty[entityType]}
      <a href={FDK_COMMUNITY_BASE_URI}>
        {translations.community.subtitle.link}
      </a>
    </span>
  );

export default CommunityTopics;
