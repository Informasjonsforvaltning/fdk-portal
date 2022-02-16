import styled, { keyframes } from 'styled-components';
import PlayIconBase from '../../../images/play-btn.inline.svg';

const e8V3OKZsUb66_tr__trAnimation = keyframes`
  0% {
    transform: translate(8px, 8px) rotate(0deg);
  }
  20% {
    transform: translate(8px, 8px) rotate(0deg);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  60% {
    transform: translate(8px, 8px) rotate(360deg);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  100% {
    transform: translate(8px, 8px) rotate(720deg);
  }

`;

const e8V3OKZsUb68_tr__trAnimation = keyframes`
  0% {
    transform: translate(8px, 8px) rotate(0deg);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  40% {
    transform: translate(8px, 8px) rotate(360deg);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  88% {
    transform: translate(8px, 8px) rotate(720deg);
  }
  100% {
    transform: translate(8px, 8px) rotate(720deg);
  }

`;

const e8V3OKZsUb618_s_doAnimation = keyframes`
  0% {
    stroke-dashoffset: 0;
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  100% {
    stroke-dashoffset: 41.982096;
  }

`;

const e8V3OKZsUb618_tr__trAnimation = keyframes`

  0% {
    transform: translate(8px, 8px) rotate(0deg);
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  100% {
    transform: translate(8px, 8px) rotate(360deg);
  }
`;

const e8V3OKZsUb619_tr__trAnimation = keyframes`
  0% {
    transform: translate(8px, 8px) rotate(0deg);
  }
  100% {
    transform: translate(8px, 8px) rotate(360deg);
  }

`;

const e8V3OKZsUb619_s_doAnimation = keyframes`

  0% {
    stroke-dashoffset: 41;
  }
  56% {
    stroke-dashoffset: 41;
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const PlayIcon = styled(PlayIconBase)`
  #e8V3OKZsUb66_tr {
    animation: ${e8V3OKZsUb66_tr__trAnimation} 2500ms linear infinite normal
      forwards;
  }

  #e8V3OKZsUb68_tr {
    animation: ${e8V3OKZsUb68_tr__trAnimation} 2500ms linear infinite normal
      forwards;
  }

  #e8V3OKZsUb618 {
    animation: ${e8V3OKZsUb618_s_doAnimation} 2500ms linear infinite normal
      forwards;
  }
  #e8V3OKZsUb618_tr {
    animation: ${e8V3OKZsUb618_tr__trAnimation} 2500ms linear infinite normal
      forwards;
  }

  #e8V3OKZsUb619_tr {
    animation: ${e8V3OKZsUb619_tr__trAnimation} 2500ms linear infinite normal
      forwards;
  }

  #e8V3OKZsUb619 {
    animation: ${e8V3OKZsUb619_s_doAnimation} 2500ms linear infinite normal
      forwards;
  }

  & > g * {
    stroke: currentColor;
  }
`;

export default PlayIcon;
