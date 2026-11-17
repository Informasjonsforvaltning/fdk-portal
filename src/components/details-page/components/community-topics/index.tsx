import React, { FC } from 'react';
import FdkLink from '@fellesdatakatalog/link';

import env from '../../../../env';

import translations from '../../../../lib/localization';
import { frontendLocale } from '../../../../lib/search-url';

import Topic from '../../../community/topic';

import SC from './styled';

import type { CommunityTopic } from '../../../../types';
import { Entity } from '../../../../types/enums';

const { FDK_COMMUNITY_BASE_URI, FDK_PORTAL_BASE_URI } = env;

interface Props {
  entityType: Entity;
  topics: CommunityTopic[];
  fdkId: string | undefined;
  multiplePages: boolean;
}

const CommunityNotice: FC = () => (
  <SC.Notice>
    <SC.NoticeTitle>{translations.community.notice.title}</SC.NoticeTitle>
    <SC.NoticeBody>{translations.community.notice.body}</SC.NoticeBody>
    <SC.NoticeLinks>
      <FdkLink href={FDK_COMMUNITY_BASE_URI} external>
        {translations.community.notice.gotoLink}
      </FdkLink>
      <FdkLink
        href={`${FDK_PORTAL_BASE_URI}/${frontendLocale()}/docs/community`}
      >
        {translations.community.notice.moreInfo}
      </FdkLink>
    </SC.NoticeLinks>
  </SC.Notice>
);

const CommunityTopics: FC<Props> = ({
  entityType,
  topics,
  fdkId,
  multiplePages
}) => (
  <>
    {topics.length > 0 ? (
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
            href={`${FDK_COMMUNITY_BASE_URI}/search?term=${fdkId}&sortBy=topic.lastposttime&sortDirection=desc`}
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
    )}
    <CommunityNotice />
  </>
);

export default CommunityTopics;
