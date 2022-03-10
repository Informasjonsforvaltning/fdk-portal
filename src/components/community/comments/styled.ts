import { theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';

import CommentIconBase from '../../../images/comment-icon.svg';

const onMobileView = '@media (max-width: 992px)';

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
  gap: ${theme.spacing('S24')};
  align-items: center;

  ${onMobileView} {
    gap: ${theme.spacing('S8')};
    align-items: flex-start;
    flex-direction: column-reverse;
  }
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
