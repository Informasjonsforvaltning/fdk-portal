import React, { FC } from 'react';
import FdkLink from '@fellesdatakatalog/link';

import env from '../../../../env';

import translations from '../../../../lib/localization';

import Topic from '../../../community/topic';

import type { CommunityTopic } from '../../../../types';
import { Entity } from '../../../../types/enums';

const { FDK_COMMUNITY_BASE_URI, DATALANDSBYEN_URI } = env;

interface Props {
  entityType: Entity;
  topics: CommunityTopic[];
  fdkId: string | undefined;
  multiplePages: boolean;
}

const CommunityTopics: FC<Props> = ({
  entityType,
  topics,
  fdkId,
  multiplePages
}) =>
  topics.length > 0 ? (
    <>
      <span>
        {translations.community.subtitle.content[entityType]}
        {multiplePages ? translations.community.subtitle.many : topics.length}
        {topics.length === 1
          ? translations.community.subtitle.mention
          : translations.community.subtitle.mentionPlural}
        <FdkLink href={FDK_COMMUNITY_BASE_URI} external>
          {translations.community.subtitle.link}
        </FdkLink>
      </span>
      {topics.map(topic => (
        <Topic key={`topic_${topic.tid}`} topic={topic} />
      ))}
      {fdkId && multiplePages && (
        <FdkLink
          href={`${DATALANDSBYEN_URI}/search?term=${fdkId}&sortBy=topic.lastposttime&sortDirection=desc`}
          external
        >
          {translations.community.subtitle.showAllMentions}
        </FdkLink>
      )}
    </>
  ) : (
    <span>
      {translations.community.subtitle.empty[entityType]}
      <FdkLink href={FDK_COMMUNITY_BASE_URI} external>
        {translations.community.subtitle.link}
      </FdkLink>
    </span>
  );

export default CommunityTopics;
