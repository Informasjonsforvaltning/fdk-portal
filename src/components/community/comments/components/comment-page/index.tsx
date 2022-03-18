import { compose } from 'redux';

import React, { FC, useEffect } from 'react';
import CommentCard from '../comment-card';
import CommentCardSC from '../comment-card/styled';

import { CommunityPost } from '../../../../../types';
import {
  useGetUserQuery,
  useGetThreadByIdQuery
} from '../../../../../api/user-feedback-api/comments';

interface ExternalProps {
  entityId: string;
  page: number;
  replies: Record<string, CommunityPost[]>;
  updateReplies: (posts: CommunityPost[], page: number) => void;
}

const CommentPage: FC<ExternalProps> = ({
  entityId,
  page,
  replies,
  updateReplies
}) => {
  const numberOfPlaceholders = 3;
  const { data: currentUser } = useGetUserQuery();
  const { rootComments, pageReplies, isReloading, initialLoading } =
    useGetThreadByIdQuery(
      { id: entityId, page },
      {
        selectFromResult: ({ data, isFetching, isLoading }) => ({
          rootComments:
            data?.posts?.filter(
              post => !post.toPid && `${post.index}` !== '0'
            ) ?? [],
          pageReplies: data?.posts?.filter(post => post.toPid) ?? [],
          isReloading: isFetching,
          initialLoading: isLoading
        })
      }
    );

  useEffect(() => {
    if (!isReloading && !initialLoading) {
      updateReplies(
        pageReplies.map(reply => ({ ...reply, page })),
        page
      );
    }
  }, [isReloading, initialLoading]);

  return (
    <>
      {rootComments.map(comment => (
        <CommentCard
          comment={{ ...comment, page }}
          currentUser={currentUser}
          entityId={entityId}
          isReply={false}
          replies={replies[comment.pid]}
          key={`comment-card-p${page}-id-${comment.pid}`}
        />
      ))}
      {initialLoading &&
        [...Array(numberOfPlaceholders).keys()].map(index => (
          <CommentCardSC.PlaceholderCard key={`placeholder-card-${index}`} />
        ))}
    </>
  );
};

export default compose<FC<ExternalProps>>()(CommentPage);
