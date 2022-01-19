import { theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';

import CommentIconBase from '../../../images/comment-icon.svg';

const Ingress = styled.p`
  margin-bottom: ${theme.spacing('S24')};
`;

const CommentsInterfaceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const PostCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > textarea {
    margin-bottom: ${theme.spacing('S16')};
  }
`;

const PostCommentButtons = styled.div`
  display: flex;
`;

const Comments = styled.ul`
  margin: ${theme.spacing('S24')} 0;
`;

const IconStyle = css`
  height: 20px;
  width: 20px;
`;

const CommentIcon = styled(CommentIconBase)`
  ${IconStyle}
  margin-left: ${theme.spacing('S4')};
`;

export default {
  Ingress,
  CommentsInterfaceContainer,
  PostCommentContainer,
  PostCommentButtons,
  Comments,
  CommentIcon
};
