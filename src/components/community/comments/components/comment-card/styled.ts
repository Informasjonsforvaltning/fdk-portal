import { Colour, theme } from '@fellesdatakatalog/theme';
import styled, { css, keyframes } from 'styled-components';

import CommentIconBase from '../../../../../images/comment-icon.svg';

const onMobileView = '@media (max-width: 900px)';

const CommentCard = styled.li<{ $isReply: boolean }>`
  border-radius: 5px;
  background-color: ${({ $isReply, theme: t }) =>
    $isReply ? t.entityColours.lighter : theme.colour(Colour.NEUTRAL, 'N0')};
  padding: ${theme.spacing('S16')};
  margin: ${theme.spacing('S8')} 0;

  & p > img {
    display: inline;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }

  & .emoji {
    height: 20px;
    width: 20px;
    display: inline;
    vertical-align: middle;
  }

  & pre {
    background: rgb(243, 243, 243);
    max-height: 350px;
    display: block;
    overflow: auto;
    padding: ${theme.spacing('S8')};
    width: 0px;
    min-width: 100%;
    font-size: 0.8em;
  }

  ${onMobileView} {
    padding: ${theme.spacing('S8')};
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
  margin-top: ${theme.spacing('S16')};
  ${onMobileView} {
    margin-top: ${theme.spacing('S8')};

    flex-wrap: wrap;
  }
`;

const ButtonContainer = styled.span`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing('S16')};
  ${onMobileView} {
    & > button {
      margin-top: ${theme.spacing('S16')};
      magin-left: ${theme.spacing('S4')};
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

const MovingGradient = keyframes`
  0%{
      background-position: -1000px 0
  }
  100%{
      background-position: 1000px 0
  }
`;

const PlaceholderCard = styled.li`
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${MovingGradient};
  animation-timing-function: linear;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
  background: linear-gradient(to right, #ffffff 10%, #dddddd 18%, #ffffff 33%);
  position: relative;
  height: 200px;
  width: 100%;
  border-radius: 5px;
  margin: ${theme.spacing('S8')} 0;
`;

export default {
  CommentCard,
  CommentInfo,
  CommentActions,
  ButtonContainer,
  CommentIcon,
  PlaceholderCard
};
