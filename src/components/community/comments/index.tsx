import React, { FC, memo, useState } from 'react';
import { compose } from 'redux';
import FdkLink from '@fellesdatakatalog/link';
import { Variant } from '@fellesdatakatalog/button';
import {
  useGetThreadByIdQuery,
  useGetUserQuery,
  usePostCommentMutation
} from '../../../api/user-feedback-api/comments';
import { withAuth, Props as AuthProps } from '../../../providers/auth';
import SC from './styled';
import Buttons from './components/buttons/styled';
import Composer from './components/composer';
import CommentCard from './components/comment-card';
import { CommunityPost } from '../../../types';
import translations from '../../../lib/localization';
import env from '../../../env';

const { FDK_COMMUNITY_BASE_URI } = env;

interface ExternalProps {
  entityId: string;
}

interface Props extends AuthProps, ExternalProps {}

const EntityComments: FC<Props> = ({ entityId, authService }) => {
  const [postComment] = usePostCommentMutation();
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const { data: currentUser } = useGetUserQuery();
  const { postsWithoutFirst } = useGetThreadByIdQuery(entityId, {
    selectFromResult: ({ data }) => ({
      postsWithoutFirst: data?.posts.slice(1) ?? []
    })
  });

  const rootComments = postsWithoutFirst.filter(post => post.toPid == null);
  const replies = postsWithoutFirst.reduce((prev, post) => {
    if (post.toPid != null) {
      return post.toPid in prev
        ? { ...prev, [post.toPid]: [...prev[post.toPid], post] }
        : { ...prev, [post.toPid]: [post] };
    }
    return prev;
  }, {} as Record<string, CommunityPost[]>);
  const maxVisibleComments = 3;
  const croppedComments = showAllComments
    ? rootComments
    : rootComments.slice(0, maxVisibleComments);
  const authenticated =
    authService.isAuthenticated() && !authService.isTokenExpired();
  const isLoggedIn = authenticated && currentUser != null;

  return (
    <>
      <SC.Ingress>{translations.community.comments.ingress}</SC.Ingress>
      <SC.CommentsInterfaceContainer>
        {isLoggedIn && newCommentOpen && (
          <Composer
            onSubmit={(content: string) =>
              postComment({ id: entityId, post: { content } })
            }
            openToggle={() => setNewCommentOpen(false)}
          />
        )}

        {isLoggedIn && !newCommentOpen && (
          <Buttons.BigButton
            variant={Variant.PRIMARY}
            onClick={() => setNewCommentOpen(true)}
          >
            {translations.community.comments.buttons.feedback}
            <SC.CommentIcon />
          </Buttons.BigButton>
        )}

        {!authenticated && (
          <Buttons.BigButton
            variant={Variant.PRIMARY}
            onClick={() => {
              window.location.hash = 'comment-section';
              authService.signIn();
            }}
          >
            {translations.community.comments.buttons.logInFeedback}
          </Buttons.BigButton>
        )}

        {authenticated && !currentUser && (
          <FdkLink href={`${FDK_COMMUNITY_BASE_URI}/login`} external>
            {translations.community.comments.noCommunityUser}
          </FdkLink>
        )}
      </SC.CommentsInterfaceContainer>
      <SC.Comments>
        {croppedComments?.map((comment, index) => (
          <CommentCard
            comment={comment}
            currentUser={currentUser}
            entityId={entityId}
            isReply={false}
            replies={replies[comment.pid]}
            key={`comment-card-${index}-id-${comment.pid}`}
          />
        ))}
        {rootComments.length > maxVisibleComments && (
          <Buttons.UnderlineButton
            variant={Variant.TERTIARY}
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments
              ? translations.community.comments.buttons.collapseComments
              : translations.formatString(
                  translations.community.comments.buttons.expandComments,
                  { count: rootComments.length }
                )}
          </Buttons.UnderlineButton>
        )}
      </SC.Comments>
    </>
  );
};

export default compose<FC<ExternalProps>>(memo, withAuth)(EntityComments);
