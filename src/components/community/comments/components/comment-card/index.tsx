import React, { FC, memo, useState } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { compose } from 'redux';
import { Variant } from '@fellesdatakatalog/button';

import translations from '../../../../../lib/localization';
import { CommunityPost, CommunityUser } from '../../../../../types';

import TimeAgo from '../../../time-ago';
import User from '../../../user';
import Composer from '../composer';
import Buttons from '../buttons/styled';

import GifWrapper from '../../../../gif-wrapper';

import SC from './styled';

import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  usePostCommentMutation
} from '../../../../../api/user-feedback-api/comments';
import env from '../../../../../env';

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode: any) => {
    if (domNode?.name === 'img' && domNode?.attribs?.src?.includes('.gif')) {
      return (
        <GifWrapper
          src={domNode.attribs.src}
          alt={domNode.attribs?.alt}
          height={domNode.attribs?.height}
          width={domNode.attribs?.width}
        />
      );
    }
    return domNode;
  }
};

enum Mode {
  UPDATE,
  REPLY,
  NONE
}
interface Props {
  comment: CommunityPost;
  currentUser?: Partial<CommunityUser>;
  entityId: string;
  isReply: boolean;
  replies?: CommunityPost[];
}

const CommentCard: FC<Props> = ({
  comment,
  currentUser,
  entityId,
  isReply,
  replies
}) => {
  const [postComment] = usePostCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [currentMode, setCurrentMode] = useState<Mode>(Mode.NONE);
  const [showAllReplies, setShowAllReplies] = useState(false);

  const oneDayMillis = 24 * 60 * 60 * 1000;

  const hasReplies = (replies?.length ?? 0) > 0;
  const maxVisibleReplies = 3;
  const croppedReplies = showAllReplies
    ? replies
    : replies?.slice(-maxVisibleReplies);

  const sendPost = (content: string, mode: Mode) => {
    switch (mode) {
      case Mode.UPDATE:
        updateComment({
          id: entityId,
          post: { ...comment, content },
          page: comment.page ?? 1
        });
        break;

      case Mode.REPLY:
      default:
        postComment({
          id: entityId,
          post: { content, toPid: comment.pid }
        });
        break;
    }
  };

  const parsePost = (
    content: string,
    options: HTMLReactParserOptions
  ): string | JSX.Element | JSX.Element[] => {
    const { FDK_COMMUNITY_BASE_URI } = env;
    return parse(
      content.replaceAll(
        'src="/assets/',
        `crossorigin="" src="${FDK_COMMUNITY_BASE_URI}/assets/`
      ),
      options
    );
  };

  return (
    <SC.CommentCard $isReply={isReply}>
      <SC.CommentInfo>
        <User user={comment.user} />
        <TimeAgo startTime={comment.timestamp} cutOff={oneDayMillis} />
      </SC.CommentInfo>
      {comment.content && parsePost(comment.content, parserOptions)}
      {((hasReplies && currentMode === Mode.UPDATE) ||
        (!hasReplies && currentMode !== Mode.NONE)) && (
        <Composer
          openToggle={() => setCurrentMode(Mode.NONE)}
          onSubmit={(content: string) => sendPost(content, currentMode)}
          initialValue={currentMode === Mode.UPDATE ? comment.content : ''}
        />
      )}
      <SC.CommentActions>
        <SC.ButtonContainer>
          {(replies?.length ?? 0) > maxVisibleReplies && (
            <Buttons.UnderlineButton
              variant={Variant.TERTIARY}
              onClick={() => setShowAllReplies(!showAllReplies)}
            >
              {showAllReplies
                ? translations.community.comments.buttons.collapseReplies
                : translations.community.comments.buttons.expandReplies}
            </Buttons.UnderlineButton>
          )}

          {currentUser && !replies && !isReply && currentMode === Mode.NONE && (
            <Buttons.UnderlineButton
              variant={Variant.TERTIARY}
              onClick={() => {
                setCurrentMode(Mode.REPLY);
              }}
            >
              {translations.community.comments.buttons.reply}
              <SC.CommentIcon />
            </Buttons.UnderlineButton>
          )}
        </SC.ButtonContainer>

        <SC.ButtonContainer>
          {currentUser?.uid === comment.user.uid &&
            currentMode === Mode.NONE && (
              <>
                <Buttons.UnderlineButton
                  variant={Variant.TERTIARY}
                  onClick={() => {
                    setCurrentMode(Mode.UPDATE);
                  }}
                >
                  {translations.community.comments.buttons.edit}
                </Buttons.UnderlineButton>
                <Buttons.UnderlineButton
                  variant={Variant.TERTIARY}
                  onClick={() =>
                    deleteComment({
                      id: entityId,
                      post: comment,
                      invalidatedPages: Array.from(
                        { length: comment.page ?? 1 },
                        (_, i) => i + 1
                      )
                    })
                  }
                >
                  {translations.community.comments.buttons.delete}
                </Buttons.UnderlineButton>
              </>
            )}
        </SC.ButtonContainer>
      </SC.CommentActions>
      {croppedReplies && (
        <ul>
          {croppedReplies?.map((reply, index) => (
            <CommentCard
              comment={reply}
              currentUser={currentUser}
              entityId={entityId}
              isReply
              key={`comment-card-id-${comment.pid}-reply-${index}-`}
            />
          ))}
        </ul>
      )}

      {currentUser && hasReplies && !isReply && (
        <SC.CommentActions>
          {currentMode === Mode.REPLY && (
            <Composer
              openToggle={() => setCurrentMode(Mode.NONE)}
              onSubmit={(content: string) => sendPost(content, currentMode)}
            />
          )}
          {currentMode === Mode.NONE && (
            <Buttons.UnderlineButton
              variant={Variant.TERTIARY}
              onClick={() => {
                setCurrentMode(Mode.REPLY);
              }}
            >
              {translations.community.comments.buttons.reply}
              <SC.CommentIcon />
            </Buttons.UnderlineButton>
          )}
        </SC.CommentActions>
      )}
    </SC.CommentCard>
  );
};

export default compose<FC<Props>>(memo)(CommentCard);
