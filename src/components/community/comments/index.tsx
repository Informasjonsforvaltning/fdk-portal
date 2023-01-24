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
import CommentPage from './components/comment-page';
import { CommunityPost } from '../../../types';
import translations from '../../../lib/localization';
import env from '../../../env';
import LogOut from './components/logOut';

const { FDK_COMMUNITY_BASE_URI } = env;

interface ExternalProps {
  entityId: string;
}

interface Props extends AuthProps, ExternalProps {}

const CommentSection: FC<Props> = ({ entityId, authService }) => {
  const [page, setPage] = useState(1);
  const [repliesByPage, setRepliesByPage] = useState<
    Record<string, CommunityPost[]>
  >({});
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [postComment] = usePostCommentMutation();
  const { data: currentUser } = useGetUserQuery();
  const { currentPage = 1, pageCount = 1 } = useGetThreadByIdQuery(
    { id: entityId, page: 1 },
    {
      selectFromResult: ({ data }) => ({
        ...data?.pagination
      })
    }
  );

  const authenticated =
    authService.isAuthenticated() && !authService.isTokenExpired();
  const isLoggedIn = authenticated && currentUser;
  const hasMoreComments = pageCount > 1 && currentPage !== pageCount;
  const flatReplies = Object.values(repliesByPage)
    .flat()
    .sort((a, b) => a.timestamp - b.timestamp);
  const repliesByToPid = flatReplies.reduce((prev, reply) => {
    const key = reply.toPid ?? '0';
    const prevReplies = prev[key];
    return prevReplies
      ? { ...prev, [key]: [...prevReplies, reply] }
      : { ...prev, [key]: [reply] };
  }, {} as Record<string, CommunityPost[]>);

  const updateReplies = (newReplies: CommunityPost[], pageNumber: number) => {
    setRepliesByPage({ ...repliesByPage, [pageNumber]: newReplies });
  };

  return (
    <>
      <SC.Ingress>{translations.community.comments.ingress}</SC.Ingress>
      <SC.CommentsInterfaceContainer>
        {isLoggedIn && newCommentOpen && (
          <Composer
            onSubmit={(content: string) =>
              postComment({
                id: entityId,
                post: { content }
              })
            }
            openToggle={() => setNewCommentOpen(false)}
            showLogout
          />
        )}

        {isLoggedIn && !newCommentOpen && (
          <SC.PostCommentButtons>
            <Buttons.BigButton
              variant={Variant.PRIMARY}
              onClick={() => setNewCommentOpen(true)}
            >
              {translations.community.comments.buttons.feedback}
              <SC.CommentIcon />
            </Buttons.BigButton>
            <LogOut />
          </SC.PostCommentButtons>
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
          <SC.PostCommentButtons>
            <FdkLink href={`${FDK_COMMUNITY_BASE_URI}/login`} external>
              {translations.community.comments.noCommunityUser}
            </FdkLink>
            <LogOut />
          </SC.PostCommentButtons>
        )}
      </SC.CommentsInterfaceContainer>
      <SC.Comments>
        {[...Array(page).keys()].map((pageIndex: number) => (
          <CommentPage
            entityId={entityId}
            page={pageIndex + 1}
            replies={repliesByToPid}
            updateReplies={updateReplies}
            key={`comment-page-p${pageIndex}`}
          />
        ))}
        {page > 0 && (
          <SC.ButtonContainer>
            {hasMoreComments && page !== pageCount && (
              <Buttons.UnderlineButton
                variant={Variant.TERTIARY}
                onClick={() => setPage(page + 1)}
              >
                {translations.community.comments.buttons.expandComments}
              </Buttons.UnderlineButton>
            )}
            {page > 1 && (
              <Buttons.UnderlineButton
                variant={Variant.TERTIARY}
                onClick={() => setPage(1)}
              >
                {translations.community.comments.buttons.collapseComments}
              </Buttons.UnderlineButton>
            )}
          </SC.ButtonContainer>
        )}
      </SC.Comments>
    </>
  );
};

export default compose<FC<ExternalProps>>(memo, withAuth)(CommentSection);
