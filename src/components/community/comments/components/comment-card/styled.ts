import { Colour, theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';

import CommentIconBase from '../../../../../images/comment-icon.svg';

const onMobileView = '@media (max-width: 900px)';

const CommentCard = styled.li<{ $isReply: boolean }>`
  border-radius: 5px;
  background-color: ${({ $isReply, theme: t }) =>
    $isReply ? t.entityColours.lighter : theme.colour(Colour.NEUTRAL, 'N0')};
  padding: ${theme.spacing('S48')};
  margin: ${theme.spacing('S10')} 0;

  & img {
    display: inline;
    max-width: 230px;
    max-height: 95px;
    width: auto;
    height: auto;
  }

  & .emoji {
    height: 20px;
    width: 20px;
    display: inline;
    vertical-align: text-top;
  }

  ${onMobileView} {
    padding: ${theme.spacing('S16')};
    margin: ${theme.spacing('S6')} 0;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing('S16')};

  ${onMobileView} {
    flex-direction: column;
  }
`;

const CommentActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing('S24')};
  ${onMobileView} {
    margin-top: ${theme.spacing('S16')};
    flex-wrap: wrap;
  }
`;

const ButtonContainer = styled.span`
  display: flex;
  ${onMobileView} {
    flex-basis: 40%;
    & > button {
      margin-top: ${theme.spacing('S16')};
    }
  }
`;

const IconStyle = css`
  height: 15px;
  width: 15px;
`;

const CommentIcon = styled(CommentIconBase)`
  ${IconStyle}
  margin-left: ${theme.spacing('S4')};
  & path {
    stroke: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }
`;
const Spacing16 = styled.div`
  margin: ${theme.spacing('S16')};
`;

export default {
  CommentCard,
  CommentInfo,
  CommentActions,
  ButtonContainer,
  CommentIcon,
  Spacing16
};
